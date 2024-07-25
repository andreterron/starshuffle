import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MainframeProvider } from "@mainframe-api/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainframeProvider appId={import.meta.env.VITE_MAINFRAME_APP_ID}>
      <App />
    </MainframeProvider>
  </React.StrictMode>,
);
