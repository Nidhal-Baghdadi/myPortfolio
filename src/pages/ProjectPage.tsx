import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { CONTENT } from "../content";
import ActionLink from "../components/ActionLink";
import NotFound from "./NotFound";
import styles from "./Page.module.css";

export default function ProjectPage() {
  const { slug } = useParams();
  const projects = CONTENT.plinths.items;
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];

  // A client-side navigation keeps the previous scroll position, so start each project at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <NotFound />;

  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <main className={styles.page}>
      {/* React 19 moves <title> into the document head */}
      <title>{`${project.title} · Nidhal Baghdadi`}</title>

      {/* A full page load on purpose: the arena reads #plinths when it starts */}
      <a className={styles.back} href="/#plinths">
        ← Back to the arena
      </a>

      <header className={styles.hero}>
        <p className={styles.eyebrow}>Project</p>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.tagline}>{project.tagline}</p>
        <dl className={styles.facts}>
          <div>
            <dt>Role</dt>
            <dd>{project.facts.role}</dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>{project.facts.period}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <span className={project.facts.status === "Live" ? styles.statusLive : styles.status}>
                {project.facts.status}
              </span>
            </dd>
          </div>
        </dl>
      </header>

      <img className={styles.image} src={project.image} alt={`Screenshot of ${project.title}`} />

      <section className={styles.section} aria-labelledby="problem">
        <h2 id="problem" className={styles.sectionTitle}>The problem</h2>
        <p className={styles.prose}>{project.problem}</p>
      </section>

      <section className={styles.section} aria-labelledby="how">
        <h2 id="how" className={styles.sectionTitle}>How it works</h2>
        <ol className={styles.steps}>
          {project.steps.map((step, i) => (
            <li key={step}>
              <span className={styles.stepNumber} aria-hidden="true">
                {i + 1}
              </span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="highlights">
        <h2 id="highlights" className={styles.sectionTitle}>Highlights</h2>
        <ul className={styles.highlights}>
          {project.highlights.map((highlight) => (
            <li key={highlight.title}>
              <h3>{highlight.title}</h3>
              <p>{highlight.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="stack">
        <h2 id="stack" className={styles.sectionTitle}>Stack</h2>
        <dl className={styles.stack}>
          {project.stack.map((group) => (
            <div key={group.area}>
              <dt>{group.area}</dt>
              <dd>
                <ul className={styles.tags}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {project.gallery.length > 0 && (
        <section className={styles.section} aria-labelledby="gallery">
          <h2 id="gallery" className={styles.sectionTitle}>Gallery</h2>
          <div className={styles.gallery}>
            {project.gallery.map((figure) => (
              <figure key={figure.src}>
                <img src={figure.src} alt={figure.alt} loading="lazy" />
                <figcaption>{figure.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {project.links.length > 0 && (
        <section className={styles.section} aria-labelledby="links">
          <h2 id="links" className={styles.sectionTitle}>Links</h2>
          <ul className={styles.links}>
            {project.links.map((link) => (
              <li key={link.label}>
                <ActionLink action={link} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className={styles.pager} aria-label="More projects">
        {previous ? (
          <Link to={`/projects/${previous.slug}`}>
            <span className={styles.pagerLabel}>Previous</span>
            {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link className={styles.pagerNext} to={`/projects/${next.slug}`}>
            <span className={styles.pagerLabel}>Next</span>
            {next.title}
          </Link>
        )}
      </nav>

      <footer className={styles.footer}>
        <Link to="/credits">Credits</Link>
      </footer>
    </main>
  );
}
