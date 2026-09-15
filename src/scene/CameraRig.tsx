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
import { PerspectiveCamera } from "three";
import { ARENA_RADIUS } from "./arena";

export default function CameraRig() {
  const { margin, elevation, azimuth, fov } = {
    margin: CAMERA_MARGIN,
    elevation: CAMERA_ELEVATION,
    azimuth: CAMERA_AZIMUTH,
    fov: CAMERA_FOV,
  };

  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  const aspect = size.width / size.height;

  useEffect(() => {
    const distance = fitDistance(ARENA_RADIUS, fov, aspect) * margin;
    camera.position.set(...orbitPosition(distance, elevation, azimuth));
    camera.lookAt(0, 0, 0);

    if (camera instanceof PerspectiveCamera) {
      // oxlint-disable-next-line react/immutability -- three.js objects are mutable by design
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }, [camera, elevation, azimuth, margin, fov, aspect]);

  return null;
}
