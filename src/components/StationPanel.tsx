import type { StationContent } from "../content/types";
import styles from "./StationPanel.module.css";
import ActionLink from "./ActionLink";

export default function StationPanel({ content }: { content: StationContent }) {
  return (
    <section className={styles.panel}>
      <h1 className={styles.heading}>{content.heading}</h1>
      <p className={styles.lede}>{content.lede}</p>
      <ul className={styles.actions}>
        {content.actions.map((action) => (
          <li key={action.label}>
            <ActionLink action={action} />
          </li>
        ))}
      </ul>
    </section>
  );
}
