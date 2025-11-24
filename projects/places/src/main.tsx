import { createRoot } from "react-dom/client";

import App from "./App.js";
import "./index.css";

const root: Element = document.getElementById("root") as Element;
createRoot(root).render(<App />);
