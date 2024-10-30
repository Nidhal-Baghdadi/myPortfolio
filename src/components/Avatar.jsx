"use client";

import React from "react";

import AvatarModel from "./models/AvatarModel";

import RenderModel from "./RenderModel";
import { OrbitControls } from "@react-three/drei";

export default function ThemeSwitch() {
  return (
    <div className="h-36 w-36  ">
      <RenderModel>
        <directionalLight
          position={[0.5, 0.5, 0.5]}
          intensity={3.5}
          color={"white"}
        />
        <ambientLight />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <AvatarModel />
      </RenderModel>
    </div>
  );
}
