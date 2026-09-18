import type { Vector3Tuple } from "three";

/** The glass globe around the island. Its centre sits a little below the floor so it also encloses the rock. */
export const GLOBE_CENTER: Vector3Tuple = [0, -2, 0];
export const GLOBE_RADIUS = 15;

/** Comets start this far from the globe's centre and are removed once they fly back past it. */
export const SPACE_RADIUS = 50;

/** The island model is scaled to this width: wide enough to show a ledge of ground outside the walls. */
export const ISLAND_WIDTH = 26;
