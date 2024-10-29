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
        After graduating high school , I decided to attend medical school and
        put my passion for engineering aside. 4 years later, I realised I can
        not go on without doing what I love for a living .
      </p>
      <p>
        {" "}
        <span className="font-medium">Yes... It's that simple.</span>
      </p>
      <p>
        {" "}
        I went to an engineering school in Tunisia{" "}
        <span className="italic"> (EPI Sousse).</span> Being a part of a{" "}
        <span className="font-medium">double diploma partnership program</span>,
        I finished my master's degree in{" "}
        <span className="italic"> (ESIEA Paris)</span>.
      </p>
      <p>
        {" "}
        <span className="italic">The aspect I enjoy the most</span> is the
        problem-solving aspect. I <span className="underline">love</span> the
        feeling of finally figuring out a solution to a problem.
      </p>
      <p>
        {" "}
        <span className="underline">My core stack</span> is{" "}
        <span className="font-medium">React, Vue, Node.js, and MongoDB</span>. I
        am also familiar with{" "}
        <span className="font-medium">
          Next.js, Prisma, Docker, Swagger and Spring-boot
        </span>
        . I am always looking to learn new technologies. I am currently looking
        for a <span className="font-medium">full-time position</span> as a
        junior software developer.
      </p>
    </motion.section>
  );
}
