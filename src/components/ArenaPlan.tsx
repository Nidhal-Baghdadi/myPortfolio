import type { StationId } from "@/scene/arena";
import styles from "./ArenaPlan.module.css";
import { WALLS, STATIONS } from "@/scene/arena";
import { ARENA_WIDTH, ARENA_DEPTH } from "@/scene/arena";

export default function ArenaPlan({ activeId }: { activeId: StationId }) {
  return (
    <nav className={styles.plan} aria-label="Arena plan">
      <svg
        viewBox={`${-ARENA_WIDTH / 2} ${-ARENA_DEPTH / 2} ${ARENA_WIDTH} ${ARENA_DEPTH}`}
      >
        {WALLS.map((wall, i) => (
          <rect
            key={i}
            className={styles.wall}
            x={wall.position[0] - wall.size[0] / 2} // centre x − half the width
            y={wall.position[2] - wall.size[2] / 2} // centre z − half the depth
            width={wall.size[0]} // wall width  (world x)
            height={wall.size[2]} // wall depth  (world z)
          />
        ))}

        {STATIONS.map((station) => {
          const isActive = station.id === activeId;
          return (
            <a
              key={station.id}
              href={`#${station.id}`}
              aria-label={station.name}
              aria-current={isActive ? "location" : undefined}
            >
              <circle
                className={styles.station}
                cx={station.x}
                cy={station.z}
                r={0.8}
              />
            </a>
          );
        })}
      </svg>
    </nav>
  );
}
