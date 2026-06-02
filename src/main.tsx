import { createRoot } from "react-dom/client";

import "./index.css";
import PublicRouter from "./routes/public";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<PublicRouter />);