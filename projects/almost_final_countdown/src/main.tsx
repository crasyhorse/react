import React from "react";
import ReactDOM, { type Container } from "react-dom/client";
import App from "@/App";
import "@/index.css";

const root: Container = document.getElementById("root") as Container;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
