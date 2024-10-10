"use client";
import React, { useRef, useState } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import Banner from "@/components/models/Banner";

import font from "@public/fonts/gt.json";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/earth_stylized_low_poly.glb");
  const { onData } = props;
  const [hovered, setHovered] = useState(false);

  const [emissiveIntensity, setEmissiveIntensity] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [text, setText] = useState("");

  const globeMoveRef = useRef();
  const cloudMoveRef = useRef();

  const handlePointerDown = () => {
    setClicked((prev) => !prev);

    onData(clicked);
    // console.log("CV downloaded");
  };

  const handlePointerEnter = () => {
    setText("To download the CV");
    setHovered(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    setText("");
  };

  useFrame((state, delta) => {
    globeMoveRef.current.rotation.y += Math.abs(
      0.05 * Math.sin(state.clock.elapsedTime)
    );
    cloudMoveRef.current.rotation.y =
      -10 * Math.sin(0.07 * state.clock.elapsedTime + 5);
    if (hovered) {
      setEmissiveIntensity((prev) => Math.min(prev + delta, 0.5));
    } else {
      setEmissiveIntensity((prev) => Math.max(prev - delta * 2, 0));
    }
  });

  return (
    <group
      {...props}
      dispose={null}
      rotation={[Math.PI, 0, 0]}
      scale={0.0035}
      position={[0, 0, 0]}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <Float speed={1}>
        <Banner
          text={text}
          color={"white"}
          position={[-7.3, -1, 0]}
          scale={22}
          font={font}
          rotation={[-Math.PI, 0, 0]}
        />

        <group ref={cloudMoveRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.cloud002_proprty_0.geometry}
            material={materials.proprty}
            position={[74.256, 109.024, -33.825]}
            rotation={[1.335, 0.705, -1.655]}
            scale={0.177}
            material-emissive={"white"}
            material-emissiveIntensity={emissiveIntensity}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.cloud004_proprty_0.geometry}
            material={materials.proprty}
            position={[-117.7, 29.651, 86.895]}
            rotation={[1.745, -0.36, 1.002]}
            scale={0.171}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.cloud006_proprty_0.geometry}
            material={materials.proprty}
            position={[-128.882, 81.994, 10.342]}
            rotation={[0.384, -0.123, 0.965]}
            scale={0.196}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.cloud007_proprty_0.geometry}
            material={materials.proprty}
            position={[66.057, -113.547, 35.058]}
            rotation={[0.91, -1.061, -1.868]}
            scale={0.172}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.cloud009_proprty_0.geometry}
            material={materials.proprty}
            position={[-15.106, 107.607, -111.939]}
            rotation={[-0.79, -0.154, 0.098]}
            scale={0.167}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.cloud011_proprty_0.geometry}
            material={materials.proprty}
            position={[147.522, 23.645, 24.105]}
            rotation={[1.094, 0.016, -1.231]}
            scale={0.224}
          />
        </group>
      </Float>

      <group ref={globeMoveRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.earth001_earth_0.geometry}
          material={materials.earth}
          material-emissive={"red"}
          material-emissiveIntensity={emissiveIntensity}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house001_proprty_0.geometry}
          material={materials.proprty}
          position={[10.289, 68.065, 78.637]}
          rotation={[0.913, 0.283, -0.029]}
          scale={[0.026, 0.026, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house002_proprty_0.geometry}
          material={materials.proprty}
          position={[94.474, -53.271, 30.684]}
          rotation={[2.85, 0.033, -1.11]}
          scale={[0.024, 0.024, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house003_proprty_0.geometry}
          material={materials.proprty}
          position={[-78.94, 30.151, -67.857]}
          rotation={[-1.025, -0.075, 0.831]}
          scale={[0.027, 0.027, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house004_proprty_0.geometry}
          material={materials.proprty}
          position={[110.203, -17.066, 9.845]}
          rotation={[-2.939, 0.097, -1.226]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house005_proprty_0.geometry}
          material={materials.proprty}
          position={[-101.524, -14.492, -52.81]}
          rotation={[-0.903, -0.265, 1.256]}
          scale={[0.027, 0.027, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house006_proprty_0.geometry}
          material={materials.proprty}
          position={[-71.904, 40.756, -74.673]}
          rotation={[-1.152, 0.198, 1.036]}
          scale={[0.027, 0.027, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house007_proprty_0.geometry}
          material={materials.proprty}
          position={[59.778, -3.22, 89.487]}
          rotation={[1.84, 0.443, -0.544]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house008_proprty_0.geometry}
          material={materials.proprty}
          position={[12.74, 33.242, 100.691]}
          rotation={[1.271, 0.365, -0.159]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house009_proprty_0.geometry}
          material={materials.proprty}
          position={[106.269, -29.965, 17.968]}
          rotation={[-2.568, 0.275, -1.358]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house010_proprty_0.geometry}
          material={materials.proprty}
          position={[109.646, -9.518, 31.355]}
          rotation={[-1.919, 0.083, -1.472]}
          scale={[0.027, 0.027, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house011_proprty_0.geometry}
          material={materials.proprty}
          position={[108.476, -22.123, 33.236]}
          rotation={[-2.332, -0.001, -1.457]}
          scale={[0.027, 0.027, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house012_proprty_0.geometry}
          material={materials.proprty}
          position={[99.396, -47.118, 48.44]}
          rotation={[3.055, 0.093, -0.471]}
          scale={[0.024, 0.024, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house013_proprty_0.geometry}
          material={materials.proprty}
          position={[105.828, -7.636, 46.791]}
          rotation={[0.653, -0.284, -1.175]}
          scale={[0.026, 0.026, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house014_proprty_0.geometry}
          material={materials.proprty}
          position={[83.899, 2.014, 76.762]}
          rotation={[2.582, 0.648, -0.748]}
          scale={[0.026, 0.026, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house015_proprty_0.geometry}
          material={materials.proprty}
          position={[89.871, -4.48, 67.515]}
          rotation={[2.051, 0.366, -0.729]}
          scale={[0.027, 0.027, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house016_proprty_0.geometry}
          material={materials.proprty}
          position={[83.591, -19.516, 69.987]}
          rotation={[2.026, 0.341, -0.72]}
          scale={[0.024, 0.024, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house017_proprty_0.geometry}
          material={materials.proprty}
          position={[82.055, -6.652, 73.438]}
          rotation={[1.514, -0.276, -0.703]}
          scale={[0.026, 0.026, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house018_proprty_0.geometry}
          material={materials.proprty}
          position={[63.93, 9.523, 88.741]}
          rotation={[1.975, 0.219, -0.386]}
          scale={[0.027, 0.027, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house019_proprty_0.geometry}
          material={materials.proprty}
          position={[-75.751, 22.862, -75.901]}
          rotation={[-1.564, 0.248, 1.024]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house020_proprty_0.geometry}
          material={materials.proprty}
          position={[42.049, 40.613, 98.212]}
          rotation={[1.418, 0.307, -0.009]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house021_proprty_0.geometry}
          material={materials.proprty}
          position={[106.672, -23.841, 51.454]}
          rotation={[1.444, 0.09, -1.179]}
          scale={[0.026, 0.026, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house022_proprty_0.geometry}
          material={materials.proprty}
          position={[106.195, -14.765, 48.886]}
          rotation={[0.978, -0.106, -1.183]}
          scale={[0.026, 0.026, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house023_proprty_0.geometry}
          material={materials.proprty}
          position={[109.911, -26.16, 44.183]}
          rotation={[1.189, -0.018, -1.17]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house024_proprty_0.geometry}
          material={materials.proprty}
          position={[109.252, -14.35, 39.911]}
          rotation={[1.204, 0.113, -1.398]}
          scale={[0.028, 0.028, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house025_proprty_0.geometry}
          material={materials.proprty}
          position={[84.855, -70.376, 32.828]}
          rotation={[2.333, -0.198, -1.032]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house026_proprty_0.geometry}
          material={materials.proprty}
          position={[109.637, -2.399, 34.966]}
          rotation={[1.163, -0.112, -1.458]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house027_proprty_0.geometry}
          material={materials.proprty}
          position={[110.385, -3.289, 29.619]}
          rotation={[2.29, 0.055, -1.421]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house028_proprty_0.geometry}
          material={materials.proprty}
          position={[108.386, -7.888, 41.184]}
          rotation={[1.351, -0.089, -1.439]}
          scale={[0.024, 0.024, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house029_proprty_0.geometry}
          material={materials.proprty}
          position={[-22.447, 66.923, 75.502]}
          rotation={[0.446, 0.85, 0.17]}
          scale={[0.024, 0.024, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house030_proprty_0.geometry}
          material={materials.proprty}
          position={[-8.467, 50.905, 91.791]}
          rotation={[0.893, 0.775, 0.173]}
          scale={[0.026, 0.026, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house031_proprty_0.geometry}
          material={materials.proprty}
          position={[59.224, 2.255, 90.903]}
          rotation={[1.797, 0.14, -0.592]}
          scale={[0.026, 0.026, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house032_proprty_0.geometry}
          material={materials.proprty}
          position={[65.901, 1.743, 86.367]}
          rotation={[1.667, -0.054, -0.587]}
          scale={[0.027, 0.027, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house034_proprty_0.geometry}
          material={materials.proprty}
          position={[-101.799, 13.403, -44.758]}
          rotation={[-0.748, -0.214, 1.005]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house035_proprty_0.geometry}
          material={materials.proprty}
          position={[-99.183, 6.477, -52.888]}
          rotation={[-1.722, 0.394, 1.104]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house036_proprty_0.geometry}
          material={materials.proprty}
          position={[-10.536, 66.133, 78.527]}
          rotation={[0.874, -0.342, 0.098]}
          scale={[0.027, 0.027, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house037_proprty_0.geometry}
          material={materials.proprty}
          position={[1.984, 67.93, 78.469]}
          rotation={[0.936, -0.802, 0.132]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house038_proprty_0.geometry}
          material={materials.proprty}
          position={[-7.295, 59.549, 84.819]}
          rotation={[0.897, -0.549, 0.108]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house039_proprty_0.geometry}
          material={materials.proprty}
          position={[-27.765, 63.464, 77.985]}
          rotation={[0.928, -0.395, 0.15]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house040_proprty_0.geometry}
          material={materials.proprty}
          position={[-16.463, 64.732, 78.973]}
          rotation={[0.985, -0.689, 0.18]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house041_proprty_0.geometry}
          material={materials.proprty}
          position={[-15.439, 58.555, 84.372]}
          rotation={[0.673, 0.953, 0.24]}
          scale={[0.027, 0.027, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house043_proprty_0.geometry}
          material={materials.proprty}
          position={[6.34, 25.578, 103.936]}
          rotation={[1.437, -0.041, -0.044]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house044_proprty_0.geometry}
          material={materials.proprty}
          position={[-95.588, -1.608, -60.923]}
          rotation={[-1.613, 0.165, 0.953]}
          scale={[0.027, 0.027, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house045_proprty_0.geometry}
          material={materials.proprty}
          position={[-100.036, -0.173, -54.539]}
          rotation={[-1.286, -0.073, 0.937]}
          scale={[0.028, 0.028, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house046_proprty_0.geometry}
          material={materials.proprty}
          position={[-97.918, -13.504, -59.952]}
          rotation={[-0.8, -0.388, 1.052]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house047_proprty_0.geometry}
          material={materials.proprty}
          position={[-83.499, 15.81, -69.346]}
          rotation={[-0.867, -0.269, 0.878]}
          scale={[0.027, 0.027, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house048_proprty_0.geometry}
          material={materials.proprty}
          position={[-90.31, 15.676, -61.24]}
          rotation={[-1.421, 0.216, 0.862]}
          scale={[0.024, 0.024, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house049_proprty_0.geometry}
          material={materials.proprty}
          position={[-91.327, 6.116, -64]}
          rotation={[-0.692, -0.398, 0.935]}
          scale={[0.024, 0.024, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house050_proprty_0.geometry}
          material={materials.proprty}
          position={[-81.588, 5.131, -74.912]}
          rotation={[-0.825, -0.459, 0.886]}
          scale={[0.026, 0.026, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house051_proprty_0.geometry}
          material={materials.proprty}
          position={[-77.528, 15.105, -76.419]}
          rotation={[-2.109, 0.633, 1.038]}
          scale={[0.026, 0.026, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house052_proprty_0.geometry}
          material={materials.proprty}
          position={[-89.149, 1.382, -68.336]}
          rotation={[-0.866, -0.428, 0.868]}
          scale={[0.024, 0.024, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house053_proprty_0.geometry}
          material={materials.proprty}
          position={[34.812, 11.529, 99.914]}
          rotation={[1.315, -0.554, -0.288]}
          scale={[0.027, 0.027, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house054_proprty_0.geometry}
          material={materials.proprty}
          position={[-21.275, 44.363, 93.962]}
          rotation={[0.952, -0.183, 0.176]}
          scale={[0.024, 0.024, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house055_proprty_0.geometry}
          material={materials.proprty}
          position={[-29.441, 58.403, 81.474]}
          rotation={[0.935, -0.087, 0.174]}
          scale={[0.027, 0.027, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house056_proprty_0.geometry}
          material={materials.proprty}
          position={[-107.52, 10.671, -29.064]}
          rotation={[-0.259, -0.226, 1.299]}
          scale={[0.028, 0.028, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house057_proprty_0.geometry}
          material={materials.proprty}
          position={[-85.135, 25.936, -62.331]}
          rotation={[-0.686, -0.213, 0.909]}
          scale={[0.027, 0.027, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house058_proprty_0.geometry}
          material={materials.proprty}
          position={[-90, 29.762, -52.36]}
          rotation={[-1.175, 0.182, 0.901]}
          scale={[0.027, 0.027, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house059_proprty_0.geometry}
          material={materials.proprty}
          position={[73.197, -19.404, 77.19]}
          rotation={[1.85, 0.027, -0.693]}
          scale={[0.028, 0.028, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house060_proprty_0.geometry}
          material={materials.proprty}
          position={[75.025, -37.002, 71.001]}
          rotation={[2.328, 0.525, -0.829]}
          scale={[0.024, 0.024, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house061_proprty_0.geometry}
          material={materials.proprty}
          position={[62.07, -18.16, 87.055]}
          rotation={[2.315, 0.514, -0.823]}
          scale={[0.026, 0.026, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house062_proprty_0.geometry}
          material={materials.proprty}
          position={[-104.207, 17.629, -33.984]}
          rotation={[-0.522, -0.057, 1.079]}
          scale={[0.026, 0.026, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house063_proprty_0.geometry}
          material={materials.proprty}
          position={[-8.503, 17.526, 105.328]}
          rotation={[1.316, 0.639, 0.133]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house064_proprty_0.geometry}
          material={materials.proprty}
          position={[-21.378, 16.282, 104.151]}
          rotation={[1.455, -0.514, 0.122]}
          scale={[0.026, 0.026, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house065_proprty_0.geometry}
          material={materials.proprty}
          position={[60.11, -10.838, 89.754]}
          rotation={[1.36, -0.285, -0.637]}
          scale={[0.028, 0.028, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house066_proprty_0.geometry}
          material={materials.proprty}
          position={[65.688, -7.11, 85.854]}
          rotation={[1.663, 0.139, -0.615]}
          scale={[0.027, 0.027, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house067_proprty_0.geometry}
          material={materials.proprty}
          position={[-94.276, 12.107, -57.739]}
          rotation={[-0.609, -0.408, 1.036]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house069_proprty_0.geometry}
          material={materials.proprty}
          position={[-93.272, -6.47, -66.357]}
          rotation={[-0.678, -0.369, 1.01]}
          scale={[0.028, 0.028, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.house070_proprty_0.geometry}
          material={materials.proprty}
          position={[-36.644, 22.736, 98.111]}
          rotation={[1.162, 0.567, 0.464]}
          scale={[0.024, 0.024, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green001_proprty_0.geometry}
          material={materials.proprty}
          position={[13.291, 94.778, 40.1]}
          rotation={[0.665, 0.282, 0.05]}
          scale={[0.029, 0.045, 0.029]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green002_proprty_0.geometry}
          material={materials.proprty}
          position={[17.46, 48.279, 93.086]}
          rotation={[1.035, 0.074, -0.029]}
          scale={[0.018, 0.027, 0.018]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green003_proprty_0.geometry}
          material={materials.proprty}
          position={[56.772, 82.321, 35.565]}
          rotation={[0.388, -0.103, -0.39]}
          scale={[0.034, 0.052, 0.034]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green004_proprty_0.geometry}
          material={materials.proprty}
          position={[28.782, 95.631, 25.382]}
          rotation={[0.107, 0.253, -0.443]}
          scale={[0.022, 0.033, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green005_proprty_0.geometry}
          material={materials.proprty}
          position={[25.171, 94.818, 34.054]}
          rotation={[0.127, -0.706, -0.247]}
          scale={[0.032, 0.05, 0.032]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green006_proprty_0.geometry}
          material={materials.proprty}
          position={[34.079, 89.009, 44.969]}
          rotation={[0.382, 0.351, -0.369]}
          scale={[0.035, 0.053, 0.035]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green007_proprty_0.geometry}
          material={materials.proprty}
          position={[49.394, 51.527, 95.685]}
          rotation={[1.257, 0.506, 0.014]}
          scale={[0.023, 0.035, 0.023]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green008_proprty_0.geometry}
          material={materials.proprty}
          position={[42.289, 82.977, 49.968]}
          rotation={[0.457, 0.331, -0.477]}
          scale={[0.023, 0.036, 0.023]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green009_proprty_0.geometry}
          material={materials.proprty}
          position={[47.198, 69.438, 70.929]}
          rotation={[0.78, 0.918, -0.222]}
          scale={[0.024, 0.036, 0.024]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green010_proprty_0.geometry}
          material={materials.proprty}
          position={[31.385, 99.031, 2.812]}
          rotation={[0.569, 0.558, -0.74]}
          scale={[0.031, 0.048, 0.031]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green011_proprty_0.geometry}
          material={materials.proprty}
          position={[3.026, 48.671, 93.36]}
          rotation={[1.017, -0.008, -0.036]}
          scale={[0.035, 0.053, 0.035]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green012_proprty_0.geometry}
          material={materials.proprty}
          position={[59.672, 78.243, 1.418]}
          rotation={[0.083, 0.085, -0.62]}
          scale={[0.018, 0.028, 0.018]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green013_proprty_0.geometry}
          material={materials.proprty}
          position={[66.324, 73.16, 17.41]}
          rotation={[-0.39, -0.515, -0.727]}
          scale={[0.027, 0.042, 0.027]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green014_proprty_0.geometry}
          material={materials.proprty}
          position={[87.419, -41.076, 67.563]}
          rotation={[1.862, 0.79, -0.216]}
          scale={[0.03, 0.045, 0.03]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green015_proprty_0.geometry}
          material={materials.proprty}
          position={[-106.516, -10.881, -41.69]}
          rotation={[-1.704, 0.159, 1.254]}
          scale={[0.03, 0.046, 0.03]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green016_proprty_0.geometry}
          material={materials.proprty}
          position={[93.056, 49.918, 18.253]}
          rotation={[0.439, 0.325, -0.776]}
          scale={[0.016, 0.025, 0.016]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green017_proprty_0.geometry}
          material={materials.proprty}
          position={[80.063, 61.27, 20.441]}
          rotation={[-0.107, -0.263, -0.759]}
          scale={[0.029, 0.045, 0.029]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green018_proprty_0.geometry}
          material={materials.proprty}
          position={[105.232, 33.874, 16.867]}
          rotation={[0.25, 0.129, -0.997]}
          scale={[0.033, 0.05, 0.033]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green019_proprty_0.geometry}
          material={materials.proprty}
          position={[-83.648, -36.497, -80.662]}
          rotation={[-1.678, 0.192, 1.159]}
          scale={[0.02, 0.031, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green020_proprty_0.geometry}
          material={materials.proprty}
          position={[87.602, -66.063, 31.77]}
          rotation={[2.949, 0.161, -1.032]}
          scale={[0.024, 0.037, 0.024]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green021_proprty_0.geometry}
          material={materials.proprty}
          position={[-82.891, -40.133, -81.543]}
          rotation={[-2.416, 0.105, 1.108]}
          scale={[0.027, 0.041, 0.027]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green022_proprty_0.geometry}
          material={materials.proprty}
          position={[-121.432, -2.04, -12.135]}
          rotation={[-0.931, -0.174, 0.898]}
          scale={[0.029, 0.044, 0.029]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green023_proprty_0.geometry}
          material={materials.proprty}
          position={[-113.961, 29.009, 12.463]}
          rotation={[0.919, -0.025, 0.98]}
          scale={[0.024, 0.037, 0.024]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green024_proprty_0.geometry}
          material={materials.proprty}
          position={[-109.748, -21.128, -36.814]}
          rotation={[-1.841, 0.278, 1.123]}
          scale={[0.036, 0.055, 0.036]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green025_proprty_0.geometry}
          material={materials.proprty}
          position={[-100.436, -36.236, -51.055]}
          rotation={[-1.53, -0.295, 0.68]}
          scale={[0.023, 0.036, 0.023]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green026_proprty_0.geometry}
          material={materials.proprty}
          position={[-61.912, 32.998, -85.77]}
          rotation={[-0.713, -0.675, 0.643]}
          scale={[0.022, 0.033, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green027_proprty_0.geometry}
          material={materials.proprty}
          position={[-70.232, 50.028, -66.575]}
          rotation={[-0.919, 0.218, 0.92]}
          scale={[0.023, 0.036, 0.023]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green028_proprty_0.geometry}
          material={materials.proprty}
          position={[-117.612, 23.137, 7.208]}
          rotation={[1.006, -0.195, 1.276]}
          scale={[0.017, 0.026, 0.017]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green029_proprty_0.geometry}
          material={materials.proprty}
          position={[-115.783, 27.377, 9.91]}
          rotation={[-0.388, 0.263, 1.335]}
          scale={[0.019, 0.03, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green030_proprty_0.geometry}
          material={materials.proprty}
          position={[-112.762, -42.868, -34.576]}
          rotation={[2.561, 0.514, 0.966]}
          scale={[0.028, 0.042, 0.028]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green031_proprty_0.geometry}
          material={materials.proprty}
          position={[97.412, 45.324, 0.286]}
          rotation={[-0.132, 0.105, -0.9]}
          scale={[0.026, 0.04, 0.026]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green032_proprty_0.geometry}
          material={materials.proprty}
          position={[-111.683, -35.788, -24.685]}
          rotation={[2.402, -0.051, 0.649]}
          scale={[0.035, 0.054, 0.035]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green034_proprty_0.geometry}
          material={materials.proprty}
          position={[-95.29, -31.81, -57.281]}
          rotation={[-1.674, -0.275, 0.802]}
          scale={[0.022, 0.034, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green035_proprty_0.geometry}
          material={materials.proprty}
          position={[-93.845, -38.482, -56.126]}
          rotation={[-2.517, 0.512, 0.917]}
          scale={[0.022, 0.034, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green036_proprty_0.geometry}
          material={materials.proprty}
          position={[-73.713, -54.262, -71.308]}
          rotation={[-2.344, -0.343, -0.078]}
          scale={[0.032, 0.049, 0.032]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green037_proprty_0.geometry}
          material={materials.proprty}
          position={[-83.311, -25.479, -76.805]}
          rotation={[-0.571, -0.58, 0.891]}
          scale={[0.025, 0.038, 0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green038_proprty_0.geometry}
          material={materials.proprty}
          position={[-67.259, 29.586, -83.488]}
          rotation={[-0.882, -0.371, 0.886]}
          scale={[0.022, 0.034, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green039_proprty_0.geometry}
          material={materials.proprty}
          position={[-73.616, 34.546, -76.688]}
          rotation={[-0.49, -0.21, 1.041]}
          scale={[0.024, 0.037, 0.024]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green040_proprty_0.geometry}
          material={materials.proprty}
          position={[-60.95, 54.874, -71.889]}
          rotation={[-0.173, -0.537, 0.78]}
          scale={[0.025, 0.038, 0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green041_proprty_0.geometry}
          material={materials.proprty}
          position={[98.816, 21.13, -11.387]}
          rotation={[-1.148, 0.54, -1.145]}
          scale={[0.031, 0.047, 0.031]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green042_proprty_0.geometry}
          material={materials.proprty}
          position={[69.025, 43.8, 90.207]}
          rotation={[0.89, -0.061, -0.665]}
          scale={[0.028, 0.043, 0.028]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green043_proprty_0.geometry}
          material={materials.proprty}
          position={[64.457, 47.922, 91.609]}
          rotation={[0.912, -0.032, -0.664]}
          scale={[0.021, 0.032, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green044_proprty_0.geometry}
          material={materials.proprty}
          position={[-113.822, -34.942, -36.356]}
          rotation={[-1.475, 0.04, 1.432]}
          scale={[0.032, 0.049, 0.032]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green045_proprty_0.geometry}
          material={materials.proprty}
          position={[101.671, -40.291, 15.809]}
          rotation={[2.926, -0.052, -1.139]}
          scale={[0.037, 0.056, 0.037]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green046_proprty_0.geometry}
          material={materials.proprty}
          position={[104.693, -44.75, 41.462]}
          rotation={[-3.1, -0.562, -0.701]}
          scale={[0.023, 0.036, 0.023]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green047_proprty_0.geometry}
          material={materials.proprty}
          position={[-80.258, -39.219, -84.381]}
          rotation={[-1.846, -0.324, 0.679]}
          scale={[0.034, 0.053, 0.034]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green048_proprty_0.geometry}
          material={materials.proprty}
          position={[-82.183, -38.318, -83.253]}
          rotation={[-2.296, 0.259, 0.664]}
          scale={[0.018, 0.027, 0.018]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green049_proprty_0.geometry}
          material={materials.proprty}
          position={[67.225, -54.943, 67.384]}
          rotation={[1.898, -0.609, -0.178]}
          scale={[0.018, 0.028, 0.018]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green050_proprty_0.geometry}
          material={materials.proprty}
          position={[60.815, -59.955, 66.123]}
          rotation={[1.887, -0.655, -0.184]}
          scale={[0.026, 0.039, 0.026]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green051_proprty_0.geometry}
          material={materials.proprty}
          position={[11.548, 12.105, 104.894]}
          rotation={[1.812, 0.956, -0.2]}
          scale={[0.028, 0.043, 0.028]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green052_proprty_0.geometry}
          material={materials.proprty}
          position={[-69.811, 54.808, -60.32]}
          rotation={[-0.131, -0.437, 0.848]}
          scale={[0.019, 0.029, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green053_proprty_0.geometry}
          material={materials.proprty}
          position={[53.299, -73.234, 60.884]}
          rotation={[2.119, -0.523, -0.467]}
          scale={[0.032, 0.049, 0.032]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green054_proprty_0.geometry}
          material={materials.proprty}
          position={[69.982, 42.28, 90.748]}
          rotation={[0.773, -0.16, -0.54]}
          scale={[0.019, 0.029, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green055_proprty_0.geometry}
          material={materials.proprty}
          position={[98.5, -45.97, 24.711]}
          rotation={[3.063, -0.037, -1.137]}
          scale={[0.031, 0.048, 0.031]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green056_proprty_0.geometry}
          material={materials.proprty}
          position={[95.647, -52.102, 15.689]}
          rotation={[2.483, -0.277, -1.231]}
          scale={[0.037, 0.057, 0.037]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green057_proprty_0.geometry}
          material={materials.proprty}
          position={[91.765, -60.464, 23.354]}
          rotation={[2.834, -0.14, -1.158]}
          scale={[0.034, 0.052, 0.034]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green058_proprty_0.geometry}
          material={materials.proprty}
          position={[98.5, -45.97, 24.711]}
          rotation={[-2.878, 0.12, -1.152]}
          scale={[0.032, 0.049, 0.032]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green059_proprty_0.geometry}
          material={materials.proprty}
          position={[108.656, -18.359, 31.353]}
          rotation={[-2.582, 0.005, -1.442]}
          scale={[0.036, 0.055, 0.036]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green060_proprty_0.geometry}
          material={materials.proprty}
          position={[45.204, 52.346, 94.659]}
          rotation={[0.823, 0.7, 0.188]}
          scale={[0.016, 0.025, 0.016]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green061_proprty_0.geometry}
          material={materials.proprty}
          position={[106.487, -0.946, 44.443]}
          rotation={[2.905, 0.234, -1.28]}
          scale={[0.028, 0.044, 0.028]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green062_proprty_0.geometry}
          material={materials.proprty}
          position={[79.738, -57.803, 56.168]}
          rotation={[2.44, -0.094, -0.667]}
          scale={[0.028, 0.043, 0.028]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green063_proprty_0.geometry}
          material={materials.proprty}
          position={[-112.676, -42.465, -38.346]}
          rotation={[2.768, 0.417, 0.94]}
          scale={[0.024, 0.037, 0.024]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green064_proprty_0.geometry}
          material={materials.proprty}
          position={[93.635, -28.739, 66.135]}
          rotation={[1.259, -0.483, -0.399]}
          scale={[0.029, 0.044, 0.029]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green065_proprty_0.geometry}
          material={materials.proprty}
          position={[98.864, -40.105, 64.735]}
          rotation={[1.721, -0.305, -0.526]}
          scale={[0.035, 0.055, 0.035]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green066_proprty_0.geometry}
          material={materials.proprty}
          position={[93.898, -46.247, 64.039]}
          rotation={[2.162, 0.167, -0.167]}
          scale={[0.032, 0.05, 0.032]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green067_proprty_0.geometry}
          material={materials.proprty}
          position={[75.143, -72.487, 42.979]}
          rotation={[1.987, -0.531, -0.807]}
          scale={[0.024, 0.037, 0.024]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green068_proprty_0.geometry}
          material={materials.proprty}
          position={[-115.848, 15.981, 15.35]}
          rotation={[1.341, 0.532, 1.132]}
          scale={[0.035, 0.053, 0.035]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green070_proprty_0.geometry}
          material={materials.proprty}
          position={[-115.354, -15.879, -25.279]}
          rotation={[-1.733, 0.394, 0.947]}
          scale={[0.016, 0.025, 0.016]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green071_proprty_0.geometry}
          material={materials.proprty}
          position={[93.513, 50.086, 10.347]}
          rotation={[0.713, 0.548, -1.038]}
          scale={[0.035, 0.053, 0.035]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green072_proprty_0.geometry}
          material={materials.proprty}
          position={[88.489, 55.465, 3.218]}
          rotation={[-0.483, -0.398, -0.923]}
          scale={[0.034, 0.052, 0.034]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green073_proprty_0.geometry}
          material={materials.proprty}
          position={[97.662, 45.526, 4.556]}
          rotation={[0.114, 0.114, -0.833]}
          scale={[0.03, 0.046, 0.03]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green074_proprty_0.geometry}
          material={materials.proprty}
          position={[93.513, 50.086, 10.347]}
          rotation={[-0.419, -0.351, -0.9]}
          scale={[0.029, 0.044, 0.029]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green075_proprty_0.geometry}
          material={materials.proprty}
          position={[79.856, 59.287, 46.385]}
          rotation={[0.543, 0.669, -0.63]}
          scale={[0.036, 0.055, 0.036]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green076_proprty_0.geometry}
          material={materials.proprty}
          position={[-75.751, 22.862, -75.901]}
          rotation={[-2.013, 0.464, 1.183]}
          scale={[0.031, 0.048, 0.031]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green077_proprty_0.geometry}
          material={materials.proprty}
          position={[86.247, -52.055, 61.099]}
          rotation={[2.706, -0.148, -0.353]}
          scale={[0.024, 0.037, 0.024]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green078_proprty_0.geometry}
          material={materials.proprty}
          position={[-88.352, -38.615, -67.905]}
          rotation={[-2.614, -0.029, 1.037]}
          scale={[0.027, 0.042, 0.027]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green079_proprty_0.geometry}
          material={materials.proprty}
          position={[42.909, 59.27, 85.067]}
          rotation={[0.863, -0.52, 0.053]}
          scale={[0.019, 0.03, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green080_proprty_0.geometry}
          material={materials.proprty}
          position={[28.519, 60.321, 83.487]}
          rotation={[0.961, 0.705, -0.073]}
          scale={[0.02, 0.03, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green081_proprty_0.geometry}
          material={materials.proprty}
          position={[84.587, 59.357, 0.427]}
          rotation={[-0.497, -0.515, -0.91]}
          scale={[0.029, 0.044, 0.029]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green082_proprty_0.geometry}
          material={materials.proprty}
          position={[31.72, 43.203, 97.9]}
          rotation={[1.415, 0.015, -0.009]}
          scale={[0.02, 0.031, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green083_proprty_0.geometry}
          material={materials.proprty}
          position={[105.896, -39.863, 47.898]}
          rotation={[2.5, 0.151, -0.896]}
          scale={[0.033, 0.051, 0.033]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green084_proprty_0.geometry}
          material={materials.proprty}
          position={[-102.608, -19.592, -50.207]}
          rotation={[-2.795, 0.368, 1.17]}
          scale={[0.032, 0.048, 0.032]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green085_proprty_0.geometry}
          material={materials.proprty}
          position={[-96.759, -24.355, -58.794]}
          rotation={[-2.052, -0.023, 1.034]}
          scale={[0.026, 0.039, 0.026]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green086_proprty_0.geometry}
          material={materials.proprty}
          position={[96.363, -49.115, 52.324]}
          rotation={[3.079, 0.064, -0.626]}
          scale={[0.036, 0.055, 0.036]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green087_proprty_0.geometry}
          material={materials.proprty}
          position={[81.735, -39.638, 68.625]}
          rotation={[1.455, -0.512, -0.172]}
          scale={[0.017, 0.026, 0.017]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green089_proprty_0.geometry}
          material={materials.proprty}
          position={[58.675, 38.448, 94.582]}
          rotation={[1.862, 0.601, -0.236]}
          scale={[0.02, 0.031, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green090_proprty_0.geometry}
          material={materials.proprty}
          position={[83.171, -71.78, 23.771]}
          rotation={[-2.722, -0.557, -0.549]}
          scale={[0.017, 0.027, 0.017]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green091_proprty_0.geometry}
          material={materials.proprty}
          position={[80.292, -61.883, 8.498]}
          rotation={[-2.776, -0.324, -0.62]}
          scale={[0.035, 0.053, 0.035]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green092_proprty_0.geometry}
          material={materials.proprty}
          position={[82.635, 54.239, -21.493]}
          rotation={[0.026, 0.524, -1.033]}
          scale={[0.026, 0.039, 0.026]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green093_proprty_0.geometry}
          material={materials.proprty}
          position={[53.559, 83.388, -3.26]}
          rotation={[-0.552, -0.472, -0.741]}
          scale={[0.034, 0.052, 0.034]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green094_proprty_0.geometry}
          material={materials.proprty}
          position={[70.457, -54.64, 66.042]}
          rotation={[2.434, 0.322, -0.386]}
          scale={[0.019, 0.029, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green095_proprty_0.geometry}
          material={materials.proprty}
          position={[-16.154, 45.891, 93.782]}
          rotation={[1.136, -0.77, 0.173]}
          scale={[0.017, 0.026, 0.017]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green096_proprty_0.geometry}
          material={materials.proprty}
          position={[69.923, 70.797, 16.564]}
          rotation={[-0.072, -0.188, -0.577]}
          scale={[0.029, 0.045, 0.029]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green097_proprty_0.geometry}
          material={materials.proprty}
          position={[63.417, 75.709, 0.866]}
          rotation={[0.029, -0.032, -0.566]}
          scale={[0.028, 0.043, 0.028]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green098_proprty_0.geometry}
          material={materials.proprty}
          position={[71.614, 70.162, 7.657]}
          rotation={[0.298, 0.369, -0.612]}
          scale={[0.034, 0.052, 0.034]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green099_proprty_0.geometry}
          material={materials.proprty}
          position={[76.941, 66.249, -0.811]}
          rotation={[-0.591, -0.465, -0.753]}
          scale={[0.019, 0.03, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green100_proprty_0.geometry}
          material={materials.proprty}
          position={[78.773, 61.13, 29.612]}
          rotation={[0.832, 0.652, -0.935]}
          scale={[0.036, 0.055, 0.036]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green101_proprty_0.geometry}
          material={materials.proprty}
          position={[29.804, 23.521, 100.01]}
          rotation={[1.336, -0.519, -0.283]}
          scale={[0.027, 0.042, 0.027]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green102_proprty_0.geometry}
          material={materials.proprty}
          position={[110.217, 17.706, 26.257]}
          rotation={[0.314, 0.049, -1.308]}
          scale={[0.025, 0.038, 0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green103_proprty_0.geometry}
          material={materials.proprty}
          position={[9.274, 74.581, 73.42]}
          rotation={[0.715, 0.939, 0.156]}
          scale={[0.019, 0.028, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green104_proprty_0.geometry}
          material={materials.proprty}
          position={[-99.499, -8.377, -57.532]}
          rotation={[-2.383, 0.303, 1.291]}
          scale={[0.028, 0.043, 0.028]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green105_proprty_0.geometry}
          material={materials.proprty}
          position={[-103.103, -2.844, -49.336]}
          rotation={[-0.62, -0.218, 1.308]}
          scale={[0.027, 0.041, 0.027]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green106_proprty_0.geometry}
          material={materials.proprty}
          position={[110.368, 16.394, 26.83]}
          rotation={[0.108, -0.045, -1.433]}
          scale={[0.033, 0.051, 0.033]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green107_proprty_0.geometry}
          material={materials.proprty}
          position={[-21.825, 1.49, 102.844]}
          rotation={[1.69, -0.726, 0.016]}
          scale={[0.024, 0.037, 0.024]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green108_proprty_0.geometry}
          material={materials.proprty}
          position={[107.387, 27.741, 1.935]}
          rotation={[0.685, 0.222, -1.349]}
          scale={[0.02, 0.031, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green109_proprty_0.geometry}
          material={materials.proprty}
          position={[9.846, 13.363, 105.182]}
          rotation={[1.541, -0.206, -0.049]}
          scale={[0.035, 0.053, 0.035]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green111_proprty_0.geometry}
          material={materials.proprty}
          position={[-81.755, 1.65, -75.656]}
          rotation={[-1.512, 0.239, 1.017]}
          scale={[0.018, 0.027, 0.018]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green112_proprty_0.geometry}
          material={materials.proprty}
          position={[-97.135, 50.806, 8.602]}
          rotation={[0.223, -0.546, 0.573]}
          scale={[0.034, 0.053, 0.034]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green113_proprty_0.geometry}
          material={materials.proprty}
          position={[-14.378, 50.639, 90.701]}
          rotation={[0.994, -0.398, 0.188]}
          scale={[0.024, 0.036, 0.024]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green114_proprty_0.geometry}
          material={materials.proprty}
          position={[-69.132, 0.248, -90.577]}
          rotation={[-1.51, -0.132, 0.832]}
          scale={[0.036, 0.056, 0.036]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green117_proprty_0.geometry}
          material={materials.proprty}
          position={[-26.547, 11.818, 103.432]}
          rotation={[1.34, 0.376, 0.374]}
          scale={[0.022, 0.034, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green118_proprty_0.geometry}
          material={materials.proprty}
          position={[64.952, -39.509, 77.849]}
          rotation={[2.575, 0.739, -0.773]}
          scale={[0.034, 0.053, 0.034]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green119_proprty_0.geometry}
          material={materials.proprty}
          position={[-58.26, 27.198, -88.909]}
          rotation={[-1.248, -0.064, 0.213]}
          scale={[0.017, 0.026, 0.017]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_green120_proprty_0.geometry}
          material={materials.proprty}
          position={[93.673, -39.384, -3.218]}
          rotation={[-2.507, -0.339, -1.147]}
          scale={[0.034, 0.052, 0.034]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock021_proprty_0.geometry}
          material={materials.proprty}
          position={[-110.455, -3.489, -28.01]}
          rotation={[0.016, -0.338, 1.468]}
          scale={0.119}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock022_proprty_0.geometry}
          material={materials.proprty}
          position={[-61.72, 60.64, -62.857]}
          rotation={[0.828, -0.923, 1.473]}
          scale={0.08}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock023_proprty_0.geometry}
          material={materials.proprty}
          position={[-93.121, -28.87, -63.461]}
          rotation={[-0.225, -0.466, 1.627]}
          scale={0.134}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock024_proprty_0.geometry}
          material={materials.proprty}
          position={[-88.735, -34.549, -69.607]}
          rotation={[-0.309, -0.608, 1.37]}
          scale={0.093}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock025_proprty_0.geometry}
          material={materials.proprty}
          position={[-113.961, 29.009, 12.463]}
          rotation={[-3.018, -0.432, 1.988]}
          scale={0.129}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock026_proprty_0.geometry}
          material={materials.proprty}
          position={[-118.773, 10.374, 7.121]}
          rotation={[2.89, -0.071, 1.543]}
          scale={0.137}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock027_proprty_0.geometry}
          material={materials.proprty}
          position={[-88.375, 34.635, -50.475]}
          rotation={[0.307, -0.598, 1.184]}
          scale={0.097}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock028_proprty_0.geometry}
          material={materials.proprty}
          position={[-81.3, -15.764, -77.813]}
          rotation={[-0.544, -0.791, 1.169]}
          scale={0.098}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock029_proprty_0.geometry}
          material={materials.proprty}
          position={[-72.172, 11.208, -86.75]}
          rotation={[-0.505, -0.43, 0.909]}
          scale={0.1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock030_proprty_0.geometry}
          material={materials.proprty}
          position={[-115.839, 10.266, -9.779]}
          rotation={[0.074, -0.496, 1.096]}
          scale={0.125}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock031_proprty_0.geometry}
          material={materials.proprty}
          position={[-119.872, 7.273, -5.405]}
          rotation={[0.909, -0.672, 1.577]}
          scale={0.137}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock032_proprty_0.geometry}
          material={materials.proprty}
          position={[25.859, -53.863, -104.363]}
          rotation={[-1.081, -1.22, 1.279]}
          scale={0.082}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock033_proprty_0.geometry}
          material={materials.proprty}
          position={[54.306, -35.963, -99.12]}
          rotation={[2.102, -0.897, -2.82]}
          scale={0.113}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock034_proprty_0.geometry}
          material={materials.proprty}
          position={[56.75, -27.39, -96.178]}
          rotation={[-1.483, -0.75, -0.273]}
          scale={0.12}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock035_proprty_0.geometry}
          material={materials.proprty}
          position={[78.784, -31.461, -75.631]}
          rotation={[-2.513, -0.552, -1.249]}
          scale={0.122}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock036_proprty_0.geometry}
          material={materials.proprty}
          position={[61.538, -56.119, -68.643]}
          rotation={[2.62, -0.886, -0.955]}
          scale={0.075}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock037_proprty_0.geometry}
          material={materials.proprty}
          position={[55.245, -58.26, -74.416]}
          rotation={[1.256, -0.932, -2.094]}
          scale={0.118}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock038_proprty_0.geometry}
          material={materials.proprty}
          position={[43.714, -42.819, -103.291]}
          rotation={[-1.36, -1.328, -0.247]}
          scale={0.131}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock039_proprty_0.geometry}
          material={materials.proprty}
          position={[-77.325, 44.285, -59.636]}
          rotation={[0.37, -0.602, 1.23]}
          scale={0.089}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock040_proprty_0.geometry}
          material={materials.proprty}
          position={[-71.077, 45.741, -70.572]}
          rotation={[0.541, -0.644, 1.33]}
          scale={0.102}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock041_proprty_0.geometry}
          material={materials.proprty}
          position={[-70.232, 50.028, -66.575]}
          rotation={[0.635, -0.66, 1.387]}
          scale={0.11}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock042_proprty_0.geometry}
          material={materials.proprty}
          position={[19.568, -58.496, -96.29]}
          rotation={[-0.407, -1.142, 2.234]}
          scale={0.117}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock043_proprty_0.geometry}
          material={materials.proprty}
          position={[-90.078, -21.873, -68.7]}
          rotation={[-0.237, -0.697, 1.609]}
          scale={0.102}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock044_proprty_0.geometry}
          material={materials.proprty}
          position={[-95.926, -18.13, -62.559]}
          rotation={[-1.008, -0.566, 1.138]}
          scale={0.141}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock045_proprty_0.geometry}
          material={materials.proprty}
          position={[40.231, -62.104, -79.13]}
          rotation={[0.977, -1.135, -2.567]}
          scale={0.098}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock046_proprty_0.geometry}
          material={materials.proprty}
          position={[-115.783, 27.377, 9.91]}
          rotation={[2.826, -0.246, 1.825]}
          scale={0.093}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock047_proprty_0.geometry}
          material={materials.proprty}
          position={[46.587, -56.865, -86.791]}
          rotation={[2.535, -1.139, -0.65]}
          scale={0.099}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock048_proprty_0.geometry}
          material={materials.proprty}
          position={[64.332, -36.989, -93.933]}
          rotation={[2.414, -0.583, -2.036]}
          scale={0.077}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock049_proprty_0.geometry}
          material={materials.proprty}
          position={[69.757, -31.309, -87.786]}
          rotation={[-2.133, -0.451, -0.977]}
          scale={0.086}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock050_proprty_0.geometry}
          material={materials.proprty}
          position={[69.28, -24.362, -88.238]}
          rotation={[-2.203, -0.492, -1.009]}
          scale={0.113}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock051_proprty_0.geometry}
          material={materials.proprty}
          position={[-104.925, -21.545, -46.327]}
          rotation={[0.33, -0.55, 1.466]}
          scale={0.109}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock052_proprty_0.geometry}
          material={materials.proprty}
          position={[-84.799, -7.885, -73.905]}
          rotation={[0.137, -0.746, 1.63]}
          scale={0.138}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock053_proprty_0.geometry}
          material={materials.proprty}
          position={[81.15, -28.552, -71.936]}
          rotation={[2.715, -0.207, -1.377]}
          scale={0.082}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock054_proprty_0.geometry}
          material={materials.proprty}
          position={[-111.431, -4.134, -26.263]}
          rotation={[0.885, -0.519, 1.805]}
          scale={0.095}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock055_proprty_0.geometry}
          material={materials.proprty}
          position={[-112.644, -17.045, -30.177]}
          rotation={[-0.394, -0.404, 1.165]}
          scale={0.096}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock056_proprty_0.geometry}
          material={materials.proprty}
          position={[-88.111, -44.759, -59.549]}
          rotation={[0.1, -0.747, 1.909]}
          scale={0.127}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock057_proprty_0.geometry}
          material={materials.proprty}
          position={[-86.258, -20.565, -72.979]}
          rotation={[1.017, -0.494, 2.168]}
          scale={0.104}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock058_proprty_0.geometry}
          material={materials.proprty}
          position={[20.101, -21.688, -102.158]}
          rotation={[1.288, -1.017, 3.03]}
          scale={0.095}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock059_proprty_0.geometry}
          material={materials.proprty}
          position={[-99.22, -32.238, -52.097]}
          rotation={[0.292, -0.557, 1.837]}
          scale={0.101}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock060_proprty_0.geometry}
          material={materials.proprty}
          position={[-106.132, -11.09, -42.464]}
          rotation={[0.843, -0.37, 1.902]}
          scale={0.104}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock061_proprty_0.geometry}
          material={materials.proprty}
          position={[-71.235, -12.976, -87.411]}
          rotation={[-1.224, -0.417, 0.873]}
          scale={0.124}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock062_proprty_0.geometry}
          material={materials.proprty}
          position={[-74.531, -24.699, -84.651]}
          rotation={[0.521, -0.859, 1.66]}
          scale={0.115}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock063_proprty_0.geometry}
          material={materials.proprty}
          position={[-83.311, -25.479, -76.805]}
          rotation={[0.466, -0.861, 1.619]}
          scale={0.09}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock064_proprty_0.geometry}
          material={materials.proprty}
          position={[-79.674, -31.29, -82.673]}
          rotation={[-0.013, -0.818, 1.258]}
          scale={0.127}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock065_proprty_0.geometry}
          material={materials.proprty}
          position={[-71.904, 40.756, -74.673]}
          rotation={[0.884, -0.562, 1.649]}
          scale={0.143}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock066_proprty_0.geometry}
          material={materials.proprty}
          position={[-71.468, 53.132, -59.795]}
          rotation={[1.769, -0.516, 2.058]}
          scale={0.099}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock067_proprty_0.geometry}
          material={materials.proprty}
          position={[-80.429, 36.33, -61.271]}
          rotation={[1.249, -0.656, 1.909]}
          scale={0.136}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock068_proprty_0.geometry}
          material={materials.proprty}
          position={[-79.178, 41.763, -58.33]}
          rotation={[0.303, -0.681, 1.295]}
          scale={0.08}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock069_proprty_0.geometry}
          material={materials.proprty}
          position={[-60.95, 54.874, -71.889]}
          rotation={[1.794, -0.708, 2.222]}
          scale={0.083}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock070_proprty_0.geometry}
          material={materials.proprty}
          position={[-69.031, 49.129, -69.339]}
          rotation={[1.842, -0.679, 2.253]}
          scale={0.106}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock071_proprty_0.geometry}
          material={materials.proprty}
          position={[-71.841, 50.308, -62.883]}
          rotation={[-0.148, -0.366, 0.983]}
          scale={0.115}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock072_proprty_0.geometry}
          material={materials.proprty}
          position={[58.462, -44.065, -95.444]}
          rotation={[1.696, -0.851, -2.508]}
          scale={0.084}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock073_proprty_0.geometry}
          material={materials.proprty}
          position={[80.161, -2.234, -77.802]}
          rotation={[2.472, -0.371, -1.824]}
          scale={0.128}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock074_proprty_0.geometry}
          material={materials.proprty}
          position={[79.119, -12.56, -79.487]}
          rotation={[2.888, -0.437, -1.659]}
          scale={0.084}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock075_proprty_0.geometry}
          material={materials.proprty}
          position={[86.956, -4.446, -61.015]}
          rotation={[2.561, -0.274, -1.596]}
          scale={0.126}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock076_proprty_0.geometry}
          material={materials.proprty}
          position={[87.765, -19.362, -49.832]}
          rotation={[1.927, -0.208, -1.752]}
          scale={0.144}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock077_proprty_0.geometry}
          material={materials.proprty}
          position={[90.46, -15.505, -41.054]}
          rotation={[2.303, -0.259, -1.664]}
          scale={0.134}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock078_proprty_0.geometry}
          material={materials.proprty}
          position={[86.956, -4.446, -61.015]}
          rotation={[2.951, -0.263, -1.491]}
          scale={0.128}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock079_proprty_0.geometry}
          material={materials.proprty}
          position={[87.765, -19.362, -49.832]}
          rotation={[2.69, -0.275, -1.561]}
          scale={0.14}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock080_proprty_0.geometry}
          material={materials.proprty}
          position={[86.34, 2.252, -64.043]}
          rotation={[-1.596, -0.146, -1.445]}
          scale={0.076}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock081_proprty_0.geometry}
          material={materials.proprty}
          position={[-69.811, 54.808, -60.32]}
          rotation={[0.107, -0.6, 0.967]}
          scale={0.116}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock082_proprty_0.geometry}
          material={materials.proprty}
          position={[73.735, -24.215, -82.639]}
          rotation={[2.642, -0.775, -1.689]}
          scale={0.115}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock083_proprty_0.geometry}
          material={materials.proprty}
          position={[78.343, -28.921, -76.107]}
          rotation={[-2.661, -0.599, -1.033]}
          scale={0.102}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock084_proprty_0.geometry}
          material={materials.proprty}
          position={[77.862, -18.415, -80.243]}
          rotation={[2.134, -0.659, -2.027]}
          scale={0.118}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock085_proprty_0.geometry}
          material={materials.proprty}
          position={[75.802, -37.84, -75.654]}
          rotation={[1.985, -0.57, -1.806]}
          scale={0.14}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock086_proprty_0.geometry}
          material={materials.proprty}
          position={[79.205, -32.773, -73.703]}
          rotation={[2.609, -0.601, -1.453]}
          scale={0.129}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock087_proprty_0.geometry}
          material={materials.proprty}
          position={[61.113, -44.325, -91.971]}
          rotation={[1.452, -0.567, -2.142]}
          scale={0.1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock088_proprty_0.geometry}
          material={materials.proprty}
          position={[81.061, 19.076, -69.834]}
          rotation={[-1.06, -0.268, -1.181]}
          scale={0.137}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock089_proprty_0.geometry}
          material={materials.proprty}
          position={[80.369, -13.827, -76.794]}
          rotation={[2.273, -0.319, -1.814]}
          scale={0.139}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock090_proprty_0.geometry}
          material={materials.proprty}
          position={[59.475, -46.313, -91.537]}
          rotation={[2.95, -0.688, -0.945]}
          scale={0.076}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock091_proprty_0.geometry}
          material={materials.proprty}
          position={[63.563, -49.836, -79.029]}
          rotation={[-3.093, -0.523, -0.807]}
          scale={0.137}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock092_proprty_0.geometry}
          material={materials.proprty}
          position={[70.942, -44.794, -75.922]}
          rotation={[1.262, -0.695, -2.19]}
          scale={0.135}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock093_proprty_0.geometry}
          material={materials.proprty}
          position={[36.684, -54.884, -105.336]}
          rotation={[-2.385, -1.402, 0.046]}
          scale={0.12}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock094_proprty_0.geometry}
          material={materials.proprty}
          position={[31.698, -59.357, -100.083]}
          rotation={[0.698, -1.038, 3.126]}
          scale={0.116}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock095_proprty_0.geometry}
          material={materials.proprty}
          position={[22.728, -39.374, -102.155]}
          rotation={[-1.254, -0.796, -0.041]}
          scale={0.14}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock096_proprty_0.geometry}
          material={materials.proprty}
          position={[53.909, -39.795, -99.634]}
          rotation={[-2.113, -0.442, -0.894]}
          scale={0.126}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock097_proprty_0.geometry}
          material={materials.proprty}
          position={[-106.343, -27.875, -46.034]}
          rotation={[0.282, -0.866, 1.758]}
          scale={0.102}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock098_proprty_0.geometry}
          material={materials.proprty}
          position={[-122.004, -0.264, -8.44]}
          rotation={[2.003, -0.193, 1.582]}
          scale={0.112}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock099_proprty_0.geometry}
          material={materials.proprty}
          position={[48.88, -62.86, -72.151]}
          rotation={[1.072, -0.895, -2.369]}
          scale={0.086}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock100_proprty_0.geometry}
          material={materials.proprty}
          position={[-118.718, 16.15, 7.448]}
          rotation={[1.027, -0.084, 1.499]}
          scale={0.086}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock101_proprty_0.geometry}
          material={materials.proprty}
          position={[36.375, -59.555, -97.681]}
          rotation={[0.115, -0.821, -3.012]}
          scale={0.118}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock102_proprty_0.geometry}
          material={materials.proprty}
          position={[26.36, -41.309, -102.906]}
          rotation={[0.047, -1.531, 1.198]}
          scale={0.088}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock103_proprty_0.geometry}
          material={materials.proprty}
          position={[-53.879, -0.798, -92.569]}
          rotation={[-1.938, -1.3, -0.502]}
          scale={0.133}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock104_proprty_0.geometry}
          material={materials.proprty}
          position={[-62.329, 0.505, -93.517]}
          rotation={[-1.581, -0.783, -0.183]}
          scale={0.126}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock105_proprty_0.geometry}
          material={materials.proprty}
          position={[-57.937, -6.875, -93.83]}
          rotation={[2.919, -1.434, -1.91]}
          scale={0.106}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock106_proprty_0.geometry}
          material={materials.proprty}
          position={[-113.946, 32.041, 4.157]}
          rotation={[1.176, -0.384, 1.539]}
          scale={0.14}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock107_proprty_0.geometry}
          material={materials.proprty}
          position={[-113.875, 16.18, -8.601]}
          rotation={[1.154, -0.371, 1.794]}
          scale={0.076}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock108_proprty_0.geometry}
          material={materials.proprty}
          position={[-111.72, 15.788, 20.917]}
          rotation={[2.636, -0.679, 1.32]}
          scale={0.137}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock109_proprty_0.geometry}
          material={materials.proprty}
          position={[77.126, 3.613, -83.409]}
          rotation={[-2.489, -0.431, -1.241]}
          scale={0.089}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock110_proprty_0.geometry}
          material={materials.proprty}
          position={[27.485, -51.548, -105.71]}
          rotation={[1.538, -0.935, 2.999]}
          scale={0.079}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock111_proprty_0.geometry}
          material={materials.proprty}
          position={[36.825, -52.85, -106.61]}
          rotation={[1.451, -1.171, 2.923]}
          scale={0.137}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock112_proprty_0.geometry}
          material={materials.proprty}
          position={[36.843, -31.264, -100.163]}
          rotation={[-1.929, -0.712, -0.228]}
          scale={0.106}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock113_proprty_0.geometry}
          material={materials.proprty}
          position={[44.115, -30.294, -99.076]}
          rotation={[1.606, -0.944, -2.845]}
          scale={0.134}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock114_proprty_0.geometry}
          material={materials.proprty}
          position={[57.109, 5.57, -95.041]}
          rotation={[-2.018, -0.95, -1.044]}
          scale={0.083}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock115_proprty_0.geometry}
          material={materials.proprty}
          position={[15.95, -24.037, -101.055]}
          rotation={[1.17, -0.745, 2.713]}
          scale={0.077}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock116_proprty_0.geometry}
          material={materials.proprty}
          position={[80.15, -32.351, -71.538]}
          rotation={[1.897, -0.528, -1.704]}
          scale={0.119}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock117_proprty_0.geometry}
          material={materials.proprty}
          position={[74.917, -41.322, -73.72]}
          rotation={[2.113, -0.542, -1.594]}
          scale={0.115}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock118_proprty_0.geometry}
          material={materials.proprty}
          position={[78.944, -37.101, -68.002]}
          rotation={[2.661, -0.486, -1.319]}
          scale={0.133}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock119_proprty_0.geometry}
          material={materials.proprty}
          position={[-66.937, 2.381, -93.069]}
          rotation={[1.309, -0.848, 2.464]}
          scale={0.086}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock120_proprty_0.geometry}
          material={materials.proprty}
          position={[-94.055, -32.454, -58.877]}
          rotation={[-2.072, -0.318, 1.134]}
          scale={0.142}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock121_proprty_0.geometry}
          material={materials.proprty}
          position={[57.448, -51.884, -84.802]}
          rotation={[1.217, -0.847, -2.309]}
          scale={0.112}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock122_proprty_0.geometry}
          material={materials.proprty}
          position={[-112.83, 34.137, 10.759]}
          rotation={[1.692, -0.756, 1.391]}
          scale={0.104}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock123_proprty_0.geometry}
          material={materials.proprty}
          position={[62.183, -36.911, -95.745]}
          rotation={[-1.764, -0.559, -0.527]}
          scale={0.083}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock124_proprty_0.geometry}
          material={materials.proprty}
          position={[-99.921, -19.231, -55.612]}
          rotation={[-1.442, -0.346, 1.151]}
          scale={0.115}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock125_proprty_0.geometry}
          material={materials.proprty}
          position={[76.839, -15.059, -82.114]}
          rotation={[1.999, -0.589, -2.179]}
          scale={0.11}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock126_proprty_0.geometry}
          material={materials.proprty}
          position={[72.172, 2.298, -90.955]}
          rotation={[2.452, -0.768, -1.89]}
          scale={0.133}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock127_proprty_0.geometry}
          material={materials.proprty}
          position={[34, -70.39, -67.774]}
          rotation={[0.569, -0.824, -2.858]}
          scale={0.101}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock128_proprty_0.geometry}
          material={materials.proprty}
          position={[9.693, -71.836, -69.032]}
          rotation={[-2.762, -0.77, -0.028]}
          scale={0.089}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock129_proprty_0.geometry}
          material={materials.proprty}
          position={[41.091, -68.422, -67.88]}
          rotation={[1.547, -1.182, -2.107]}
          scale={0.137}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock130_proprty_0.geometry}
          material={materials.proprty}
          position={[82.05, -33.347, -52.495]}
          rotation={[0.917, -0.409, -1.83]}
          scale={0.128}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock131_proprty_0.geometry}
          material={materials.proprty}
          position={[-102.764, -1.749, -50.025]}
          rotation={[-0.184, -0.307, 1.423]}
          scale={0.08}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock132_proprty_0.geometry}
          material={materials.proprty}
          position={[-58.552, 15.37, -93.341]}
          rotation={[1.306, -0.832, 2.489]}
          scale={0.136}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock133_proprty_0.geometry}
          material={materials.proprty}
          position={[-65.663, 18.047, -89.372]}
          rotation={[1.058, -0.996, 2.292]}
          scale={0.1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock134_proprty_0.geometry}
          material={materials.proprty}
          position={[-91.883, 31.711, -47.204]}
          rotation={[1.098, -0.604, 1.707]}
          scale={0.143}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock135_proprty_0.geometry}
          material={materials.proprty}
          position={[-75.096, 62.12, -37.599]}
          rotation={[1.62, -0.478, 1.583]}
          scale={0.122}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock136_proprty_0.geometry}
          material={materials.proprty}
          position={[-94.284, 30.022, -43.902]}
          rotation={[0.89, -0.605, 1.6]}
          scale={0.114}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock137_proprty_0.geometry}
          material={materials.proprty}
          position={[-82.036, 29.508, -64.392]}
          rotation={[0.117, -0.626, 1.259]}
          scale={0.096}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock138_proprty_0.geometry}
          material={materials.proprty}
          position={[-90, 29.762, -52.36]}
          rotation={[-0.407, -0.404, 0.995]}
          scale={0.136}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock139_proprty_0.geometry}
          material={materials.proprty}
          position={[-76.168, -0.081, -82.95]}
          rotation={[0.007, -0.747, 1.632]}
          scale={0.078}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock140_proprty_0.geometry}
          material={materials.proprty}
          position={[-59.988, -10.926, -93.229]}
          rotation={[0.977, -0.803, 2.665]}
          scale={0.134}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white001_proprty_0.geometry}
          material={materials.proprty}
          position={[11.847, 97.959, 34.359]}
          rotation={[0.523, 0.268, -0.329]}
          scale={[0.022, 0.034, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white002_proprty_0.geometry}
          material={materials.proprty}
          position={[0.333, -102.678, -28.845]}
          rotation={[-2.679, 0.074, 0.063]}
          scale={[0.013, 0.02, 0.013]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white003_proprty_0.geometry}
          material={materials.proprty}
          position={[-18.975, -111.506, 6.09]}
          rotation={[2.456, -0.103, 0.384]}
          scale={[0.025, 0.039, 0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white004_proprty_0.geometry}
          material={materials.proprty}
          position={[-8.336, -115.701, 6.563]}
          rotation={[2.318, 0.277, -0.113]}
          scale={[0.016, 0.025, 0.016]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white005_proprty_0.geometry}
          material={materials.proprty}
          position={[-21.752, -112.21, -3.037]}
          rotation={[-2.175, -0.558, 0.781]}
          scale={[0.024, 0.037, 0.024]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white007_proprty_0.geometry}
          material={materials.proprty}
          position={[-22.962, -101.309, 18.774]}
          rotation={[2.679, 0.487, 0.302]}
          scale={[0.017, 0.026, 0.017]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white008_proprty_0.geometry}
          material={materials.proprty}
          position={[-3.676, -103.571, -26.319]}
          rotation={[-2.692, 0.366, 0.129]}
          scale={[0.017, 0.026, 0.017]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white009_proprty_0.geometry}
          material={materials.proprty}
          position={[-21.016, -108.75, 8.713]}
          rotation={[2.019, 0.79, 0.718]}
          scale={[0.018, 0.027, 0.018]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white010_proprty_0.geometry}
          material={materials.proprty}
          position={[-20.027, -100.873, 22.232]}
          rotation={[2.57, 0.681, 0.29]}
          scale={[0.023, 0.035, 0.023]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white011_proprty_0.geometry}
          material={materials.proprty}
          position={[-28.253, -98.911, 20.82]}
          rotation={[2.774, -0.008, 0.284]}
          scale={[0.026, 0.04, 0.026]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white013_proprty_0.geometry}
          material={materials.proprty}
          position={[10.92, -115.254, -12.707]}
          rotation={[-2.94, -0.581, -0.52]}
          scale={[0.02, 0.031, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white014_proprty_0.geometry}
          material={materials.proprty}
          position={[16.768, -112.543, -12.092]}
          rotation={[-2.23, 0.712, -0.581]}
          scale={[0.022, 0.034, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white015_proprty_0.geometry}
          material={materials.proprty}
          position={[22.77, -100.757, 14.908]}
          rotation={[3.043, 0.383, -0.672]}
          scale={[0.023, 0.035, 0.023]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white016_proprty_0.geometry}
          material={materials.proprty}
          position={[-22.31, -109.871, 5.277]}
          rotation={[2.562, 0.371, 0.6]}
          scale={[0.012, 0.019, 0.012]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white017_proprty_0.geometry}
          material={materials.proprty}
          position={[30.061, -103.32, -11.223]}
          rotation={[-3.086, -0.289, -0.642]}
          scale={[0.022, 0.033, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white018_proprty_0.geometry}
          material={materials.proprty}
          position={[28.54, -102.913, -16.781]}
          rotation={[-2.739, 0.192, -0.624]}
          scale={[0.024, 0.037, 0.024]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white019_proprty_0.geometry}
          material={materials.proprty}
          position={[15.798, -114.378, -8.653]}
          rotation={[-2.604, 0.366, -0.662]}
          scale={[0.015, 0.023, 0.015]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white020_proprty_0.geometry}
          material={materials.proprty}
          position={[30.061, -103.32, -11.223]}
          rotation={[-2.696, 0.25, -0.634]}
          scale={[0.018, 0.028, 0.018]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white021_proprty_0.geometry}
          material={materials.proprty}
          position={[-11.926, -118.886, -5.325]}
          rotation={[-3.062, 0.189, 0.621]}
          scale={[0.02, 0.031, 0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white022_proprty_0.geometry}
          material={materials.proprty}
          position={[49.15, 41.153, -99.849]}
          rotation={[-2.13, -0.271, -0.176]}
          scale={[0.021, 0.033, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white023_proprty_0.geometry}
          material={materials.proprty}
          position={[40.216, 47.681, -100.968]}
          rotation={[-1.662, -0.042, -0.419]}
          scale={[0.018, 0.028, 0.018]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white024_proprty_0.geometry}
          material={materials.proprty}
          position={[3.371, -118.633, 0.536]}
          rotation={[2.786, 0.513, -0.548]}
          scale={[0.027, 0.041, 0.027]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white025_proprty_0.geometry}
          material={materials.proprty}
          position={[11.3, -108.114, 7.783]}
          rotation={[2.32, -0.33, -0.5]}
          scale={[0.017, 0.027, 0.017]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white026_proprty_0.geometry}
          material={materials.proprty}
          position={[32.234, 48.067, -99.829]}
          rotation={[-0.926, -0.735, 0.446]}
          scale={[0.016, 0.025, 0.016]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white027_proprty_0.geometry}
          material={materials.proprty}
          position={[-45.797, 88.213, -7.973]}
          rotation={[-0.556, 0.266, 0.734]}
          scale={[0.017, 0.027, 0.017]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white028_proprty_0.geometry}
          material={materials.proprty}
          position={[-46.222, 88.206, -6.481]}
          rotation={[0.183, -0.456, 0.765]}
          scale={[0.013, 0.019, 0.013]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white029_proprty_0.geometry}
          material={materials.proprty}
          position={[58.403, 36.36, -99.265]}
          rotation={[-2.417, 0.816, 0.4]}
          scale={[0.014, 0.022, 0.014]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white030_proprty_0.geometry}
          material={materials.proprty}
          position={[52.73, 41.231, -100.394]}
          rotation={[-2.377, 0.747, 0.372]}
          scale={[0.021, 0.032, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white032_proprty_0.geometry}
          material={materials.proprty}
          position={[-26.882, 102.391, -12.113]}
          rotation={[-0.181, -0.053, 0.605]}
          scale={[0.026, 0.04, 0.026]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white033_proprty_0.geometry}
          material={materials.proprty}
          position={[-6.581, 98.553, 34.752]}
          rotation={[0.575, 0.723, 0.282]}
          scale={[0.014, 0.021, 0.014]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white036_proprty_0.geometry}
          material={materials.proprty}
          position={[16.132, -114.367, -7.732]}
          rotation={[2.632, -0.283, -0.622]}
          scale={[0.024, 0.036, 0.024]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white037_proprty_0.geometry}
          material={materials.proprty}
          position={[31.916, -98.211, -25.809]}
          rotation={[-3.046, -0.746, -0.481]}
          scale={[0.018, 0.028, 0.018]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white038_proprty_0.geometry}
          material={materials.proprty}
          position={[33.802, -99.547, -16.777]}
          rotation={[3.036, -0.461, -0.632]}
          scale={[0.017, 0.026, 0.017]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white039_proprty_0.geometry}
          material={materials.proprty}
          position={[41.527, -95.621, -12.069]}
          rotation={[3.131, -0.336, -0.595]}
          scale={[0.018, 0.027, 0.018]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white041_proprty_0.geometry}
          material={materials.proprty}
          position={[-19.069, 108.7, -0.56]}
          rotation={[-0.501, 0.857, 0.651]}
          scale={[0.023, 0.035, 0.023]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white042_proprty_0.geometry}
          material={materials.proprty}
          position={[7.885, 103.934, -25.181]}
          rotation={[-0.38, -0.077, -0.096]}
          scale={[0.021, 0.032, 0.021]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white043_proprty_0.geometry}
          material={materials.proprty}
          position={[1.87, 110.96, -8.769]}
          rotation={[-0.376, -0.041, -0.095]}
          scale={[0.015, 0.024, 0.015]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white044_proprty_0.geometry}
          material={materials.proprty}
          position={[-6.16, 110.867, -7.752]}
          rotation={[-0.147, 0.277, 0.167]}
          scale={[0.024, 0.036, 0.024]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white045_proprty_0.geometry}
          material={materials.proprty}
          position={[-16.462, 109.653, 7.006]}
          rotation={[0.28, -0.114, 0.394]}
          scale={[0.027, 0.042, 0.027]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white046_proprty_0.geometry}
          material={materials.proprty}
          position={[2.26, 110.253, 11.953]}
          rotation={[0.115, -0.689, -0.027]}
          scale={[0.017, 0.027, 0.017]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white047_proprty_0.geometry}
          material={materials.proprty}
          position={[-6.111, 111.529, 3.665]}
          rotation={[0.123, -0.407, -0.022]}
          scale={[0.026, 0.039, 0.026]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white048_proprty_0.geometry}
          material={materials.proprty}
          position={[2.367, 109.285, 15.696]}
          rotation={[0.543, 0.324, -0.08]}
          scale={[0.013, 0.02, 0.013]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white049_proprty_0.geometry}
          material={materials.proprty}
          position={[-3.61, 100.334, 32.358]}
          rotation={[0.463, -0.615, -0.093]}
          scale={[0.014, 0.021, 0.014]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tree_white050_proprty_0.geometry}
          material={materials.proprty}
          position={[-18.699, 101.865, 24.776]}
          rotation={[0.645, -0.639, 0.317]}
          scale={[0.019, 0.029, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.boat001_proprty_0.geometry}
          material={materials.proprty}
          position={[-77.689, -18.385, 56.839]}
          rotation={[-1.245, 0, 2.317]}
          scale={0.044}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.boat004_proprty_0.geometry}
          material={materials.proprty}
          position={[-22.864, -51.388, -82.79]}
          rotation={[0.516, -0.886, 2.489]}
          scale={0.044}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.boat005_proprty_0.geometry}
          material={materials.proprty}
          position={[-15.386, -26.515, -94.602]}
          rotation={[-0.063, -1.203, 1.683]}
          scale={0.044}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.boat006_proprty_0.geometry}
          material={materials.proprty}
          position={[24.363, -54.541, 79.967]}
          rotation={[-0.923, 0, -2.908]}
          scale={0.044}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.boat008_proprty_0.geometry}
          material={materials.proprty}
          position={[-82.245, -56.343, 3.474]}
          rotation={[-0.23, 0, 2.201]}
          scale={0.044}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.boat009_proprty_0.geometry}
          material={materials.proprty}
          position={[-52.17, -82.139, 28.583]}
          rotation={[-0.509, 0, 2.448]}
          scale={0.044}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.boat010_proprty_0.geometry}
          material={materials.proprty}
          position={[94.17, 2.924, -32.809]}
          rotation={[2.419, -0.301, -1.775]}
          scale={0.044}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/earth_stylized_low_poly.glb");
