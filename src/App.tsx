import { Canvas } from "@react-three/fiber";
import Arena from "./components/Arena";
import { ARENA_DEPTH, STATIONS, PAPER, ACID } from "./scene/arena";

import Marker from "./components/Marker";
import { CAMERA_FOV } from "./scene/camera";
import CameraRig from "./scene/CameraRig";
import { Leva } from "leva";

export default function App() {
  return (
    <>
      <Canvas
        camera={{
          fov: CAMERA_FOV,
        }}
      >
        <CameraRig />
        <ambientLight />
        <directionalLight position={[5, 10, 5]} />
        <color attach="background" args={[PAPER]} />
        <gridHelper args={[ARENA_DEPTH, ARENA_DEPTH]} />
        <axesHelper args={[3]} />
        <Arena />
        {STATIONS.map((station) => (
          <Marker
            key={station.id}
            x={station.x}
            z={station.z}
            color={station.id === "gate" ? ACID : PAPER}
          />
        ))}
      </Canvas>

      <Leva hidden={!import.meta.env.DEV} />
    </>
  );
}
