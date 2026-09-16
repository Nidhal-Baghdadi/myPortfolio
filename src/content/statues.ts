import type { StationContent } from "./types"

// Newest first.
export const STATUES = {
  heading: "My experience",
  lede: "From engineering school in Paris to building products in Tunis.",
  kind: "roles",
  items: [
    {
      title: "Software Engineer",
      place: "Pwn&Patch, Tunis",
      dates: "May 2025 - Present",
      description:
        "I build and improve data-driven product features, Ruby on Rails back-end services, and web platforms, including a corporate website redesign focused on UX and performance.",
    },
    {
      title: "Graduated ESIEA",
      place: "ESIEA, Paris",
      dates: "June 2023",
      description:
        "I graduated with an engineering degree in software engineering after coursework in operating systems, networking, data processing, application architecture, full-stack development, and machine learning.",
    },
    {
      title: "Software Engineer - Final Year Internship",
      place: "IBM, Paris",
      dates: "February 2023 - July 2023",
      description:
        "I developed a full-stack internal web application with a Node.js back-end that served data to an augmented reality mobile app, set up CI/CD pipelines for development and production, and wrote complete API documentation with Swagger.",
    },
    {
      title: "Front-end Developer - Academic Project",
      place: "Thales Group / ESIEA, Paris",
      dates: "September 2022 - February 2023",
      description:
        "I helped build a Flutter mobile application for scanning vehicle license plates and displaying the corresponding Crit'air pollution sticker, with UI/UX design and prototyping in Figma.",
    },
    {
      title: "Full-stack Developer - Internship",
      place: "Dassault Systemes, Paris",
      dates: "April 2022 - September 2022",
      description:
        "I developed a real-time Vue web application that rendered dynamic diagrams including Gantt, flowchart, and pie charts, then upgraded another front end to Vue 3 and built back-end features for a recruitment management tool.",
    },
    {
      title: "Full-stack Developer - Academic Project",
      place: "COLAS Group / ESIEA, Paris",
      dates: "September 2021 - April 2022",
      description:
        "I designed and built a client contact management web application with React, Node.js, and MySQL, organized the work with Scrum, and deployed infrastructure using Azure, Kubernetes, and Docker.",
    },
    {
      title: "Joined ESIEA",
      place: "ESIEA, Paris",
      dates: "September 2021",
      description:
        "I joined ESIEA through the ESIEA-EPI double diploma program to complete an engineering degree focused on software engineering.",
    },
  ],
  actions: [{ kind: "file", label: "Download CV", href: "/CV/CV.pdf" }],
} as const satisfies StationContent
