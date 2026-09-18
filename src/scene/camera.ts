import { MathUtils, Vector3, type Vector3Tuple } from "three";
import type { Shot } from "./arena";

export function orbitPosition(distance: number, elevation: number, azimuth: number): Vector3Tuple {
  const elevationRad = MathUtils.degToRad(elevation);
  const azimuthRad = MathUtils.degToRad(azimuth);
  const horizontal = distance * Math.cos(elevationRad);
  return [horizontal * Math.sin(azimuthRad), distance * Math.sin(elevationRad), horizontal * Math.cos(azimuthRad)];
}

/** Where the camera is, what it looks at, and how wide it sees: enough to blend any two framings. */
export type Pose = { position: Vector3; target: Vector3; fov: number };

/** On wide screens content covers the left of the view; clearPanel 1 frames the subject this far right (in half-widths). */
const PANEL_CLEARANCE = 0.3;
/** On portrait screens the panel is a bottom sheet: lift the subject this far up (in half-heights). */
const PORTRAIT_LIFT = 0.42;
const MAX_FOV = 80;
const UP = new Vector3(0, 1, 0);

/**
 * The pose for a shot around a point. On wide screens it pans sideways (camera and target together) by
 * `clearPanel`, so the subject lands clear of the text on the left. Half the visible width at the subject's
 * distance is distance · tan(fov / 2) · aspect.
 */
export function poseOf(x: number, z: number, shot: Shot, aspect: number, out: Pose): Pose {
  const [ox, oy, oz] = orbitPosition(shot.distance, shot.elevation, shot.azimuth);
  const forward = new Vector3(-ox, -oy, -oz).normalize();

  // Portrait screens: widen the vertical FOV so the sideways view stays about what a square screen sees
  // (a phone would otherwise see the world through a slit), capped before it distorts.
  const portrait = aspect < 1;
  const fov = portrait
    ? Math.min(MathUtils.radToDeg(2 * Math.atan(Math.tan(MathUtils.degToRad(shot.fov / 2)) / aspect)), MAX_FOV)
    : shot.fov;
  const halfHeight = shot.distance * Math.tan(MathUtils.degToRad(fov / 2));

  // Wide screens: pan sideways, clear of the text on the left.
  const pan = aspect > 1.2 ? shot.clearPanel * PANEL_CLEARANCE * halfHeight * aspect : 0;
  const shift = forward.clone().cross(UP).normalize().multiplyScalar(-pan);
  out.target.set(x, shot.lookHeight, z).add(shift);
  out.position.set(out.target.x + ox, out.target.y + oy, out.target.z + oz);

  // Portrait screens: aim lower (the target only, the camera stays put), which tilts the view down so the
  // subject rises into the upper half, above the bottom sheet. Moving the camera down instead would sink it
  // through the floor at eye level. "Down" is the camera's own: world up with the viewing direction removed.
  if (portrait) {
    const cameraUp = UP.clone().addScaledVector(forward, -forward.dot(UP)).normalize();
    out.target.addScaledVector(cameraUp, -PORTRAIT_LIFT * halfHeight);
  }
  out.fov = fov;
  return out;
}

export const newPose = (): Pose => ({ position: new Vector3(), target: new Vector3(), fov: 50 });
