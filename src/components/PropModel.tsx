import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import {
  Box3,
  EdgesGeometry,
  LineSegments,
  Mesh,
  Vector3,
} from "three";
import { CREASE_ANGLE, lineMaterial, silhouetteMaterial, surfaceMaterial } from "@/scene/ink";
import { PROP_MODELS, type PropSpec } from "@/scene/props";

const modelUrl = (name: PropSpec["name"]) =>
  `/models/arena/${PROP_MODELS[name]}.glb`;

/**
 * Loads a prop's model and fits it into its box: scaled uniformly to the largest size that fits,
 * centred on x and z, and standing on the box's bottom face. The two kits use very different
 * units, so fitting to the box is what makes them match.
 */
export default function PropModel({
  name,
  position,
  size,
  turn = 0,
  tilt = 0,
  accent = false,
}: PropSpec & { accent?: boolean }) {
  // Suspends until the file has loaded; the nearest <Suspense> shows its fallback meanwhile.
  const { scene } = useGLTF(modelUrl(name));

  const { model: fitted, edges } = useMemo(() => {
    // One loaded scene can only have one parent, so every placement needs its own copy.
    const model = scene.clone(true);
    model.rotation.set(tilt, turn, 0);
    model.updateMatrixWorld(true);

    const measured = new Box3().setFromObject(model).getSize(new Vector3());
    const scale = Math.min(
      size[0] / Math.max(measured.x, 1e-6),
      size[1] / Math.max(measured.y, 1e-6),
      size[2] / Math.max(measured.z, 1e-6),
    );
    model.scale.setScalar(scale);
    model.updateMatrixWorld(true);

    const box = new Box3().setFromObject(model);
    const centre = box.getCenter(new Vector3());
    model.position.set(-centre.x, -size[1] / 2 - box.min.y, -centre.z);

    // Paint every mesh in ink colours, outline its creases and give it a silhouette hull. The copy shares the loaded materials, so
    // assign a new one instead of editing it. As a child of the mesh, the lines inherit its transform and scale.
    const paint = surfaceMaterial(accent ? "acid" : "paper");
    const edges: EdgesGeometry[] = [];
    const meshes: Mesh[] = [];
    model.traverse((node) => {
      if (node instanceof Mesh) meshes.push(node);
    });
    // Collected first: adding hull meshes while traversing would make the traversal visit them too.
    for (const node of meshes) {
      node.material = paint;
      node.add(new Mesh(node.geometry, silhouetteMaterial()));
      const geometry = new EdgesGeometry(node.geometry, CREASE_ANGLE);
      edges.push(geometry);
      node.add(new LineSegments(geometry, lineMaterial()));
    }

    return { model, edges };
    // Changing the accent rebuilds the copy: cheap for these small models, and it keeps render free of mutation.
  }, [scene, size, turn, tilt, accent]);

  // The outline geometries are ours, not R3F's, so free their GPU memory when this copy goes away.
  useEffect(() => () => edges.forEach((geometry) => geometry.dispose()), [edges]);

  return (
    <group position={position}>
      <primitive object={fitted} />
    </group>
  );
}

// Start downloading every prop model as soon as this module loads.
for (const name of Object.keys(PROP_MODELS) as PropSpec["name"][])
  useGLTF.preload(modelUrl(name));
