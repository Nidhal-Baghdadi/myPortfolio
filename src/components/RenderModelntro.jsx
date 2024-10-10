"use client";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import React, { Suspense, useRef, useState } from "react";
import Loader from "@/components/models/Loader";

const RenderModelIntro = ({ children, className }) => {
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
          position={[2, 1, 1]}
          intensity={2.7}
          color={"white"}
        />

        <Suspense fallback={<Loader />} scale={0.7}>
          {children}
        </Suspense>
      </Canvas>
    </>
  );
};

export default RenderModelIntro;
