import { ARENA_DEPTH, ARENA_WIDTH, PAPER, WALLS } from "../scene/arena";
import Wall from "./Wall";

export default function Arena() {
  return (
    <>
      {WALLS.map((wall, index) => (
        <Wall key={index} position={wall.position} size={wall.size} />
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[ARENA_WIDTH, ARENA_DEPTH]} />
        <meshStandardMaterial color={PAPER} />
      </mesh>
    </>
  );
}
