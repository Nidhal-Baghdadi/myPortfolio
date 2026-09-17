import { LineBasicMaterial } from "three";
import { cssColor, type ColorToken } from "@/styles/tokens";

/** Edges sharper than this angle, in degrees, get a line; gentler ones (flat faces, low-poly curves) don't. */
export const CREASE_ANGLE = 30;

const materials = new Map<ColorToken, LineBasicMaterial>();

/**
 * One line material per colour, shared by every outline. Created on first use rather than at import,
 * because reading the colour token needs the stylesheet to be applied.
 */
export function lineMaterial(color: ColorToken = "ink") {
  let material = materials.get(color);
  if (!material) {
    material = new LineBasicMaterial({ color: cssColor(color) });
    materials.set(color, material);
  }
  return material;
}
