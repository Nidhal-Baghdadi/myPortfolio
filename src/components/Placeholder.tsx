import type { Vector3Tuple } from "three";
import { cssColor } from "@/styles/tokens";

type PlaceholderProps = {
  position: Vector3Tuple;
  size: Vector3Tuple;
};

export default function Placeholder({ position, size }: PlaceholderProps) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={cssColor("paper")} />
    </mesh>
  );
}
