/**
 * The contact form's rules, shared by the browser (instant feedback) and the Netlify Function (the real
 * check: anything can be posted to it directly). Plain TypeScript with no DOM or Node APIs, so both can use it.
 */
export type ContactInput = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;
export type ContactResult = { ok: true; value: ContactInput } | { ok: false; errors: ContactErrors };

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 5000;
const NAME_MAX = 100;
// Deliberately loose: the real test of an address is replying to it.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Control characters (including line breaks) have no place in a name or an address.
// oxlint-disable-next-line no-control-regex -- matching them is the point
const CONTROL = /[\x00-\x1f\x7f]/;

export function validateContact(fields: Record<string, unknown>): ContactResult {
  const name = String(fields.name ?? "").trim();
  const email = String(fields.email ?? "").trim();
  const message = String(fields.message ?? "").trim();
  const errors: ContactErrors = {};

  if (!name) errors.name = "Please tell me your name.";
  else if (name.length > NAME_MAX || CONTROL.test(name)) errors.name = `A name of up to ${NAME_MAX} characters, on one line.`;

  if (!EMAIL.test(email) || CONTROL.test(email)) errors.email = "An email address I can reply to, like you@example.com.";

  if (message.length < MESSAGE_MIN) errors.message = `A few more words, please: at least ${MESSAGE_MIN} characters.`;
  else if (message.length > MESSAGE_MAX) errors.message = `That's over ${MESSAGE_MAX} characters: please shorten it.`;

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, value: { name, email, message } };
}
