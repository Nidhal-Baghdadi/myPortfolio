import {
  BackSide,
  DataTexture,
  LineBasicMaterial,
  MeshBasicMaterial,
  MeshToonMaterial,
  NearestFilter,
  RedFormat,
} from "three";
import { cssColor, type ColorToken } from "@/styles/tokens";

/** Edges sharper than this angle, in degrees, get a line; gentler ones (flat faces, low-poly curves) don't. */
export const CREASE_ANGLE = 30;

// Materials are created on first use rather than at import, because reading a colour token needs the
// stylesheet to be applied. One per colour, shared by every object: never mutate them.
const lines = new Map<ColorToken, LineBasicMaterial>();
const surfaces = new Map<ColorToken, MeshToonMaterial>();

/** The outline material for a colour. */
export function lineMaterial(color: ColorToken = "ink") {
  let material = lines.get(color);
  if (!material) {
    material = new LineBasicMaterial({ color: cssColor(color) });
    lines.set(color, material);
  }
  return material;
}

let tones: DataTexture | undefined;

/**
 * Three flat bands of light (shadow, mid, lit) instead of a smooth gradient, so surfaces shade like
 * printed tone rather than rendered plastic. NearestFilter keeps the bands hard-edged.
 */
function toneBands() {
  if (!tones) {
    tones = new DataTexture(new Uint8Array([150, 205, 255]), 3, 1, RedFormat);
    tones.minFilter = tones.magFilter = NearestFilter;
    tones.needsUpdate = true;
  }
  return tones;
}

/** The flat-shaded paint for a colour, replacing the models' own textures. */
export function surfaceMaterial(color: ColorToken = "paper") {
  let material = surfaces.get(color);
  if (!material) {
    material = new MeshToonMaterial({ color: cssColor(color), gradientMap: toneBands() });
    surfaces.set(color, material);
  }
  return material;
}

/** Silhouette thickness as a fraction of the distance to the camera: about 2px at the arena's field of view. */
const SILHOUETTE_WIDTH = 0.0012;

let silhouette: MeshBasicMaterial | undefined;

/**
 * Outlines what crease lines can't: the edge of a rounded side as seen from the camera, which moves as the
 * camera does. A second copy of the mesh is drawn inside out (BackSide) and pushed outwards along its
 * normals; the model hides the copy except the rim around its outline. The push grows with distance, so the
 * rim stays about the same width on screen.
 */
export function silhouetteMaterial() {
  if (!silhouette) {
    silhouette = new MeshBasicMaterial({ color: cssColor("ink"), side: BackSide });
    silhouette.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <project_vertex>",
        `#include <project_vertex>
        vec3 hullNormal = normal;
        #ifdef USE_INSTANCING
          hullNormal = mat3(instanceMatrix) * hullNormal;
        #endif
        mvPosition.xyz += normalize(normalMatrix * hullNormal) * ${SILHOUETTE_WIDTH} * -mvPosition.z;
        gl_Position = projectionMatrix * mvPosition;`,
      );
    };
  }
  return silhouette;
}
