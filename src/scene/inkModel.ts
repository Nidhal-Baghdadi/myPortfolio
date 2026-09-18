import { Box3, type BufferGeometry, EdgesGeometry, Mesh, type Object3D } from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { CREASE_ANGLE } from "./ink";

/** A model flattened for ink drawing: one geometry for paint and silhouette, one for crease lines. */
export type InkModel = {
  surface: BufferGeometry;
  edges: EdgesGeometry;
  box: Box3;
};

const cache = new WeakMap<Object3D, InkModel>();

/**
 * Flattens a loaded model into a single geometry, computed once per model and shared by every copy.
 * Painted in one flat colour, the model's separate meshes and materials no longer matter, so merging them
 * turns "3 draw calls per mesh" (paint, silhouette, lines) into 3 per placement, and the crease lines, the
 * costly part, are computed once instead of for every copy. Never dispose the result: it's shared.
 */
export function inkModelOf(scene: Object3D): InkModel {
  const cached = cache.get(scene);
  if (cached) return cached;

  scene.updateMatrixWorld(true);
  const parts: BufferGeometry[] = [];
  scene.traverse((node) => {
    if (!(node instanceof Mesh)) return;
    // Only shape is needed; merging requires every part to have the same attributes and indexing.
    let part: BufferGeometry = node.geometry.clone();
    for (const name of Object.keys(part.attributes)) {
      if (name !== "position" && name !== "normal") part.deleteAttribute(name);
    }
    if (part.index) part = part.toNonIndexed();
    if (!part.getAttribute("normal")) part.computeVertexNormals();
    part.applyMatrix4(node.matrixWorld); // bake each mesh's place in the model into its vertices
    parts.push(part);
  });

  const surface = mergeGeometries(parts);
  parts.forEach((part) => part.dispose());
  if (!surface) throw new Error("Could not merge the model's meshes");
  surface.computeBoundingBox();

  const model: InkModel = {
    surface,
    edges: new EdgesGeometry(surface, CREASE_ANGLE),
    box: surface.boundingBox ?? new Box3(),
  };
  cache.set(scene, model);
  return model;
}
