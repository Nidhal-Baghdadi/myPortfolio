import { useRef } from "react";
import type { StationContent } from "@/content/types";
import { gsap, MOTION_OK, riseLetters, useGSAP } from "@/lib/motion";
import { STATIONS, type ArenaStation } from "@/scene/arena";
import StationText from "./StationText";
import styles from "./StationPanel.module.css";

/**
 * The text of the station you're at, over the arena. It's mounted fresh for each station (keyed by id), so
 * the entrance plays on every arrival: the heading rises letter by letter while the rest slides in, in
 * reading order. Under reduced motion none of it runs and the panel simply appears.
 */
export default function StationPanel({ station, content }: { station: ArenaStation; content: StationContent }) {
  const root = useRef<HTMLElement>(null);
  const index = STATIONS.indexOf(station);
  const previous = STATIONS[index - 1];
  const next = STATIONS[index + 1];

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(MOTION_OK, () => {
        const heading = root.current?.querySelector("[data-split]");
        if (heading) riseLetters(heading);
        gsap.from("[data-reveal]", { y: 18, autoAlpha: 0, duration: 0.55, ease: "power3.out", stagger: 0.05, delay: 0.1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.panel} aria-labelledby={`${station.id}-panel-heading`}>
      {/* Where you are in the tour: one segment per station, the current one in acid. */}
      <ol className={styles.progress} aria-label="Tour progress">
        {STATIONS.map((s, i) => (
          <li key={s.id} className={i < index ? styles.done : i === index ? styles.current : undefined}>
            <span className={styles.srOnly}>
              {s.name}
              {i === index ? " (you are here)" : ""}
            </span>
          </li>
        ))}
      </ol>

      <div className={styles.scroll}>
        <StationText station={station} content={content} level="h1" headingId={`${station.id}-panel-heading`} />
      </div>

      <nav className={styles.steps} aria-label="Stations">
        {previous ? (
          <a className={styles.step} href={`#${previous.id}`}>
            <span aria-hidden="true">←</span> {previous.topic}
          </a>
        ) : (
          <span />
        )}
        {next && (
          <a className={`${styles.step} ${styles.nextStep}`} href={`#${next.id}`}>
            {next.topic} <span aria-hidden="true">→</span>
          </a>
        )}
      </nav>
    </section>
  );
}
