"use client";
import React from "react";
import { useGLTF, Float } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/avatar.glb");

  return (
    <Float speed={2} floatingRange={[0.02, 0.07]}>
      <group {...props} dispose={null}>
        <group
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -4.2, 0]}
          scale={0.035}
        >
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            geometry={nodes.mesh_0.geometry}
            material={nodes.mesh_0.material}
            skeleton={nodes.mesh_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.mesh_1.geometry}
            material={materials.InsideMouth}
            skeleton={nodes.mesh_1.skeleton}
          />
          <skinnedMesh
            geometry={nodes.mesh_2.geometry}
            material={materials.Teeth}
            skeleton={nodes.mesh_2.skeleton}
          />
          <skinnedMesh
            geometry={nodes.mesh_3.geometry}
            material={materials.Color_}
            skeleton={nodes.mesh_3.skeleton}
          />
          <skinnedMesh
            name="mesh_4"
            geometry={nodes.mesh_4.geometry}
            material={materials.BlackShiny}
            skeleton={nodes.mesh_4.skeleton}
            morphTargetDictionary={nodes.mesh_4.morphTargetDictionary}
            morphTargetInfluences={nodes.mesh_4.morphTargetInfluences}
          />
          <skinnedMesh
            geometry={nodes.mesh_5.geometry}
            material={materials.Color_}
            skeleton={nodes.mesh_5.skeleton}
          />
          <skinnedMesh
            geometry={nodes.mesh_6.geometry}
            material={nodes.mesh_6.material}
            skeleton={nodes.mesh_6.skeleton}
          />
          <skinnedMesh
            geometry={nodes.mesh_7.geometry}
            material={materials.Color_}
            skeleton={nodes.mesh_7.skeleton}
          />
          <skinnedMesh
            geometry={nodes.mesh_8.geometry}
            material={nodes.mesh_8.material}
            skeleton={nodes.mesh_8.skeleton}
          />
          <skinnedMesh
            geometry={nodes.mesh_9.geometry}
            material={materials.Color_}
            skeleton={nodes.mesh_9.skeleton}
          />
          <skinnedMesh
            geometry={nodes.mesh_10.geometry}
            material={nodes.mesh_10.material}
            skeleton={nodes.mesh_10.skeleton}
          />
          <skinnedMesh
            geometry={nodes.mesh_11.geometry}
            material={materials.White}
            skeleton={nodes.mesh_11.skeleton}
          />
          <skinnedMesh
            geometry={nodes.mesh_12.geometry}
            material={materials.Color_}
            skeleton={nodes.mesh_12.skeleton}
          />
        </group>
      </group>
    </Float>
  );
}

useGLTF.preload("/models/avatar.glb");
