import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import QuotesProvider from "./context/QuotesProvider.tsx";
import ReactGA from "react-ga";
import "./utils/i18n.ts";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ui/ErrorFallback.tsx";

// Initialize Google Analytics
ReactGA.initialize("G-36TXQY3QWV");
ReactGA.pageview(window.location.pathname + window.location.search);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}>
      <QuotesProvider>
        <App />
      </QuotesProvider>
    </ErrorBoundary>
  </StrictMode>
);
