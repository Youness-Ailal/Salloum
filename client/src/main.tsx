import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import QuotesProvider from "./context/QuotesProvider.tsx";
import ReactGA from "react-ga";
import { SkeletonTheme } from "react-loading-skeleton";
import "./utils/i18n.ts";
// Initialize Google Analytics
ReactGA.initialize("G-36TXQY3QWV");
ReactGA.pageview(window.location.pathname + window.location.search);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QuotesProvider>
      <App />
    </QuotesProvider>
  </StrictMode>
);
