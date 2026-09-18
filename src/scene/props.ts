import type { Vector3Tuple } from "three";
import { CONTENT } from "@/content";
import type { MyRecord } from "@/content/types";
import type { StationId } from "./arena";

/** Which file in /models/arena each prop loads. */
export const PROP_MODELS = {
  banner: "banner",
  cctv: "cctv",
  podium: "block",
  notebook: "notebook",
  plinth: "column",
  monitor: "monitor",
  rack: "weapon-rack",
  statue: "statue",
  "exit-sign": "exit-sign",
  "message-board": "message-board",
  webcam: "webcam",
  "sticky-note": "sticky-note",
  keyboard: "keyboard",
  binder: "binder",
  briefcase: "briefcase",
  "office-chair": "office-chair",
  tree: "tree",
  bricks: "bricks",
  "broken-column": "column-damaged",
} as const;

export type PropName = keyof typeof PROP_MODELS;

/** One piece of furniture at a station, in the station's local space. */
export type PropSpec = {
  name: PropName;
  /** Centre of the box the model is fitted into, relative to the station's marker. */
  position: Vector3Tuple;
  /** The box the model is scaled to fit, standing on its bottom face. */
  size: Vector3Tuple;
  /** Turn around the vertical axis, in radians, for models authored facing another way. */
  turn?: number;
  /** Tip forward or back around the x axis, in radians, e.g. to stand a flat keyboard upright. */
  tilt?: number;
};

/** Spreads `count` items evenly along x, centred on the marker. */
const spread = (index: number, count: number, gap: number) => (index - (count - 1) / 2) * gap;

export const STATION_PROPS = {
  gate: [
    { name: "banner", position: [-1.5, 1, -0.5], size: [1.2, 2, 0.5] },
    { name: "banner", position: [1.5, 1, -0.5], size: [1.2, 2, 0.5] },
    { name: "cctv", position: [1.5, 2.2, -0.5], size: [0.4, 0.4, 0.4] },
  ],
  podium: [
    { name: "podium", position: [0, 0.5, -1.2], size: [1.2, 1, 1] },
    { name: "notebook", position: [0, 1.05, -1.2], size: [0.5, 0.1, 0.4] },
    { name: "webcam", position: [0.4, 1.08, -1.35], size: [0.15, 0.16, 0.15] },
    { name: "sticky-note", position: [-0.35, 1.01, -1.05], size: [0.14, 0.02, 0.14] },
  ],
  // a plinth per project, with a monitor on top
  plinths: CONTENT.plinths.items.flatMap((_project, i, projects): PropSpec[] => {
    const x = spread(i, projects.length, 1.5);
    return [
      { name: "plinth", position: [x, 0.5, -1.5], size: [0.8, 1, 0.8] },
      { name: "monitor", position: [x, 1.25, -1.5], size: [0.7, 0.5, 0.3], turn: Math.PI },
    ];
  }),
  toolRack: [
    { name: "rack", position: [0, 0.6, -1.5], size: [3, 1.2, 1.2] },
    // keyboards hung on the rack like swords
    { name: "keyboard", position: [-0.45, 0.75, -1.25], size: [0.8, 0.3, 0.1], tilt: Math.PI / 2 },
    { name: "keyboard", position: [0.45, 0.75, -1.25], size: [0.8, 0.3, 0.1], tilt: Math.PI / 2 },
    { name: "binder", position: [1.8, 0.21, -1.3], size: [0.28, 0.42, 0.1] },
    { name: "binder", position: [2.1, 0.21, -1.3], size: [0.28, 0.42, 0.1] },
    { name: "binder", position: [2.4, 0.21, -1.3], size: [0.28, 0.42, 0.1] },
  ],
  // a statue for each of the three most recent roles
  statues: CONTENT.statues.items.slice(0, 3).flatMap((_role, i, roles): PropSpec[] => {
    const x = spread(i, roles.length, 1.3);
    return [
      { name: "statue", position: [x, 0.8, -1.5], size: [0.6, 1.6, 0.6] },
      { name: "briefcase", position: [x + 0.35, 0.15, -1.05], size: [0.3, 0.3, 0.15] },
    ];
  }),
  postern: [
    { name: "exit-sign", position: [0, 2, -1.2], size: [1, 0.4, 0.2], turn: Math.PI / 2 },
    { name: "message-board", position: [-1.3, 1, -1.2], size: [1.4, 1.1, 0.2], turn: -Math.PI / 2 },
  ],
} satisfies MyRecord<StationId, readonly PropSpec[]>;
