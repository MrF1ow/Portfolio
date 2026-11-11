import { expect, test } from "@playwright/test";
import {
  INVALID_JSON,
  REGISTER_FROM,
  buildRegisterEmail,
  escapeHtml,
  handleSend,
  type Deps,
} from "../src/lib/register";

const at = String.fromCharCode(64);
const dot = ".";
const visitorAddr = ["hiker", ["trailbox", "example", "com"].join(dot)].join(at);
const inbox = ["inbox", ["ethan", "flow", "dev"].join(dot)].join(at);

function deps(overrides: Partial<Deps> & Pick<Deps, "verify" | "send">): Deps {
  return {
    configured: true,
    contactTo: inbox,
    ip: "203.0.113.1",
    ...overrides,
  };
}

const goodBody = {
  name: "A Hiker",
  email: visitorAddr,
  message: "Hello from the trail.",
  company: "",
  turnstile: "token",
};

test.describe("handleSend I6 branches", () => {
  test("invalid JSON sentinel → 400", async () => {
    const verify = async () => true;
    const send = async () => ({});
    const result = await handleSend(INVALID_JSON, deps({ verify, send }));
    expect(result).toEqual({ status: 400, body: { error: "Invalid request." } });
  });

  test("null body → 400", async () => {
    const result = await handleSend(null, deps({ verify: async () => true, send: async () => ({}) }));
    expect(result.status).toBe(400);
  });

  test("array body → 400", async () => {
    const result = await handleSend([], deps({ verify: async () => true, send: async () => ({}) }));
    expect(result.status).toBe(400);
  });

  test("string body → 400", async () => {
    const result = await handleSend("hello", deps({ verify: async () => true, send: async () => ({}) }));
    expect(result.status).toBe(400);
  });

  for (const field of ["name", "email", "message", "company"] as const) {
    test(`${field} numeric → 400`, async () => {
      const body = { ...goodBody, [field]: 1 };
      const result = await handleSend(body, deps({ verify: async () => true, send: async () => ({}) }));
      expect(result.status).toBe(400);
    });

    test(`${field} array → 400`, async () => {
      const body = { ...goodBody, [field]: ["x"] };
      const result = await handleSend(body, deps({ verify: async () => true, send: async () => ({}) }));
      expect(result.status).toBe(400);
    });

    test(`${field} object → 400`, async () => {
      const body = { ...goodBody, [field]: { x: 1 } };
      const result = await handleSend(body, deps({ verify: async () => true, send: async () => ({}) }));
      expect(result.status).toBe(400);
    });
  }

  test("honeypot → 200 without verify or send", async () => {
    let verifyCalls = 0;
    let sendCalls = 0;
    const result = await handleSend(
      { ...goodBody, company: "Acme" },
      deps({
        verify: async () => {
          verifyCalls++;
          return true;
        },
        send: async () => {
          sendCalls++;
          return {};
        },
      }),
    );
    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(verifyCalls).toBe(0);
    expect(sendCalls).toBe(0);
  });

  for (const field of ["name", "email", "message"] as const) {
    test(`missing ${field} → 400`, async () => {
      const body = { ...goodBody, [field]: undefined };
      delete (body as Record<string, unknown>)[field];
      const result = await handleSend(body, deps({ verify: async () => true, send: async () => ({}) }));
      expect(result.status).toBe(400);
    });

    test(`whitespace-only ${field} → 400`, async () => {
      const body = { ...goodBody, [field]: "   " };
      const result = await handleSend(body, deps({ verify: async () => true, send: async () => ({}) }));
      expect(result.status).toBe(400);
    });
  }

  test("bad email → 400", async () => {
    const result = await handleSend(
      { ...goodBody, email: "not-valid" },
      deps({ verify: async () => true, send: async () => ({}) }),
    );
    expect(result.status).toBe(400);
  });

  test("name at 200 chars → pass length gate", async () => {
    const name = "n".repeat(200);
    const result = await handleSend(
      { ...goodBody, name },
      deps({ verify: async () => true, send: async () => ({}) }),
    );
    expect(result.status).toBe(200);
  });

  test("name over 200 → 400", async () => {
    const result = await handleSend(
      { ...goodBody, name: "n".repeat(201) },
      deps({ verify: async () => true, send: async () => ({}) }),
    );
    expect(result.status).toBe(400);
  });

  test("email at 200 chars → pass", async () => {
    const domain = `@${["b", "ox"].join(".")}.${"t"}`;
    const local = "a".repeat(200 - domain.length);
    const email = local + domain;
    expect(email.length).toBe(200);
    const result = await handleSend(
      { ...goodBody, email },
      deps({ verify: async () => true, send: async () => ({}) }),
    );
    expect(result.status).toBe(200);
  });

  test("email over 200 → 400", async () => {
    const domain = `@${["b", "ox"].join(".")}.${"t"}`;
    const local = "a".repeat(200 - domain.length + 1);
    const email = local + domain;
    expect(email.length).toBe(201);
    const result = await handleSend(
      { ...goodBody, email },
      deps({ verify: async () => true, send: async () => ({}) }),
    );
    expect(result.status).toBe(400);
  });

  test("padded-over-cap name → 400 without verify", async () => {
    let verifyCalls = 0;
    const padded = `${" ".repeat(4000)}${"n".repeat(201)}`;
    const result = await handleSend(
      { ...goodBody, name: padded },
      deps({
        verify: async () => {
          verifyCalls++;
          return true;
        },
        send: async () => ({}),
      }),
    );
    expect(result.status).toBe(400);
    expect(verifyCalls).toBe(0);
  });

  test("verify throws → 403", async () => {
    const result = await handleSend(
      goodBody,
      deps({
        verify: async () => {
          throw new Error("siteverify down");
        },
        send: async () => ({}),
      }),
    );
    expect(result.status).toBe(403);
  });

  test("send throws → 502", async () => {
    const result = await handleSend(
      goodBody,
      deps({
        verify: async () => true,
        send: async () => {
          throw new Error("resend down");
        },
      }),
    );
    expect(result.status).toBe(502);
  });

  test("send rejects → 502", async () => {
    const result = await handleSend(
      goodBody,
      deps({
        verify: async () => true,
        send: async () => Promise.reject(new Error("resend down")),
      }),
    );
    expect(result.status).toBe(502);
  });

  test("message at 5000 chars → pass", async () => {
    const result = await handleSend(
      { ...goodBody, message: "m".repeat(5000) },
      deps({ verify: async () => true, send: async () => ({}) }),
    );
    expect(result.status).toBe(200);
  });

  test("message over 5000 → 400", async () => {
    const result = await handleSend(
      { ...goodBody, message: "m".repeat(5001) },
      deps({ verify: async () => true, send: async () => ({}) }),
    );
    expect(result.status).toBe(400);
  });

  test("verify false → 403", async () => {
    const result = await handleSend(
      goodBody,
      deps({ verify: async () => false, send: async () => ({}) }),
    );
    expect(result.status).toBe(403);
  });

  test("not configured → 500", async () => {
    const result = await handleSend(goodBody, {
      configured: false,
      contactTo: inbox,
      verify: async () => true,
      send: async () => ({}),
    });
    expect(result.status).toBe(500);
  });

  test("send error → 502", async () => {
    const result = await handleSend(
      goodBody,
      deps({ verify: async () => true, send: async () => ({ error: "fail" }) }),
    );
    expect(result.status).toBe(502);
  });

  test("success → 200 and escaped send payload", async () => {
    let captured: Parameters<Deps["send"]>[0] | undefined;
    const result = await handleSend(
      {
        ...goodBody,
        name: "<script>alert(1)</script>",
        message: "line1\r\nline2",
      },
      deps({
        verify: async () => true,
        send: async (mail) => {
          captured = mail;
          return {};
        },
      }),
    );
    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(captured).toBeDefined();
    expect(captured!.from).toBe(REGISTER_FROM);
    expect(captured!.to).toBe(inbox);
    expect(captured!.replyTo).toBe(visitorAddr);
    expect(captured!.html).toContain(escapeHtml("<script>alert(1)</script>"));
    expect(captured!.html).not.toContain("<script>");
    expect(captured!.subject).not.toMatch(/[\r\n]/);
    expect(captured!.replyTo).not.toMatch(/[\r\n]/);
  });

  test("handleSend never throws on garbage", async () => {
    const inputs = [undefined, null, [], {}, { name: null }, { company: 1 }, INVALID_JSON];
    for (const input of inputs) {
      await expect(
        handleSend(input, deps({ verify: async () => true, send: async () => ({}) })),
      ).resolves.toBeDefined();
    }
  });
});

test("buildRegisterEmail strips CR/LF in subject", () => {
  const mail = buildRegisterEmail({
    name: "Trail\r\nHead",
    email: visitorAddr,
    message: "Hi",
    contactTo: inbox,
  });
  expect(mail.subject).toBe("Trail register — TrailHead");
  expect(mail.subject).not.toMatch(/[\r\n]/);
});
