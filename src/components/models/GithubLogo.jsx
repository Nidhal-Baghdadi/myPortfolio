import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/github.glb");
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
        material={materials["Material.004"]}
        scale={[2, 0.5, 2]}
      />
    </group>
  );
}

useGLTF.preload("/models/github.glb");
