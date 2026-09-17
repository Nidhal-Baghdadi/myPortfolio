import { useEffect, useMemo } from "react";
import { Instance, Instances, useGLTF } from "@react-three/drei";
import { EdgesGeometry, Euler, Matrix4, Mesh, Quaternion, Vector3 } from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { CREASE_ANGLE, lineMaterial, silhouetteMaterial, surfaceMaterial } from "@/scene/ink";
import type { Tile } from "@/scene/structure";
import type { ColorToken } from "@/styles/tokens";

/**
 * Draws many copies of one Kenney piece as a single instanced mesh: one draw call for all of them,
 * instead of one per copy. Works because each Kenney piece is a single mesh with no node transforms.
 */
export default function Tiles({
  model,
  tiles,
  line = "ink",
  silhouette = true,
}: {
  model: string;
  tiles: readonly Tile[];
  line?: ColorToken;
  /** Flat pieces like floors have no rounded sides, so they can skip the silhouette pass. */
  silhouette?: boolean;
}) {
  const { scene } = useGLTF(`/models/arena/${model}.glb`);

  const mesh = useMemo(() => {
    let found: Mesh | undefined;
    scene.traverse((object) => {
      if (!found && object instanceof Mesh) found = object;
    });
    if (!found) throw new Error(`${model}.glb has no mesh to instance`);
    return found;
  }, [scene, model]);

  // Instances can't carry child lines, so bake every copy's outline into one geometry, placed the
  // way each instance is: still a single draw call for all the lines of this piece.
  const outlines = useMemo(() => {
    const edges = new EdgesGeometry(mesh.geometry, CREASE_ANGLE);
    const noScale = new Vector3(1, 1, 1);
    const placed = tiles.map((tile) => {
      const rotation = new Quaternion().setFromEuler(new Euler(0, tile.turn ?? 0, 0));
      const matrix = new Matrix4().compose(new Vector3(...tile.position), rotation, noScale);
      return edges.clone().applyMatrix4(matrix);
    });
    const merged = mergeGeometries(placed);
    edges.dispose();
    placed.forEach((geometry) => geometry.dispose());
    if (!merged) throw new Error(`Could not merge the outlines of ${model}.glb`);
    return merged;
  }, [mesh, tiles, model]);

  // The merged geometry is ours, not R3F's, so free its GPU memory when it's replaced or unmounted.
  useEffect(() => () => outlines.dispose(), [outlines]);

  const instances = tiles.map((tile, i) => (
    <Instance key={i} position={tile.position} rotation={[0, tile.turn ?? 0, 0]} />
  ));

  return (
    <>
      <Instances limit={tiles.length} geometry={mesh.geometry} material={surfaceMaterial()}>
        {instances}
      </Instances>
      {silhouette && (
        <Instances limit={tiles.length} geometry={mesh.geometry} material={silhouetteMaterial()}>
          {instances}
        </Instances>
      )}
      <lineSegments geometry={outlines} material={lineMaterial(line)} />
    </>
  );
}
