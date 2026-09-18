import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Registered once, here: every component imports GSAP from this module, never from "gsap" directly.
gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

/** Motion runs only for visitors who haven't asked their system to reduce it. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * Letters rise into place from behind a mask, word by word. autoSplit re-splits (and replays) once the web
 * font has loaded or the width changes, so lines never break wrongly; returning the tween from onSplit lets
 * SplitText revert it cleanly on re-split. SplitText also puts the full text in an aria-label for readers.
 */
export function riseLetters(heading: Element, vars: gsap.TweenVars = {}) {
  return SplitText.create(heading, {
    type: "words,chars",
    mask: "words",
    autoSplit: true,
    onSplit: (self) =>
      gsap.from(self.chars, { yPercent: 110, duration: 0.7, ease: "power4.out", stagger: 0.012, ...vars }),
  });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
