"use client";

import React from "react";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";
import { useSectionInView } from "@lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        I&apos;m a software engineer based in Tunisia, currently working at{" "}
        <span className="font-medium">Pwn&amp;Patch</span> on web platforms,
        back-end services, and data-driven product features.
      </p>
      <p>
        After an early academic detour, I moved fully into software engineering
        at <span className="italic">EPI Sousse</span> and completed the{" "}
        <span className="font-medium">ESIEA-EPI double diploma</span> program in
        Paris.
      </p>
      <p>
        I enjoy product-minded engineering: understanding the problem, shaping a
        practical interface, and building the services and data flows that make
        the experience reliable.
      </p>
      <p>
        <span className="underline">My core stack</span> includes{" "}
        <span className="font-medium">JavaScript, TypeScript, Vue, React, Node.js,
        Ruby on Rails, MongoDB, MySQL, Elasticsearch, Docker, and CI/CD</span>.
        I&apos;ve also worked with Flutter, Spring Boot, Azure, IBM Cloud, and
        Kubernetes across internships and academic projects.
      </p>
    </motion.section>
  );
}
