import { GATE } from "./gate"
import { PODIUM } from "./podium"
import { PLINTHS } from "./plinths"
import { TOOL_RACK } from "./toolRack"
import { STATUES } from "./statues"
import { POSTERN } from "./postern"
import type { StationId } from "@/scene/arena"

import type { StationContent, MyRecord } from "./types"

export const CONTENT = {
  gate: GATE,
  podium: PODIUM,
  plinths: PLINTHS,
  toolRack: TOOL_RACK,
  statues: STATUES,
  postern: POSTERN,
} satisfies MyRecord<StationId, StationContent>
