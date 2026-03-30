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
    () => projects.filter((item) => item.slug !== project.slug).slice(0, 2),
    [project.slug],
  );

  return (
    <RetroFrame
      tickerText={`${project.title.toUpperCase()} :: SYSTEM DOSSIER :: ${project.status.toUpperCase()} :: ${project.timeline}`}
      visitorCount={visitorCount}
    >
      <ErrorBoundary
        fallback={
          <SectionFallback
            className={`retro-card project-overview signal-${project.signal}`}
            message="Project overview failed to load."
            title={project.title}
          />
        }
        name="ProjectOverview"
      >
        <section
          className={`retro-card project-overview signal-${project.signal}`}
        >
        <h1>{project.title}</h1>
        <p>{project.tagline}</p>

        <div className="meta-grid">
          <div>
            <span>Status</span>
            <strong>{project.status}</strong>
          </div>
          <div>
            <span>Timeline</span>
            <strong>{project.timeline}</strong>
          </div>
          <div>
            <span>Signal</span>
            <strong>{signalLabels[project.signal]}</strong>
          </div>
        </div>

        <RouteLink className="retro-link" to="/">
          Return to portfolio home
        </RouteLink>
      </section>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <SectionFallback
            className="retro-card detail-grid"
            message="Project detail content failed to load."
            title="Project Details"
          />
        }
        name="ProjectDetails"
      >
        <section className="retro-card detail-grid">
        <article>
          <h2>Summary</h2>
          <p>{project.summary}</p>
          <h3>Problem</h3>
          <p>{project.problem}</p>
          <h3>Architecture</h3>
          <p>{project.architecture}</p>
        </article>

        <article>
          <h2>Stack</h2>
          <ul>
            {project.stack.map((item) => (
              <li key={`${project.slug}-stack-${item}`}>{item}</li>
            ))}
          </ul>

          <h3>Highlights</h3>
          <ul>
            {project.highlights.map((item) => (
              <li key={`${project.slug}-highlight-${item}`}>{item}</li>
            ))}
          </ul>

          <h3>Next Steps</h3>
          <ul>
            {project.nextSteps.map((item) => (
              <li key={`${project.slug}-next-${item}`}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
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
        <h2>Related Projects</h2>
        <div className="related-grid">
          {relatedProjects.map((related) => (
            <article
              className={`related-item signal-${related.signal}`}
              key={related.slug}
            >
              <h3>{related.title}</h3>
              <p>{related.tagline}</p>
              <RouteLink
                className="retro-link"
                to={`/projects/${related.slug}`}
              >
                Open dossier
              </RouteLink>
            </article>
          ))}
        </div>
      </section>
      </ErrorBoundary>
    </RetroFrame>
  );
}
