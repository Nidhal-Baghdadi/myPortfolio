import type { Project, Section } from "./types"

export const PLINTHS = {
  heading: "My projects",
  lede: "Side projects, each with its code on GitHub.",
  items: [
    {
      title: "Swiftex",
      description: "A real-time renderer for LaTeX and MathJax packaged as a React wrapper.",
      tags: ["React", "MathJax", "Tailwind"],
      image: "/swiftex.png",
      repo: "https://github.com/Nidhal-Baghdadi/SwifTex",
    },
    {
      title: "Oui, mais... Pourquoi?!",
      description:
        "Display course documents in a user-friendly 3D environment to help young students navigate through course dependencies and make learning more playful.",
      tags: ["React", "Three.js", "Next.js", "Tailwind", "Prisma"],
      image: "/whythough.png",
      repo: "https://github.com/Nidhal-Baghdadi/oui-mais-pourquoi",
    },
    {
      title: "3D Maze",
      description: "A 3D browser game where players navigate through a maze to escape.",
      tags: ["React", "Three.js"],
      image: "/maze_3d.png",
      repo: "https://github.com/Nidhal-Baghdadi/3d-maze",
    },
  ],
  actions: [{ kind: "external", label: "All code on GitHub", href: "https://github.com/Nidhal-Baghdadi" }],
} as const satisfies Section<Project>
