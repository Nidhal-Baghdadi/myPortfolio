"use client";
import React, { useRef, useState } from "react";
import { Float } from "@react-three/drei";
import MenuPlanet from "@/components/models/MenuPlanet";
import Banner from "@/components/models/Banner";
import { Color } from "three";
import font from "@public/fonts/gt.json";

const NavigationMenu = (props) => {
  const { globeClicked } = props;
  const groupRef1 = useRef();
  const groupRef2 = useRef();
  const groupRef3 = useRef();

  const bannerColor = new Color(0xffdf00);

  return (
    <>
      <Banner
        text={"Professional\nExperience"}
        color={bannerColor}
        position={[2.05, 2.55, 0]}
        scale={0.33 * 0.24}
        font={font}
      />
      <Banner
        text={"Education"}
        color={bannerColor}
        position={[-2.05, 2.55, 0]}
        scale={0.33 * 0.24}
        font={font}
      />
      <Banner
        text={"Projects"}
        color={bannerColor}
        position={[0, -2.4, 0]}
        scale={0.33 * 0.24}
        font={font}
      />
      <group ref={groupRef1}>
        <Float speed={0.35}>
          <MenuPlanet
            position={[2.05, 2.05, 0]}
            globeClicked={globeClicked}
            currentScene={1}
          />
        </Float>
      </group>
      <group ref={groupRef2}>
        <Float speed={0.35}>
          <MenuPlanet
            position={[-2.05, 2.05, 0]}
            globeClicked={globeClicked}
            currentScene={2}
          />
        </Float>
      </group>
      <group ref={groupRef3}>
        <Float speed={0.35}>
          <MenuPlanet
            paramText={"Projects"}
            position={[0, -2.9, 0]}
            globeClicked={globeClicked}
            currentScene={3}
          />
        </Float>
      </group>
    </>
  );
};

export default NavigationMenu;
