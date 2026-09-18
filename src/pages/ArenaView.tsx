import { useEffect } from "react";
import { Link } from "react-router";
import ArenaPlan from "../components/ArenaPlan";
import StationPanel from "../components/StationPanel";
import { CONTENT } from "../content";
import { STATIONS } from "../scene/arena";
import { useScene } from "../scene/sceneContext";
import styles from "./ArenaPage.module.css";

/**
 * The 3D tour's interface: the scene itself lives in the site layout. Scrolling the (invisible) track sets
 * the tour position the camera follows, and the station nearest to it is the active one.
 */
export default function ArenaView({ onReadAsPage }: { onReadAsPage: () => void }) {
  const { setStationPosition, activeId, setActiveId } = useScene();
  const activeStation = STATIONS.find((station) => station.id === activeId) ?? STATIONS[0];

  useEffect(() => {
    const onScroll = () => {
      const position = window.innerHeight > 0 ? window.scrollY / window.innerHeight : 0;
      setStationPosition(position);
      const index = Math.min(Math.round(position), STATIONS.length - 1);
      setActiveId(STATIONS[index]?.id ?? STATIONS[0].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set the starting value
    return () => window.removeEventListener("scroll", onScroll);
  }, [setStationPosition, setActiveId]);

  useEffect(() => {
    const goToHash = (smooth: boolean) => {
      const index = STATIONS.findIndex((s) => `#${s.id}` === window.location.hash);
      if (index === -1) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: index * window.innerHeight, behavior: smooth && !reduceMotion ? "smooth" : "auto" });
    };
    goToHash(false); // on arrival, including when switching from page mode
    const onHashChange = () => goToHash(true);
    window.addEventListener("hashchange", onHashChange); // whenever the hash changes, e.g. "Contact me"
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Keep the router's own history state: replacing it with null would confuse its back/forward handling.
  useEffect(() => {
    history.replaceState(history.state, "", `#${activeStation.id}`);
  }, [activeStation.id]);

  return (
    <>
      <main>
        <button type="button" className={styles.toggle} onClick={onReadAsPage}>
          Read as a page
        </button>

        {/* Keyed by station: a fresh panel per station, so its entrance plays on every arrival. */}
        <StationPanel key={activeStation.id} station={activeStation} content={CONTENT[activeStation.id]} />

        <ArenaPlan activeId={activeStation.id} />

        <Link className={styles.credits} to="/credits">
          Credits
        </Link>
      </main>

      <div className={styles.track} style={{ height: `${STATIONS.length * 100}vh` }} aria-hidden="true" />
    </>
  );
}
