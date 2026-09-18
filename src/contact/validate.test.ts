import { describe, expect, it } from "vitest";
import { MESSAGE_MAX, MESSAGE_MIN, validateContact } from "./validate";

const valid = { name: "Ada Lovelace", email: "ada@example.com", message: "Hello, I liked the arena." };

describe("validateContact", () => {
  it("accepts a complete message and trims it", () => {
    expect(validateContact({ ...valid, name: "  Ada  " })).toEqual({ ok: true, value: { ...valid, name: "Ada" } });
  });

  it("reports every problem at once, per field", () => {
    const result = validateContact({ name: "", email: "not-an-email", message: "hi" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(Object.keys(result.errors).sort()).toEqual(["email", "message", "name"]);
  });

  it("rejects line breaks in the name, which could forge email headers", () => {
    expect(validateContact({ ...valid, name: "Ada\nBcc: everyone@example.com" }).ok).toBe(false);
  });

  it("enforces the message length limits", () => {
    expect(validateContact({ ...valid, message: "x".repeat(MESSAGE_MIN - 1) }).ok).toBe(false);
    expect(validateContact({ ...valid, message: "x".repeat(MESSAGE_MIN) }).ok).toBe(true);
    expect(validateContact({ ...valid, message: "x".repeat(MESSAGE_MAX + 1) }).ok).toBe(false);
  });

  it("treats missing fields as empty rather than crashing", () => {
    expect(validateContact({}).ok).toBe(false);
  });
});
