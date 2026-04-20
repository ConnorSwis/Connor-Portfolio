import { useMemo } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { RetroFrame } from "../components/RetroFrame";
import { RouteLink } from "../components/RouteLink";
import { SectionFallback } from "../components/SectionFallback";
import { projects, signalLabels } from "../server/portfolioData";
import type { Project } from "../types/portfolio";

type ProjectPageProps = {
  project: Project;
  visitorCount: number;
};

export function ProjectPage({ project, visitorCount }: ProjectPageProps) {
  const relatedProjects = useMemo(
    () => projects.filter((item) => item.slug !== project.slug).slice(0, 3),
    [project.slug],
  );

  return (
    <RetroFrame
      tickerText={`${project.title.toUpperCase()} :: ${project.status.toUpperCase()} :: ${project.timeline}`}
      visitorCount={visitorCount}
    >
      <ErrorBoundary
        fallback={
          <SectionFallback
            className={`retro-card project-hero signal-${project.signal}`}
            message="Project overview failed to load."
            title={project.title}
          />
        }
        name="ProjectOverview"
      >
        <section className={`retro-card project-hero signal-${project.signal}`}>
          <div className="project-hero-header">
            <div className={`signal-dot signal-dot--${project.signal}`} />
            <h1>{project.title}</h1>
          </div>
          <p className="project-tagline">{project.tagline}</p>

          <div className="project-meta-bar">
            <div className="meta-chip">
              <span className="meta-chip-label">Status</span>
              <span className="meta-chip-value">{project.status}</span>
            </div>
            <div className="meta-chip">
              <span className="meta-chip-label">Timeline</span>
              <span className="meta-chip-value">{project.timeline}</span>
            </div>
            <div className="meta-chip">
              <span className="meta-chip-label">Signal</span>
              <span className={`meta-chip-value meta-chip-signal--${project.signal}`}>
                {signalLabels[project.signal]}
              </span>
            </div>
          </div>

          <div className="project-link-bar">
            <RouteLink className="project-btn" to="/">
              Back to home
            </RouteLink>
            {project.liveUrl && (
              <a
                className="project-btn project-btn--primary"
                href={project.liveUrl}
                rel="noreferrer noopener"
                target="_blank"
              >
                Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                className="project-btn"
                href={project.repoUrl}
                rel="noreferrer noopener"
                target="_blank"
              >
                Source Code
              </a>
            )}
          </div>
        </section>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <SectionFallback
            className="retro-card"
            message="Project detail content failed to load."
            title="Project Details"
          />
        }
        name="ProjectDetails"
      >
        <section className="retro-card project-summary-card">
          <h2>Summary</h2>
          <p>{project.summary}</p>
        </section>

        {project.demoImage && (
          <section className="retro-card project-demo-card">
            <h2>Demo</h2>
            <figure className="project-demo-figure">
              <img
                alt={project.demoImage.alt}
                className="project-demo-image"
                src={project.demoImage.src}
              />
              {project.demoImage.caption && (
                <figcaption className="project-demo-caption">
                  {project.demoImage.caption}
                </figcaption>
              )}
            </figure>
          </section>
        )}

        <div className="project-detail-split">
          <section className="retro-card project-problem-card">
            <div className="card-label">Problem</div>
            <p>{project.problem}</p>
          </section>
          <section className="retro-card project-arch-card">
            <div className="card-label">Architecture</div>
            <p>{project.architecture}</p>
          </section>
        </div>

        <section className="retro-card project-stack-card">
          <h2>Stack</h2>
          <div className="stack-pills">
            {project.stack.map((item) => (
              <span className="stack-pill" key={`${project.slug}-stack-${item}`}>
                {item}
              </span>
            ))}
          </div>
        </section>

        <div className="project-detail-split">
          <section className="retro-card project-highlights-card">
            <h2>Highlights</h2>
            <ul className="check-list">
              {project.highlights.map((item) => (
                <li key={`${project.slug}-hl-${item}`}>
                  <span className="check-mark" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="retro-card project-roadmap-card">
            <h2>Next Steps</h2>
            <ol className="roadmap-list">
              {project.nextSteps.map((item) => (
                <li key={`${project.slug}-next-${item}`}>
                  {item}
                </li>
              ))}
            </ol>
          </section>
        </div>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <SectionFallback
            className="retro-card"
            message="Related projects failed to load."
            title="Related Projects"
          />
        }
        name="ProjectRelated"
      >
        <section className="retro-card">
          <h2>More Projects</h2>
          <div className="related-grid">
            {relatedProjects.map((related) => (
              <article
                className={`related-item signal-${related.signal}`}
                key={related.slug}
              >
                <div className="related-header">
                  <div className={`signal-dot signal-dot--${related.signal}`} />
                  <h3>{related.title}</h3>
                </div>
                <p>{related.tagline}</p>
                <RouteLink
                  className="project-btn project-btn--small"
                  to={`/projects/${related.slug}`}
                >
                  View project
                </RouteLink>
              </article>
            ))}
          </div>
        </section>
      </ErrorBoundary>
    </RetroFrame>
  );
}
