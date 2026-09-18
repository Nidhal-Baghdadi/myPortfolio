import { useEffect, useMemo } from "react";
import { Instance, Instances, useGLTF } from "@react-three/drei";
import { Euler, Matrix4, Quaternion, Vector3 } from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { lineMaterial, silhouetteMaterial, surfaceMaterial } from "@/scene/ink";
import { inkModelOf } from "@/scene/inkModel";
import type { Tile } from "@/scene/structure";
import type { ColorToken } from "@/styles/tokens";

/**
 * Draws many copies of one Kenney piece as a single instanced mesh: one draw call for all of them,
 * instead of one per copy. The piece comes flattened by inkModelOf, with any transforms inside the file
 * (compressed models have some) already baked into its vertices, and its outline computed once.
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

  const ink = useMemo(() => inkModelOf(scene), [scene]);

  // Instances can't carry child lines, so bake every copy's outline into one geometry, placed the
  // way each instance is: still a single draw call for all the lines of this piece.
  const outlines = useMemo(() => {
    const noScale = new Vector3(1, 1, 1);
    const placed = tiles.map((tile) => {
      const rotation = new Quaternion().setFromEuler(new Euler(0, tile.turn ?? 0, 0));
      const matrix = new Matrix4().compose(new Vector3(...tile.position), rotation, noScale);
      return ink.edges.clone().applyMatrix4(matrix);
    });
    const merged = mergeGeometries(placed);
    placed.forEach((geometry) => geometry.dispose());
    if (!merged) throw new Error(`Could not merge the outlines of ${model}.glb`);
    return merged;
  }, [ink, tiles, model]);

  // The merged geometry is ours, not R3F's, so free its GPU memory when it's replaced or unmounted.
  useEffect(() => () => outlines.dispose(), [outlines]);

  const instances = tiles.map((tile, i) => (
    <Instance key={i} position={tile.position} rotation={[0, tile.turn ?? 0, 0]} />
  ));

  return (
    <>
      <Instances limit={tiles.length} geometry={ink.surface} material={surfaceMaterial()}>
        {instances}
      </Instances>
      {silhouette && (
        <Instances limit={tiles.length} geometry={ink.surface} material={silhouetteMaterial()}>
          {instances}
        </Instances>
      )}
      <lineSegments geometry={outlines} material={lineMaterial(line)} />
    </>
  );
}
