import { VisitorDigits } from "./VisitorDigits";
import { RouteLink } from "./RouteLink";

type RetroSidebarProps = {
  visitorCount: number;
  onJumpToSection?: (sectionId: string) => void;
};

export function RetroSidebar({
  visitorCount,
  onJumpToSection,
}: RetroSidebarProps) {
  const isHome = Boolean(onJumpToSection);

  return (
    <aside className="retro-sidebar">
      <RouteLink className="retro-site-name" to="/">
        Connor's HyperPage
      </RouteLink>

      <p className="retro-blurb">
        Full-stack engineer building data pipelines, automation, and self-hosted
        systems from Atlanta.
      </p>

      {isHome && (
        <div className="retro-button-stack">
          <button onClick={() => onJumpToSection?.("timeline")} type="button">
            Timeline
          </button>
          <button onClick={() => onJumpToSection?.("projects")} type="button">
            Projects
          </button>
          <button onClick={() => onJumpToSection?.("education")} type="button">
            Education + Experience
          </button>
        </div>
      )}

      {!isHome && (
        <RouteLink className="retro-side-link" to="/">
          Return To Main Page
        </RouteLink>
      )}

      <div className="badge-wall">
        <img
          alt="Under construction badge"
          src="/retro/construction-zone.gif"
        />
        <img alt="Color wave divider" src="/retro/rainbow-divider.gif" />
        <img alt="New mail icon" src="/retro/new-mail.gif" />
        <img alt="Spinning globe animation" src="/retro/globe-spin.gif" />
      </div>

      <div className="counter-shell">
        <p>VISITOR COUNTER</p>
        <VisitorDigits value={visitorCount} />
      </div>

      <div className="webring-shell">
        <p>Contact</p>
        <div className="webring-links">
          <a
            href="mailto:connorswislow@gmail.com"
          >
            Email
          </a>
          <a
            href="https://github.com/ConnorSwis"
            rel="noreferrer noopener"
            target="_blank"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/connor-swislow"
            rel="noreferrer noopener"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/connorswis/"
            rel="noreferrer noopener"
            target="_blank"
          >
            Instagram
          </a>
        </div>
      </div>
    </aside>
  );
}
