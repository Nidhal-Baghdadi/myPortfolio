import { Sparkles, Stars, Trail, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  BackSide,
  CanvasTexture,
  Color,
  DoubleSide,
  type Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  SpriteMaterial,
  SRGBColorSpace,
  Vector3,
} from "three";
import { lineMaterial, outsideMaterial, silhouetteMaterial, surfaceMaterial } from "@/scene/ink";
import { inkModelOf } from "@/scene/inkModel";
import { GLOBE_CENTER, GLOBE_RADIUS, SPACE_RADIUS } from "@/scene/space";
import { cssColor } from "@/styles/tokens";

/**
 * Glass drawn as a rim of light: faces seen edge-on (the outline of the sphere) glow, faces seen head-on are
 * nearly clear. That reads as glass without the cost of real refraction, and fits the drawn style.
 */
function Globe() {
  const uniforms = useMemo(
    () => ({ color: { value: new Color(cssColor("paper")) }, tint: { value: new Color(cssColor("slate")) } }),
    [],
  );

  return (
    <mesh position={GLOBE_CENTER}>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        transparent
        depthWrite={false}
        // Back faces only: from outside they draw the far half's rim, from inside they're all you see anyway.
        // Drawing both sides would cover the screen twice when the globe fills the view.
        side={BackSide}
        vertexShader={
          /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vView = normalize(-mvPosition.xyz);
            gl_Position = projectionMatrix * mvPosition;
          }`
        }
        fragmentShader={
          /* glsl */ `
          uniform vec3 color;
          uniform vec3 tint;
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            float rim = 1.0 - abs(dot(normalize(vNormal), normalize(vView)));
            // A wide, faint slate haze toward the edge, and a thin paper glow right at it: soap film, not glass.
            vec3 glow = mix(tint, color, pow(rim, 4.0));
            gl_FragColor = vec4(glow, 0.02 + pow(rim, 2.5) * 0.18 + pow(rim, 8.0) * 0.45);
            #include <colorspace_fragment>
          }`
        }
      />
    </mesh>
  );
}

/** Comets in flight at most at once, and the pause before the next one appears, in seconds. */
const MAX_COMETS = 2;
const SPAWN_DELAY = [2.5, 6] as const;
/** Speed in units per second: the whole pass, in, off the glass and out, takes about four seconds. */
const COMET_SPEED = [20, 28] as const;
const COMET_SIZE = 0.9;
/** Angle between the incoming path and the glass's normal: large angles skim the glass instead of hitting it head-on. */
const GLANCE = [55, 75] as const;
/** How long an impact ring takes to spread and fade, in seconds. */
const IMPACT_TIME = 0.9;
const ROCK_URL = "/models/arena/rock.glb";

const between = ([min, max]: readonly [number, number]) => min + Math.random() * (max - min);

type Flight = { id: number; start: Vector3; velocity: Vector3; impact: Vector3; normal: Vector3; spin: Vector3 };

let nextFlightId = 0;

/**
 * Plans a pass backwards from where it hits the glass: pick the impact point, then an incoming direction at
 * a shallow angle to the glass, then start far back along that direction. Planning from the impact is what
 * guarantees every comet actually ricochets.
 */
function planFlight(): Flight {
  const centre = new Vector3(...GLOBE_CENTER);
  // Bias the impact towards the upper half, where the camera usually looks.
  const normal = new Vector3().randomDirection();
  normal.y = Math.abs(normal.y) * 0.8 + 0.2;
  normal.normalize();
  const impact = normal.clone().multiplyScalar(GLOBE_RADIUS + COMET_SIZE / 2).add(centre);

  // A direction along the glass at the impact point, then tilt the incoming path between it and the normal.
  const tangent = new Vector3().randomDirection().projectOnPlane(normal).normalize();
  const glance = MathUtils.degToRad(between(GLANCE));
  const incoming = tangent.multiplyScalar(Math.sin(glance)).addScaledVector(normal, -Math.cos(glance)).normalize();

  const velocity = incoming.clone().multiplyScalar(between(COMET_SPEED));
  const start = impact.clone().addScaledVector(incoming, -(SPACE_RADIUS - GLOBE_RADIUS));
  const spin = new Vector3().randomDirection().multiplyScalar(2 + Math.random() * 3);
  return { id: nextFlightId++, start, velocity, impact, normal, spin };
}

/** One rock's pass. Its motion lives in refs and plain objects: React renders it once, at launch. */
function Comet({ flight, onGone }: { flight: Flight; onGone: (id: number) => void }) {
  const { scene } = useGLTF(ROCK_URL);
  const head = useRef<Group>(null);
  const ring = useRef<Mesh>(null);
  // Per-frame motion: a copy of the launch velocity, so the flight passed in as a prop is never changed.
  const state = useRef({ velocity: flight.velocity.clone(), bounced: false, sinceImpact: IMPACT_TIME, gone: false });

  // The rock's shape and outline are computed once and shared by every launch (see inkModelOf).
  const { ink, scale, paint } = useMemo(() => {
    const ink = inkModelOf(scene);
    const size = ink.box.getSize(new Vector3());
    let original: Mesh["material"] | undefined;
    scene.traverse((node) => {
      if (!original && node instanceof Mesh) original = node.material;
    });
    // In colour from the outside palette, like the island: things from outside the page are in colour.
    return {
      ink,
      scale: COMET_SIZE / Math.max(size.x, size.y, size.z),
      paint: original ? outsideMaterial(original) : surfaceMaterial("slate"),
    };
  }, [scene]);

  // Each rock has its own ring material, for its own fade. Deliberately never disposed: disposing the last
  // user of a shader program makes three.js delete the program, and the next launch would then recompile
  // it, freezing the page for a moment. An undisposed material is just a small object the GC collects.
  const [ringMaterial] = useState(
    () => new MeshBasicMaterial({ color: cssColor("paper"), transparent: true, side: DoubleSide, depthWrite: false }),
  );

  useFrame((_, rawDelta) => {
    const node = head.current;
    const s = state.current;
    if (!node || s.gone) return;
    // A long pause (hidden tab) would otherwise teleport the rock through the glass.
    const delta = Math.min(rawDelta, 0.05);

    node.position.addScaledVector(s.velocity, delta);
    node.rotation.x += flight.spin.x * delta;
    node.rotation.y += flight.spin.y * delta;
    node.rotation.z += flight.spin.z * delta;

    // Ricochet once it reaches the impact point: reflect the velocity off the glass. Only the part along the
    // normal flips, the part along the glass is kept, so a shallow hit glances off instead of bouncing back.
    const heading = s.velocity.dot(flight.normal);
    if (!s.bounced && heading < 0 && node.position.distanceTo(flight.impact) < s.velocity.length() * delta) {
      s.velocity.addScaledVector(flight.normal, -2 * heading);
      s.bounced = true;
      s.sinceImpact = 0;
      if (ring.current) {
        ring.current.position.copy(flight.impact).addScaledVector(flight.normal, -COMET_SIZE / 2);
        ring.current.lookAt(flight.impact.clone().add(flight.normal)); // lay the ring flat on the glass
      }
    }

    s.sinceImpact = Math.min(s.sinceImpact + delta, IMPACT_TIME);
    const t = s.sinceImpact / IMPACT_TIME;
    const ringMesh = ring.current;
    if (ringMesh) {
      ringMesh.visible = t < 1;
      ringMesh.scale.setScalar(0.5 + t * 3);
      if (ringMesh.material instanceof MeshBasicMaterial) ringMesh.material.opacity = 1 - t;
    }

    // Gone once it has bounced and flown back out as far as it started.
    if (s.bounced && t >= 1 && node.position.distanceTo(flight.impact) > SPACE_RADIUS - GLOBE_RADIUS) {
      s.gone = true;
      onGone(flight.id);
    }
  });

  const paper = cssColor("paper");
  return (
    <>
      {/* Starts at the launch point, so the trail doesn't streak in from the origin on the first frame. */}
      <Trail width={2.2} length={4} color={paper} attenuation={(w) => w * w}>
        <group ref={head} position={flight.start}>
          <group scale={scale}>
            <mesh geometry={ink.surface} material={paint} />
            <mesh geometry={ink.surface} material={silhouetteMaterial()} />
            <lineSegments geometry={ink.edges} material={lineMaterial()} />
          </group>
        </group>
      </Trail>
      <mesh ref={ring} material={ringMaterial} visible={false}>
        <ringGeometry args={[0.8, 1, 32]} />
      </mesh>
    </>
  );
}

/**
 * Launches a rock every few seconds, at most MAX_COMETS at a time. Each rock is its own component, keyed
 * by flight: launching mounts a fresh one (and a fresh trail), finishing unmounts it.
 */
function Comets() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const onGone = useCallback((id: number) => setFlights((all) => all.filter((f) => f.id !== id)), []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const launch = () => {
      setFlights((all) => (all.length < MAX_COMETS ? [...all, planFlight()] : all));
      timer = setTimeout(launch, between(SPAWN_DELAY) * 1000);
    };
    timer = setTimeout(launch, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={null}>
      {flights.map((flight) => (
        <Comet key={flight.id} flight={flight} onGone={onGone} />
      ))}
    </Suspense>
  );
}

useGLTF.preload(ROCK_URL);

/**
 * The sky: a dome far beyond the stars, ink below the horizon fading to a deep slate overhead, so space has
 * depth instead of flat black. Drawn first and never written to depth, it sits behind everything.
 */
function Sky() {
  const uniforms = useMemo(
    () => ({ low: { value: new Color(cssColor("ink")) }, high: { value: new Color(cssColor("slate")).multiplyScalar(0.35) } }),
    [],
  );
  return (
    <mesh renderOrder={-1}>
      <sphereGeometry args={[500, 32, 16]} />
      <shaderMaterial
        uniforms={uniforms}
        side={BackSide}
        depthWrite={false}
        vertexShader={
          /* glsl */ `
          varying float vHeight;
          void main() {
            vHeight = normalize(position).y;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`
        }
        fragmentShader={
          /* glsl */ `
          uniform vec3 low;
          uniform vec3 high;
          varying float vHeight;
          void main() {
            gl_FragColor = vec4(mix(low, high, smoothstep(-0.2, 0.9, vHeight)), 1.0);
            #include <colorspace_fragment>
          }`
        }
      />
    </mesh>
  );
}

/** A soft round glow, drawn once on a small canvas and shared by every nebula cloud. */
function glowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.35)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

/** Nebulae: where they sit (direction from the island), how big, and their colour from the outside palette. */
const NEBULAE = [
  { direction: [-1, 0.35, -0.6], size: 150, color: "slate" },
  { direction: [0.9, 0.5, -0.8], size: 120, color: "moss" },
  { direction: [0.7, -0.3, 0.9], size: 110, color: "clay" },
  { direction: [-0.8, -0.45, 0.7], size: 130, color: "slate" },
  { direction: [0.1, 0.9, 0.3], size: 100, color: "moss" },
] as const;
const NEBULA_DISTANCE = 260;

/**
 * Nebulae as clusters of soft glows, added together (additive blending) so overlaps brighten like light
 * rather than stacking like paper. Each cluster is a few sprites at pseudo-random offsets; the whole set
 * turns very slowly, so the sky drifts behind the island without anything visibly moving.
 */
type Cloud = { position: Vector3; scale: number; material: SpriteMaterial };
let clouds: Cloud[] | undefined;

/** Built once for the page's lifetime: the sky never changes, and its materials' shaders stay compiled. */
function nebulaClouds(): Cloud[] {
  if (clouds) return clouds;
  const texture = glowTexture();
  let seed = 7;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647; // repeatable: same sky every visit
  clouds = NEBULAE.flatMap((nebula) => {
    const centre = new Vector3(...nebula.direction).normalize().multiplyScalar(NEBULA_DISTANCE);
    return Array.from({ length: 5 }, () => {
      const offset = new Vector3(random() - 0.5, random() - 0.5, random() - 0.5).multiplyScalar(nebula.size * 0.8);
      const material = new SpriteMaterial({
        map: texture,
        color: cssColor(nebula.color),
        transparent: true,
        opacity: 0.1 + random() * 0.12,
        blending: AdditiveBlending,
        depthWrite: false,
      });
      return { position: centre.clone().add(offset), scale: nebula.size * (0.5 + random() * 0.7), material };
    });
  });
  return clouds;
}

function Nebulae({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null);
  const clouds = nebulaClouds();

  useFrame((_, delta) => {
    if (animate && group.current) group.current.rotation.y += delta * 0.004;
  });

  return (
    <group ref={group}>
      {clouds.map((cloud, i) => (
        <sprite key={i} position={cloud.position} scale={cloud.scale} material={cloud.material} />
      ))}
    </group>
  );
}

/** Where the arena floats: a starfield, the glass globe around the island, and comets bouncing off it. */
function Space({ animate }: { animate: boolean }) {
  return (
    <>
      <Sky />
      <Nebulae animate={animate} />
      <Stars radius={220} depth={120} count={7000} factor={5} saturation={0} fade speed={animate ? 0.6 : 0} />
      {/* Dust drifting around the island, catching the light: the air inside the globe. */}
      <Sparkles
        position={GLOBE_CENTER}
        count={140}
        scale={[GLOBE_RADIUS * 1.8, GLOBE_RADIUS, GLOBE_RADIUS * 1.8]}
        size={2.5}
        speed={animate ? 0.25 : 0}
        opacity={0.55}
        color={cssColor("paper")}
      />
      <Globe />
      {animate && <Comets />}
    </>
  );
}

// Memoised: re-renders only when its own props change, not whenever the page does (e.g. on every
// station change, which only concerns the two stations swapping state).
export default memo(Space);
