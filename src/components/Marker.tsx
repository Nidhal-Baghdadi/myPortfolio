import type { Station } from "../scene/arena";

type MarkerProps = Pick<Station, "x" | "z"> & { color: string };

export default function Marker({ x, z, color }: MarkerProps) {
  return (
    <mesh position={[x, 0.25, z]}>
      <boxGeometry args={[1, 0.5, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
