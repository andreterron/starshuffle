import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MainframeProvider } from "@mainframe-api/react";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainframeProvider appId={import.meta.env.VITE_MAINFRAME_APP_ID}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </MainframeProvider>
  </React.StrictMode>
);
