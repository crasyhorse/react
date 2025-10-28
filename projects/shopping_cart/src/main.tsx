import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import type { Container } from "react-dom/client";
import App from "@/App";
import "@/index.css";

const root: Container = document.getElementById("root") as Container;
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
