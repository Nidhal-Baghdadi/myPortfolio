import type { Role } from "@/content/types";
import styles from "./StationPanel.module.css";

export default function RoleItem({ role }: { role: Role }) {
  return (
    <>
      <h2 className={styles.itemTitle}>{role.title}</h2>
      <p className={styles.meta}>
        {role.place} . {role.dates}
      </p>
      <p className={styles.paragraph}>{role.description}</p>
    </>
  );
}
