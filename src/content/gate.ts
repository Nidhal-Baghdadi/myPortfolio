import type { StationContent } from "./types"

export const GATE = {
  heading: "Hello, I am Nidhal.",
  lede: "A software engineer building full-stack web applications, back-end services, and practical product features.",
  actions: [{ kind: "station", label: "Contact me", to: "postern" }, { kind: "file", label: "Download CV", href: "/CV/CV.pdf" }, { kind: "external", label: "LinkedIn", href: "https://linkedin.com/in/nidhal-baghdadi" }, { kind: "external", label: "Github", href: "https://github.com/Nidhal-Baghdadi" }]
} as const satisfies StationContent