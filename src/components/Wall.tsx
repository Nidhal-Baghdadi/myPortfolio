import { PAPER ,type WallSegment } from "../scene/arena";

export default function Wall({ position, size }: WallSegment) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={PAPER} />
    </mesh>
  );
}
