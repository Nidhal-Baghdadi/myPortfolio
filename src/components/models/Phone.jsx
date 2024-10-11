import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/old_nokia_phone_low_poly.glb");
  return (
    <group {...props} dispose={null} scale={0.002}>
      <group
        position={[-89.008, -25.512, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[44.74, 21.863, 44.74]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_back_0.geometry}
          material={materials.back}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_side_0.geometry}
          material={materials.side}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_screen_0.geometry}
          material={materials.screen}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/old_nokia_phone_low_poly.glb");
