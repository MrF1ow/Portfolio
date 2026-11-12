import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { Resend } from "resend";
import { handleSend, INVALID_JSON } from "@/lib/register";
import { site } from "@/data/site";

export const prerender = false;

export const MAX_BODY_BYTES = 65_536;

const json = (body: unknown, status: number, extra?: Record<string, string>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...extra,
    },
  });

async function verifyTurnstile(token: unknown, ip: string | null): Promise<boolean> {
  const hostnames = new Set(
    (env.TURNSTILE_HOSTNAMES ?? "").split(",").map((h) => h.trim()).filter(Boolean),
  );
  if (
    typeof token !== "string" ||
    !token ||
    token.length > 2048 ||
    !env.TURNSTILE_SECRET ||
    hostnames.size === 0
  ) {
    return false;
  }
  try {
    const params = new URLSearchParams({
      secret: env.TURNSTILE_SECRET,
      response: token,
    });
    if (ip) params.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: params,
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return false;
    const result = (await res.json()) as { success?: boolean; action?: string; hostname?: string };
    return (
      result.success === true &&
      result.action === site.turnstile.action &&
      hostnames.has(result.hostname ?? "")
    );
  } catch {
    return false;
  }
}

async function readBodyCapped(request: Request, max: number): Promise<Uint8Array | "oversize" | null> {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const parts: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > max) {
      await reader.cancel();
      return "oversize";
    }
    parts.push(value);
  }
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.byteLength;
  }
  return out;
}

function parseBodyBytes(raw: Uint8Array): unknown {
  if (raw.byteLength === 0) return INVALID_JSON;
  try {
    return JSON.parse(new TextDecoder().decode(raw)) as unknown;
  } catch {
    return INVALID_JSON;
  }
}

export const ALL: APIRoute = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
  }

  const lengthHeader = request.headers.get("content-length");
  if (lengthHeader !== null) {
    const length = Number(lengthHeader);
    if (Number.isFinite(length) && length > MAX_BODY_BYTES) {
      return json({ error: "Invalid request." }, 400);
    }
  }

  const raw = await readBodyCapped(request, MAX_BODY_BYTES);
  if (raw === "oversize") {
    return json({ error: "Invalid request." }, 400);
  }
  const body = raw === null ? INVALID_JSON : parseBodyBytes(raw);

  const apiKey = env.RESEND_API_KEY;
  const contactTo = env.CONTACT_EMAIL;
  const configured = Boolean(apiKey && contactTo);
  const ip = request.headers.get("CF-Connecting-IP");

  const result = await handleSend(body, {
    configured,
    contactTo: contactTo ?? "",
    ip,
    verify: (token, remoteIp) => verifyTurnstile(token, remoteIp),
    send: async (mail) => {
      if (!apiKey) return { error: "missing key" };
      const resend = new Resend(apiKey);
      return resend.emails.send({
        from: mail.from,
        to: [mail.to],
        replyTo: mail.replyTo,
        subject: mail.subject,
        html: mail.html,
      });
    },
  });

  return json(result.body, result.status);
};
