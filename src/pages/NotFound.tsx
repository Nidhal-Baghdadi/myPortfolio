import { Link } from "react-router";
import styles from "./Page.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <title>Page not found · Nidhal Baghdadi</title>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.description}>There's nothing at this address.</p>
      <Link className={styles.back} to="/">
        ← Back to the arena
      </Link>
    </main>
  );
}
