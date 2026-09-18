import type { StationContent } from "./types"

export const PLINTHS = {
  kind: "projects",
  heading: "My projects",
  lede: "From a four-day 3D prototype to a production-grade document workspace.",
  items: [
    {
      slug: "due-to-do",
      title: "Due To Do",
      tagline: "An evidence-bound document workspace",
      description:
        "A document workspace where every finding cites its source passage and nothing is sent, assigned or filed until a named person accepts it.",
      tags: ["React", "TypeScript", "NestJS", "PostgreSQL", "pgvector", "Redis"],
      image: "/projects/due-to-do/cover.webp",
      facts: { role: "Solo project", period: "Mar – Sep 2026", status: "Live" },
      problem:
        "Most document tooling stops at storage plus a chat box. The hard part is everything around the model: which sources are approved, what the company always checks for, who may see what, and who signs off. Due To Do reads each document against a checklist the company writes itself, attaches the supporting passage to every finding, and holds every action until a person with the authority accepts it.",
      steps: [
        "Work arrives from a watched mailbox, an email attachment or a direct upload, and lands in one inventory.",
        "Each document moves through queued, text extraction, classification, data extraction and validation, and every transition is recorded.",
        "It is read against the company's doctrine: versioned checks written in the team's own words, each marked required, watch or forbidden.",
        "Findings become prepared actions, each carrying the clause that supports it.",
        "A named person accepts or rejects. Nothing is sent, assigned or filed before that, and rejections are recorded with the reason.",
      ],
      highlights: [
        {
          title: "Evidence on every claim",
          text: "Extraction returns facts together with the source span behind each one, and a check that finds nothing says so explicitly instead of staying silent.",
        },
        {
          title: "Company-owned doctrine",
          text: "Checks are versioned data with expectations and severities, and every reading records the doctrine version it was read under.",
        },
        {
          title: "Retrieval that respects permissions",
          text: "Semantic search over pgvector is filtered by the same user, team and department grants as the documents, so search never discloses what you can't open.",
        },
        {
          title: "Bring your own model",
          text: "Any endpoint speaking the OpenAI chat or Anthropic messages format. Keys are encrypted at rest, and a connection must pass a scored run on your own documents before it serves traffic.",
        },
        {
          title: "Three languages, one layout system",
          text: "English, French and Arabic at full parity, 2,749 keys each, with right-to-left layout built on logical CSS properties rather than mirrored afterwards.",
        },
        {
          title: "One engine, two surfaces",
          text: "A small declarative diagram engine draws both the animated landing page and the launch film rendered with Remotion.",
        },
      ],
      stack: [
        { area: "Frontend", items: ["React 19", "Vite", "React Router", "i18next", "ECharts", "pdf.js"] },
        { area: "Backend", items: ["NestJS", "TypeScript", "TypeORM", "BullMQ"] },
        { area: "Data", items: ["PostgreSQL 16", "pgvector", "Redis 7"] },
        { area: "Operations", items: ["Docker Compose", "GitHub Actions CI", "Render"] },
        { area: "Film", items: ["Remotion"] },
      ],
      gallery: [
        {
          src: "/projects/due-to-do/overview.webp",
          alt: "Due To Do operational overview with intake, processing reliability, decision backlog and source health figures, above a throughput chart and a processing outcomes chart",
          caption: "The operational overview: what arrived, how reliably it was processed, and which decisions are waiting.",
        },
        {
          src: "/projects/due-to-do/evidence.webp",
          alt: "A résumé with highlighted passages next to a list of source-backed insights, each with a confidence score and a link to its page",
          caption: "Every insight on the right points back to the highlighted passage it came from.",
        },
        {
          src: "/projects/due-to-do/search.webp",
          alt: "Knowledge search results for the query security automation Python, ranked by relevance with the matching terms highlighted",
          caption: "Knowledge search ranks passages by meaning with pgvector, across only the documents you're allowed to see.",
        },
      ],
      links: [{ kind: "external", label: "Open the app", href: "https://app.due-todo.cloud/" }],
    },
    {
      slug: "swiftex",
      title: "SwifTex",
      tagline: "A real-time LaTeX editor that paginates to A4 and exports PDF",
      description: "Type Markdown and LaTeX maths, see it typeset as A4 pages as you type, and download the result as a PDF.",
      tags: ["React", "KaTeX", "Monaco", "Tailwind"],
      image: "/projects/swiftex/cover.webp",
      facts: { role: "Solo project", period: "Oct 2024 – Jun 2026", status: "Live" },
      problem:
        "Writing maths for the web usually means compiling LaTeX somewhere else and pasting in the result. SwifTex puts the editor, the typeset pages and the PDF export in a single browser tab, with nothing to install.",
      steps: [
        "Type Markdown with LaTeX maths in a code editor that highlights LaTeX commands and inline maths.",
        "On every change, a unified pipeline (remark-math, then rehype-katex) turns the text into typeset HTML.",
        "The HTML is laid out off screen, measured, and packed into A4-sized pages.",
        "Download the pages as a PDF that matches the preview.",
      ],
      highlights: [
        {
          title: "A real compile on every keystroke",
          text: "The preview is the output of the same remark and rehype pipeline each time, not an approximation of it.",
        },
        {
          title: "Measured pagination",
          text: "Rendered elements are measured in a hidden container and packed into pages that respect A4 margins before anything is shown.",
        },
        {
          title: "PDF that matches the screen",
          text: "html2pdf captures the paginated view at double resolution, and surplus blank pages are trimmed so the file mirrors the preview.",
        },
        {
          title: "A LaTeX-aware editor",
          text: "Monaco gets a custom language definition: commands, inline maths and % comments are tokenised, and brackets close automatically.",
        },
      ],
      stack: [
        { area: "Editor", items: ["Monaco"] },
        { area: "Typesetting", items: ["unified", "remark-math", "rehype-katex", "KaTeX"] },
        { area: "Export", items: ["html2pdf.js"] },
        { area: "Interface", items: ["React", "Vite", "Tailwind CSS", "Flowbite", "Framer Motion"] },
        { area: "Deployment", items: ["GitHub Actions", "GitHub Pages"] },
      ],
      gallery: [
        {
          src: "/projects/swiftex/editor.webp",
          alt: "SwifTex with a LaTeX source document about abstract algebra in the editor on the left and the same document typeset as a page on the right",
          caption: "Source on the left, typeset A4 page on the right, with the PDF download button in the corner.",
        },
      ],
      links: [
        { kind: "external", label: "Try it live", href: "https://nidhal-baghdadi.github.io/SwifTex/" },
        { kind: "external", label: "Code on GitHub", href: "https://github.com/Nidhal-Baghdadi/SwifTex" },
      ],
    },
    {
      slug: "oui-mais-pourquoi",
      title: "Oui, mais... Pourquoi?!",
      tagline: "Course prerequisites as a 3D journey",
      description:
        "A 3D space where young students explore subjects, see which lessons lead to which, and open a lesson to read it.",
      tags: ["React", "Three.js", "Next.js", "Prisma"],
      image: "/projects/oui-mais-pourquoi/cover.webp",
      facts: { role: "Solo project", period: "May 2024 · built in four days", status: "Prototype" },
      problem:
        "Course prerequisites usually live in flat lists that students skip. This prototype turns them into something to explore: subjects become constellations, lessons become cards you can move around, and learning what comes first feels more like play.",
      steps: [
        "Sign in with Google or GitHub.",
        "Arrive in a 3D space with floating objects and an animated guide.",
        "Browse journeys: each subject is a constellation of lessons in a starfield.",
        "Open a subject to lay out its lessons as draggable 3D cards.",
        "Open a lesson in a rich-text editor to read or write its content.",
      ],
      highlights: [
        {
          title: "Every screen is a 3D scene",
          text: "React Three Fiber scenes with starfields, sparkles, floating models and 3D text banners, rather than 3D decoration on a flat page.",
        },
        {
          title: "Lessons you can move",
          text: "A board of lesson cards placed on a 3D grid, each draggable, as the first step towards editing dependencies by hand.",
        },
        {
          title: "Animated guides",
          text: "Rigged astronaut avatars and an assistant robot that takes you to the subject you pick.",
        },
        {
          title: "Real accounts",
          text: "OAuth sign-in with Google and GitHub through NextAuth, with users and sessions stored through Prisma.",
        },
      ],
      stack: [
        { area: "3D", items: ["three.js", "React Three Fiber", "drei", "postprocessing"] },
        { area: "App", items: ["Next.js", "React", "TipTap", "Tailwind CSS"] },
        { area: "Accounts", items: ["NextAuth", "Prisma"] },
      ],
      gallery: [
        {
          src: "/projects/oui-mais-pourquoi/landing.webp",
          alt: "A starry 3D scene with a small planet, a rocket, a flying saucer, a floppy disk and orange 3D text reading learn something, for once",
          caption: "The landing scene: everything on screen is a 3D object.",
        },
        {
          src: "/projects/oui-mais-pourquoi/journeys.webp",
          alt: "A starfield of yellow lesson markers grouped into clusters, with the subject name Philosophy floating above one of them",
          caption: "Journeys: each subject is a cluster of lessons, named when you hover it.",
        },
        {
          src: "/projects/oui-mais-pourquoi/lesson-board.webp",
          alt: "A purple board covered with illustrated lesson cards arranged in a grid",
          caption: "A subject's lessons as cards on a 3D board, each one draggable.",
        },
        {
          src: "/projects/oui-mais-pourquoi/lesson-editor.webp",
          alt: "A rich-text editor showing Lesson 15 with a formatting toolbar and an embedded photograph",
          caption: "Opening a lesson: a rich-text editor built with TipTap.",
        },
      ],
      links: [
        { kind: "external", label: "Code on GitHub", href: "https://github.com/Nidhal-Baghdadi/oui-mais-pourquoi" },
      ],
    },
  ],
  actions: [{ kind: "external", label: "My GitHub", href: "https://github.com/Nidhal-Baghdadi" }],
} as const satisfies StationContent
