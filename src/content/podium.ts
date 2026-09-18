import type { StationContent } from "./types"

export const PODIUM = {
  heading: "About me",
  lede: "I'm a full-stack software engineer in Tunis, with experience across several industries and tech stacks. Currently at Pwn&Patch, building cyber threat intelligence tools.",
  kind: "paragraphs",
  facts: [
    { label: "Based in", value: "Tunis, Tunisia" },
    { label: "Now", value: "Software engineer at Pwn&Patch" },
    { label: "Studied", value: "ESIEA–EPI double diploma" },
    { label: "Speaks", value: "French, English (TOEIC 975/990)" },
  ],
  items: [
    "I studied software engineering at EPI in Sousse and completed the ESIEA–EPI double diploma in Paris, with internships at Dassault Systèmes and IBM and team projects for Thales Group and COLAS.",
    "I adapt quickly and like learning new tools: I've shipped Ruby on Rails services for threat intelligence data, Node.js back-ends for an augmented reality app, and real-time Vue interfaces for diagrams.",
    "Outside work I've competed in programming contests (IEEEXtreme, Google Hash Code, TCPC), belonged to EPI's CO-PRO and Google Developer Student Club, and taught English part-time to middle and high school students.",
  ],
  actions: [],
} as const satisfies StationContent
