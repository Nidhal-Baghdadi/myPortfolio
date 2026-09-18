import { Link } from "react-router";
import { Canvas } from "@react-three/fiber";
import Arena from "../components/Arena";
import { STATIONS } from "../scene/arena";
import { cssColor } from "../styles/tokens";
import styles from "./ArenaPage.module.css";
import StationGroup from "../components/StationGroup";
import CameraRig from "../scene/CameraRig";
import StationPanel from "../components/StationPanel";
import ArenaPlan from "../components/ArenaPlan";
import Space from "../components/Space";
import { CONTENT } from "../content";

import { useEffect, useRef, useState } from "react";

export default function ArenaPage() {
  // Read once: it decides the starting mode and whether the scenery moves.
  const [prefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [readAsPage, setReadAsPage] = useState(prefersReducedMotion);

  const stationPositionRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  const activeStation = STATIONS[activeIndex] ?? STATIONS[0];

  useEffect(() => {
    const onScroll = () => {
      const stationPosition =
        window.innerHeight > 0 ? window.scrollY / window.innerHeight : 0;

      stationPositionRef.current = stationPosition;

      setActiveIndex(
        Math.min(Math.round(stationPosition), STATIONS.length - 1),
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set the starting value
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const goToHash = (animate: boolean) => {
      const index = STATIONS.findIndex(
        (s) => `#${s.id}` === window.location.hash,
      );

      if (index === -1) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.scrollTo({
        top: index * window.innerHeight,
        behavior: animate && !reduceMotion ? "smooth" : "auto",
      });
    };
    goToHash(false); // when the page first loads
    const onHashChange = () => goToHash(true);
    window.addEventListener("hashchange", onHashChange); // whenever the hash changes, e.g. "Contact me"

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    history.replaceState(null, "", `#${activeStation.id}`);
  }, [activeStation.id]);

  return (
    <>
      {!readAsPage && (
        <div className={styles.scene}>
          {/* flat: no tone mapping, so the paint shows the exact token colours */}
          {/* dpr capped at 1.5: on high-density screens 2x would render 78% more pixels for barely visible gain */}
          <Canvas
            flat
            dpr={[1, 1.5]}
            // Lets a material clip itself with its own planes (the station rings stop at the walls).
            onCreated={({ gl }) => {
              gl.localClippingEnabled = true;
            }}
            camera={{
              fov: STATIONS[0].shot.fov,
            }}
          >
            <CameraRig stationPosition={stationPositionRef} />
            {/* three.js divides diffuse light by π, so intensities adding up to π show faces in the lit band at
                their exact colour; the darker bands shade the rest */}
            <ambientLight intensity={Math.PI * 0.35} />
            <directionalLight position={[5, 10, 5]} intensity={Math.PI * 0.65} />
            <color attach="background" args={[cssColor("ink")]} />
            <Space animate={!prefersReducedMotion} />
            <Arena />
            {STATIONS.map((station) => {
              return (
                <StationGroup
                  key={station.id}
                  station={station}
                  isActive={station.id === activeStation.id}
                />
              );
            })}
          </Canvas>
        </div>
      )}

      <main>
        <button
          type="button"
          className={styles.toggle}
          aria-pressed={readAsPage}
          onClick={() => {
            setReadAsPage((previous) => !previous);
          }}
        >
          {readAsPage ? "Show the arena" : "Read as a page"}
        </button>

        <StationPanel content={CONTENT[activeStation.id]} />

        <ArenaPlan activeId={activeStation.id} />

        <Link className={styles.credits} to="/credits">
          Credits
        </Link>
      </main>

      <div
        className={styles.track}
        style={{ height: `${STATIONS.length * 100}vh` }}
        aria-hidden="true"
      />
    </>
  );
}
