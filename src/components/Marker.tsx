import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { type Mesh, MeshBasicMaterial, Plane, Vector3 } from "three";
import { ARENA_DEPTH, ARENA_WIDTH, WALL_THICKNESS } from "@/scene/arena";
import type { Ring } from "@/scene/props";
import { cssColor } from "@/styles/tokens";

const insideX = ARENA_WIDTH / 2 - WALL_THICKNESS / 2;
const insideZ = ARENA_DEPTH / 2 - WALL_THICKNESS / 2;
/**
 * The walls' inner faces, as clipping planes (world space): a ring centred near a wall, like the gate's,
 * would otherwise spill out through the opening. Pixels beyond any plane are simply not drawn.
 */
const INSIDE_WALLS = [
  new Plane(new Vector3(-1, 0, 0), insideX),
  new Plane(new Vector3(1, 0, 0), insideX),
  new Plane(new Vector3(0, 0, -1), insideZ),
  new Plane(new Vector3(0, 0, 1), insideZ),
];

let bandMaterial: MeshBasicMaterial | undefined;
let pulseMaterial: MeshBasicMaterial | undefined;

/**
 * The ring's materials are made once and shared, never owned by the JSX. Created per mount, they'd be
 * disposed whenever the active station changes, three.js would drop their compiled shader programs with
 * them, and the next ring would recompile both, freezing the page for a moment at every station change.
 */
function ringMaterials() {
  bandMaterial ??= new MeshBasicMaterial({ color: cssColor("acid"), clippingPlanes: INSIDE_WALLS });
  pulseMaterial ??= new MeshBasicMaterial({
    color: cssColor("acid"),
    transparent: true,
    depthWrite: false,
    clippingPlanes: INSIDE_WALLS,
  });
  return { band: bandMaterial, pulse: pulseMaterial };
}

/** Seconds for one pulse to spread out and fade. */
const PULSE_TIME = 1.8;
/** Ring band width, in world units. */
const BAND = 0.12;

/**
 * The active station's ring: a flat acid band on the floor around the whole exhibit, with a thinner ring
 * spreading out from it and fading, over and over. Flat colour, no shading or outline: it's a mark painted
 * on the floor, not an object. Only the active station renders one.
 */
export default function Marker({ ring, animate }: { ring: Ring; animate: boolean }) {
  const pulse = useRef<Mesh>(null);
  const materials = ringMaterials();

  useFrame((state) => {
    const mesh = pulse.current;
    if (!mesh) return;
    mesh.visible = animate;
    if (!animate || !(mesh.material instanceof MeshBasicMaterial)) return;
    const t = (state.clock.elapsedTime % PULSE_TIME) / PULSE_TIME;
    mesh.scale.setScalar(1 + t * 0.25);
    mesh.material.opacity = 0.7 * (1 - t);
  });

  return (
    // Just above the floor so it doesn't flicker against the tiles.
    <group position={[ring.centre[0], 0.02, ring.centre[1]]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh material={materials.band}>
        <ringGeometry args={[ring.radius - BAND, ring.radius, 96]} />
      </mesh>
      <mesh ref={pulse} visible={false} material={materials.pulse}>
        <ringGeometry args={[ring.radius - BAND / 3, ring.radius, 96]} />
      </mesh>
    </group>
  );
}
