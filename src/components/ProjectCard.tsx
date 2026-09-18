import { Link } from "react-router";
import type { Project } from "@/content/types";
import ActionLink from "./ActionLink";
import styles from "./Station.module.css";

export default function ProjectCard({
  project,
  index,
  Heading,
}: {
  project: Project;
  index: number;
  Heading: "h2" | "h3";
}) {
  const { status, role, period } = project.facts;
  return (
    <article className={styles.card} data-reveal>
      <Link className={styles.cardImageLink} to={`/projects/${project.slug}`} tabIndex={-1} aria-hidden="true">
        <img className={styles.cardImage} src={project.image} alt="" loading="lazy" />
      </Link>
      <div className={styles.cardBody}>
        <p className={styles.cardMeta}>
          <span className={styles.cardIndex}>P{index + 1}</span>
          <span className={status === "Live" ? styles.statusLive : styles.status}>{status}</span>
          <span>{period}</span>
        </p>
        <Heading className={styles.cardTitle}>
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </Heading>
        <p className={styles.cardRole}>{role}</p>
        <p className={styles.paragraph}>{project.description}</p>
        <ul className={styles.tags}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className={styles.cardLinks}>
          <Link className={styles.action} to={`/projects/${project.slug}`}>
            Case study <span aria-hidden="true">→</span>
          </Link>
          {project.links.map((link) => (
            <ActionLink key={link.label} action={link} quiet />
          ))}
        </div>
      </div>
    </article>
  );
}
