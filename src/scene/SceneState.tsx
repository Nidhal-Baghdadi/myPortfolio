import { type ReactNode, useCallback, useMemo, useRef, useState } from "react";
import type { Focus, StationId } from "./arena";
import { SceneContext } from "./sceneContext";

/**
 * State shared by the pages and the 3D scene, which outlives them: the scene stays mounted across routes,
 * so the camera can fly from the tour to a project and back instead of starting over. The per-frame values
 * are refs (read every frame, never re-rendering); the rest is state.
 */
export function SceneProvider({ children }: { children: ReactNode }) {
  const stationPosition = useRef(0);
  const focus = useRef<Focus | null>(null);
  const [activeId, setActiveId] = useState<StationId>("gate");
  // Read once: it decides the starting mode and whether the scenery moves.
  const [prefersReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [readAsPage, setReadAsPage] = useState(prefersReducedMotion);

  const setStationPosition = useCallback((position: number) => {
    stationPosition.current = position;
  }, []);
  const setFocus = useCallback((next: Focus | null) => {
    focus.current = next;
  }, []);

  const value = useMemo(
    () => ({
      stationPosition,
      focus,
      setStationPosition,
      setFocus,
      activeId,
      setActiveId,
      readAsPage,
      setReadAsPage,
      prefersReducedMotion,
    }),
    [setStationPosition, setFocus, activeId, readAsPage, prefersReducedMotion],
  );
  return <SceneContext value={value}>{children}</SceneContext>;
}
