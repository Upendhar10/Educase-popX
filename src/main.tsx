import { createRoot } from "react-dom/client";

import "./index.css";
import Router from "./router";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<Router />);