"use client";
import React, { useRef, useState } from "react";
import { Text3D, useMatcapTexture } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const Hero = ({ text, color, position, font }) => {
  const [matcapTexture] = useMatcapTexture("CBCBCB_595959_8C8C8C_747474");
  const ref = useRef();

  const { width: w, height: h } = useThree((state) => state.viewport);
  const [typewriterText, setTypewriterText] = useState("");
  const [textCursor, setTextCursor] = useState("|");
  const [counter, setCounter] = useState(0);
  const [wait, setWait] = useState(true);

  useFrame((state, delta) => {
    if (state.clock.elapsedTime.toFixed(0) > 1.4) {
      if (
        (state.clock.elapsedTime * 4).toFixed(0) -
          state.clock.elapsedTime * 4 <=
        0.01
      ) {
        setWait(false);
      }

      setTextCursor(["", "|"][state.clock.elapsedTime.toFixed(0) % 2]);

      if (typewriterText.length < text.length) {
        if (wait == false) {
          setTypewriterText((prev) => prev + text[counter]);
          setCounter((prev) => prev + 1);
          setWait(true);
        }
      }
    }
  });

  return (
    <>
      <Text3D
        position={position}
        scale={[-1, 1, 1]}
        ref={ref}
        size={w / 9}
        maxWidth={[-w / 5, -h * 2, 3]}
        font={font}
        curveSegments={48}
        brevelSegments={1}
        bevelEnabled
        bevelSize={0.1}
        bevelThickness={0.08}
        height={1}
        lineHeight={0.9}
        letterSpacing={0.2}
        rotation={[0, Math.PI, 0]}
      >
        {typewriterText + textCursor}
        <meshMatcapMaterial color={color} matcap={matcapTexture} />
      </Text3D>
    </>
  );
};

export default function Model(props) {
  const { text, color, position, scale, font } = props;

  return (
    <group {...props} dispose={null} scale={scale}>
      <directionalLight position={[2, 1, 1]} intensity={2.7} color={"white"} />
      <Hero text={text} color={color} position={position} font={font} />
    </group>
  );
}
