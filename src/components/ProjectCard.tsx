import type { Project } from "@/content/types";
import styles from "./StationPanel.module.css";
import { Link } from "react-router";
import ActionLink from "./ActionLink";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <h2 className={styles.itemTitle}>{project.title}</h2>
      <img
        className={styles.cardImage}
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        loading="lazy"
      />
      <p className={styles.paragraph}>{project.description}</p>

      <ul className={styles.tags}>
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <div className={styles.cardLinks}>
        <Link className={styles.action} to={`/projects/${project.slug}`}>
          Details
        </Link>
        {project.links.map((link) => (
          <ActionLink key={link.label} action={link} />
        ))}
      </div>
    </article>
  );
}
