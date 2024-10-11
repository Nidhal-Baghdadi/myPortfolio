import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/linkedin.glb");
  return (
    <group
      {...props}
      dispose={null}
      rotation={[Math.PI / 2, 0, 0]}
      scale={0.15}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        scale={[2, 0.5, 2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={materials["Material.001"]}
        position={[-1.617, 0.584, 1.388]}
        scale={[4.449, 4.449, 5.217]}
      />
    </group>
  );
}

useGLTF.preload("/models/linkedin.glb");
