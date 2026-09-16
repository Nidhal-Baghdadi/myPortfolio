import type { StationContent } from "./types"

export const TOOL_RACK = {
  heading: "My skills",
  lede: "Languages, frameworks, and tools I've worked with.",
  kind: "skills", 
  items: [
    "HTML", "CSS", "JavaScript", "TypeScript", "Python", "PHP",
    "Vue", "React", "Next.js", "Node.js", "Ruby on Rails", "Angular", "Spring Boot", "Flutter",
    "Git", "GitLab", "Tailwind", "MongoDB", "MySQL", "Elasticsearch",
    "REST APIs", "Express", "Docker", "Kubernetes", "Microsoft Azure", "IBM Cloud", "Swagger", "CI/CD", "Scrum",
  ],
  actions: [],
} as const satisfies StationContent
