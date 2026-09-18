import { memo, Suspense } from "react";
import { ARENA_DEPTH, ARENA_WIDTH, WALLS } from "../scene/arena";
import {
  FLOOR_DETAIL_TILES,
  FLOOR_TILES,
  PILLAR_TILES,
  SCENERY,
  STAND_TILES,
  WALL_TILES,
} from "../scene/structure";
import { cssColor } from "../styles/tokens";
import Island from "./Island";
import PropModel from "./PropModel";
import Tiles from "./Tiles";
import Wall from "./Wall";

/** The greybox arena: shown while the Kenney pieces load. */
function BoxArena() {
  return (
    <>
      {WALLS.map((wall, index) => (
        <Wall key={index} position={wall.position} size={wall.size} />
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[ARENA_WIDTH, ARENA_DEPTH]} />
        <meshStandardMaterial color={cssColor("paper")} />
      </mesh>
    </>
  );
}

function Arena() {
  return (
    <>
      <Suspense fallback={null}>
        <Island />
      </Suspense>
      <Suspense fallback={<BoxArena />}>
        <Tiles model="floor" tiles={FLOOR_TILES} line="graphite" silhouette={false} />
        <Tiles model="floor-detail" tiles={FLOOR_DETAIL_TILES} line="graphite" silhouette={false} />
        <Tiles model="wall" tiles={WALL_TILES} />
        <Tiles model="column" tiles={PILLAR_TILES} />
        <Tiles model="stairs" tiles={STAND_TILES} />
      </Suspense>

      {SCENERY.map((prop, i) => (
        // fixed data that never reorders, so the index is a safe part of the key
        <Suspense key={`${prop.name}-${i}`} fallback={null}>
          <PropModel {...prop} />
        </Suspense>
      ))}
    </>
  );
}

// Memoised: re-renders only when its own props change, not whenever the page does (e.g. on every
// station change, which only concerns the two stations swapping state).
export default memo(Arena);
