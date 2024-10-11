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

import { Text } from "@/components/models/Text";
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

  const commonRatio = 1420 / 947;
  const flutterRatio = 585 / 170;
  const colasRatio = 2631 / 1095;
  const OMPRatio = 1045 / 1024;
  const ompDemoRatio = 1278 / 682;

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
              Projects
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
                color={"#c9184a"}
                emissive={"#c9184a"}
                emissiveIntensity={0.33}
              />
            </mesh>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"}>
                <Image
                  url="/colasLogo.png"
                  scale={[2.2, 2.2 / colasRatio, 1]}
                  transparent
                />
              </Box>
              <Box marginBottom={0.3} marginTop={0.2} justifyContent={"center"}>
                <Text fontSize={0.15} letterSpacing={0.1}>
                  November 2021 - Mars 2022
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
              Projet scientifique & technique
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
              Digital Contact Directory
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
              "   A SaaS application with a UI \nthat allows Colas field agents \nto have access to up-to-date partner\nand client contacts."
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
              "   Leveraging frontend development\nlibraries such as ReactJS to develop\na user-friendly ergonomic UI."
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
              "   When partners and clients contacts\nwere updated.The field agent had\nno way of being notified other than\nmanually. This application\nsolves that problem."
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
              "   Whithin a team of 5 CS students\nin an agile environment, my job was to:\n\n - Work on backend features.\n - Work on frontend features.\n - Design the UI."
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
                  scale={[2.2, 2.2 / commonRatio, 1]}
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
                  url="/mysqlLogo.png"
                  scale={[2.2, 2.2 / commonRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              mySQL Database
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
                  url="/reactJSLogo.png"
                  scale={[2.2, 2.2 / commonRatio, 1]}
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
                  scale={[2.2, 2.2 / commonRatio, 1]}
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
                  url="/jiraLogo.png"
                  scale={[2.2, 2.2 / commonRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              For task progress
              <meshStandardMaterial emissive={"red"} emissiveIntensity={1.5} />
            </Text>
          </Box>
        </Box>

        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
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
                color={"#c9184a"}
                emissive={"#c9184a"}
                emissiveIntensity={0.33}
              />
            </mesh>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"}>
                <Image
                  url="/thalesLogo.png"
                  scale={[2.2, 2.2 / commonRatio, 1]}
                  transparent
                />
              </Box>
              <Box marginBottom={0.1}>
                <Text fontSize={0.138} letterSpacing={0.1}>
                  November 2022 - January 2023
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
              CAP Projet
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
              Crit&apos;air mobile application
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
              "   A mobile application that scans \nand recognizes license plates\nto extract the license and check\nthe car's pollution index (Crit'air)."
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
              "   Leveraging native and 3rd party\nimage recognition libraries to allow\nusers to scan license plates\nand extract the desired data."
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
              "   Areas in île-de-France (France)\nallow traffic below certain pollution\nindex. This application helps mitigate that problem."
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
              "   Whithin a team of 5 CS students\nin an agile environment, my job was to:\n\n   Develop mobile application features."
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
                  url="/flutterLogo.png"
                  scale={[2.2, 2.2 / flutterRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              Mobile development
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
                  url="/springLogo.png"
                  scale={[2.2, 2.2 / commonRatio, 1]}
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
                  url="/mysqlLogo.png"
                  scale={[2.2, 2.2 / commonRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              mySQL Database
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
                  url="/msAzureLogo.png"
                  scale={[2.2, 2.2 / commonRatio, 1]}
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
                  scale={[2.2, 2.2 / commonRatio, 1]}
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
                  url="/jiraLogo.png"
                  scale={[2.2, 2.2 / commonRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              For task progress
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
          <Box marginBottom={0.5}>
            <Text fontSize={0.35} maxWidth={vpWidth} textAlign="center">
              Personal projects
              <meshStandardMaterial
                emissive={"skyblue"}
                emissiveIntensity={2}
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

              <meshStandardMaterial color={"#2d4059"} />
            </mesh>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"} marginLeft={0.44}>
                <Image
                  url="/OMPLogo.png"
                  scale={[1.3, 1.3 / OMPRatio, 1]}
                  transparent
                />
              </Box>
              <Box marginBottom={0.3} marginTop={0.2} justifyContent={"center"}>
                <Text fontSize={0.24} letterSpacing={0.1}>
                  Ongoing project...
                  <meshStandardMaterial
                    emissive={"yellow"}
                    emissiveIntensity={1.5}
                  />
                </Text>
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.35} maxWidth={1.2} textAlign="left">
              Oui,mais... Pourquoi ?
              <meshStandardMaterial emissive={"red"} emissiveIntensity={1.5} />
            </Text>
          </Box>
        </Box>

        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          marginBottom={0.22}
        >
          <Box margin={0.1}>
            <Text
              fontSize={0.2}
              letterSpacing={0.1}
              maxWidth={vpWidth * 0.8}
              textAlign="center"
            >
              Links in the CV
              <meshStandardMaterial
                emissive={"#f5bd02"}
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
            text={"DESCRIPTION:"}
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
              " - A 3D UI to visualize lesson prerequesites\nin an intuitive way to help young\nstudents navigate through course\ndependencies and make learning more\nplayful as it should be."
            }
            color={"white"}
            position={[0, 0, 0]}
            font={font}
            scale={0.16}
          />
        </Box>
      </Flex>
    </group>
  );
}

export default function Model({ className }) {
  const scrollArea = useRef();
  const onScroll = (e) => (state.top = e.target.scrollTop);

  const [pages, setPages] = useState(0);

  const { scene, setScene } = useScene();
  const message = "Home Page";
  const caracter = "Astronaut_FernandoTheFlamingo";

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
