import { Link } from "react-router";
import styles from "./Page.module.css";

type Credit = {
  title: string;
  url: string;
  author: string;
  authorUrl?: string;
  licence: "CC-BY 3.0" | "CC0" | "Public domain";
  via?: { name: string; url: string };
  /** Where it shows up in the arena. */
  use: string;
};

// Keep in step with CREDITS.md. CC-BY requires this attribution: never drop one of those entries.
const CREDITS: readonly Credit[] = [
  {
    title: "Mini Arena",
    url: "https://kenney.nl/assets/mini-arena",
    author: "Kenney",
    authorUrl: "https://kenney.nl",
    licence: "CC0",
    use: "The arena itself: floor, walls, columns, stands, banners, statues, the weapon rack and trees.",
  },
  {
    title: "The Office Pack",
    url: "https://poly.pizza/bundle/The-Office-Pack-UGIy7YcQP9",
    author: "dook",
    authorUrl: "https://poly.pizza/u/dook",
    licence: "CC-BY 3.0",
    via: { name: "Poly Pizza", url: "https://poly.pizza" },
    use: "Everything office: monitors, keyboards, chairs, the table tennis table, vending machine, boxes and more.",
  },
  {
    title: "Floating Island",
    url: "https://poly.pizza/m/uacRjkWA4q",
    author: "J-Toastie",
    licence: "CC-BY 3.0",
    via: { name: "Poly Pizza", url: "https://poly.pizza" },
    use: "The ground the arena floats on.",
  },
  {
    title: "Rock",
    url: "https://poly.pizza/m/34W5ymEePk",
    author: "Quaternius",
    licence: "Public domain",
    via: { name: "Poly Pizza", url: "https://poly.pizza" },
    use: "The comets that skim the glass globe.",
  },
];

export default function CreditsPage() {
  return (
    <main className={styles.page}>
      <title>Credits · Nidhal Baghdadi</title>
      <div className={styles.column}>
        <Link className={styles.back} to="/">
          ← Back to the arena
        </Link>
        <p className={styles.eyebrow}>Credits</p>
        <h1 className={styles.title}>Made with</h1>
        <p className={styles.lede}>
          The arena is built from open 3D models, redrawn in ink. Thanks to the artists who share their work.
        </p>

        <ul className={styles.credits}>
          {CREDITS.map((credit) => (
            <li key={credit.title} className={styles.credit}>
              <h2 className={styles.creditTitle}>
                <a href={credit.url} target="_blank" rel="noopener noreferrer">
                  {credit.title}
                </a>
              </h2>
              <span className={credit.licence === "CC-BY 3.0" ? styles.licenceAttribution : styles.licence}>
                {credit.licence}
              </span>
              <p className={styles.creditMeta}>
                by{" "}
                {credit.authorUrl ? (
                  <a href={credit.authorUrl} target="_blank" rel="noopener noreferrer">
                    {credit.author}
                  </a>
                ) : (
                  credit.author
                )}
                {credit.licence === "CC-BY 3.0" && (
                  <>
                    {" "}
                    [<a href="https://creativecommons.org/licenses/by/3.0/">CC-BY</a>]
                  </>
                )}
                {credit.via && (
                  <>
                    {" "}
                    via <a href={credit.via.url}>{credit.via.name}</a>
                  </>
                )}
              </p>
              <p className={styles.creditUse}>{credit.use}</p>
            </li>
          ))}
        </ul>

        <footer className={styles.footer}>
          <span>Nidhal Baghdadi · Software engineer</span>
          <Link to="/">Home</Link>
        </footer>
      </div>
    </main>
  );
}
