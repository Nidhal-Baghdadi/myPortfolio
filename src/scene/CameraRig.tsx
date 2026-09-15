import { useControls } from "leva";
import {
  CAMERA_AZIMUTH,
  CAMERA_ELEVATION,
  CAMERA_FOV,
  CAMERA_MARGIN,
  fitDistance,
  orbitPosition,
} from "./camera";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { PerspectiveCamera, Vector3, type Vector3Tuple } from "three";
import { ARENA_RADIUS, STATIONS } from "./arena";

export default function CameraRig() {
  const { stationDistance, margin, elevation, azimuth, fov, shot } = useControls({
    stationDistance: { value: 5, min: 3, max: 30, step: 0.01 },
    margin: { value: CAMERA_MARGIN, min: 1, max: 1.6, step: 0.01 },
    elevation: { value: CAMERA_ELEVATION, min: 5, max: 89, step: 0.1 },
    azimuth: { value: CAMERA_AZIMUTH, min: -180, max: 180, step: 0.1 },
    fov: { value: CAMERA_FOV, min: 10, max: 75, step: 0.1 },
    shot: {
      value: "overview",
      options: ["overview", ...STATIONS.map((s) => s.id)],
    },
  });

  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  const aspect = size.width / size.height;

  useEffect(() => {
    const distance =
      shot === "overview"
        ? fitDistance(ARENA_RADIUS, fov, aspect) * margin
        : stationDistance;

    const currentStation = STATIONS.find((s) => s.id === shot);

    const target: Vector3Tuple = currentStation
      ? [currentStation.x, 0, currentStation.z]
      : [0, 0, 0];
    camera.position
      .set(...orbitPosition(distance, elevation, azimuth))
      .add(new Vector3(...target));
    camera.lookAt(...target);

    if (camera instanceof PerspectiveCamera) {
      // oxlint-disable-next-line react/immutability -- three.js objects are mutable by design
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }, [camera, elevation, azimuth, margin, fov, aspect, shot, stationDistance]);

  return null;
}
