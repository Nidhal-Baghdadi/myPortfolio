import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import { CREASE_ANGLE, surfaceMaterial } from "@/scene/ink";
import { cssColor, type ColorToken } from "@/styles/tokens";

type MarkerProps = {
  color: ColorToken;
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
    <mesh ref={meshRef} position={[0, 0.25, 0]} material={surfaceMaterial(color)}>
      <boxGeometry args={[1, 0.5, 1]} />
      {/* A JSX child of a JSX mesh: reads the box's geometry and moves with it. */}
      <Edges threshold={CREASE_ANGLE} color={cssColor("ink")} />
    </mesh>
  );
}
