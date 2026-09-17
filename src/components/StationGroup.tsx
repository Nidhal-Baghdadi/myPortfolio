import type { ArenaStation } from "@/scene/arena";
import { STATION_PROPS } from "@/scene/props";
import { cssColor } from "../styles/tokens";
import Marker from "./Marker";
import Placeholder from "./Placeholder";

export default function StationGroup({
  station,
  isActive,
}: {
  station: ArenaStation;
  isActive: boolean;
}) {
  const facing = Math.atan2(-station.x, -station.z);

  return (
    <group position={[station.x, 0, station.z]} rotation={[0, facing, 0]}>
      <Marker color={cssColor(isActive ? "acid" : "paper")} animate={isActive} />

      {STATION_PROPS[station.id].map((prop, i) => (
        // fixed data that never reorders, so the index is a safe part of the key
        <Placeholder key={`${prop.name}-${i}`} position={prop.position} size={prop.size} />
      ))}
    </group>
  );
}
