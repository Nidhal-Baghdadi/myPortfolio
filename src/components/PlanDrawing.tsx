import { type ReactNode, useId } from "react";
import {
  ARENA_DEPTH,
  ARENA_WIDTH,
  STATIONS,
  WALL_THICKNESS,
  type ArenaStation,
  type StationId,
  WALLS,
  stationFacing,
  toArena,
} from "@/scene/arena";
import { STATION_PROPS, STATION_RINGS, type PropSpec } from "@/scene/props";
import { SCENERY, STAND_TILES } from "@/scene/structure";
import styles from "./PlanDrawing.module.css";

const deg = (radians: number) => (radians * 180) / Math.PI;

/** A prop's footprint: its box seen from above, turned like the model. */
function Footprint({ prop }: { prop: PropSpec }) {
  const [x, , z] = prop.position;
  const [w, , d] = prop.size;
  // SVG rotates clockwise on screen with z pointing down, the opposite of three.js's turn: hence the minus.
  return (
    <rect
      className={styles.prop}
      x={-w / 2}
      y={-d / 2}
      width={w}
      height={d}
      transform={`translate(${x} ${z}) rotate(${-deg(prop.turn ?? 0)})`}
    />
  );
}

/** The station's local space, placed and turned the way StationGroup places it in 3D. */
function StationSpace({
  station,
  children,
}: {
  station: ArenaStation;
  children: ReactNode;
}) {
  return (
    <g
      transform={`translate(${station.x} ${station.z}) rotate(${-deg(stationFacing(station))})`}
    >
      {children}
    </g>
  );
}

type PlanDrawingProps = {
  activeId: StationId;
  /** The full map adds props, stands, rings and labels; the corner map shows walls and numbered stations. */
  detailed?: boolean;
  /** Called when a station link is followed, e.g. to close the dialog around the map. */
  onNavigate?: () => void;
};

/**
 * The arena seen from above, in arena units: the SVG's viewBox is the arena itself, so every position comes
 * straight from the same data as the 3D scene (x across, z down the page) and can't drift from it.
 */
export default function PlanDrawing({
  activeId,
  detailed = false,
  onNavigate,
}: PlanDrawingProps) {
  const margin = detailed ? 0.8 : 0.4;
  // Unique per drawing: the corner map and the full map are on the page at the same time.
  const insideId = useId();
  const insideX = ARENA_WIDTH / 2 - WALL_THICKNESS / 2;
  const insideZ = ARENA_DEPTH / 2 - WALL_THICKNESS / 2;
  return (
    <svg
      className={styles.plan}
      viewBox={`${-ARENA_WIDTH / 2 - margin} ${-ARENA_DEPTH / 2 - margin} ${ARENA_WIDTH + 2 * margin} ${ARENA_DEPTH + 2 * margin}`}
    >
      <defs>
        {/* The walls' inner faces: rings stop there, as they do on the 3D floor. */}
        <clipPath id={insideId}>
          <rect
            x={-insideX}
            y={-insideZ}
            width={insideX * 2}
            height={insideZ * 2}
          />
        </clipPath>
      </defs>

      {detailed && (
        <g aria-hidden="true">
          {STAND_TILES.map((tile, i) => (
            <rect
              key={i}
              className={styles.stand}
              x={tile.position[0] - 0.5}
              y={tile.position[2] - 0.5}
              width={1}
              height={1}
            />
          ))}
          {SCENERY.map((prop, i) => (
            <Footprint key={i} prop={prop} />
          ))}
          {STATIONS.map((station) => (
            <StationSpace key={station.id} station={station}>
              {STATION_PROPS[station.id].map((prop, i) => (
                <Footprint key={i} prop={prop} />
              ))}
            </StationSpace>
          ))}
          <g clipPath={`url(#${insideId})`}>
            {STATIONS.map((station) => {
              const ring = STATION_RINGS[station.id];
              const [cx, cz] = toArena(station, ring.centre);
              return station.id === activeId ? (
                <g key={station.id}>
                  <circle
                    className={styles.activeRim}
                    cx={cx}
                    cy={cz}
                    r={ring.radius}
                  />
                  <circle
                    className={styles.activeBand}
                    cx={cx}
                    cy={cz}
                    r={ring.radius}
                  />
                </g>
              ) : (
                <circle
                  key={station.id}
                  className={styles.ring}
                  cx={cx}
                  cy={cz}
                  r={ring.radius}
                />
              );
            })}
          </g>
        </g>
      )}

      <g aria-hidden="true">
        {WALLS.map((wall, i) => (
          <rect
            key={i}
            className={styles.wall}
            x={wall.position[0] - wall.size[0] / 2}
            y={wall.position[2] - wall.size[2] / 2}
            width={wall.size[0]}
            height={wall.size[2]}
          />
        ))}
      </g>

      {STATIONS.map((station, i) => {
        const isActive = station.id === activeId;
        const number = String(i + 1).padStart(2, "0");
        // Labels sit on the side facing the arena's centre, so they stay inside the walls.
        const labelBelow = station.z < 0;
        const labelAnchor =
          station.x > 3 ? "end" : station.x < -3 ? "start" : "middle";
        return (
          <a
            key={station.id}
            href={`#${station.id}`}
            aria-label={`${number} ${station.name}: ${station.topic}`}
            aria-current={isActive ? "location" : undefined}
            onClick={onNavigate}
          >
            <circle
              className={styles.station}
              cx={station.x}
              cy={station.z}
              r={detailed ? 0.55 : 0.85}
            />
            <text
              className={styles.number}
              x={station.x}
              y={station.z}
              fontSize={detailed ? 0.5 : 0.8}
            >
              {i + 1}
            </text>
            {detailed && (
              <text
                className={styles.label}
                x={station.x}
                y={station.z + (labelBelow ? 1.2 : -1.6)}
                textAnchor={labelAnchor}
              >
                <tspan className={styles.labelName}>{station.name}</tspan>
                <tspan x={station.x} dy={0.6}>
                  {station.topic}
                </tspan>
              </text>
            )}
          </a>
        );
      })}
    </svg>
  );
}
