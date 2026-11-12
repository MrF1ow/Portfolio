/// <reference types="astro/client" />

declare namespace Cloudflare {
  interface Env {
    RESEND_API_KEY: string;
    CONTACT_EMAIL: string;
    TURNSTILE_SECRET: string;
  }
}
