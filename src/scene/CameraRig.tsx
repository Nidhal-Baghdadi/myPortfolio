import { useFrame } from "@react-three/fiber";
import type { RefObject } from "react";
import { MathUtils, PerspectiveCamera, Vector3 } from "three";
import { STATIONS } from "./arena";
import { orbitPosition } from "./camera";

/** On wide screens the panel covers the left third, so the station is framed this far right of centre (in half-widths). */
const PANEL_CLEARANCE = 0.3;

const up = new Vector3(0, 1, 0);
const right = new Vector3();
const forward = new Vector3();

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
    const lerp = (a: number, b: number) => MathUtils.lerp(a, b, f);

    // Distance blends on a log scale: each step of scroll covers the same *ratio* of distance, so the dive from
    // deep space slows as it nears the floor instead of rushing past the globe and braking at the end.
    const distance = Math.exp(lerp(Math.log(from.shot.distance), Math.log(to.shot.distance)));
    const elevation = lerp(from.shot.elevation, to.shot.elevation);
    const azimuth = lerp(from.shot.azimuth, to.shot.azimuth);
    const lookHeight = lerp(from.shot.lookHeight, to.shot.lookHeight);
    const x = lerp(from.x, to.x);
    const z = lerp(from.z, to.z);

    const [ox, oy, oz] = orbitPosition(distance, elevation, azimuth);
    const fov = lerp(from.shot.fov, to.shot.fov);
    if (!(camera instanceof PerspectiveCamera)) return;

    // Pan sideways (camera and target together) so the station lands right of centre, clear of the panel.
    // Half the visible width at the station's distance is distance · tan(fov / 2) · aspect.
    const halfWidth = distance * Math.tan(MathUtils.degToRad(fov / 2)) * camera.aspect;
    const clearPanel = lerp(from.shot.clearPanel, to.shot.clearPanel);
    const pan = camera.aspect > 1.2 ? clearPanel * PANEL_CLEARANCE * halfWidth : 0;
    forward.set(-ox, -oy, -oz).normalize();
    right.crossVectors(forward, up).normalize().multiplyScalar(-pan);

    camera.position.set(x + ox + right.x, lookHeight + oy, z + oz + right.z);
    camera.lookAt(x + right.x, lookHeight, z + right.z);

    // The projection only needs rebuilding when the FOV actually changes, not on every frame.
    if (camera.fov !== fov) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
