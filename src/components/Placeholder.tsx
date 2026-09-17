import { Edges } from "@react-three/drei";
import type { Vector3Tuple } from "three";
import { CREASE_ANGLE, surfaceMaterial } from "@/scene/ink";
import { cssColor } from "@/styles/tokens";

type PlaceholderProps = {
  position: Vector3Tuple;
  size: Vector3Tuple;
};

export default function Placeholder({ position, size }: PlaceholderProps) {
  return (
    <mesh position={position} material={surfaceMaterial()}>
      <boxGeometry args={size} />
      <Edges threshold={CREASE_ANGLE} color={cssColor("rule")} />
    </mesh>
  );
}
