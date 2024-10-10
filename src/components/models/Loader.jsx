"use client";
import React, { useRef } from "react";
import { useGLTF, useProgress, Html } from "@react-three/drei";
import Banner from "@/components/models/Banner";
import Globe from "@/components/models/Globe";
import font from "@public/fonts/gt.json";

export default function Model(props) {
  const group = useRef();

  const { progress, active } = useProgress();

  return (
    <group position={[0, 0, 0]}>
      <Globe />
      <group position={[-0.5, -2, 0]}>
        <Banner
          text={progress.toFixed(0)}
          color={"yellow"}
          position={[0, 0, 0]}
          scale={0.2}
          font={font}
        />
        ;
      </group>
    </group>
  );
}
