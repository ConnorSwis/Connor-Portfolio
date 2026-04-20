import { VisitorDigits } from "./VisitorDigits";
import { RouteLink } from "./RouteLink";

type RetroSidebarProps = {
  visitorCount: number;
  onJumpToSection?: (sectionId: string) => void;
};

export function RetroSidebar({ visitorCount, onJumpToSection }: RetroSidebarProps) {
  const isHome = Boolean(onJumpToSection);

  return (
    <aside className="retro-sidebar">
      <RouteLink className="retro-site-name" to="/">
        Connor's HyperPage
      </RouteLink>

      <p className="retro-blurb">
        Personal site. Best viewed in turbo 56k mode.
      </p>

      {isHome && (
        <div className="retro-button-stack">
          <button onClick={() => onJumpToSection?.("timeline")} type="button">
            Timeline
          </button>
          <button onClick={() => onJumpToSection?.("projects")} type="button">
            Projects
          </button>
          <button onClick={() => onJumpToSection?.("skills")} type="button">
            Skills
          </button>
          <button onClick={() => onJumpToSection?.("education")} type="button">
            Education
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
        <p>WebRing Jump</p>
        <div className="webring-links">
          <a
            href="https://www.cameronsworld.net/"
            rel="noreferrer noopener"
            target="_blank"
          >
            Previous
          </a>
          <a
            href="https://www.spacejam.com/1996/"
            rel="noreferrer noopener"
            target="_blank"
          >
            Random
          </a>
          <a
            href="https://archive.org/details/texts?tab=collection&query=geocities"
            rel="noreferrer noopener"
            target="_blank"
          >
            Next
          </a>
        </div>
      </div>
    </aside>
  );
}
