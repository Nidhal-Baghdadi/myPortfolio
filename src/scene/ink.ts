import {
  BackSide,
  Color,
  DataTexture,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  type Material,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
  NearestFilter,
  type Object3D,
  RedFormat,
} from "three";
import { cssColor, type ColorToken, type OutsideColor } from "@/styles/tokens";

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

/**
 * Which outside colour a model colour belongs to, by hue family rather than raw RGB distance (which would put
 * lime grass closer to clay than to moss): greys and blues are slate, greens are moss, warm colours are clay.
 */
function outsideColorOf(color: Color): OutsideColor {
  const { h, s } = color.getHSL({ h: 0, s: 0, l: 0 });
  const hue = h * 360;
  if (s < 0.15) return "slate";
  if (hue >= 50 && hue < 190) return "moss";
  if (hue >= 190 && hue < 330) return "slate";
  return "clay";
}

/**
 * Paint for things from outside the page: the model's own colour, snapped to its family in the outside
 * palette, in the same flat tone bands as everything else. Snapping (instead of keeping the model's colours)
 * keeps any new asset inside the palette: lime grass becomes moss, not a second acid. Textures are dropped;
 * a textured material is judged by its base colour.
 */
export function outsideMaterial(original: Material | Material[]): Material {
  const source =
    !Array.isArray(original) && original instanceof MeshStandardMaterial ? original.color : new Color(1, 1, 1);
  return surfaceMaterial(outsideColorOf(source));
}

/**
 * Turns a loaded model copy into ink: every mesh gets its paint, a silhouette hull and crease lines.
 * The copy shares the loaded materials, so each mesh is assigned a new material instead of editing the old
 * one; `paint` sees the mesh (and so its original material) to choose it. Hull and lines are children of the
 * mesh, so they inherit its transform and scale. Returns the line geometries: the caller owns them and must
 * dispose them.
 */
export function inkify(model: Object3D, paint: (mesh: Mesh) => Material): EdgesGeometry[] {
  const meshes: Mesh[] = [];
  model.traverse((node) => {
    if (node instanceof Mesh) meshes.push(node);
  });

  // Collected first: adding hull meshes while traversing would make the traversal visit them too.
  return meshes.map((mesh) => {
    mesh.material = paint(mesh);
    mesh.add(new Mesh(mesh.geometry, silhouetteMaterial()));
    const edges = new EdgesGeometry(mesh.geometry, CREASE_ANGLE);
    mesh.add(new LineSegments(edges, lineMaterial()));
    return edges;
  });
}
