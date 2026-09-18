import type { StationContent } from "./types"

// Newest first. Wording follows the CV (public/CV/CV.pdf): keep the two in step.
export const STATUES = {
  heading: "My experience",
  lede: "From engineering school in Tunisia and Paris, through IBM and Dassault Systèmes, to cyber threat intelligence in Tunis.",
  kind: "roles",
  items: [
    {
      type: "Work",
      title: "Software Engineer",
      place: "Pwn&Patch, Tunis",
      dates: "May 2025 – Present",
      description:
        "I work on Cyber Threat Intelligence (CTI) tools and workflows: core features of the Oktoboot CTI platform and the Ruby on Rails back-end services that process, organise and expose CTI data. I also took part in redesigning the corporate website, improving its UX and performance.",
    },
    {
      type: "Education",
      title: "Engineering degree",
      place: "ESIEA, Paris",
      dates: "June 2023",
      description:
        "I graduated in software engineering (ESIEA–EPI double diploma), with coursework in operating systems, networking, data processing, application architecture, full-stack development and machine learning.",
    },
    {
      type: "Work",
      title: "Software Engineer – Final Year Internship",
      place: "IBM, Paris",
      dates: "February 2023 – July 2023",
      description:
        "In a team project, I worked on a Node.js back-end serving data to an augmented reality mobile app, helped set up CI/CD pipelines for development and production, and wrote the API documentation with Swagger.",
    },
    {
      type: "Project",
      title: "Final Year Project (CAP)",
      place: "Thales Group / ESIEA, Paris",
      dates: "September 2022 – February 2023",
      description:
        "I collaborated on a Flutter mobile app for Thales Group that scans vehicle license plates and shows the matching Crit'Air pollution sticker, and contributed to its UI/UX design and prototyping in Figma.",
    },
    {
      type: "Work",
      title: "Full-stack Developer – Internship",
      place: "Dassault Systèmes, Paris",
      dates: "April 2022 – September 2022",
      description:
        "I contributed to a real-time web application (Vue 2) rendering dynamic diagrams such as Gantt charts, flowcharts and pie charts, then took part in upgrading a front end to Vue 3 and building the back end of a recruitment management tool.",
    },
    {
      type: "Project",
      title: "4th Year Project (PST)",
      place: "COLAS Group / ESIEA, Paris",
      dates: "September 2021 – April 2022",
      description:
        "I collaborated on a web application to manage COLAS Group's client contacts (React, Node.js, MySQL), contributed to its design and prototyping in Figma and BPMN, and worked in Scrum with Azure DevOps, Docker and Kubernetes.",
    },
    {
      type: "Education",
      title: "Joined ESIEA",
      place: "ESIEA, Paris",
      dates: "September 2021",
      description:
        "I joined ESIEA through the ESIEA–EPI double diploma programme to complete my engineering degree in Paris.",
    },
    {
      type: "Education",
      title: "Software engineering major",
      place: "EPI, Sousse",
      dates: "September 2018 – June 2021",
      description:
        "I studied software engineering at EPI (École Pluridisciplinaire Internationale): algorithms in C, networking (CCNA 1 & 2), and object-oriented programming in Java and C++.",
    },
  ],
  actions: [{ kind: "file", label: "Download CV", href: "/CV/CV.pdf" }],
} as const satisfies StationContent
