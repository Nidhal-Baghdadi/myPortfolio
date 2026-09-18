import type { StationContent } from "./types"

export const POSTERN = {
  heading: "Contact me",
  lede: "Write to me directly by email, or leave a message below: it lands in the same inbox.",
  kind: "contact",
  actions: [
    { kind: "email", label: "bagdadi.nidhal@gmail.com", href: "mailto:bagdadi.nidhal@gmail.com" },
    { kind: "external", label: "LinkedIn", href: "https://linkedin.com/in/nidhal-baghdadi" },
  ],
} as const satisfies StationContent
