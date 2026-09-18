import type { Action } from "@/content/types";
import ActionLink from "./ActionLink";
import styles from "./Station.module.css";

/** The station's calls to action: the first is primary, the rest are quieter, so there's one clear next step. */
export default function StationActions({ actions }: { actions: readonly Action[] }) {
  if (actions.length === 0) return null;
  return (
    <ul className={styles.actions} data-reveal>
      {actions.map((action, i) => (
        <li key={action.label}>
          <ActionLink action={action} quiet={i > 0 && action.kind !== "email"} />
        </li>
      ))}
    </ul>
  );
}
