import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router";
import StationActions from "../components/StationActions";
import stationStyles from "../components/Station.module.css";
import { CONTENT } from "../content";
import { gsap, MOTION_OK, riseLetters, useGSAP } from "../lib/motion";
import { projectFocus } from "../scene/props";
import { useScene } from "../scene/sceneContext";
import NotFound from "./NotFound";
import styles from "./ProjectPage.module.css";

/** A numbered section heading: the numbers give the case study the rhythm of a printed article. */
function Part({ number, id, title }: { number: number; id: string; title: string }) {
  return (
    <h2 id={id} className={styles.partTitle}>
      <span className={styles.partNumber}>{String(number).padStart(2, "0")}</span>
      {title}
    </h2>
  );
}

/**
 * A project's case study. Over the 3D scene, the camera flies to the project's plinth and the text reads in
 * a column of near-opaque paper beside it; in page mode it's a plain centred article.
 */
export default function ProjectPage() {
  const { slug = "" } = useParams();
  const { setFocus, setActiveId, readAsPage } = useScene();
  const root = useRef<HTMLElement>(null);
  const projects = CONTENT.plinths.items;
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];

  // Point the camera at this project's plinth, and hand it back to the tour when leaving.
  useEffect(() => {
    setFocus(projectFocus(slug));
    setActiveId("plinths");
    return () => setFocus(null);
  }, [slug, setFocus, setActiveId]);

  // A client-side navigation keeps the previous scroll position, so start each project at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(MOTION_OK, () => {
        const title = root.current?.querySelector("[data-split]");
        if (title) riseLetters(title, { delay: 0.15 });
        gsap.from("[data-intro]", { y: 16, autoAlpha: 0, duration: 0.6, ease: "power3.out", stagger: 0.07, delay: 0.25 });
        for (const part of gsap.utils.toArray<HTMLElement>("[data-part]")) {
          gsap.from(part, {
            y: 28,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: part, start: "top 85%", once: true },
          });
        }
      });
    },
    { scope: root, dependencies: [slug], revertOnUpdate: true },
  );

  if (!project) return <NotFound />;

  const previous = projects[index - 1];
  const next = projects[index + 1];
  const { role, period, status } = project.facts;
  let part = 0;

  return (
    <main ref={root} className={styles.page} data-scene={readAsPage ? undefined : ""}>
      {/* React 19 moves <title> into the document head */}
      <title>{`${project.title} · Nidhal Baghdadi`}</title>

      {/* Keyed by project: SplitText rewrites the title into letter spans React doesn't know about, so moving to
          another project must give fresh DOM rather than let React patch text into nodes it no longer owns. */}
      <article key={slug} className={styles.column} aria-labelledby="project-title">
        <nav className={styles.crumbs} aria-label="Breadcrumb" data-intro>
          <Link to={{ pathname: "/", hash: "#plinths" }}>← 03 Projects</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">
            P{index + 1} of {projects.length}
          </span>
        </nav>

        <header className={styles.hero}>
          <p className={styles.eyebrow} data-intro>
            Case study
          </p>
          <h1 id="project-title" className={styles.title} data-split>
            {project.title}
          </h1>
          <p className={styles.tagline} data-intro>
            {project.tagline}
          </p>
          <dl className={styles.facts} data-intro>
            <div>
              <dt>Role</dt>
              <dd>{role}</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>{period}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <span className={status === "Live" ? stationStyles.statusLive : stationStyles.status}>{status}</span>
              </dd>
            </div>
          </dl>
          <div data-intro>
            <StationActions actions={project.links} />
          </div>
        </header>

        <figure className={styles.cover} data-intro>
          <img src={project.image} alt={`${project.title}: the main screen`} />
        </figure>

        <section className={styles.part} aria-labelledby="problem" data-part>
          <Part number={++part} id="problem" title="The problem" />
          <p className={styles.lead}>{project.problem}</p>
        </section>

        <section className={styles.part} aria-labelledby="how" data-part>
          <Part number={++part} id="how" title="How it works" />
          <ol className={styles.steps}>
            {project.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className={styles.part} aria-labelledby="highlights" data-part>
          <Part number={++part} id="highlights" title="Highlights" />
          <ul className={styles.highlights}>
            {project.highlights.map((highlight) => (
              <li key={highlight.title}>
                <h3>{highlight.title}</h3>
                <p>{highlight.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.part} aria-labelledby="stack" data-part>
          <Part number={++part} id="stack" title="Stack" />
          <div className={stationStyles.skillGroups}>
            {project.stack.map((group) => (
              <section key={group.area} className={stationStyles.skillGroup}>
                <h3 className={stationStyles.area}>{group.area}</h3>
                <ul className={stationStyles.tags}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        {project.gallery.length > 0 && (
          <section className={styles.part} aria-labelledby="gallery" data-part>
            <Part number={++part} id="gallery" title="Gallery" />
            <div className={styles.gallery}>
              {project.gallery.map((figure, i) => (
                <figure key={figure.src}>
                  <img src={figure.src} alt={figure.alt} loading="lazy" />
                  <figcaption>
                    <span className={styles.figureNumber}>Fig. {i + 1}</span> {figure.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <nav className={styles.pager} aria-label="More projects">
          {previous ? (
            <Link to={`/projects/${previous.slug}`}>
              <span className={styles.pagerLabel}>← Previous</span>
              <span className={styles.pagerTitle}>{previous.title}</span>
            </Link>
          ) : (
            <Link to={{ pathname: "/", hash: "#plinths" }}>
              <span className={styles.pagerLabel}>← Back</span>
              <span className={styles.pagerTitle}>All projects</span>
            </Link>
          )}
          {next ? (
            <Link className={styles.pagerNext} to={`/projects/${next.slug}`}>
              <span className={styles.pagerLabel}>Next →</span>
              <span className={styles.pagerTitle}>{next.title}</span>
            </Link>
          ) : (
            <Link className={styles.pagerNext} to={{ pathname: "/", hash: "#plinths" }}>
              <span className={styles.pagerLabel}>Back →</span>
              <span className={styles.pagerTitle}>All projects</span>
            </Link>
          )}
        </nav>

        <footer className={styles.footer}>
          <span>Nidhal Baghdadi · Software engineer</span>
          <Link to="/credits">Credits</Link>
        </footer>
      </article>
    </main>
  );
}
