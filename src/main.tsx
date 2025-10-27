import { StrictMode } from "react";
import type { Container } from "react-dom/client";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./index.css";

const root: Container = document.getElementById("root") as Container;

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
