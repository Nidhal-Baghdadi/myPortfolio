import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// Kept outside netlify/functions: Netlify deploys every file in there as a function.
import contact from "../functions/contact.ts";

const human = { name: "Ada", email: "ada@example.com", message: "Hello, I liked the arena." };

function post(fields: Record<string, string>) {
  const form = new FormData();
  // A person takes more than a few seconds to fill the form in.
  for (const [key, value] of Object.entries({ started: String(Date.now() - 10_000), ...fields })) form.set(key, value);
  return contact(new Request("http://localhost/.netlify/functions/contact", { method: "POST", body: form }));
}

describe("contact function", () => {
  const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_TO", "me@example.com");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    fetchMock.mockClear();
  });

  it("only accepts POST", async () => {
    const response = await contact(new Request("http://localhost/", { method: "GET" }));
    expect(response.status).toBe(405);
  });

  it("returns field errors for invalid input, without sending", async () => {
    const response = await post({ name: "", email: "nope", message: "hi" });
    expect(response.status).toBe(422);
    const body = (await response.json()) as { errors: Record<string, string> };
    expect(Object.keys(body.errors)).toHaveLength(3);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("pretends to succeed for bots (honeypot filled, or sent too fast), without sending", async () => {
    expect((await post({ ...human, website: "spam.example" })).status).toBe(200);
    expect((await post({ ...human, started: String(Date.now()) })).status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends a valid message through Resend, replying to the visitor", async () => {
    const response = await post(human);
    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect(JSON.parse(String(init.body))).toMatchObject({ to: ["me@example.com"], reply_to: "ada@example.com" });
  });

  it("fails clearly when it isn't configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    expect((await post(human)).status).toBe(500);
  });

  it("reports a failure when Resend refuses", async () => {
    fetchMock.mockResolvedValueOnce(new Response("nope", { status: 403 }));
    expect((await post(human)).status).toBe(502);
  });
});
