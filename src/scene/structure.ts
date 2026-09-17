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
];
