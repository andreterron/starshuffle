import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MainframeProvider } from "@mainframe-api/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainframeProvider appId="d0174965d74a823a71af48d5d88dc9dc">
      <App />
    </MainframeProvider>
  </React.StrictMode>,
);
