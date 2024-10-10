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
      position={[0, -0.85, 0]}
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

  // Logo ratios
  const vanillaRatio = 600 / 352;
  const gitRatio = 910 / 380;
  const epiSousseRatio = 1551 / 553;
  const esieaRatio = 1501 / 901;
  const commonRatio = 1417 / 945;
  const treeRatio = 512 / 512;
  const kafkaRatio = 702 / 369;

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
              maxWidth={vpWidth * 0.4}
            >
              Education
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
          <Box margin={0.2}>
            <mesh position={[2.5 / 2, -1, 0]}>
              <planeGeometry args={[2.5, 2]} />

              <meshStandardMaterial color={"#2d4059"} />
            </mesh>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"}>
                <Image
                  url="/epiSousseLogo.png"
                  scale={[2, 2 / epiSousseRatio, 1]}
                  transparent
                />
              </Box>
              <Box
                marginBottom={0.5}
                marginTop={0.22}
                justifyContent={"center"}
              >
                <Text fontSize={0.15} letterSpacing={0.1}>
                  Sptember 2018 - July 2021
                  <meshStandardMaterial
                    emissive={"yellow"}
                    emissiveIntensity={1.5}
                  />
                </Text>
              </Box>
            </Box>
          </Box>
          <Box margin={0.2}>
            <Text fontSize={0.4} maxWidth={1} textAlign="center">
              1st to 3rd year
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
          <Box marginBottom={0.5} marginTop={0.3}>
            <Text fontSize={0.35} maxWidth={vpWidth} textAlign="center">
              Engineering student
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
          marginBottom={0.2}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={"Focus on the foundations:"}
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
          marginBottom={0.5}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={
              " - Mathematics\n\n - Data structures and algorithms\n\n - Object oriented programming\n\n - Web development\n\n - Networking essentials"
            }
            color={"white"}
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
                  url="/javaLogo.png"
                  scale={[2.2, 2.2 / commonRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              OOP in Java
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
                  url="/vanilla.png"
                  scale={[2.2, 2.2 / vanillaRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              Web dev. Fundamentals
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
                  url="/ciscoLogo.png"
                  scale={[2.2, 2.2 / commonRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              Networking essentials
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
                  url="/treeLogo.png"
                  scale={[2.2, 2.2 / treeRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              Data structures and algorithms
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
                  url="/cppLogo.png"
                  scale={[2.2, 2.2 / commonRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              Programming fundamentals & competitive programming in C++
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
              EPI - ESIEA partnership program
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
              A grant to complete my master&apos;s degree in ESIEA
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
          marginBottom={0.2}
        >
          <Box margin={0.2}>
            <mesh position={[2.5 / 2, -1, 0]}>
              <planeGeometry args={[2.5, 2]} />

              <meshStandardMaterial color={"#2d4059"} />
            </mesh>
            <Box flexDirection="column" padding={0.1} justifyContent={"center"}>
              <Box centerAnchor justifyContent={"center"} marginTop={0.1}>
                <Image
                  url="/esieaLogo.png"
                  scale={[2.1, 2.1 / esieaRatio, 1]}
                  transparent
                />
              </Box>
              <Box
                marginBottom={0.5}
                marginTop={0.22}
                justifyContent={"center"}
              >
                <Text fontSize={0.12} letterSpacing={0.1}>
                  September 2021 - September 2023
                  <meshStandardMaterial
                    emissive={"yellow"}
                    emissiveIntensity={1.5}
                  />
                </Text>
              </Box>
            </Box>
          </Box>
          <Box margin={0.2}>
            <Text fontSize={0.4} maxWidth={1} textAlign="center">
              4th & 5th year
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
              Software Engineering Student
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
          marginBottom={0.2}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={"Focus on:"}
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
          marginBottom={0.5}
          justifyContent={"center"}
          alignItems={"center"}
          marginLeft={vpWidth * 0.01}
        >
          <StaticText
            text={
              " - Design patterns\n\n - Statistics & Data analysis\n\n - Machine learning fundamentals\n\n - Programming good practices\nand rituals like the Agile method\n\n - DevOps fundamentals"
            }
            color={"white"}
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
                  url="/springLogo.png"
                  scale={[2.2, 2.2 / commonRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              Design patterns practice with the Spring Framework
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
                  url="/pythonLogo.png"
                  scale={[2.2, 2.2 / commonRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              Data analysis with python&apos;s libraries (numpy, pandas...)
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
                  url="/googleCloudLogo.png"
                  scale={[2.2, 2.2 / commonRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              DevOps fundamentals (also in AWS and MS Azure)
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
                  url="/gitLogo.png"
                  scale={[2.2, 2.2 / gitRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              Version control & git fundamentals
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
                  scale={[2.2, 2.2 / commonRatio, 1]}
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
                  url="/kafkaLogo.png"
                  scale={[2.2, 2.2 / kafkaRatio, 1]}
                  transparent
                />
              </Box>
            </Box>
          </Box>
          <Box margin={0.1}>
            <Text fontSize={0.22} maxWidth={1} textAlign="left">
              Event streaming & Event driven design implementation with Kafka
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
              Extracurricular...
              <meshStandardMaterial
                emissive={"skyblue"}
                emissiveIntensity={2}
              />
            </Text>
          </Box>
        </Box>
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          marginTop={0.4}
          marginBottom={0.22}
        >
          <Box margin={0.1}>
            <Text
              fontSize={0.2}
              letterSpacing={0.1}
              maxWidth={vpWidth * 0.8}
              textAlign="center"
            >
              Student job
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
              English teacher with Complétude
              <meshStandardMaterial
                emissive={"white"}
                emissiveIntensity={1.5}
              />
            </Text>
          </Box>
        </Box>
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          marginTop={0.4}
          marginBottom={0.22}
        >
          <Box margin={0.1}>
            <Text
              fontSize={0.2}
              letterSpacing={0.1}
              maxWidth={vpWidth * 0.8}
              textAlign="center"
            >
              Competitive programming
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
              IEEEXTREME
              <meshStandardMaterial
                emissive={"white"}
                emissiveIntensity={1.5}
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
              Google HASH Code
              <meshStandardMaterial
                emissive={"white"}
                emissiveIntensity={1.5}
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
              TCPC
              <meshStandardMaterial
                emissive={"white"}
                emissiveIntensity={1.5}
              />
            </Text>
          </Box>
        </Box>
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          marginTop={0.4}
          marginBottom={0.22}
        >
          <Box margin={0.1}>
            <Text
              fontSize={0.2}
              letterSpacing={0.1}
              maxWidth={vpWidth * 0.8}
              textAlign="center"
            >
              Certifications
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
              SAP Certified Associate Back-End Developer SAP Cloud Application
              Programming Model
              <meshStandardMaterial
                emissive={"white"}
                emissiveIntensity={1.5}
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
              TOEIC (Score : 975/990)
              <meshStandardMaterial
                emissive={"white"}
                emissiveIntensity={1.5}
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
              CCNA 1, CCNA 2
              <meshStandardMaterial
                emissive={"white"}
                emissiveIntensity={1.5}
              />
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
  // useEffect(() => void onScroll({ target: scrollArea.current }), []);
  const [pages, setPages] = useState(0);
  const [clicked, setClicked] = useState(false);
  const { scene, setScene } = useScene();
  const message = "Home Page";
  const caracter = "Astronaut_FernandoTheFlamingo";

  const handlePointerDown = () => {
    setClicked(true);
  };

  const handleOnClick = (data) => {
    setScene(data);
  };

  return (
    <>
      <Canvas
        // className={clsx(" absolute", className)}
        camera={{ position: [0, 0, 2], zoom: 1 }}
        // orthographic
        // pixelRatio={window.devicePixelRatio}
      >
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
