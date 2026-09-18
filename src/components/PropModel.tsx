import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Euler, Matrix4, Vector3, type Vector3Tuple } from "three";
import { lineMaterial, silhouetteMaterial, surfaceMaterial } from "@/scene/ink";
import { inkModelOf } from "@/scene/inkModel";
import { modelUrl, PROP_MODELS, type PropSpec } from "@/scene/props";


/**
 * Draws a prop fitted into its box: scaled uniformly to the largest size that fits, centred on x and z,
 * and standing on the box's bottom face. The two kits use very different units, so fitting to the box is
 * what makes them match. The geometry is shared by every copy of the model (see inkModelOf), so a placement
 * is only three transforms; becoming the active station only swaps the paint.
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
  const ink = useMemo(() => inkModelOf(scene), [scene]);

  const fit = useMemo(() => {
    // Measure the model as it will stand, turned and tilted, then scale and recentre that box.
    const turned = ink.box.clone().applyMatrix4(new Matrix4().makeRotationFromEuler(new Euler(tilt, turn, 0)));
    const measured = turned.getSize(new Vector3());
    const scale = Math.min(
      size[0] / Math.max(measured.x, 1e-6),
      size[1] / Math.max(measured.y, 1e-6),
      size[2] / Math.max(measured.z, 1e-6),
    );
    const centre = turned.getCenter(new Vector3()).multiplyScalar(scale);
    const offset: Vector3Tuple = [-centre.x, -size[1] / 2 - turned.min.y * scale, -centre.z];
    return { scale, offset };
  }, [ink, size, turn, tilt]);

  return (
    <group position={position}>
      <group position={fit.offset} scale={fit.scale}>
        <group rotation={[tilt, turn, 0]}>
          {/* The hybrid look: drawn on paper everywhere, the active station comes alive in its own colours. */}
          <mesh geometry={ink.surface} material={accent ? ink.colours : surfaceMaterial("paper")} />
          <mesh geometry={ink.surface} material={silhouetteMaterial()} />
          <lineSegments geometry={ink.edges} material={lineMaterial()} />
        </group>
      </group>
    </group>
  );
}

// Start downloading every prop model as soon as this module loads.
for (const name of Object.keys(PROP_MODELS) as PropSpec["name"][])
  useGLTF.preload(modelUrl(name));
