import { RetroFrame } from "../components/RetroFrame";
import { RouteLink } from "../components/RouteLink";

type NotFoundPageProps = {
  visitorCount: number;
};

export function NotFoundPage({ visitorCount }: NotFoundPageProps) {
  return (
    <RetroFrame
      tickerText="404 ERROR :: PAGE NOT FOUND :: RETURN TO HOMEPAGE"
      visitorCount={visitorCount}
    >
      <section className="retro-card not-found-card">
        <h1>404: Page Not Found</h1>
        <p>The route does not match an existing project page.</p>
        <RouteLink className="retro-link" to="/">
          Return to portfolio home
        </RouteLink>
      </section>
    </RetroFrame>
  );
}
