import type { Vector3Tuple } from "three";

export type WallSegment = {
    position: Vector3Tuple;
    size: Vector3Tuple;
};

/**
 * A camera framing around a station: the camera orbits a point `lookHeight` above the station's floor.
 * Angles in degrees. The FOV is per shot, so the camera can go from a narrow, distant establishing shot
 * to a wide, eye-level one as you scroll.
 */
export type Shot = {
    distance: number;
    elevation: number;
    azimuth: number;
    fov: number;
    lookHeight: number;
    /** 1 frames the station right of centre, clear of the panel (wide screens only); 0 keeps it centred. */
    clearPanel: number;
};

export type Station = {
    id: string;
    name: string;
    x: number;
    z: number;
    shot: Shot;
};

export const STATIONS = [{
    id: "gate",
    name: "Gate",
    x: 0,
    z: 6.5,
    shot: { distance: 125, elevation: 18, azimuth: 15, fov: 28, lookHeight: -2, clearPanel: 0 }
}, {
    id: "podium",
    name: "Podium",
    x: 0,
    z: -0.1,
    shot: { distance: 5, elevation: 9, azimuth: 15, fov: 55, lookHeight: 0.9, clearPanel: 1 }
}, {
    id: "plinths",
    name: "Plinths",
    x: 4.5,
    z: 3.4,
    shot: { distance: 4.5, elevation: 9, azimuth: -112, fov: 55, lookHeight: 0.9, clearPanel: 1 }
}, {
    id: "toolRack",
    name: "Tool Rack",
    x: 4.5,
    z: -4.1,
    shot: { distance: 4.5, elevation: 9, azimuth: -33, fov: 55, lookHeight: 0.8, clearPanel: 1 }
}, {
    id: "statues",
    name: "Statues",
    x: -4.1,
    z: -4.1,
    shot: { distance: 4.5, elevation: 9, azimuth: 60, fov: 55, lookHeight: 0.9, clearPanel: 1 }
}, {
    id: "postern",
    name: "Postern",
    x: -5.8,
    z: 4,
    shot: { distance: 4.5, elevation: 9, azimuth: 142, fov: 55, lookHeight: 0.9, clearPanel: 1 }
}] as const satisfies readonly Station[];

export type StationId = (typeof STATIONS)[number]["id"]

export const ARENA_WIDTH = 15;
export const ARENA_DEPTH = 16;
export const WALL_THICKNESS = 0.6;

export const WALL_HEIGHT = 1;

export const GATE_WIDTH = 3;
export const POSTERN_WIDTH = 2;
// A whole number, so the wall pieces on both sides of the opening stay on the 1-unit tile grid.
export const POSTERN_Z = 4;

export const LEFT_WALL_1_POSITION = ARENA_DEPTH / 2 -
    (ARENA_DEPTH / 2 - POSTERN_Z - POSTERN_WIDTH / 2) / 2;

export const LEFT_WALL_1_WIDTH = ARENA_DEPTH / 2 - (POSTERN_Z + POSTERN_WIDTH / 2);

export const LEFT_WALL_2_WIDTH = ARENA_DEPTH - POSTERN_WIDTH - LEFT_WALL_1_WIDTH;

export const LEFT_WALL_2_POSITION = -(POSTERN_WIDTH + LEFT_WALL_1_WIDTH) / 2;

export const WALLS: WallSegment[] = [
    {
        position: [0, WALL_HEIGHT / 2, -(ARENA_DEPTH / 2)],
        size: [ARENA_WIDTH, WALL_HEIGHT, WALL_THICKNESS],
    },
    {
        position: [
            (ARENA_WIDTH + GATE_WIDTH) / 4,
            WALL_HEIGHT / 2,
            ARENA_DEPTH / 2,
        ],
        size: [(ARENA_WIDTH - GATE_WIDTH) / 2, WALL_HEIGHT, WALL_THICKNESS],
    },
    {
        position: [
            -((ARENA_WIDTH + GATE_WIDTH) / 4),
            WALL_HEIGHT / 2,
            ARENA_DEPTH / 2,
        ],
        size: [(ARENA_WIDTH - GATE_WIDTH) / 2, WALL_HEIGHT, WALL_THICKNESS],
    },
    {
        position: [-ARENA_WIDTH / 2, WALL_HEIGHT / 2, LEFT_WALL_1_POSITION],
        size: [WALL_THICKNESS, WALL_HEIGHT, LEFT_WALL_1_WIDTH],
    },
    {
        position: [-ARENA_WIDTH / 2, WALL_HEIGHT / 2, LEFT_WALL_2_POSITION],
        size: [WALL_THICKNESS, WALL_HEIGHT, LEFT_WALL_2_WIDTH],
    },
    {
        position: [ARENA_WIDTH / 2, WALL_HEIGHT / 2, 0],
        size: [WALL_THICKNESS, WALL_HEIGHT, ARENA_DEPTH],
    },
];


export type ArenaStation = (typeof STATIONS)[number]
