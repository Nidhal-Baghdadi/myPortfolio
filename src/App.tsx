import { Canvas } from "@react-three/fiber";
import Arena from "./components/Arena";
import { ARENA_DEPTH, STATIONS } from "./scene/arena";
import { cssColor } from "./styles/tokens";

import Marker from "./components/Marker";
import { CAMERA_FOV } from "./scene/camera";
import CameraRig from "./scene/CameraRig";
import { Leva } from "leva";
import StationPanel from "./components/StationPanel";
import { CONTENT } from "./content";

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
        <color attach="background" args={[cssColor("paper")]} />
        <gridHelper args={[ARENA_DEPTH, ARENA_DEPTH]} />
        <axesHelper args={[3]} />
        <Arena />
        {STATIONS.map((station) => (
          <Marker
            key={station.id}
            x={station.x}
            z={station.z}
            color={cssColor(station.id === "gate" ? "acid" : "paper")}
          />
        ))}
      </Canvas>

      <main>
        <StationPanel content={CONTENT.gate} />
      </main>

      <Leva hidden={!import.meta.env.DEV} />
    </>
  );
}
