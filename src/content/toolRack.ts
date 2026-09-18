import type { StationContent } from "./types"

// Grouped as on the CV (public/CV/CV.pdf): keep the two in step.
export const TOOL_RACK = {
  heading: "My skills",
  lede: "Languages, frameworks, and tools I've worked with. The highlighted ones are my everyday stack.",
  kind: "skills",
  items: [
    { area: "Languages", items: ["JavaScript", "TypeScript", "Ruby", "Python", "SQL", "PHP", "HTML", "CSS"] },
    { area: "Frameworks", items: ["Node.js", "Ruby on Rails", "Vue.js (2 & 3)", "React", "Tailwind CSS", "Flutter"] },
    { area: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL", "Elasticsearch"] },
    {
      area: "DevOps & tools",
      items: ["Docker", "Git", "GitHub", "GitLab", "CI/CD", "Postman", "Swagger", "Linux", "Kubernetes", "IBM Cloud", "Microsoft Azure"],
    },
    { area: "Practices", items: ["REST APIs", "OOP", "Object modelling", "Relational databases", "Agile / Scrum"] },
    { area: "Design", items: ["Figma", "Excalidraw", "draw.io (UML)"] },
    { area: "Project tools", items: ["Jira", "Trello"] },
  ],
  // Everyday: the Pwn&Patch stack and the portfolio projects' stack.
  core: ["JavaScript", "TypeScript", "Ruby", "Ruby on Rails", "Node.js", "React", "PostgreSQL", "MongoDB", "Elasticsearch", "Docker", "Git"],
  actions: [],
} as const satisfies StationContent
