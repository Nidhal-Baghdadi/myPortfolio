import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import Arena from "../components/Arena";
import Space from "../components/Space";
import StationGroup from "../components/StationGroup";
import { cssColor } from "../styles/tokens";
import { STATIONS, type StationId } from "./arena";
import CameraRig from "./CameraRig";
import ShaderWarmup from "./ShaderWarmup";

/** In "demand" frame mode nothing renders until asked: ask once whenever what's framed changes. */
function RenderOn({ change }: { change: string }) {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => invalidate(), [change, invalidate]);
  return null;
}

/**
 * The 3D world, mounted once for every page that shows it. `still` (reading a case study) stops the comets
 * and switches to rendering only on demand: once the camera has landed the scene is a still picture, which
 * costs nothing while you read, however much blur is layered over it.
 */
export default function SceneCanvas({
  activeId,
  focusKey,
  animate,
  still,
}: {
  activeId: StationId;
  focusKey: string;
  animate: boolean;
  still: boolean;
}) {
  return (
    // flat: no tone mapping, so the paint shows the exact token colours.
    // dpr capped at 1.5: on high-density screens 2x would render 78% more pixels for barely visible gain.
    <Canvas
      flat
      dpr={[1, 1.5]}
      frameloop={still ? "demand" : "always"}
      // Lets a material clip itself with its own planes (the station rings stop at the walls).
      onCreated={({ gl }) => {
        gl.localClippingEnabled = true;
      }}
      camera={{ fov: STATIONS[0].shot.fov }}
    >
      <RenderOn change={focusKey} />
      <Suspense fallback={null}>
        <ShaderWarmup />
      </Suspense>
      <CameraRig />
      {/* three.js divides diffuse light by π, so intensities adding up to π show faces in the lit band at
          their exact colour; the darker bands shade the rest */}
      <ambientLight intensity={Math.PI * 0.35} />
      <directionalLight position={[5, 10, 5]} intensity={Math.PI * 0.65} />
      <color attach="background" args={[cssColor("ink")]} />
      <Space animate={animate && !still} />
      <Arena />
      {STATIONS.map((station) => (
        <StationGroup key={station.id} station={station} isActive={station.id === activeId} />
      ))}
    </Canvas>
  );
}
