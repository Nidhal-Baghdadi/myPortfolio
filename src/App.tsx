import { Canvas } from "@react-three/fiber";
import Arena from "./components/Arena";
import { ARENA_DEPTH, STATIONS } from "./scene/arena";
import { cssColor } from "./styles/tokens";
import styles from "./App.module.css";
import StationGroup from "./components/StationGroup";
import { CAMERA_FOV } from "./scene/camera";
import CameraRig from "./scene/CameraRig";
import StationPanel from "./components/StationPanel";
import { CONTENT } from "./content";

import { useEffect, useRef, useState } from "react";

export default function App() {
  const [readAsPage, setReadAsPage] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

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

  return (
    <>
      {!readAsPage && (
        <div className={styles.scene}>
          <Canvas
            camera={{
              fov: CAMERA_FOV,
            }}
          >
            <CameraRig stationPosition={stationPositionRef} />
            <ambientLight />
            <directionalLight position={[5, 10, 5]} />
            <color attach="background" args={[cssColor("paper")]} />
            <gridHelper args={[ARENA_DEPTH, ARENA_DEPTH]} />
            <axesHelper args={[3]} />
            <Arena />
            {STATIONS.map((station) => {
              return (
               <StationGroup key={station.id} station={station} isActive={station.id === activeStation.id} />
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
      </main>

      <div
        className={styles.track}
        style={{ height: `${STATIONS.length * 100}vh` }}
        aria-hidden="true"
      />
    </>
  );
}
