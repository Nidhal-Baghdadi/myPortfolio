import { createContext, type RefObject, useContext } from "react";
import type { Focus, StationId } from "./arena";

export type SceneState = {
  /** Where the tour is, in stations (1.5 = halfway from the 2nd to the 3rd). Read every frame by the camera. */
  stationPosition: RefObject<number>;
  /** When set, the camera leaves the tour and frames this instead (a project page). Read every frame. */
  focus: RefObject<Focus | null>;
  /** Writers go through setters, so only the provider ever touches the refs. */
  setStationPosition: (position: number) => void;
  setFocus: (focus: Focus | null) => void;
  activeId: StationId;
  setActiveId: (id: StationId) => void;
  /** Page mode: the site without the 3D scene. */
  readAsPage: boolean;
  setReadAsPage: (value: boolean) => void;
  prefersReducedMotion: boolean;
};

export const SceneContext = createContext<SceneState | null>(null);

export function useScene(): SceneState {
  const scene = useContext(SceneContext);
  if (!scene) throw new Error("useScene must be used inside <SceneProvider>");
  return scene;
}
