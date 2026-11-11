export type SendBody = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
  turnstile?: unknown;
};

export type Deps = {
  verify(token: unknown, ip: string | null): Promise<boolean>;
  send(input: {
    from: string;
    to: string;
    replyTo: string;
    subject: string;
    html: string;
  }): Promise<{ error?: unknown }>;
  configured: boolean;
  contactTo: string;
  ip?: string | null;
};

export type SendResult =
  | { status: 200; body: { ok: true } }
  | { status: 400 | 403 | 500 | 502; body: { error: string } };

/** Route passes this when `request.json()` throws. */
export const INVALID_JSON = Symbol("register.invalidJson");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const stripHeaderInjection = (value: string): string => value.replace(/[\r\n]/g, "");

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const fieldMustBeString = (body: Record<string, unknown>, key: string): boolean => {
  if (!(key in body)) return false;
  return typeof body[key] !== "string";
};

export const REGISTER_FROM = "Ethan Flow <register@notifications.ethanflow.dev>";

export function buildRegisterEmail(input: {
  name: string;
  email: string;
  message: string;
  contactTo: string;
}) {
  const name = stripHeaderInjection(input.name);
  const email = stripHeaderInjection(input.email);
  const subject = stripHeaderInjection(`Trail register — ${name}`);
  const html = `<div style="font-family:ui-monospace,monospace;max-width:560px">
<div style="margin:0 0 12px"><span style="font-size:11px;letter-spacing:.12em;text-transform:uppercase">Name</span><div>${escapeHtml(input.name)}</div></div>
<div style="margin:0 0 12px"><span style="font-size:11px;letter-spacing:.12em;text-transform:uppercase">Reply</span><div>${escapeHtml(input.email)}</div></div>
<div><span style="font-size:11px;letter-spacing:.12em;text-transform:uppercase">Note</span><p style="white-space:pre-wrap;margin:4px 0 0">${escapeHtml(input.message)}</p></div>
</div>`;
  return {
    from: REGISTER_FROM,
    to: input.contactTo,
    replyTo: email,
    subject,
    html,
  };
}

export async function handleSend(body: unknown, deps: Deps): Promise<SendResult> {
  if (body === INVALID_JSON) {
    return { status: 400, body: { error: "Invalid request." } };
  }

  if (!isPlainObject(body)) {
    return { status: 400, body: { error: "Invalid request." } };
  }

  for (const key of ["name", "email", "message", "company"] as const) {
    if (fieldMustBeString(body, key)) {
      return { status: 400, body: { error: "Invalid request." } };
    }
  }

  const company = typeof body.company === "string" ? body.company : "";
  if (company) {
    return { status: 200, body: { ok: true } };
  }

  const nameRaw = typeof body.name === "string" ? body.name : "";
  const emailRaw = typeof body.email === "string" ? body.email : "";
  const messageRaw = typeof body.message === "string" ? body.message : "";

  if (nameRaw.length > 200 || emailRaw.length > 200 || messageRaw.length > 5000) {
    return { status: 400, body: { error: "Message is too long." } };
  }

  const name = nameRaw.trim();
  const email = emailRaw.trim();
  const message = messageRaw.trim();

  if (!name || !email || !message) {
    return { status: 400, body: { error: "Name, email, and message are required." } };
  }

  if (!EMAIL_RE.test(email)) {
    return { status: 400, body: { error: "Please enter a valid email address." } };
  }

  let verified: boolean;
  try {
    verified = await deps.verify(body.turnstile, deps.ip ?? null);
  } catch {
    return {
      status: 403,
      body: { error: "We couldn't verify you're human. Please try again." },
    };
  }
  if (!verified) {
    return {
      status: 403,
      body: { error: "We couldn't verify you're human. Please try again." },
    };
  }

  if (!deps.configured) {
    return { status: 500, body: { error: "Email is not configured." } };
  }

  const mail = buildRegisterEmail({ name, email, message, contactTo: deps.contactTo });
  let sendOutcome: { error?: unknown };
  try {
    sendOutcome = await deps.send(mail);
  } catch {
    return { status: 502, body: { error: "Something went wrong. Please try again." } };
  }
  const { error } = sendOutcome;
  if (error) {
    return { status: 502, body: { error: "Something went wrong. Please try again." } };
  }

  return { status: 200, body: { ok: true } };
}
