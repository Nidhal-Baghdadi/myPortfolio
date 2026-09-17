import { Link } from "react-router";
import styles from "./Page.module.css";

export default function CreditsPage() {
  return (
    <main className={styles.page}>
      <title>Credits · Nidhal Baghdadi</title>
      <Link className={styles.back} to="/">
        ← Back to the arena
      </Link>

      <header className={styles.hero}>
        <h1 className={styles.title}>Credits</h1>
        <p className={styles.tagline}>The 3D models this site is built from, and their licences.</p>
      </header>

      <ul className={styles.credits}>
        <li>
          <a href="https://poly.pizza/bundle/The-Office-Pack-UGIy7YcQP9">The Office Pack</a> by{" "}
          <a href="https://poly.pizza/u/dook">dook</a> [
          <a href="https://creativecommons.org/licenses/by/3.0/">CC-BY</a>] via{" "}
          <a href="https://poly.pizza">Poly Pizza</a>
        </li>
        <li>
          <a href="https://kenney.nl/assets/mini-arena">Mini Arena</a> by{" "}
          <a href="https://kenney.nl">Kenney</a> [
          <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a>]
        </li>
      </ul>
    </main>
  );
}
