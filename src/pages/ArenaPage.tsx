import { useScene } from "../scene/sceneContext";
import ArenaView from "./ArenaView";
import ReadingView from "./ReadingView";

/**
 * The home page, in one of two modes: the 3D tour, or the same content as a plain website. Both keep the
 * address hash on the station you're at, so switching lands you in the same place.
 */
export default function ArenaPage() {
  const { readAsPage, setReadAsPage } = useScene();
  return readAsPage ? (
    <ReadingView onShowArena={() => setReadAsPage(false)} />
  ) : (
    <ArenaView onReadAsPage={() => setReadAsPage(true)} />
  );
}
