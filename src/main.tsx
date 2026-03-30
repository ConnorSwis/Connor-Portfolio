import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./index.css";

const rootFallback = (
  <main
    style={{
      fontFamily: "monospace",
      margin: "2rem auto",
      maxWidth: "48rem",
      padding: "1rem",
    }}
  >
    <h1>Temporary Rendering Error</h1>
    <p>The app hit an unexpected issue. Refresh to retry.</p>
  </main>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={rootFallback} name="AppRoot">
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
