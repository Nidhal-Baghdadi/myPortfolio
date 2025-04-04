import React from "react";

import { FaReact } from "react-icons/fa";
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
        title: "Joined ESIEA",
        location: "ESIEA, Paris",
        description:
            "After being the valedictorian in EPI-Sousse, I was granted taking part of a double diploma partnership program that allowed me to join ESIEA for my master's degree.",
        icon: React.createElement(FaSchoolFlag),
        date: "September 2021",
    },
    {
        title: "Full-stack Developer (School project)",
        location: "Colas GROUP",
        description:
            "I worked with a team of 5 students on developing an application for Colas Digital Solutions. The project was suggested by the company in the context of a partnership with ESIEA. My stack included React, Node.js, Mysql, Figma, Jira and Git ",
        icon: React.createElement(FaReact),
        date: "October 2021 - March 2022",
    },
    {
        title: "Full-Stack Developer - Internship",
        location: "Dassault Systèmes",
        description:
            "I worked as an intern at Dassault Systèmes. I worked on missions using this stack: Vue, Node.js, TypeScript, Vuetify, and MongoDB.",
        icon: React.createElement(SiDassaultsystemes),
        date: "April 2022 - September 2022",
    },
    {
        title: "Front-end developer (School project)",
        location: "Thales",
        description:
            "I worked with a team of 5 students on developing an application for Thales Digital Solutions. The project was suggested by the company as a final year project. My stack included Flutter, Figma, Jira and Git ",
        icon: React.createElement(SiFlutter),
        date: "November 2022 - January 2023",
    },
    {
        title: "Full-Stack Developer - Internship",
        location: "IBM",
        description:
            "I worked as an intern at IBM, France. I worked on missions using this stack: Node.js, MongoDB, Git, Docker, IBM Cloud, Swagger.",
        icon: React.createElement(SiIbm),
        date: "February 2023 - July 2023",
    },
    {
        title: "Graduated ESIEA",
        location: "ESIEA, Paris",
        description:
            "I graduated in september 2023 after an unforgettable journey at ESIEA. I am currently looking for a full-time position as a junior developer.",
        icon: React.createElement(LuGraduationCap),
        date: "September 2023",
    },
];

export const projectsData = [
    {
        title: "Swiftex",
        description:
            "A real time renderer for Latex and MathJax as a react wrapper. Personal project.",
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
        title: "Catch them all!",
        description:
            "a 3D browser game where you catch flying rabbits (for now...).",
        tags: ["React", "Three.js", "Next.js", "Tailwind", "Blender"],
        imageUrl: catchemall,
        url: "https://github.com/Nidhal-Baghdadi/catch-them-all"
    },
    {
        title: "3D Maze",
        description:
            "a 3D browser game where you navigate through a maze to escape.",
        tags: ["React", "Three.js"],
        imageUrl: maze_3d,
        url: "https://github.com/Nidhal-Baghdadi/3d-maze"
    }

];

export const skillsData = [
    "HTML",
    "CSS",
    "JavaScript",
    "Vue",
    "React",
    "Next.js",
    "Node.js",
    "Spring-boot",
    "Git",
    "Tailwind",
    "Prisma",
    "MongoDB",
    "Rest APIs",
    "Express",
    "PostgreSQL",
    "Python",
    "Docker",
    "Swagger",
    "CI/CD"


];