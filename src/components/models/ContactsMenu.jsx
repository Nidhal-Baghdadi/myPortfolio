"use client";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import Banner from "@/components/models/Banner";
import Phone from "@/components/models/Phone";
import LinkedinLogo from "@/components/models/LinkedinLogo";
import { Color } from "three";
import font from "@public/fonts/gt.json";
import { useFrame } from "@react-three/fiber";

export default function Model(props) {
  const groupRef1 = useRef();
  const groupRef2 = useRef();
  const groupRef3 = useRef();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [linkedInmessage, setLinkedInMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [popUpMessage, setPopUpMessage] = useState("");

  const { nodes, materials } = useGLTF("/models/mail_icon.glb");
  const bannerColor = new Color(0xffdf00);

  const handleClickLinkedin = () => {
    window.open("https://www.linkedin.com/in/nidhal-baghdadi", "_blank");
  };

  const handleClickEmail = () => {
    window.location.href = "mailto:bagdadi.nidhal@gmail.com";
  };

  const handlePointerEnterPhone = () => {
    setPhoneNumber("copy\n+33 6 34 04 60 41\nto clipboard");
  };

  const handlePointerLeavePhone = () => {
    setPhoneNumber("");
  };

  const handlePointerEnterLinkedIn = () => {
    setLinkedInMessage("redirect\nto linkedin");
  };

  const handlePointerLeaveLinkedIn = () => {
    setLinkedInMessage("");
  };

  const handlePointerEnterEmail = () => {
    setEmailMessage("redirect\nto mailbox");
  };

  const handlePointerLeaveEmail = () => {
    setEmailMessage("");
  };

  const handleClickPhone = () => {
    const phoneNumber = "+33 6 34 04 60 41";
    navigator.clipboard
      .writeText(phoneNumber)
      .then(() => {
        console.log("Phone number copied to clipboard!");
        setPopUpMessage("Done!");
        setTimeout(() => {
          setPopUpMessage("");
        }, 700);
      })
      .catch((err) => {
        console.error("Failed to copy phone number: ", err);
      });
  };

  useFrame((state, delta) => {
    groupRef1.current.position.y = 0.08 * Math.sin(state.clock.elapsedTime);
    groupRef2.current.position.y =
      -1.5 + 0.08 * Math.sin(state.clock.elapsedTime);
    groupRef3.current.position.y =
      -1.5 + 0.08 * Math.sin(state.clock.elapsedTime);
  });

  return (
    <>
      <Banner
        text={"send me an email"}
        color={"white"}
        position={[4.1, -2.4, 0]}
        scale={0.33 * 0.24}
        font={font}
      />

      <Banner
        text={emailMessage}
        color={bannerColor}
        position={[4.1, -1, 0]}
        scale={0.33 * 0.24}
        font={font}
      />
      <Banner
        text={"Call me"}
        color={"white"}
        position={[-4.2, -2.4, 0]}
        scale={0.33 * 0.24}
        font={font}
      />
      <Banner
        text={phoneNumber}
        color={bannerColor}
        position={[-6.5, -0.2, 0]}
        scale={0.33 * 0.24}
        font={font}
      />
      <Banner
        text={popUpMessage}
        color={"white"}
        position={[-3, -0.8, 0]}
        scale={0.33 * 0.22}
        font={font}
      />
      <Banner
        text={linkedInmessage}
        color={bannerColor}
        position={[0, -1, 0]}
        scale={0.33 * 0.24}
        font={font}
      />
      <Banner
        text={"Check my linkedin"}
        color={"white"}
        position={[0, -2.4, 0]}
        scale={0.33 * 0.24}
        font={font}
      />

      <group
        ref={groupRef1}
        onClick={handleClickEmail}
        onPointerEnter={handlePointerEnterEmail}
        onPointerLeave={handlePointerLeaveEmail}
      >
        <group {...props} dispose={null} scale={0.15} position={[4.1, -1.5, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_2.geometry}
              material={materials["Material.001"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_3.geometry}
              material={materials["Material.002"]}
            />
          </group>
        </group>
      </group>
      <group
        ref={groupRef2}
        position={[-4.1, -1.5, 0]}
        onPointerEnter={handlePointerEnterPhone}
        onPointerLeave={handlePointerLeavePhone}
        onClick={handleClickPhone}
      >
        <Phone />
      </group>
      <group
        ref={groupRef3}
        position={[0, -1.5, 0]}
        onClick={handleClickLinkedin}
        onPointerEnter={handlePointerEnterLinkedIn}
        onPointerLeave={handlePointerLeaveLinkedIn}
      >
        <LinkedinLogo />
      </group>
    </>
  );
}

useGLTF.preload("/models/mail_icon.glb");
