"use client";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, Float } from "@react-three/drei";
import { useRouter } from "next/navigation";
import Banner from "@/components/models/Banner";
import font from "@public/fonts/gt.json";

export default function Model(props) {
  const { message, caracter, onData } = props;
  const { scene, animations } = useGLTF(`/models/${caracter}.gltf`);

  const modelRef = useRef();

  const router = useRouter();

  const [animation, setAnimation] = useState("Idle");

  const [text, setText] = useState(message);

  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    if (caracter == "Astronaut_BarbaraTheBee") {
      setAnimation("Wave");
    }

    actions[animation].reset().fadeIn(0.5).play();
    return () => actions[animation]?.fadeOut(0.5);
  }, [animation, actions, caracter]);

  const handlePointerEnter = () => {
    if (caracter != "Astronaut_BarbaraTheBee") {
      if (caracter == "Astronaut_RaeTheRedPanda") {
        setAnimation("Walk");
      } else {
        setAnimation("Walk_Gun");
      }
    }
  };

  const handlePointerLeave = () => {
    setAnimation("Idle");
  };

  const handleClick = () => {
    if (caracter == "Astronaut_FernandoTheFlamingo") {
      onData(0);
    } else {
      router.push("/contacts");
    }
  };

  return (
    <group onClick={handleClick}>
      <Float speed={1} floatingRange={[0, 0.1]}>
        <group
          dispose={null}
          ref={modelRef}
          position={
            caracter == "Astronaut_BarbaraTheBee"
              ? [5, 2.9, -9]
              : [-13, 3.5, -7]
          }
          rotation={
            caracter == "Astronaut_BarbaraTheBee"
              ? [0, 0, 0]
              : [0, Math.PI / 4, 0]
          }
          scale={
            caracter == "Astronaut_FernandoTheFlamingo"
              ? 1
              : caracter == "Astronaut_BarbaraTheBee"
              ? 2.1
              : 0.8
          }
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          <Banner
            text={text}
            color={"white"}
            position={[-1, 2.4, 2]}
            scale={0.2}
            font={font}
          />

          <primitive object={scene} />
        </group>
      </Float>
    </group>
  );
}
