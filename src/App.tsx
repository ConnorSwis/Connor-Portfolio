import "./App.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useRoute } from "./hooks/useRoute";
import { useVisitorCounter } from "./hooks/useVisitorCounter";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProjectPage } from "./pages/ProjectPage";
import { RumbleMonitorPage } from "./pages/RumbleMonitorPage";
import { projects } from "./server/portfolioData";

function App() {
  const route = useRoute();
  const visitorCount = useVisitorCounter();
  const match = route.match(/^\/projects\/([a-z0-9-]+)$/);
  const routeFallback = (
    <main
      style={{
        fontFamily: "monospace",
        margin: "2rem auto",
        maxWidth: "48rem",
        padding: "1rem",
      }}
    >
      <h1>View Temporarily Unavailable</h1>
      <p>This route hit an unexpected rendering issue.</p>
      <p>
        <a href="#/">Return to homepage</a>
      </p>
    </main>
  );

  if (match) {
    const projectSlug = match[1];
    const project = projects.find((item) => item.slug === projectSlug);

    if (!project) {
      return <NotFoundPage visitorCount={visitorCount} />;
    }

    if (project.slug === "rumble-chat-intelligence") {
      return (
        <ErrorBoundary
          fallback={routeFallback}
          name="RumbleRoute"
          resetKey={route}
        >
          <RumbleMonitorPage project={project} visitorCount={visitorCount} />
        </ErrorBoundary>
      );
    }

    return (
      <ErrorBoundary
        fallback={routeFallback}
        name="ProjectRoute"
        resetKey={route}
      >
        <ProjectPage project={project} visitorCount={visitorCount} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary fallback={routeFallback} name="HomeRoute" resetKey={route}>
      <HomePage visitorCount={visitorCount} />
    </ErrorBoundary>
  );
}

export default App;
