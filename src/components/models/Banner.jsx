"use client";
import React, { useRef } from "react";
import { Text3D, Center, Float, useMatcapTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const Hero = ({ text, color, position, font }) => {
  const [matcapTexture] = useMatcapTexture("CBCBCB_595959_8C8C8C_747474");
  const ref = useRef();

  const { width: w, height: h } = useThree((state) => state.viewport);

  return (
    <>
      <Center rotation={[0, Math.PI, 0]} position={[2, 2, 0]}>
        <Float speed={0.5}>
          <Text3D
            position={position}
            scale={[-1, 1, 1]}
            ref={ref}
            size={w / 9}
            maxWidth={[-w / 5, -h * 2, 3]}
            font={font}
            curveSegments={24}
            brevelSegments={1}
            bevelEnabled
            bevelSize={0.08}
            bevelThickness={0.06}
            height={1}
            lineHeight={0.9}
            letterSpacing={0.1}
          >
            {text}
            <meshMatcapMaterial color={color} matcap={matcapTexture} />
          </Text3D>
        </Float>
      </Center>
    </>
  );
};

export default function Model(props) {
  const { text, color, position, scale, font } = props;

  return (
    <group {...props} dispose={null} scale={scale}>
      <pointLight color={"white"} intensity={1} />
      <Hero text={text} color={color} position={position} font={font} />
    </group>
  );
}
