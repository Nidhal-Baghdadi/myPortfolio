import type { Fact, Role, SkillGroup, StationContent } from "@/content/types";
import ContactForm from "./ContactForm";
import ProjectCard from "./ProjectCard";
import styles from "./Station.module.css";

function Facts({ facts }: { facts: readonly Fact[] }) {
  return (
    <dl className={styles.facts} data-reveal>
      {facts.map((fact) => (
        <div key={fact.label} className={styles.fact}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Item headings sit one level below the station's heading: h2 under the panel's h1, h3 under page mode's h2. */
export type ItemHeading = "h2" | "h3";

function Skills({ groups, core, Heading }: { groups: readonly SkillGroup[]; core: readonly string[]; Heading: ItemHeading }) {
  return (
    <div className={styles.skillGroups}>
      {groups.map((group) => (
        <section key={group.area} className={styles.skillGroup} data-reveal>
          <Heading className={styles.area}>{group.area}</Heading>
          <ul className={styles.tags}>
            {group.items.map((item) => {
              const isCore = core.includes(item);
              return (
                <li key={item} className={isCore ? styles.coreTag : undefined}>
                  {item}
                  {isCore && <span className={styles.srOnly}> (everyday stack)</span>}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

/** Newest first; the first role is the current one when its dates run to "Present". */
function Timeline({ roles, Heading }: { roles: readonly Role[]; Heading: ItemHeading }) {
  return (
    <ol className={styles.timeline}>
      {roles.map((role) => {
        const current = role.dates.endsWith("Present");
        return (
          <li key={`${role.title}-${role.dates}`} className={styles.role} data-current={current || undefined} data-reveal>
            <p className={styles.dates}>
              {current && <span className={styles.now}>Now</span>}
              {role.dates}
              <span className={styles.roleType}>{role.type}</span>
            </p>
            <div>
              <Heading className={styles.itemTitle}>{role.title}</Heading>
              <p className={styles.place}>{role.place}</p>
              <p className={styles.paragraph}>{role.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** The station's own content, designed for its kind of information. */
export default function StationBody({ content, itemHeading }: { content: StationContent; itemHeading: ItemHeading }) {
  switch (content.kind) {
    case "plain":
      return null;

    case "contact":
      return <ContactForm />;

    case "paragraphs":
      return (
        <>
          <Facts facts={content.facts} />
          <div className={styles.prose}>
            {content.items.map((item) => (
              <p key={item} className={styles.paragraph} data-reveal>
                {item}
              </p>
            ))}
          </div>
        </>
      );

    case "skills":
      return <Skills groups={content.items} core={content.core} Heading={itemHeading} />;

    case "projects":
      return (
        <div className={styles.projects}>
          {content.items.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} Heading={itemHeading} />
          ))}
        </div>
      );

    case "roles":
      return <Timeline roles={content.items} Heading={itemHeading} />;

    default: {
      // Every kind is handled above, so `content` has been narrowed to nothing here.
      // Add a new kind without a case and this line stops compiling.
      const unhandled: never = content;
      return unhandled;
    }
  }
}
