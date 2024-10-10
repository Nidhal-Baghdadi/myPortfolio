"use client";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useScene } from "@/context/sceneContext";

export default function Model(props) {
  const { position, currentScene } = props;

  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/ps1_style_low_poly_moon.glb"
  );

  const { scene, setScene } = useScene();
  const [hovered, setHovered] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 5]);

  const [emissiveIntensity, setEmissiveIntensity] = useState(0.4);

  const [text, setText] = useState("");

  const globeMoveRef = useRef();

  const handlePointerDown = () => {
    setScene(currentScene);
    setClicked(!clicked);
  };

  const handlePointerEnter = () => {
    setHovered(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    setText("");
  };

  useFrame((state, delta) => {
    globeMoveRef.current.rotation.y += Math.abs(
      0.05 * Math.sin(state.clock.elapsedTime)
    );

    if (hovered) {
      setEmissiveIntensity((prev) => Math.min(prev + delta, 0.77));
    } else {
      setEmissiveIntensity((prev) => Math.max(prev - delta * 2, 0.4));
    }
    if (clicked) {
      /*setCameraPosition((prev) => [
        Math.min(prev[0] + delta, 0),
        Math.min(prev[1] + delta * 2, 0),
        Math.max(prev[2] - delta * 5, 5),
      ]);*/
      setCameraPosition((prev) => [
        Math.max(prev[0] - delta, -1),
        Math.max(prev[1] - delta * 2, -2),
        Math.min(prev[2] + delta * 5, 10),
      ]);

      // setCameraRotation((prev) => Math.min(prev + delta * 42, 42));
    } else {
      setCameraPosition((prev) => [
        Math.min(prev[0] + delta, 0),
        Math.min(prev[1] + delta * 2, 0),
        Math.max(prev[2] - delta * 5, 5),
      ]);

      // setCameraRotation((prev) => Math.max(prev - delta * 42, 0));
    }
    /*state.camera.position.x = cameraPosition[0];
    state.camera.position.y = cameraPosition[1];*/
    state.camera.position.z = cameraPosition[2];
    // state.camera.rotation.x = MathUtils.degToRad(cameraRotation);
  });

  return (
    <group ref={group} position={position} scale={0.24}>
      <group name="Sketchfab_Scene" ref={globeMoveRef}>
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="Low_Poly_Moonfbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="moon"
                  rotation={[-Math.PI / 2, 0, 0.329]}
                  scale={100}
                  onPointerDown={handlePointerDown}
                  onPointerEnter={handlePointerEnter}
                  onPointerLeave={handlePointerLeave}
                >
                  <EffectComposer>
                    <Bloom
                      luminanceThreshold={0}
                      luminanceSmoothing={0.9}
                      intensity={0.1}
                      radius={0.1}
                    />
                  </EffectComposer>
                  <mesh
                    name="moon_Moon_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.moon_Moon_0.geometry}
                    material={materials.Moon}
                    material-emissive={"white"}
                    material-emissiveIntensity={emissiveIntensity}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/ps1_style_low_poly_moon.glb");
