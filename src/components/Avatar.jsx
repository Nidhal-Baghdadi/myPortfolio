"use client";

import React from "react";

import AvatarModel from "./models/AvatarModel";

import RenderModel from "./RenderModel";

export default function ThemeSwitch() {
  return (
    <div className="h-48 w-24  ">
      <RenderModel>
        <directionalLight
          position={[0.5, 0.5, 0.5]}
          intensity={3.5}
          color={"white"}
        />
        <AvatarModel />
      </RenderModel>
    </div>
  );
}
