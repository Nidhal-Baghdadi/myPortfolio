import type { StationContent } from "@/content/types";
import ProjectCard from "./ProjectCard";
import styles from "./StationPanel.module.css";
import RoleItem from "./RoleItem";

export default function StationItems({ content }: { content: StationContent }) {
  switch (content.kind) {
    case "plain":
      return null;

    case "paragraphs":
      return content.items.map((item) => (
        <p key={item} className={styles.paragraph}>
          {item}
        </p>
      ));

    case "skills":
      return (
        <ul className={styles.tags}>
          {content.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case "projects":
      return content.items.map((item) => (
        <ProjectCard key={item.title} project={item} />
      ));

    case "roles":
      return (
        <ol className={styles.roles}>
          {content.items.map((item) => (
            <li key={`${item.title}-${item.dates}`}>
              <RoleItem role={item} />
            </li>
          ))}
        </ol>
      );

    default: {
      // Every kind is handled above, so `content` has been narrowed to nothing here.
      // Add a new kind without a case and this line stops compiling.
      const unhandled: never = content;
      return unhandled;
    }
  }
}
