import type { ArenaStation } from "@/scene/arena";
import Marker from "./Marker";
import { cssColor } from "../styles/tokens";
import { CONTENT } from "../content";
import type { StationContent } from "@/content/types";

export default function StationGroup({
  station,
  isActive,
}: {
  station: ArenaStation;
  isActive: boolean;
}) {
  const content: StationContent = CONTENT[station.id];
  const facing = Math.atan2(-station.x, -station.z);

  return (
    <group position={[station.x, 0, station.z]} rotation={[0, facing, 0]}>
      <Marker
        color={cssColor(isActive ? "acid" : "paper")}
        animate={isActive}
      />

      {content.kind === "projects" &&
        content.items.map((project, i) => (
          <mesh
            key={project.title}
            position={[(i - (content.items.length - 1) / 2) * 1.5, 0.5, -1.5]}
          >
            <boxGeometry args={[0.8, 1, 0.8]} />
            <meshStandardMaterial color={cssColor("paper")} />
          </mesh>
        ))}
    </group>
  );
}
