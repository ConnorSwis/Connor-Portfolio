import { useMemo } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { RetroFrame } from "../components/RetroFrame";
import { RouteLink } from "../components/RouteLink";
import { SectionFallback } from "../components/SectionFallback";
import { projects, signalLabels } from "../server/portfolioData";
import type { Project } from "../types/portfolio";

type RumbleMonitorPageProps = {
  project: Project;
  visitorCount: number;
};

export function RumbleMonitorPage({
  project,
  visitorCount,
}: RumbleMonitorPageProps) {
  const relatedProjects = useMemo(
    () => projects.filter((item) => item.slug !== project.slug).slice(0, 2),
    [project.slug],
  );

  return (
    <RetroFrame
      tickerText="RUMBLE MONITOR :: LIVE CHAT INGESTION + ANALYTICS PIPELINE :: FASTAPI + PLAYWRIGHT + REACT"
      visitorCount={visitorCount}
    >
      <ErrorBoundary
        fallback={
          <SectionFallback
            className={`retro-card project-overview signal-${project.signal}`}
            message="Rumble monitor overview failed to load."
            title={project.title}
          />
        }
        name="RumbleOverview"
      >
        <section
          className={`retro-card project-overview signal-${project.signal}`}
        >
          <h1>{project.title}</h1>
          <p>{project.tagline}</p>
          <p>
            This system continuously monitors selected Rumble channels, detects
            live broadcasts, ingests chat + viewer telemetry, and serves live
            analytics to a polling React dashboard.
          </p>
          <p>
            <a
              className="retro-link"
              href="https://rumble.connorswis.com"
              rel="noreferrer noopener"
              target="_blank"
            >
              Live Project: rumble.connorswis.com
            </a>
          </p>

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

          <h2>Pipeline Summary</h2>
          <ol>
            <li>Detect live streams on monitored channels.</li>
            <li>
              Scrape stream metadata, chat messages, donations, badges, and
              viewer counts.
            </li>
            <li>Persist normalized entities into relational tables.</li>
            <li>Serve analytics and stream APIs via FastAPI.</li>
            <li>Render live + historical dashboards in React.</li>
          </ol>

          <RouteLink className="retro-link" to="/">
            Return to portfolio home
          </RouteLink>
        </section>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <SectionFallback
            className="retro-card"
            message="Frontend demo preview failed to load."
            title="Frontend Demo"
          />
        }
        name="RumbleFrontendDemo"
      >
        <section className="retro-card">
          <h2>Frontend Demo</h2>
          <figure className="rumble-demo-frame">
            <img
              alt="Rumble monitor frontend walkthrough"
              src="/rumble-frontend-demo.gif"
            />
          </figure>
        </section>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <SectionFallback
            className="retro-card"
            message="Architecture section failed to load."
            title="System Architecture"
          />
        }
        name="RumbleArchitecture"
      >
        <section className="retro-card">
          <h2>System Architecture</h2>
          <pre className="architecture-diagram">{`Rumble channel pages
        |
        v
Playwright scraper (channel monitor + per-stream watchers)
        |
        v
In-memory async queue (ExtractedMessage)
        |
        v
Consumer (batch upserts users/messages/badges/subscriptions/history)
        |
        v
Database (SQLite/Postgres via SQLAlchemy)
        |
        +------------------------------+
        |                              |
        v                              v
FastAPI REST endpoints         Badge image store (/api/badge-images)
        |
        v
React dashboard (MainDashboard + analytics/chart views)`}</pre>
        </section>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <SectionFallback
            className="retro-card detail-grid"
            message="Core component details failed to load."
            title="Core Components"
          />
        }
        name="RumbleComponents"
      >
        <section className="retro-card detail-grid">
          <article>
            <h2>Backend Technologies</h2>
            <ul>
              <li>
                FastAPI + Uvicorn power the API server, lifecycle hooks,
                middleware, and routing.
              </li>
              <li>
                Playwright (Chromium) + asyncio run channel polling and
                per-stream live chat/viewership scraping.
              </li>
              <li>
                SQLAlchemy 2 (async) + Pydantic v2 handle ORM models, query
                layers, and request/response schemas.
              </li>
              <li>
                Ingestion uses an asyncio.Queue with batched upserts for users,
                messages, badges, and subscriptions.
              </li>
              <li>
                API response optimization uses an in-process TTL cache and
                persisted historical analytics snapshots.
              </li>
            </ul>
          </article>

          <article>
            <h2>Frontend Technologies</h2>
            <ul>
              <li>
                React 19 + TypeScript + Vite for the SPA and build tooling.
              </li>
              <li>
                wouter provides client routing for / , /channel/:id, and{" "}
                /stream/:id.
              </li>
              <li>
                Axios powers API calls with retry interceptors for transient
                network/5xx failures.
              </li>
              <li>
                Chart.js + react-chartjs-2 render stream and channel analytics
                visualizations.
              </li>
              <li>
                UI styling uses Tailwind CSS v4 with selected Radix UI
                primitives.
              </li>
            </ul>
          </article>

          <article>
            <h2>Data + Runtime Technologies</h2>
            <ul>
              <li>
                Default DB is SQLite (aiosqlite), with support for
                Postgres-compatible URLs via DATABASE_URL.
              </li>
              <li>
                file_store/ holds DB files, logs, and localized badge assets.
              </li>
              <li>
                Badge files are served by FastAPI static mounts at{" "}
                /api/badge-images/*.
              </li>
              <li>Schema evolution is managed with Alembic migrations.</li>
              <li>
                The ingestion queue is in-memory, so unconsumed events are not
                durable across restarts.
              </li>
            </ul>
          </article>

          <article>
            <h2>Deployment Technologies</h2>
            <ul>
              <li>
                Docker Compose orchestrates backend and frontend services.
              </li>
              <li>
                Backend container: python:3.13-slim + Playwright Chromium,
                running uvicorn main:app.
              </li>
              <li>
                Frontend container: node:20-alpine build stage +{" "}
                nginx:1.27-alpine runtime stage.
              </li>
              <li>
                Nginx serves the SPA and reverse-proxies /api requests to the
                backend service.
              </li>
              <li>
                Persistent app data uses the rumble_file_store Docker volume.
              </li>
            </ul>
          </article>
        </section>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <SectionFallback
            className="retro-card"
            message="End-to-end flow section failed to load."
            title="End-to-End Flows"
          />
        }
        name="RumbleFlows"
      >
        <section className="retro-card">
          <h2>End-to-End Flows</h2>
          <div className="education-grid">
            <article className="education-item">
              <h3>Startup Flow</h3>
              <ol>
                <li>Initialize DB/session/logger/queue.</li>
                <li>Ensure tables exist.</li>
                <li>Start Playwright (when scraper enabled).</li>
                <li>Launch channel monitor + queue consumer tasks.</li>
              </ol>
            </article>
            <article className="education-item">
              <h3>Channel Onboarding Flow</h3>
              <ol>
                <li>Frontend submits channel URL to `POST /api/channels/`.</li>
                <li>Backend validates host + uniqueness.</li>
                <li>Playwright extracts channel metadata.</li>
                <li>Channel is inserted with `monitored=true`.</li>
              </ol>
            </article>
            <article className="education-item">
              <h3>Live Detection Flow</h3>
              <ol>
                <li>Manager refreshes monitored channels from DB.</li>
                <li>
                  Monitors scrape channel pages for live cards/stream URLs.
                </li>
                <li>Per-stream watcher starts on live detection.</li>
                <li>Watcher is cancelled when stream is idle.</li>
              </ol>
            </article>
            <article className="education-item">
              <h3>Ingestion + Consumer Flow</h3>
              <ol>
                <li>
                  `watch_stream()` extracts metadata, messages, badges,
                  donations, and viewership samples.
                </li>
                <li>Normalized `ExtractedMessage` events are queued.</li>
                <li>
                  Consumer adapts batch size and performs conflict-safe upserts.
                </li>
                <li>
                  User state/history and badge localization are persisted.
                </li>
              </ol>
            </article>
            <article className="education-item">
              <h3>Analytics + UI Flow</h3>
              <ol>
                <li>
                  Frontend polls channels, stream metrics, and enriched
                  messages.
                </li>
                <li>
                  Backend serves DB aggregations and cached analytics snapshots.
                </li>
                <li>
                  Live views use shorter refresh intervals than historical
                  views.
                </li>
                <li>
                  Dashboards render channel-level and stream-level drill-down
                  analytics.
                </li>
              </ol>
            </article>
          </div>
        </section>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <SectionFallback
            className="retro-card"
            message="API surface section failed to load."
            title="Frontend API Surface"
          />
        }
        name="RumbleApiSurface"
      >
        <section className="retro-card">
          <h2>Frontend API Surface</h2>
          <div className="retro-table-wrap">
            <table className="retro-data-table rumble-api-table">
              <thead>
                <tr>
                  <th scope="col">Endpoint</th>
                  <th scope="col">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>GET /api/channels/</code>
                  </td>
                  <td>List monitored channels.</td>
                </tr>
                <tr>
                  <td>
                    <code>POST /api/channels/</code>
                  </td>
                  <td>Add and validate a channel to monitor.</td>
                </tr>
                <tr>
                  <td>
                    <code>PUT /api/channels/{"{id}"}/monitored</code>
                  </td>
                  <td>Toggle channel monitoring state.</td>
                </tr>
                <tr>
                  <td>
                    <code>GET /api/channels/{"{id}"}/analytics</code>
                  </td>
                  <td>Channel-level analytics metrics.</td>
                </tr>
                <tr>
                  <td>
                    <code>GET /api/channels/overview</code>
                  </td>
                  <td>Global overview metrics for home dashboard.</td>
                </tr>
                <tr>
                  <td>
                    <code>
                      GET /api/streams/{"{id}"}/viewership/aggregated/
                      {"{bucket_seconds}"}
                    </code>
                  </td>
                  <td>Bucketed stream viewership series.</td>
                </tr>
                <tr>
                  <td>
                    <code>GET /api/messages/stream/{"{id}"}/enriched</code>
                  </td>
                  <td>Live enriched stream messages with user context.</td>
                </tr>
                <tr>
                  <td>
                    <code>
                      GET /api/messages/stream/{"{id}"}/aggregated/
                      {"{aggregation_minutes}"}
                    </code>
                  </td>
                  <td>Stream message timeline aggregates.</td>
                </tr>
                <tr>
                  <td>
                    <code>GET /api/messages/user/{"{id}"}</code>
                  </td>
                  <td>Message history for a specific user.</td>
                </tr>
                <tr>
                  <td>
                    <code>GET /api/users/{"{id}"}</code>
                  </td>
                  <td>User profile details.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <SectionFallback
            className="retro-card"
            message="Deployment notes failed to load."
            title="Deployment + Practical Notes"
          />
        }
        name="RumbleDeployment"
      >
        <section className="retro-card">
          <h2>Deployment + Practical Notes</h2>
          <ul>
            <li>
              Docker Compose mode serves frontend via Nginx and proxies `/api`
              to FastAPI backend.
            </li>
            <li>
              Backend container runs scraper + ingestion + API against
              persistent `rumble_file_store` volume.
            </li>
            <li>
              Local dev mode (`make dev`) runs frontend/backend with Vite `/api`
              proxy support.
            </li>
            <li>
              Scraper reliability depends on Rumble DOM selectors and may need
              periodic maintenance.
            </li>
            <li>
              Two `.env.example` flags (`RUN_STARTUP_MIGRATIONS`,
              `LOCALIZE_BADGES_DURING_STARTUP`) are currently not consumed at
              runtime.
            </li>
          </ul>
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
        name="RumbleRelated"
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
