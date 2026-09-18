import { useState } from "react";
import type { Action } from "@/content/types";
import styles from "./Station.module.css";

/** Copies the address and says so for a moment; the link beside it still opens the mail app. */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={styles.copy}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          // Clipboard blocked (permissions, insecure context): the mailto link beside it still works.
        }
      }}
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

/** One action. `quiet` renders a secondary, outlined style, for links beside a primary action. */
export default function ActionLink({ action, quiet = false }: { action: Action; quiet?: boolean }) {
  const className = quiet ? styles.quietAction : styles.action;
  switch (action.kind) {
    case "station":
      return (
        <a className={className} href={`#${action.to}`}>
          {action.label}
        </a>
      );

    case "file":
      return (
        <a className={className} href={action.href} download>
          {action.label}
        </a>
      );

    case "external":
      return (
        <a className={className} href={action.href} target="_blank" rel="noopener noreferrer">
          {action.label}
          <span aria-hidden="true"> ↗</span>
          <span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
      );

    case "email":
      return (
        <span className={styles.email}>
          <a className={styles.emailLink} href={action.href}>
            {action.label}
          </a>
          <CopyButton text={action.href.replace("mailto:", "")} />
        </span>
      );

    default: {
      // Every kind is handled above, so `action` has been narrowed to nothing here.
      // Add a new kind without a case and this line stops compiling.
      const unhandled: never = action;
      return unhandled;
    }
  }
}
