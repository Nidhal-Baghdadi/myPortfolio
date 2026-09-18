import { useState } from "react";
import { useScene } from "../scene/sceneContext";
import ArenaView from "./ArenaView";
import ReadingView from "./ReadingView";

/**
 * The home page, in one of two modes: the 3D tour, or the same content as a plain website. Both keep the
 * address hash on the station you're at, so switching lands you in the same place.
 */
export default function ArenaPage() {
  const { readAsPage, setReadAsPage } = useScene();
  // Set when the visitor switches: the button they pressed disappears with its view, so the new view's
  // switch takes focus instead of dropping it to the top of the document. Not on first load.
  const [switched, setSwitched] = useState(false);
  const switchTo = (page: boolean) => {
    setSwitched(true); // batched with the mode change: one render
    setReadAsPage(page);
  };
  return readAsPage ? (
    <ReadingView onShowArena={() => switchTo(false)} focusSwitch={switched} />
  ) : (
    <ArenaView onReadAsPage={() => switchTo(true)} focusSwitch={switched} />
  );
}
