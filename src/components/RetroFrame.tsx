import type { ReactNode } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { RetroMarquee } from "./RetroMarquee";
import { RetroSidebar } from "./RetroSidebar";

type RetroFrameProps = {
  tickerText: string;
  visitorCount: number;
  onJumpToSection?: (sectionId: string) => void;
  children: ReactNode;
};

export function RetroFrame({
  tickerText,
  visitorCount,
  onJumpToSection,
  children,
}: RetroFrameProps) {
  const sidebarFallback = (
    <aside className="retro-sidebar">
      <p>Navigation is temporarily unavailable.</p>
    </aside>
  );

  const contentFallback = (
    <section className="retro-card">
      <h2>Content Temporarily Unavailable</h2>
      <p>A component in this view failed to render.</p>
    </section>
  );

  return (
    <div className="retro-page">
      <header className="retro-header">
        <div className="browser-title">
          Connor Swislow :: About Me :: connorswis.com
        </div>
        <RetroMarquee className="news-ticker" text={tickerText} />
      </header>

      <main className="retro-main">
        <div className="retro-stage">
          <div className="retro-sidebar-cell">
            <ErrorBoundary fallback={sidebarFallback} name="RetroSidebar">
              <RetroSidebar
                onJumpToSection={onJumpToSection}
                visitorCount={visitorCount}
              />
            </ErrorBoundary>
          </div>
          <div className="retro-content-cell">
            <ErrorBoundary fallback={contentFallback} name="RetroContent">
              {children}
            </ErrorBoundary>
          </div>
        </div>
      </main>

      <footer className="retro-footer">
        <RetroMarquee
          className="footer-ticker"
          reverse
          text={`Welcome, visitor #${visitorCount} · Always under construction · All systems nominal · Last updated 03-30-2026 at 2:34 PM EST · Made by Connor Swislow · © All rights reserved ${new Date().getFullYear()}`}
        />
      </footer>
    </div>
  );
}
