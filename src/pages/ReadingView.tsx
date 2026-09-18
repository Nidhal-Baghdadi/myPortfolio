import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import PlanDrawing from "../components/PlanDrawing";
import StationText from "../components/StationText";
import stationStyles from "../components/Station.module.css";
import { CONTENT } from "../content";
import { gsap, MOTION_OK, riseLetters, useGSAP } from "../lib/motion";
import { STATIONS, type StationId } from "../scene/arena";
import styles from "./ReadingView.module.css";

/**
 * The same stations as a website: every station is a section, in tour order, under a sticky header whose
 * navigation follows your scroll. Sections reveal as they enter the view (unless motion is reduced).
 */
export default function ReadingView({ onShowArena }: { onShowArena: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<StationId>(STATIONS[0].id);

  // On arrival (including from the arena), go to the station in the address.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const section = id ? document.getElementById(id) : null;
    if (section) section.scrollIntoView();
    else window.scrollTo(0, 0);
  }, []);

  // Scroll-spy: the section crossing the middle of the view is the current one. It lights up in the nav and
  // goes in the address, so switching back to the arena lands on it too.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id as StationId;
          setActiveId(id);
          history.replaceState(history.state, "", `#${id}`); // keep the router's history state
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const station of STATIONS) {
      const section = document.getElementById(station.id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(MOTION_OK, () => {
        for (const section of gsap.utils.toArray<HTMLElement>("[data-section]")) {
          const trigger = { trigger: section, start: "top 75%", once: true };
          const heading = section.querySelector("[data-split]");
          if (heading) riseLetters(heading, { scrollTrigger: trigger });
          gsap.from(section.querySelectorAll("[data-reveal]"), {
            y: 24,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: trigger,
          });
        }
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={styles.page}>
      <header className={styles.bar}>
        <a className={styles.brand} href={`#${STATIONS[0].id}`}>
          Nidhal Baghdadi
        </a>
        <nav className={styles.navWrap} aria-label="Sections">
          <ol className={styles.nav}>
            {STATIONS.slice(1).map((station, i) => (
              <li key={station.id}>
                <a href={`#${station.id}`} aria-current={station.id === activeId ? "location" : undefined}>
                  <span className={styles.navNumber}>{String(i + 2).padStart(2, "0")}</span>
                  {station.topic}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <button type="button" className={styles.arenaButton} onClick={onShowArena}>
          Show the arena
        </button>
      </header>

      <main data-layout="page">
        {STATIONS.map((station, i) => {
          const content = CONTENT[station.id];
          const isHero = i === 0;
          return (
            <section
              key={station.id}
              id={station.id}
              data-section
              className={isHero ? styles.hero : styles.section}
              aria-labelledby={`${station.id}-heading`}
            >
              <div className={isHero ? styles.heroText : undefined}>
                <StationText
                  station={station}
                  content={content}
                  level={isHero ? "h1" : "h2"}
                  headingId={`${station.id}-heading`}
                />
              </div>
              {isHero && (
                // The arena, as a drawing: the site's other mode is one click away.
                <figure className={styles.heroPlan} data-reveal>
                  <PlanDrawing activeId={station.id} detailed />
                  <figcaption>
                    The same stations, as a 3D arena.{" "}
                    <button type="button" className={stationStyles.quietAction} onClick={onShowArena}>
                      Walk through it
                    </button>
                  </figcaption>
                </figure>
              )}
            </section>
          );
        })}
      </main>

      <footer className={styles.footer}>
        <p>Nidhal Baghdadi · Software engineer</p>
        <p>
          <Link to="/credits">Credits</Link> · <a href={`#${STATIONS[0].id}`}>Back to top ↑</a>
        </p>
      </footer>
    </div>
  );
}
