import { useFrame } from "@react-three/fiber";
import type { Station } from "../scene/arena";
import { useRef } from "react";
import type { Mesh } from "three";

type MarkerProps = Pick<Station, "x" | "z"> & {
  color: string;
  animate?: boolean;
};

export default function Marker({ x, z, color, animate }: MarkerProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.position.y = animate
      ? 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      : 0.25;
  });

  return (
    <mesh ref={meshRef} position={[x, 0.25, z]}>
      <boxGeometry args={[1, 0.5, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
