import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, PerspectiveCamera } from "three";
import { STATIONS, type Shot } from "./arena";
import { newPose, poseOf } from "./camera";
import { useScene } from "./sceneContext";

/**
 * How fast the camera catches up with the scroll position, per second. A mouse wheel scrolls in steps of
 * ~100px; followed directly, every step is a jump. Easing toward it turns the steps into one smooth glide.
 */
const FOLLOW_RATE = 6;
/** Slower: flying to a project (or back) is a camera move of its own, not a correction. */
const FOCUS_RATE = 2.2;

const ease = (from: number, to: number, rate: number, delta: number) => from + (to - from) * (1 - Math.exp(-rate * delta));

/**
 * Drives the camera from two sources, blended: the tour (the scroll position between two stations) and a
 * focus (a project page's plinth). The blend eases, so opening a project flies the camera there and going
 * back flies it home. In "demand" frame mode it asks for frames only while something is still moving.
 */
export default function CameraRig() {
  const { stationPosition, focus } = useScene();
  const eased = useRef<number | null>(null);
  const focusWeight = useRef(0);
  const lastFocus = useRef(focus.current);
  const poses = useRef({ tour: newPose(), focus: newPose() });

  useFrame(({ camera, invalidate }, delta) => {
    if (!(camera instanceof PerspectiveCamera)) return;
    const last = STATIONS.length - 1;

    // Tour: ease toward the scroll position, then blend the two stations around it.
    const target = Math.min(Math.max(stationPosition.current, 0), last);
    const next = ease(eased.current ?? target, target, FOLLOW_RATE, delta);
    eased.current = Math.abs(target - next) < 1e-4 ? target : next;
    const position = eased.current;
    const i = Math.floor(position);
    const from = STATIONS[i];
    const to = STATIONS[Math.min(i + 1, last)];
    if (!from || !to) return;
    const f = position - i;
    const lerp = (a: number, b: number) => MathUtils.lerp(a, b, f);
    const shot: Shot = {
      // Distance blends on a log scale: each step of scroll covers the same *ratio* of distance, so the dive
      // from deep space slows as it nears the floor instead of rushing past the globe and braking at the end.
      distance: Math.exp(lerp(Math.log(from.shot.distance), Math.log(to.shot.distance))),
      elevation: lerp(from.shot.elevation, to.shot.elevation),
      azimuth: lerp(from.shot.azimuth, to.shot.azimuth),
      fov: lerp(from.shot.fov, to.shot.fov),
      lookHeight: lerp(from.shot.lookHeight, to.shot.lookHeight),
      clearPanel: lerp(from.shot.clearPanel, to.shot.clearPanel),
    };
    const tour = poseOf(lerp(from.x, to.x), lerp(from.z, to.z), shot, camera.aspect, poses.current.tour);

    // Focus: remembered after it's cleared, so the flight back starts from where the camera actually is.
    if (focus.current) lastFocus.current = focus.current;
    const wanted = focus.current ? 1 : 0;
    const weight = ease(focusWeight.current, wanted, FOCUS_RATE, delta);
    focusWeight.current = Math.abs(wanted - weight) < 1e-3 ? wanted : weight;

    let fov = tour.fov;
    if (lastFocus.current && focusWeight.current > 0) {
      const { x, z, shot: focusShot } = lastFocus.current;
      const framed = poseOf(x, z, focusShot, camera.aspect, poses.current.focus);
      // Smoothstep: the flight starts and lands gently.
      const w = focusWeight.current * focusWeight.current * (3 - 2 * focusWeight.current);
      tour.position.lerp(framed.position, w);
      tour.target.lerp(framed.target, w);
      fov = MathUtils.lerp(tour.fov, framed.fov, w);
    }

    camera.position.copy(tour.position);
    camera.lookAt(tour.target);
    // The projection only needs rebuilding when the FOV actually changes, not on every frame.
    if (camera.fov !== fov) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }

    const settled = eased.current === target && focusWeight.current === wanted;
    if (!settled) invalidate();
  });

  return null;
}
