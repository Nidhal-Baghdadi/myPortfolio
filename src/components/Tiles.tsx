import { useMemo } from "react";
import { Instance, Instances, useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import type { Tile } from "@/scene/structure";

/**
 * Draws many copies of one Kenney piece as a single instanced mesh: one draw call for all of them,
 * instead of one per copy. Works because each Kenney piece is a single mesh with no node transforms.
 */
export default function Tiles({ model, tiles }: { model: string; tiles: readonly Tile[] }) {
  const { scene } = useGLTF(`/models/arena/${model}.glb`);

  const mesh = useMemo(() => {
    let found: Mesh | undefined;
    scene.traverse((object) => {
      if (!found && object instanceof Mesh) found = object;
    });
    if (!found) throw new Error(`${model}.glb has no mesh to instance`);
    return found;
  }, [scene, model]);

  return (
    <Instances limit={tiles.length} geometry={mesh.geometry} material={mesh.material}>
      {tiles.map((tile, i) => (
        <Instance key={i} position={tile.position} rotation={[0, tile.turn ?? 0, 0]} />
      ))}
    </Instances>
  );
}
