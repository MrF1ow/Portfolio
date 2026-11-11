import { site } from "../data/site";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  getResponse: (id: string) => string | undefined;
  reset: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    onRegisterTurnstileLoad?: () => void;
  }
}

export function initRegister(root: HTMLElement): void {
  const card = root.querySelector<HTMLElement>(".register-card");
  const form = root.querySelector<HTMLFormElement>(".register-form");
  const alert = root.querySelector<HTMLElement>(".register-alert");
  const done = root.querySelector<HTMLElement>(".done");
  const submit = root.querySelector<HTMLButtonElement>(".register-submit");
  const turnstileBox = root.querySelector<HTMLElement>(".turnstile-slot");
  const dateEl = root.querySelector<HTMLElement>(".register-date");

  if (!card || !form || !alert || !submit || !turnstileBox) return;

  const date = new Date()
    .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    .toUpperCase();
  if (dateEl) dateEl.textContent = date;

  let widgetId: string | undefined;
  const sitekey = turnstileBox.dataset.sitekey ?? site.turnstile.sitekey;
  const action = turnstileBox.dataset.action ?? site.turnstile.action;

  window.onRegisterTurnstileLoad = () => {
    widgetId = window.turnstile!.render(turnstileBox, {
      sitekey,
      action,
      theme: "dark",
      appearance: "interaction-only",
    });
  };

  if (!document.querySelector('script[data-register-turnstile]')) {
    const api = document.createElement("script");
    api.dataset.registerTurnstile = "";
    api.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onRegisterTurnstileLoad";
    api.async = true;
    document.head.appendChild(api);
  }

  const showError = (message: string) => {
    alert.textContent = message;
    alert.hidden = false;
    card.classList.remove("sent");
  };

  const showSigned = () => {
    alert.textContent = "";
    alert.hidden = true;
    card.classList.add("sent");
    done?.focus();
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    alert.hidden = true;

    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
      turnstile: widgetId === undefined ? "" : (window.turnstile?.getResponse(widgetId) ?? ""),
    };

    submit.disabled = true;
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        showError(body.error ?? "Something went wrong. Please try again.");
        return;
      }
      showSigned();
    } catch {
      showError("Something went wrong. Please try again.");
    } finally {
      if (widgetId !== undefined) window.turnstile?.reset(widgetId);
      submit.disabled = false;
    }
  });
}
