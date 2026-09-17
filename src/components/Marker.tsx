import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

type MarkerProps = {
  color: string;
  animate?: boolean;
};

export default function Marker({ color, animate }: MarkerProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.position.y = animate
      ? 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      : 0.25;
  });

  return (
    <mesh ref={meshRef} position={[0, 0.25, 0]}>
      <boxGeometry args={[1, 0.5, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
