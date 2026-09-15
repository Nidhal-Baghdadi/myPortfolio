import type { Section } from "./types"

export const PODIUM = {
  heading: "About me",
  lede: "I'm a software engineer based in Tunisia, currently working at Pwn&Patch on web platforms, back-end services, and data-driven product features.",
  items: [
    "After an early academic detour, I moved fully into software engineering at EPI Sousse and completed the ESIEA-EPI double diploma program in Paris.",
    "I enjoy product-minded engineering: understanding the problem, shaping a practical interface, and building the services and data flows that make the experience reliable.",
    "My core stack includes JavaScript, TypeScript, Vue, React, Node.js, Ruby on Rails, MongoDB, MySQL, Elasticsearch, Docker, and CI/CD. I've also worked with Flutter, Spring Boot, Azure, IBM Cloud, and Kubernetes across internships and academic projects.",
  ],
  actions: [],
} as const satisfies Section<string>
