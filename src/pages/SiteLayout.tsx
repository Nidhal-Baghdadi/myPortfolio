import { lazy, Suspense } from "react";
import { Outlet, useLocation } from "react-router";
import { useScene } from "../scene/sceneContext";
import { SceneProvider } from "../scene/SceneState";
import styles from "./ArenaPage.module.css";

// three.js and the whole scene: its own chunk, downloaded only when a page shows it. Visitors in page mode
// (e.g. with reduced motion) never download it.
const SceneCanvas = lazy(() => import("../scene/SceneCanvas"));

function Scene() {
  const { pathname } = useLocation();
  const { activeId, readAsPage, prefersReducedMotion } = useScene();
  const onProject = pathname.startsWith("/projects/");
  const shown = !readAsPage && (pathname === "/" || onProject);
  if (!shown) return null;
  return (
    <div className={styles.scene} data-still={onProject || undefined}>
      <Suspense fallback={<p className={styles.loading}>Entering the arena…</p>}>
        <SceneCanvas activeId={activeId} focusKey={pathname} animate={!prefersReducedMotion} still={onProject} />
      </Suspense>
    </div>
  );
}

/**
 * Every page renders inside this layout, under one 3D scene that isn't remounted between them: going from the
 * arena to a case study flies the camera to that project's plinth instead of reloading the world.
 */
export default function SiteLayout() {
  return (
    <SceneProvider>
      <Scene />
      <Outlet />
    </SceneProvider>
  );
}
