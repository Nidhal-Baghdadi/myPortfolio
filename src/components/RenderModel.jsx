"use client";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import React, { Suspense } from "react";
import Loader from "@/components/models/Loader";
import { Stars, Sparkles, OrbitControls } from "@react-three/drei";

import { useScene } from "@/context/sceneContext";

const RenderModel = ({ children, className }) => {
  const { scene, setScene } = useScene();

  return (
    <>
      <Canvas
        className={clsx("w-screen h-screen z-10 relative", className)}
        camera={{
          fov: 100,
          near: 0.1,
          far: 1000,
          position: [0, 0, 5],
          rotation: [0, 0, 0],
        }}
      >
        <directionalLight
          position={[2, 1, 5]}
          intensity={1.7}
          color={"white"}
        />
        {scene == 0 ? (
          <OrbitControls enableDamping={true} dampingFactor={0.03} />
        ) : (
          <></>
        )}
        <Stars
          radius={240}
          depth={200}
          count={50000}
          factor={1}
          saturation={0}
          fade
          speed={0.3}
        />
        <Sparkles
          count={1000}
          size={5}
          speed={0.3}
          opacity={1}
          scale={56}
          color="#fff3b0"
        />
        <Suspense fallback={<Loader />} scale={0.7}>
          {children}
        </Suspense>
      </Canvas>
    </>
  );
};

export default RenderModel;
