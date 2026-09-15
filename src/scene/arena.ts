import type { Vector3Tuple } from "three";

export type WallSegment = {
    position: Vector3Tuple;
    size: Vector3Tuple;
};

/** A camera framing around a station. Angles in degrees; the FOV is shared (CAMERA_FOV). */
export type Shot = {
    distance: number;
    elevation: number;
    azimuth: number;
};

export type Station = {
    id: string;
    name: string;
    x: number;
    z: number;
    shot: Shot;
};

export const STATIONS: Station[] = [{
    id: "gate",
    name: "Gate",
    x: 0,
    z: 6.5,
    shot: { distance: 14, elevation: 22, azimuth: 15 }
}, {
    id: "podium",
    name: "Podium",
    x: 0,
    z: -0.1,
    shot: { distance: 13, elevation: 32, azimuth: 15 }
}, {
    id: "plinths",
    name: "Plinths",
    x: 4.5,
    z: 3.4,
    shot: { distance: 12, elevation: 30, azimuth: -112 }
}, {
    id: "toolRack",
    name: "Tool Rack",
    x: 4.5,
    z: -4.1,
    shot: { distance: 12, elevation: 30, azimuth: -33 }
}, {
    id: "statues",
    name: "Statues",
    x: -4.1,
    z: -4.1,
    shot: { distance: 12, elevation: 32, azimuth: 60 }
}, {
    id: "postern",
    name: "Postern",
    x: -5.8,
    z: 4.3,
    shot: { distance: 12, elevation: 28, azimuth: 142 }
}];

export const ARENA_WIDTH = 15;
export const ARENA_DEPTH = 16;
export const WALL_THICKNESS = 0.6;

export const WALL_HEIGHT = 1;

export const GATE_WIDTH = 3;
export const POSTERN_WIDTH = 2;
export const POSTERN_Z = 4.3;

export const LEFT_WALL_1_POSITION = ARENA_DEPTH / 2 -
    (ARENA_DEPTH / 2 - POSTERN_Z - POSTERN_WIDTH / 2) / 2;

export const LEFT_WALL_1_WIDTH = ARENA_DEPTH / 2 - (POSTERN_Z + POSTERN_WIDTH / 2);

export const LEFT_WALL_2_WIDTH = ARENA_DEPTH - POSTERN_WIDTH - LEFT_WALL_1_WIDTH;

export const LEFT_WALL_2_POSITION = -(POSTERN_WIDTH + LEFT_WALL_1_WIDTH) / 2;


export const ARENA_RADIUS = Math.hypot(ARENA_WIDTH / 2, ARENA_DEPTH / 2, WALL_HEIGHT )


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