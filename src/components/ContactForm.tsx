import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { type ContactErrors, type ContactInput, MESSAGE_MIN, validateContact } from "@/contact/validate";
import styles from "./Station.module.css";

type FormState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "invalid"; errors: ContactErrors; values: ContactInput }
  | { status: "failed"; message: string; values: ContactInput };

const ENDPOINT = "/.netlify/functions/contact";

/**
 * The form's action: check locally first (instant feedback, no request), then let the function decide. The
 * returned state drives the whole form; the values come back too, so what was typed survives React
 * resetting the form after the action.
 */
async function send(_previous: FormState, form: FormData): Promise<FormState> {
  const values: ContactInput = {
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? ""),
    message: String(form.get("message") ?? ""),
  };
  const local = validateContact(values);
  if (!local.ok) return { status: "invalid", errors: local.errors, values };

  try {
    const response = await fetch(ENDPOINT, { method: "POST", body: form });
    if (response.ok) return { status: "sent" };
    const body: { errors?: ContactErrors; error?: string } = await response.json().catch(() => ({}));
    if (response.status === 422 && body.errors) return { status: "invalid", errors: body.errors, values };
    return { status: "failed", message: body.error ?? "Something went wrong. Please try again.", values };
  } catch {
    return { status: "failed", message: "You seem to be offline. Please try again, or use the email address.", values };
  }
}

/** Reads the pending state of the <form> around it: must be rendered inside that form. */
function SendButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.action} disabled={pending}>
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

function Field({
  name,
  label,
  error,
  multiline = false,
  ...input
}: {
  name: keyof ContactInput;
  label: string;
  error?: string;
  multiline?: boolean;
  defaultValue?: string;
  type?: string;
  autoComplete?: string;
  minLength?: number;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    required: true,
    className: styles.input,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {multiline ? <textarea {...shared} {...input} rows={5} /> : <input {...shared} {...input} />}
      {error && (
        <p id={errorId} className={styles.fieldError}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [state, action] = useActionState(send, { status: "idle" });
  const [started] = useState(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const values = state.status === "invalid" || state.status === "failed" ? state.values : undefined;
  const errors = state.status === "invalid" ? state.errors : {};

  // After a rejected submit, put the cursor where the first problem is.
  useEffect(() => {
    if (state.status !== "invalid") return;
    formRef.current?.querySelector<HTMLElement>("[aria-invalid]")?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      <p className={styles.sent} role="status">
        Thanks, your message is on its way. I'll reply to the address you gave.
      </p>
    );
  }

  return (
    <form ref={formRef} className={styles.form} action={action} noValidate data-reveal>
      <Field name="name" label="Name" autoComplete="name" defaultValue={values?.name} error={errors.name} />
      <Field
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        defaultValue={values?.email}
        error={errors.email}
      />
      <Field
        name="message"
        label="Message"
        multiline
        minLength={MESSAGE_MIN}
        defaultValue={values?.message}
        error={errors.message}
      />

      {/* For bots only: hidden from people and screen readers, so anything typed here marks a bot. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="started" value={started} />

      <div className={styles.formFooter}>
        <SendButton />
        {state.status === "failed" && (
          <p className={styles.formError} role="alert">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
