import {
  Box3,
  type BufferAttribute,
  type BufferGeometry,
  EdgesGeometry,
  Float32BufferAttribute,
  type Material,
  Mesh,
  MeshStandardMaterial,
  type Object3D,
} from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { CREASE_ANGLE, toonOf } from "./ink";

/**
 * A model flattened for drawing: one geometry, with a group per original material. Drawn with a single
 * material (paper, acid) the groups are ignored and the whole model takes that paint; drawn with `colours`
 * (an array, one per group) each part gets its own original colour and texture, in toon shading.
 */
export type InkModel = {
  surface: BufferGeometry;
  colours: Material[];
  edges: EdgesGeometry;
  box: Box3;
};

const cache = new WeakMap<Object3D, InkModel>();

/**
 * Compressed models (meshopt) store positions and normals as small integers, rescaled by the model's own
 * transforms. Baking transforms into vertices needs real numbers, so every attribute is read back through
 * getComponent (which undoes the integer packing) into plain floats first.
 */
function toFloats(attribute: BufferAttribute): Float32BufferAttribute {
  const values = new Float32Array(attribute.count * attribute.itemSize);
  for (let i = 0; i < attribute.count; i++) {
    for (let c = 0; c < attribute.itemSize; c++) values[i * attribute.itemSize + c] = attribute.getComponent(i, c);
  }
  return new Float32BufferAttribute(values, attribute.itemSize);
}

/**
 * Flattens a loaded model into a single geometry, computed once per model and shared by every copy.
 * Merging turns "3 draw calls per mesh" (paint, silhouette, lines) into 3 per placement, and the crease
 * lines, the costly part, are computed once instead of for every copy. Never dispose the result: it's shared.
 */
export function inkModelOf(scene: Object3D): InkModel {
  const cached = cache.get(scene);
  if (cached) return cached;

  scene.updateMatrixWorld(true);
  const parts: BufferGeometry[] = [];
  const colours: Material[] = [];
  scene.traverse((node) => {
    if (!(node instanceof Mesh)) return;
    // Merging requires every part to have the same attributes and indexing: keep shape and texture
    // coordinates (zeros where a part has none), drop the rest.
    let part: BufferGeometry = node.geometry.clone();
    for (const name of Object.keys(part.attributes)) {
      if (!["position", "normal", "uv"].includes(name)) part.deleteAttribute(name);
    }
    if (part.index) part = part.toNonIndexed();
    for (const name of Object.keys(part.attributes)) {
      part.setAttribute(name, toFloats(part.getAttribute(name) as BufferAttribute));
    }
    if (!part.getAttribute("normal")) part.computeVertexNormals();
    const count = part.getAttribute("position").count;
    if (!part.getAttribute("uv")) part.setAttribute("uv", new Float32BufferAttribute(new Float32Array(count * 2), 2));
    part.applyMatrix4(node.matrixWorld); // bake each mesh's place in the model into its vertices
    parts.push(part);
    colours.push(toonOf(Array.isArray(node.material) ? node.material[0] ?? new MeshStandardMaterial() : node.material));
  });

  const surface = mergeGeometries(parts, true); // true: one group per part, in the same order as `colours`
  parts.forEach((part) => part.dispose());
  if (!surface) throw new Error("Could not merge the model's meshes");
  surface.computeBoundingBox();

  const model: InkModel = {
    surface,
    colours,
    edges: new EdgesGeometry(surface, CREASE_ANGLE),
    box: surface.boundingBox ?? new Box3(),
  };
  cache.set(scene, model);
  return model;
}
