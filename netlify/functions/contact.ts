import { validateContact } from "../../src/contact/validate.ts";

/** Bots fill every field and submit instantly; people don't. Both give a bot away, silently. */
const HONEYPOT = "website";
const MIN_FILL_TIME_MS = 3000;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

/**
 * POST /.netlify/functions/contact: validates the form and emails it through Resend. The API key only ever
 * exists here, on the server; the browser never sees it. Configure in Netlify's environment variables:
 * RESEND_API_KEY, CONTACT_TO (your inbox) and optionally CONTACT_FROM (a sender on a domain verified in
 * Resend; without one, Resend's test sender can only deliver to the account owner's own address).
 */
export default async function contact(request: Request): Promise<Response> {
  if (request.method !== "POST") return json(405, { error: "Use POST." });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json(400, { error: "The form data couldn't be read." });
  }

  // Answer bots with a success, so they have no reason to try harder; nothing is sent.
  const started = Number(form.get("started"));
  const tooFast = !Number.isFinite(started) || Date.now() - started < MIN_FILL_TIME_MS;
  if (String(form.get(HONEYPOT) ?? "") !== "" || tooFast) return json(200, { ok: true });

  const result = validateContact(Object.fromEntries(form));
  if (!result.ok) return json(422, { errors: result.errors });
  const { name, email, message } = result.value;

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";
  if (!key || !to) {
    console.error("contact: RESEND_API_KEY or CONTACT_TO is not set");
    return json(500, { error: "The form isn't set up yet. Please use the email address instead." });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email, // "Reply" in your inbox answers the visitor directly
      subject: `Portfolio: message from ${name}`,
      text: [message, "", `${name} <${email}>`].join("\n"),
    }),
  });
  if (!response.ok) {
    console.error("contact: Resend answered", response.status, await response.text());
    return json(502, { error: "The message couldn't be sent. Please try again, or use the email address." });
  }
  return json(200, { ok: true });
}
