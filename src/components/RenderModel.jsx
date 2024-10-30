"use client";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import React, { Suspense } from "react";

const RenderModel = ({ children, className }) => {
  return (
    <>
      <Canvas
        className={clsx("w-screen h-screen  relative", className)}
        camera={{
          fov: 100,
          near: 0.1,
          far: 1000,
          position: [0, 0, 5],
          rotation: [0, 0, 0],
        }}
      >
        <directionalLight
          position={[0.5, 0.5, 0.5]}
          intensity={1.7}
          color={"white"}
        />

        <Suspense scale={0.7}>{children}</Suspense>
      </Canvas>
    </>
  );
};

export default RenderModel;
