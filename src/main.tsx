import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MainframeProvider } from "@mainframe-api/react";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import posthog from "posthog-js";

posthog.init("phc_5xv7jae6Br2ZYtwI1FbvX2MvMkvryfBYTAzamEtBCR6", {
  api_host: "https://us.i.posthog.com",
  person_profiles: "always", // or 'always' to create profiles for anonymous users as well
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainframeProvider appId={import.meta.env.VITE_MAINFRAME_APP_ID}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </MainframeProvider>
  </React.StrictMode>,
);
