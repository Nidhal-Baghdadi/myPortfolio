import type { WallSegment } from "../scene/arena";
import { cssColor } from "../styles/tokens";

export default function Wall({ position, size }: WallSegment) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={cssColor("paper")} />
    </mesh>
  );
}
