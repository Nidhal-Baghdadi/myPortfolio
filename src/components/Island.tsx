import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { Box3, Vector3 } from "three";
import { inkify, outsideMaterial } from "@/scene/ink";
import { ISLAND_WIDTH } from "@/scene/space";

const ISLAND_URL = "/models/arena/island.glb";

/**
 * The ground the arena floats on: a copy of the island model, scaled to ISLAND_WIDTH and raised so its
 * highest point sits just under the floor tiles (one-sided planes at y = 0). Unlike the arena, it's in
 * colour, from the outside palette: things from outside the page are in colour, still outlined in ink.
 */
export default function Island() {
  const { scene } = useGLTF(ISLAND_URL);

  const { model, edges } = useMemo(() => {
    const model = scene.clone(true);
    const measured = new Box3().setFromObject(model).getSize(new Vector3());
    model.scale.setScalar(ISLAND_WIDTH / Math.max(measured.x, measured.z));
    model.updateMatrixWorld(true);

    const box = new Box3().setFromObject(model);
    const centre = box.getCenter(new Vector3());
    model.position.set(-centre.x, -0.02 - box.max.y, -centre.z);

    const edges = inkify(model, (mesh) => outsideMaterial(mesh.material));
    return { model, edges };
  }, [scene]);

  useEffect(() => () => edges.forEach((geometry) => geometry.dispose()), [edges]);

  return <primitive object={model} />;
}

useGLTF.preload(ISLAND_URL);
