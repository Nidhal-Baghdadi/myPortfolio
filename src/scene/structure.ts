import type { Vector3Tuple } from "three";
import { ARENA_DEPTH, ARENA_WIDTH, GATE_WIDTH, POSTERN_WIDTH, POSTERN_Z, WALLS } from "./arena";
import type { PropSpec } from "./props";

/** One copy of a 1-unit Kenney piece, placed in world space. Kenney pieces sit on their base. */
export type Tile = { position: Vector3Tuple; turn?: number };

// Tile centres: whole numbers across an odd width, halves along an even depth.
const centres = (length: number) => Array.from({ length }, (_, i) => i - (length - 1) / 2);

const floor: Tile[] = [];
const floorDetail: Tile[] = [];
for (const x of centres(ARENA_WIDTH)) {
  for (const z of centres(ARENA_DEPTH)) {
    // a fixed, scattered pattern so the detailed tiles don't line up
    const detailed = (Math.round(x * 7 + z * 13 + 100) & 7) === 0;
    (detailed ? floorDetail : floor).push({ position: [x, 0, z] });
  }
}
export const FLOOR_TILES = floor;
export const FLOOR_DETAIL_TILES = floorDetail;

/** Each wall segment becomes one wall piece per unit of its length. */
export const WALL_TILES: Tile[] = WALLS.flatMap((wall) => {
  const [cx, , cz] = wall.position;
  const alongX = wall.size[0] > wall.size[2];
  const length = alongX ? wall.size[0] : wall.size[2];
  const count = Math.round(length);
  if (Math.abs(count - length) > 1e-6) {
    throw new Error(`Wall at (${cx}, ${cz}) is ${length} long; walls must be whole tiles`);
  }
  return centres(count).map((offset) =>
    alongX
      ? { position: [cx + offset, 0, cz] as Vector3Tuple }
      : { position: [cx, 0, cz + offset] as Vector3Tuple, turn: Math.PI / 2 },
  );
});

const halfW = ARENA_WIDTH / 2;
const halfD = ARENA_DEPTH / 2;

/** Columns at the four corners and on both sides of the gate and postern openings. */
export const PILLAR_TILES: Tile[] = [
  { position: [-halfW, 0, -halfD] },
  { position: [halfW, 0, -halfD] },
  { position: [-halfW, 0, halfD] },
  { position: [halfW, 0, halfD] },
  { position: [-GATE_WIDTH / 2, 0, halfD] },
  { position: [GATE_WIDTH / 2, 0, halfD] },
  { position: [-halfW, 0, POSTERN_Z - POSTERN_WIDTH / 2] },
  { position: [-halfW, 0, POSTERN_Z + POSTERN_WIDTH / 2] },
];

/** A row of stands along the back wall, climbing toward the wall. */
const STAND_Z = -halfD + 1;
export const STAND_TILES: Tile[] = centres(13).map((x) => ({ position: [x, 0, STAND_Z], turn: Math.PI }));

/** Loose furniture and scenery, in world space, fitted like station props. */
export const SCENERY: PropSpec[] = [
  // empty office chairs on the stands, every other step
  ...centres(13)
    .filter((_, i) => i % 2 === 0)
    .map((x): PropSpec => ({ name: "office-chair", position: [x, 0.95, STAND_Z - 0.1], size: [0.55, 0.9, 0.55] })),
  { name: "tree", position: [halfW - 1, 1, 1.5], size: [0.7, 2, 0.7] },
  { name: "tree", position: [-halfW + 1, 1, -2], size: [0.7, 2, 0.7] },
  { name: "bricks", position: [halfW - 1.2, 0.2, halfD - 1.2], size: [0.8, 0.4, 0.8] },
  { name: "bricks", position: [-3, 0.2, halfD - 1], size: [0.8, 0.4, 0.8], turn: 1.2 },
  { name: "broken-column", position: [-halfW + 1, 0.36, halfD - 1.5], size: [0.6, 0.72, 0.6] },

  // The playground: office life spilling into the arena, in the gaps between the stations' rings.
  // A table tennis game left mid-match, centre left.
  { name: "table-tennis", position: [-3, 0.4, 1.2], size: [2.8, 0.8, 1.6] },
  { name: "paddle", position: [-3.8, 0.82, 1.5], size: [0.3, 0.04, 0.3], tilt: Math.PI / 2, turn: 0.6 },
  { name: "paddle", position: [-2.1, 0.82, 0.9], size: [0.3, 0.04, 0.3], tilt: Math.PI / 2, turn: -2.2 },
  { name: "rubiks-cube", position: [-2.6, 0.86, 1.7], size: [0.12, 0.12, 0.12], turn: 0.5 },
  { name: "coffee-cup", position: [-3.4, 0.86, 0.8], size: [0.12, 0.13, 0.12] },
  // A break corner against the right wall, between the plinths and the tool rack.
  { name: "vending-machine", position: [halfW - 0.95, 0.95, -0.3], size: [1.2, 1.9, 1.2], turn: -Math.PI / 2 },
  { name: "water-cooler", position: [halfW - 0.7, 0.65, 0.75], size: [0.6, 1.3, 0.6], turn: -Math.PI / 2 },
  { name: "potted-plant", position: [halfW - 0.8, 0.6, -1.4], size: [0.6, 1.2, 0.6] },
  // Storage at the back, between the statues and the tool rack.
  { name: "cardboard-boxes", position: [-1.8, 0.4, -4.6], size: [1.2, 0.8, 1.2], turn: 0.3 },
  { name: "cardboard-box", position: [-0.9, 0.25, -5.2], size: [0.5, 0.5, 0.5], turn: 0.7 },
  { name: "ladder", position: [-2.7, 1.1, -5.3], size: [0.6, 2.2, 0.6], turn: 0.4 },
  { name: "whiteboard", position: [1.8, 0.8, -5], size: [1.8, 1.6, 0.6], turn: -0.35 },
  // Small details.
  { name: "houseplant", position: [2.2, 0.45, 2.6], size: [0.5, 0.9, 0.5] },
  { name: "trashcan", position: [3.2, 0.3, halfD - 1.1], size: [0.45, 0.6, 0.45] },
  { name: "soda-can", position: [3.7, 0.04, halfD - 1.6], size: [0.12, 0.08, 0.12], turn: 1.1 },
  { name: "fire-extinguisher", position: [-halfW + 0.6, 0.35, 1.9], size: [0.35, 0.7, 0.35], turn: Math.PI / 2 },
  { name: "dartboard", position: [-halfW + 0.35, 0.55, 0.3], size: [0.1, 0.6, 0.6] },
];
