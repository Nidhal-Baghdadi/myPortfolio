import React from "react";

import { FaReact } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa6";
import { LuGraduationCap } from "react-icons/lu";
import { SiDassaultsystemes } from "react-icons/si";
import { SiFlutter } from "react-icons/si";
import { SiIbm } from "react-icons/si";
import { FaSchoolFlag } from "react-icons/fa6";

import swiftex from "@public/swiftex.png";
import whythough from "@public/whythough.png";
import catchemall from "@public/catch-em-all.png";
import maze_3d from "@public/maze_3d.png";

export const links = [
    {
        name: "Home",
        hash: "#home",
    },
    {
        name: "About",
        hash: "#about",
    },
    {
        name: "Projects",
        hash: "#projects",
    },
    {
        name: "Skills",
        hash: "#skills",
    },
    {
        name: "Experience",
        hash: "#experience",
    },
    {
        name: "Contact",
        hash: "#contact",
    },
];

export const experiencesData = [
    {
        title: "Software Engineer",
        location: "Pwn&Patch, Tunis",
        description:
            "I build and improve data-driven product features, Ruby on Rails back-end services, and web platforms, including a corporate website redesign focused on UX and performance.",
        icon: React.createElement(FaBriefcase),
        date: "May 2025 - Present",
    },
    {
        title: "Software Engineer - Final Year Internship",
        location: "IBM, Paris",
        description:
            "I developed a full-stack internal web application with a Node.js back-end that served data to an augmented reality mobile app, set up CI/CD pipelines for development and production, and wrote complete API documentation with Swagger.",
        icon: React.createElement(SiIbm),
        date: "February 2023 - July 2023",
    },
    {
        title: "Front-end Developer - Academic Project",
        location: "Thales Group / ESIEA, Paris",
        description:
            "I helped build a Flutter mobile application for scanning vehicle license plates and displaying the corresponding Crit'air pollution sticker, with UI/UX design and prototyping in Figma.",
        icon: React.createElement(SiFlutter),
        date: "September 2022 - February 2023",
    },
    {
        title: "Full-stack Developer - Internship",
        location: "Dassault Systemes, Paris",
        description:
            "I developed a real-time Vue web application that rendered dynamic diagrams including Gantt, flowchart, and pie charts, then upgraded another front end to Vue 3 and built back-end features for a recruitment management tool.",
        icon: React.createElement(SiDassaultsystemes),
        date: "April 2022 - September 2022",
    },
    {
        title: "Full-stack Developer - Academic Project",
        location: "COLAS Group / ESIEA, Paris",
        description:
            "I designed and built a client contact management web application with React, Node.js, and MySQL, organized the work with Scrum, and deployed infrastructure using Azure, Kubernetes, and Docker.",
        icon: React.createElement(FaReact),
        date: "September 2021 - April 2022",
    },
    {
        title: "Joined ESIEA",
        location: "ESIEA, Paris",
        description:
            "I joined ESIEA through the ESIEA-EPI double diploma program to complete an engineering degree focused on software engineering.",
        icon: React.createElement(FaSchoolFlag),
        date: "September 2021",
    },
    {
        title: "Graduated ESIEA",
        location: "ESIEA, Paris",
        description:
            "I graduated with an engineering degree in software engineering after coursework in operating systems, networking, data processing, application architecture, full-stack development, and machine learning.",
        icon: React.createElement(LuGraduationCap),
        date: "June 2023",
    },
];

export const projectsData = [
    {
        title: "Swiftex",
        description:
            "A real-time renderer for LaTeX and MathJax packaged as a React wrapper.",
        tags: ["React", "MathJax", "Tailwind"],
        imageUrl: swiftex,
        url: "https://github.com/Nidhal-Baghdadi/SwifTex"
    },
    {
        title: "Oui, mais... Pourquoi?!",
        description:
            "Display course documents in a user-friendly 3D environment to help young students navigate through course dependencies and make learning more playful.",
        tags: ["React", "Three.js", "Next.js", "Tailwind", "Prisma"],
        imageUrl: whythough,
        url: "https://github.com/Nidhal-Baghdadi/oui-mais-pourquoi"
    },
    {
        title: "3D Maze",
        description:
            "A 3D browser game where players navigate through a maze to escape.",
        tags: ["React", "Three.js"],
        imageUrl: maze_3d,
        url: "https://github.com/Nidhal-Baghdadi/3d-maze"
    }

];

export const skillsData = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Python",
    "PHP",
    "Vue",
    "React",
    "Next.js",
    "Node.js",
    "Ruby on Rails",
    "Angular",
    "Spring Boot",
    "Flutter",
    "Git",
    "GitLab",
    "Tailwind",
    "MongoDB",
    "MySQL",
    "Elasticsearch",
    "REST APIs",
    "Express",
    "Docker",
    "Kubernetes",
    "Microsoft Azure",
    "IBM Cloud",
    "Swagger",
    "CI/CD",
    "Scrum"
];
