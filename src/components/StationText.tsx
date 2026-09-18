import type { StationContent } from "@/content/types";
import type { ArenaStation } from "@/scene/arena";
import StationActions from "./StationActions";
import StationBody from "./StationBody";
import StationHeader from "./StationHeader";

/**
 * A station's whole text, in reading order, for both the panel and page mode. Actions usually close the
 * station; on Contact they come first, so the direct email sits above the form.
 */
export default function StationText({
  station,
  content,
  level,
  headingId,
}: {
  station: ArenaStation;
  content: StationContent;
  level: "h1" | "h2";
  headingId: string;
}) {
  const actions = <StationActions actions={content.actions} />;
  const actionsFirst = content.kind === "contact";
  return (
    <>
      <StationHeader station={station} content={content} level={level} headingId={headingId} />
      {actionsFirst && actions}
      <StationBody content={content} itemHeading={level === "h1" ? "h2" : "h3"} />
      {!actionsFirst && actions}
    </>
  );
}
