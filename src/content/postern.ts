import type { StationContent } from "./types"

export const POSTERN = {
  heading: "Contact me",
  lede: "Please contact me directly by email, or through the form.",
  actions: [
    { kind: "email", label: "bagdadi.nidhal@gmail.com", href: "mailto:bagdadi.nidhal@gmail.com" },
    { kind: "external", label: "LinkedIn", href: "https://linkedin.com/in/nidhal-baghdadi" },
  ],
} as const satisfies StationContent
