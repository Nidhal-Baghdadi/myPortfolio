import type { ArenaStation } from "@/scene/arena";
import { STATIONS } from "@/scene/arena";
import type { StationContent } from "@/content/types";
import styles from "./Station.module.css";

/**
 * Number, topic, heading and lede: the part every station shares. The eyebrow ties the text to the arena
 * ("03 / 06 · Projects" matches the map); the heading level depends on where it's shown.
 */
export default function StationHeader({
  station,
  content,
  level: Heading,
  headingId,
}: {
  station: ArenaStation;
  content: StationContent;
  level: "h1" | "h2";
  /** For the surrounding section's aria-labelledby. */
  headingId: string;
}) {
  const number = STATIONS.indexOf(station) + 1;
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow} data-reveal>
        <span className={styles.number}>{String(number).padStart(2, "0")}</span>
        <span className={styles.of}>/ {String(STATIONS.length).padStart(2, "0")}</span>
        <span>{station.topic}</span>
      </p>
      <Heading id={headingId} className={styles.heading} data-split>
        {content.heading}
      </Heading>
      <p className={styles.lede} data-reveal>
        {content.lede}
      </p>
    </header>
  );
}
