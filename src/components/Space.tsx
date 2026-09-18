import { Stars, Trail, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box3, Color, DoubleSide, type Group, MathUtils, type Mesh, MeshBasicMaterial, Vector3 } from "three";
import { inkify, outsideMaterial } from "@/scene/ink";
import { GLOBE_CENTER, GLOBE_RADIUS, SPACE_RADIUS } from "@/scene/space";
import { cssColor } from "@/styles/tokens";

/**
 * Glass drawn as a rim of light: faces seen edge-on (the outline of the sphere) glow, faces seen head-on are
 * nearly clear. That reads as glass without the cost of real refraction, and fits the drawn style.
 */
function Globe() {
  const uniforms = useMemo(() => ({ color: { value: new Color(cssColor("paper")) } }), []);

  return (
    <mesh position={GLOBE_CENTER}>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={DoubleSide}
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
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            float rim = 1.0 - abs(dot(normalize(vNormal), normalize(vView)));
            gl_FragColor = vec4(color, 0.015 + pow(rim, 6.0) * 0.6);
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

  const { rock, edges, ringMaterial } = useMemo(() => {
    const rock = scene.clone(true);
    const size = new Box3().setFromObject(rock).getSize(new Vector3());
    rock.scale.setScalar(COMET_SIZE / Math.max(size.x, size.y, size.z));
    // In colour from the outside palette, like the island: things from outside the page are in colour.
    const edges = inkify(rock, (mesh) => outsideMaterial(mesh.material));
    const ringMaterial = new MeshBasicMaterial({
      color: cssColor("paper"),
      transparent: true,
      side: DoubleSide,
      depthWrite: false,
    });
    return { rock, edges, ringMaterial };
  }, [scene]);

  useEffect(
    () => () => {
      edges.forEach((geometry) => geometry.dispose());
      ringMaterial.dispose();
    },
    [edges, ringMaterial],
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
          <primitive object={rock} />
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

/** Where the arena floats: a starfield, the glass globe around the island, and comets bouncing off it. */
export default function Space({ animate }: { animate: boolean }) {
  return (
    <>
      <Stars radius={220} depth={120} count={7000} factor={5} saturation={0} fade speed={animate ? 0.6 : 0} />
      <Globe />
      {animate && <Comets />}
    </>
  );
}
