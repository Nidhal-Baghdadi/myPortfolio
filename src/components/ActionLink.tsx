import type { Action } from "@/content/types";
import styles from "./StationPanel.module.css";

export default function ActionLink({ action }: { action: Action }) {
  switch (action.kind) {
    case "station":
      return (
        <a className={styles.action} href={`#${action.to}`}>
          {action.label}
        </a>
      );

    case "file":
      return (
        <a className={styles.action} href={action.href} download>
          {action.label}
        </a>
      );

    case "external":
      return (
        <a className={styles.action} href={action.href} target="_blank" rel="noopener noreferrer">
          {action.label}
          <span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
      );

    case "email":
      return (
        <a className={styles.action} href={action.href}>
          {action.label}
        </a>
      );

    default: {
      // Every kind is handled above, so `action` has been narrowed to nothing here.
      // Add a new kind without a case and this line stops compiling.
      const unhandled: never = action;
      return unhandled;
    }
  }
}
