"use client";
import React, {
  useEffect,
  useRef,
  useState,
  Suspense,
  useCallback,
} from "react";
import {
  Stars,
  Sparkles,
  useAspect,
  Html,
  Plane,
  Image,
} from "@react-three/drei";

import { EffectComposer, Bloom } from "@react-three/postprocessing";
import font from "@public/fonts/JMH_Typewriter_Bold.json";
import * as THREE from "three";
import StaticText from "@/components/models/StaticText";

import { useScene } from "@/context/sceneContext";
import { Canvas, useThree, useFrame, extend } from "@react-three/fiber";
import { Flex, Box } from "@react-three/flex";
import dynamic from "next/dynamic";
import Avatar from "@/components/models/Avatar";

const state = {
  top: 0,
};
const RenderModel = dynamic(() => import("@/components/RenderModel"), {
  ssr: false,
});

function BackGrid() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2(0, 0.05);
  }, [scene]);
  const planeColor = new THREE.Color(0x58d0ff);
  return (
    <Plane
      position={[0, -0.5, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      args={[2.5, 0.15, 128, 128]}
    >
      <meshStandardMaterial
        color={planeColor}
        wireframe
        side={THREE.DoubleSide}
        emissive={planeColor}
        emissiveIntensity={1.35}
      />
    </Plane>
  );
}

function Page({ onChangePages }) {
  const group = useRef();
  const { size } = useThree();
  const [vpWidth, vpHeight] = useAspect(size.width, size.height);
  const vec = new THREE.Vector3();
  useFrame(() =>
    group.current.position.lerp(vec.set(0, state.top / 100, 0), 0.1)
  );
  const handleReflow = useCallback(
    (w, h) => {
      onChangePages(h / vpHeight);
    },
    [onChangePages, vpHeight]
  );

  const commonRation = 1420 / 947;
  const ibmCloudRatio = 1036 / 776;
  const swaggerRatio = 1036 / 659;

  const titleColor = new THREE.Color(0xffd700);

  return (
    <group ref={group}>
      <BackGrid />

      <Flex
        flexDirection="column"
        size={[vpWidth, vpHeight, 0]}
        onReflow={handleReflow}
        position={[-vpWidth / 2, vpHeight / 2, 0]}
      >
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <Box margin={0.05}>
            <Text
              fontSize={0.5}
              letterSpacing={0.05}
              textAlign="center"
              maxWidth={vpWidth}
            >
              Professional Experience
              <meshStandardMaterial
                emissive={titleColor}
                emissiveIntensity={1.5}
              />
            </Text>
          </Box>
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          marginBottom={0.2}
        >
          <Box margin={0.1}>
            <mesh position={[2.5 / 2, -1, 0]}>
              <planeGeometry args={[2.5, 2]} />

              <meshStandardMaterial
                color={["#2d4059", "#ea5455", "#decdc3", "#e5e5e5"][1 % 4]}
              />
            </mesh>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"}>
                <Image
                  url="/dassaultLogo.png"
                  scale={[2.2, 2.2 / commonRation, 1]}
                  transparent
                />
              </Box>
              <Box marginBottom={0.1} justifyContent={"center"}>
                <Text fontSize={0.15} letterSpacing={0.1}>
                  April 2022 - September 2022
                  <meshStandardMaterial
                    emissive={"yellow"}
                    emissiveIntensity={1.5}
                  />
                </Text>
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.4} maxWidth={1} textAlign="left">
              4th year internship
              <meshStandardMaterial emissive={"red"} emissiveIntensity={1.5} />
            </Text>
          </Box>
        </Box>

        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          marginBottom={0.5}
        >
          <Box marginBottom={0.5}>
            <Text fontSize={0.35} maxWidth={vpWidth} textAlign="center">
              Industry Process Consultant
              <meshStandardMaterial
                emissive={"skyblue"}
                emissiveIntensity={2}
              />
            </Text>
          </Box>
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={"THE MISSION:"}
            color={"#F0CB00"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={
              " - Developing a User Interface.\n - Developing a full stack application."
            }
            color={"white"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={"THE FUNCTION:"}
            color={"#F0CB00"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={
              " - The UI:\n\n   A UI that generates diagrams in real\ntime based on markdown language based\nuser input.\n\n - The Fullstack application:\n\n A SaaS that allows users to organize\nthe recruitement process."
            }
            color={"white"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={"THE HOW:"}
            color={"#F0CB00"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={
              " - The frontend application is a wrapper\nfor the mermaidJS library. It supports all\nthe diagrams and can be hosted as\na widget on the 3DEXPERIENCE platform.\n\n - The recruitement process application\nallows the user to debrief, store notes\nand rank candidates based on a variety\nof attributes and delivers a verdict."
            }
            color={"white"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={"THE WHY:"}
            color={"#F0CB00"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={
              " - Diagram Express --> Generating diagrams\nfor people in a hurry.\n - Recruitement App. --> Making the\nrecruitement proces more efficient."
            }
            color={"white"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={"My CONTRIBUTION:"}
            color={"#F0CB00"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>

        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={
              "   As the sole contributor on the\nfirst project my job was to:\n\n - Understand the MermaidJS library.\n - Wrap the library and create a UI.\n - Host the aplication as a widget on\nthe 3DEXPERIENCE Platform."
            }
            color={"white"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>

        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={"THE TECHNICAL STACK:"}
            color={"#F0CB00"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          marginBottom={0.2}
        >
          <Box margin={0.1}>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"}>
                <Image
                  url="/nodeJSLogo.png"
                  scale={[2.2, 2.2 / commonRation, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              Backend development
              <meshStandardMaterial emissive={"red"} emissiveIntensity={1.5} />
            </Text>
          </Box>
        </Box>

        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          marginBottom={0.2}
        >
          <Box margin={0.1}>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"}>
                <Image
                  url="/mongoDBLogo.png"
                  scale={[2.2, 2.2 / commonRation, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              NoSQL Database
              <meshStandardMaterial emissive={"red"} emissiveIntensity={1.5} />
            </Text>
          </Box>
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          marginBottom={0.2}
        >
          <Box margin={0.1}>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"}>
                <Image
                  url="/vueJSLogo.png"
                  scale={[2.2, 2.2 / commonRation, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              For front-end development
              <meshStandardMaterial emissive={"red"} emissiveIntensity={1.5} />
            </Text>
          </Box>
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          marginBottom={0.2}
        >
          <Box margin={0.1}>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"}>
                <Image
                  url="/gitLabLogo.png"
                  scale={[2.2, 2.2 / commonRation, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              For version control & task progress
              <meshStandardMaterial emissive={"red"} emissiveIntensity={1.5} />
            </Text>
          </Box>
        </Box>

        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          marginTop={0.8}
          marginBottom={0.22}
        >
          <Box margin={0.1}>
            <Text
              fontSize={0.2}
              letterSpacing={0.1}
              maxWidth={vpWidth * 0.8}
              textAlign="center"
            >
              GRADUATION YEAR 2022-2023
              <meshStandardMaterial
                emissive={"#f5bd02"}
                emissiveIntensity={2}
              />
            </Text>
          </Box>
          <Box margin={0.1}>
            <Text
              fontSize={0.12}
              letterSpacing={0.1}
              maxWidth={vpWidth * 0.8}
              textAlign="center"
            >
              Check education page for details
              <meshStandardMaterial
                emissive={"white"}
                emissiveIntensity={1.5}
              />
            </Text>
          </Box>
        </Box>

        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          marginBottom={0.5}
        >
          <Box margin={0.1}>
            <mesh position={[2.5 / 2, -1, 0]}>
              <planeGeometry args={[2.5, 2]} />

              <meshStandardMaterial
                color={["#2d4059", "#ea5455", "#decdc3", "#e5e5e5"][1 % 4]}
              />
            </mesh>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"}>
                <Image
                  url="/ibmLogo.png"
                  scale={[2.2, 2.2 / commonRation, 1]}
                  transparent
                />
              </Box>
              <Box marginBottom={0.1}>
                <Text fontSize={0.165} letterSpacing={0.1}>
                  February 2023 - July 2023
                  <meshStandardMaterial
                    emissive={"yellow"}
                    emissiveIntensity={1.5}
                  />
                </Text>
              </Box>
            </Box>
          </Box>

          <Box margin={0.1}>
            <Text fontSize={0.4} maxWidth={1} textAlign="left">
              5th year internship
              <meshStandardMaterial emissive={"red"} emissiveIntensity={1.5} />
            </Text>
          </Box>
        </Box>

        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          marginBottom={0.2}
        >
          <Box>
            <Text fontSize={0.35} maxWidth={vpWidth} textAlign="center">
              Full Stack Developer
              <meshStandardMaterial
                emissive={"skyblue"}
                emissiveIntensity={2}
              />
            </Text>
          </Box>
        </Box>

        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={"THE MISSION:"}
            color={"#F0CB00"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={"   Developing a full stack application."}
            color={"white"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={"THE FUNCTION:"}
            color={"#F0CB00"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={
              "   A mobile application that scans \nand recognizes real life 3D objects in\nreal time with the camera."
            }
            color={"white"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={"THE HOW:"}
            color={"#F0CB00"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={
              "   Leveraging (AR/VR) Android & Ios\nlibraries libraries to allow users to\nhave data displayed next to the object \nin 3D form."
            }
            color={"white"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={"THE WHY:"}
            color={"#F0CB00"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={
              " - Short term target audience --> Tourists\n - Long term --> 3D object recognition\ntailored to business needs."
            }
            color={"white"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={"My CONTRIBUTION:"}
            color={"#F0CB00"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>

        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={
              "   Whithin a team of 7 developers\nin an agile environment, my job was to:\n\n - Develop backend features.\n - Document the API.\n - Set up a Devops dev & prod environment."
            }
            color={"white"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width={vpWidth * 0.8}
          marginTop={0.1}
          marginBottom={0.24}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={"THE TECHNICAL STACK:"}
            color={"#F0CB00"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          marginBottom={0.2}
        >
          <Box margin={0.1}>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"}>
                <Image
                  url="/nodeJSLogo.png"
                  scale={[2.2, 2.2 / commonRation, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              Backend development
              <meshStandardMaterial emissive={"red"} emissiveIntensity={1.5} />
            </Text>
          </Box>
        </Box>

        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          marginBottom={0.2}
        >
          <Box margin={0.1}>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"}>
                <Image
                  url="/mongoDBLogo.png"
                  scale={[2.2, 2.2 / commonRation, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              NoSQL Database
              <meshStandardMaterial emissive={"red"} emissiveIntensity={1.5} />
            </Text>
          </Box>
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          marginBottom={0.2}
        >
          <Box margin={0.1}>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"}>
                <Image
                  url="/ibmCloud.png"
                  scale={[2.2, 2.2 / ibmCloudRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              For DevOps purposes
              <meshStandardMaterial emissive={"red"} emissiveIntensity={1.5} />
            </Text>
          </Box>
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          marginBottom={0.2}
        >
          <Box margin={0.1}>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"}>
                <Image
                  url="/gitLabLogo.png"
                  scale={[2.2, 2.2 / commonRation, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              For version control
              <meshStandardMaterial emissive={"red"} emissiveIntensity={1.5} />
            </Text>
          </Box>
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          marginBottom={0.2}
        >
          <Box margin={0.1}>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"}>
                <Image
                  url="/dockerLogo.png"
                  scale={[2.2, 2.2 / commonRation, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              For build and deployment
              <meshStandardMaterial emissive={"red"} emissiveIntensity={1.5} />
            </Text>
          </Box>
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          marginBottom={0.2}
        >
          <Box margin={0.1}>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"}>
                <Image
                  url="/trelloLogo.png"
                  scale={[2.2, 2.2 / commonRation, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              Task progress during sprints
              <meshStandardMaterial emissive={"red"} emissiveIntensity={1.5} />
            </Text>
          </Box>
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          marginBottom={0.2}
        >
          <Box margin={0.1}>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"}>
                <Image
                  url="/swaggerLogo.png"
                  scale={[2.2, 2.2 / swaggerRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              API doc
              <meshStandardMaterial emissive={"red"} emissiveIntensity={1.5} />
            </Text>
          </Box>
        </Box>
      </Flex>
    </group>
  );
}

import { Text } from "@/components/models/Text";

export default function Model({ className }) {
  const modelRef = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top = e.target.scrollTop);

  const [pages, setPages] = useState(0);

  const message = "Home Page";
  const caracter = "Astronaut_FernandoTheFlamingo";

  const { scene, setScene } = useScene();

  const handleOnClick = (data) => {
    setScene(data);
  };

  return (
    <>
      <Canvas camera={{ position: [0, 0, 2], zoom: 1 }}>
        <pointLight position={[0, 1, 4]} intensity={0.1} />
        <ambientLight intensity={0.2} />
        <spotLight
          position={[1, 1, 1]}
          penumbra={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={<Html center>loading..</Html>}>
          <Page onChangePages={setPages} />
          {/* <Cube /> */}
        </Suspense>
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.98}
            luminanceSmoothing={1}
            height={1024}
          />
        </EffectComposer>
        <Stars
          radius={240}
          depth={200}
          count={50000}
          factor={1}
          saturation={0}
          fade
          speed={0.3}
        />
        <Sparkles
          count={1000}
          size={5}
          speed={0.3}
          opacity={1}
          scale={56}
          color="#fff3b0"
        />
      </Canvas>

      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <RenderModel>
          <Avatar
            message={message}
            caracter={caracter}
            onData={handleOnClick}
          />
        </RenderModel>
        <div style={{ height: `${pages * 100}vh` }} />
      </div>
    </>
  );
}
