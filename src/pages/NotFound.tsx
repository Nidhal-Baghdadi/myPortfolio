import { Link } from "react-router";
import styles from "./Page.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <title>Page not found · Nidhal Baghdadi</title>
      <div className={styles.column}>
        <span className={styles.code} aria-hidden="true">
          404
        </span>
        <h1 className={styles.title}>Off the map</h1>
        <p className={styles.lede}>There's no station at this address. It may have moved, or the link has a typo.</p>
        <div className={styles.actions}>
          <Link className={styles.primary} to="/">
            Back to the arena
          </Link>
          <Link className={styles.secondary} to={{ pathname: "/", hash: "#plinths" }}>
            See the projects
          </Link>
        </div>
      </div>
    </main>
  );
}
