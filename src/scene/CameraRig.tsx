import { useFrame } from "@react-three/fiber";
import type { RefObject } from "react";
import { STATIONS } from "./arena";

import { MathUtils } from "three";
import { orbitPosition } from "./camera";

export default function CameraRig({
  stationPosition,
}: {
  stationPosition: RefObject<number>;
}) {
  useFrame(({ camera }) => {
    const last = STATIONS.length - 1;

    const position = Math.min(Math.max(stationPosition.current, 0), last);

    const i = Math.floor(position); // the station you're coming from
    const next = Math.min(i + 1, last); // the station you're heading to

    const from = STATIONS[i];
    const to = STATIONS[next];
    if (!from || !to) return;

    const f = position - i;

    const distance = MathUtils.lerp(from.shot.distance, to.shot.distance, f);
    const elevation = MathUtils.lerp(from.shot.elevation, to.shot.elevation, f);
    const azimuth = MathUtils.lerp(from.shot.azimuth, to.shot.azimuth, f);
    const x = MathUtils.lerp(from.x, to.x, f);
    const z = MathUtils.lerp(from.z, to.z, f);

    const [ox, oy, oz] = orbitPosition(distance, elevation, azimuth);

    camera.position.set(x + ox, oy, z + oz);
    camera.lookAt(x, 0, z);
  });

  return null;
}
