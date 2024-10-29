"use client";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Model() {
  const { nodes, materials } = useGLTF("/models/Sun.glb");

  const [hovered, setHovered] = useState(false);

  const [emissiveIntensity, setEmissiveIntensity] = useState(0.1);

  const globeMoveRef = useRef();

  const handlePointerEnter = () => {
    setHovered(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
  };

  useFrame((state, delta) => {
    globeMoveRef.current.rotation.z +=
      0.012 * Math.sin(state.clock.elapsedTime);

    if (hovered) {
      setEmissiveIntensity((prev) => Math.min(prev + delta, 0.35));
    } else {
      setEmissiveIntensity((prev) => Math.max(prev - delta * 2, 0.1));
    }
  });

  return (
    <group
      name="Sketchfab_Scene"
      ref={globeMoveRef}
      position={[0, 0, 0]}
      scale={2.4}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Node.geometry}
        material={materials.lambert2SG}
        material-emissive={"white"}
        material-emissiveIntensity={emissiveIntensity}
      />
    </group>
  );
}

useGLTF.preload("/models/Sun.glb");
