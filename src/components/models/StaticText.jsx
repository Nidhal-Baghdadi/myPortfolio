"use client";
import React, { useRef } from "react";
import { Text3D, useMatcapTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const Hero = ({ text, color, position, font }) => {
  const [matcapTexture] = useMatcapTexture("CBCBCB_595959_8C8C8C_747474");
  const ref = useRef();

  const { width: w, height: h } = useThree((state) => state.viewport);

  return (
    <>
      <Text3D
        position={position}
        scale={[-1, 1, 0.1]}
        ref={ref}
        size={w / 9}
        maxWidth={[-w / 5, -h * 2, 3]}
        font={font}
        curveSegments={48}
        brevelSegments={1}
        bevelSize={0.1}
        bevelThickness={0.08}
        height={1}
        lineHeight={1.2}
        letterSpacing={0.2}
        rotation={[0, Math.PI, 0]}
      >
        {text}

        <meshMatcapMaterial color={color} matcap={matcapTexture} />
      </Text3D>
    </>
  );
};

export default function Model(props) {
  const { text, color, position, scale, font } = props;

  return (
    <group {...props} dispose={null} scale={scale}>
      <directionalLight
        position={[0, 0.2, 0.22]}
        intensity={2.2}
        color={"#FF6F61"}
        scale={20}
      />
      <Hero text={text} color={color} position={position} font={font} />
    </group>
  );
}
