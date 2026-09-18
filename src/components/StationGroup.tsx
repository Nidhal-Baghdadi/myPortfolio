import { memo, Suspense } from "react";
import { type ArenaStation, stationFacing } from "@/scene/arena";
import { STATION_PROPS, STATION_RINGS } from "@/scene/props";
import Marker from "./Marker";
import Placeholder from "./Placeholder";
import PropModel from "./PropModel";

function StationGroup({
  station,
  isActive,
}: {
  station: ArenaStation;
  isActive: boolean;
}) {
  const facing = stationFacing(station);

  return (
    <group position={[station.x, 0, station.z]} rotation={[0, facing, 0]}>
      {isActive && <Marker ring={STATION_RINGS[station.id]} animate />}

      {STATION_PROPS[station.id].map((prop, i) => (
        // fixed data that never reorders, so the index is a safe part of the key
        <Suspense key={`${prop.name}-${i}`} fallback={<Placeholder position={prop.position} size={prop.size} />}>
          <PropModel {...prop} accent={isActive} />
        </Suspense>
      ))}
    </group>
  );
}

// Memoised: re-renders only when its own props change, not whenever the page does (e.g. on every
// station change, which only concerns the two stations swapping state).
export default memo(StationGroup);
