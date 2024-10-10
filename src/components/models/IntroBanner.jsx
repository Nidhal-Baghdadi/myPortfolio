"use client";
// import { useEffect, useState } from "react";
import Introduction from "@/components/models/Introduction";

import font from "@public/fonts/JMH_Typewriter_Bold.json";
import { extend } from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial, raycast } from "meshline";

import RenderModelntro from "../RenderModelntro";

extend({ MeshLineGeometry, MeshLineMaterial });

const IntroBanner = () => {
  return (
    <div className="z-40 flex-grow overflow-auto border-[#c7d7a3] shadow-md shadow-[#c7d7a3] rounded-lg border-2  ml-12 mb-20  h-full ">
      <RenderModelntro>
        <Introduction
          text={
            "Hi, I'm Nidhal.\n\nI'm a junior developer.\n\nAnd, this is my portfolio."
          }
          color={"#ffff33"}
          position={[-7.5, 1.7, 0]}
          font={font}
          scale={0.35}
        />
      </RenderModelntro>
    </div>
  );
};

export default IntroBanner;
