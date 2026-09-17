import { CONTENT } from "@/content";
import type { MyRecord } from "@/content/types";
import type { PropSpec, StationId } from "./arena";

/** Spreads `count` items evenly along x, centred on the marker. */
const spread = (index: number, count: number, gap: number) => (index - (count - 1) / 2) * gap;

export const STATION_PROPS = {
  gate: [
    { name: "banner", position: [-1.5, 1, -0.5], size: [0.2, 2, 0.6] },
    { name: "banner", position: [1.5, 1, -0.5], size: [0.2, 2, 0.6] },
    { name: "cctv", position: [1.5, 2.15, -0.5], size: [0.3, 0.3, 0.3] },
  ],
  podium: [
    { name: "podium", position: [0, 0.5, -1.2], size: [1.2, 1, 1] },
    { name: "laptop", position: [0, 1.025, -1.2], size: [0.6, 0.05, 0.4] },
  ],
  // one plinth per project
  plinths: CONTENT.plinths.items.map((_project, i, projects) => ({
    name: "plinth",
    position: [spread(i, projects.length, 1.5), 0.5, -1.5],
    size: [0.8, 1, 0.8],
  })),
  toolRack: [{ name: "rack", position: [0, 0.6, -1.5], size: [3, 1.2, 0.4] }],
  // one statue for each of the three most recent roles
  statues: CONTENT.statues.items.slice(0, 3).map((_role, i, roles) => ({
    name: "statue",
    position: [spread(i, roles.length, 1.3), 0.8, -1.5],
    size: [0.6, 1.6, 0.6],
  })),
  postern: [
    { name: "exit-sign", position: [0, 2, -1.2], size: [1, 0.3, 0.1] },
    { name: "message-board", position: [-1.2, 1, -1.2], size: [1.4, 1, 0.1] },
  ],
} satisfies MyRecord<StationId, readonly PropSpec[]>;
