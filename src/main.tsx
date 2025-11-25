import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initEmailJS } from "./lib/emailService";

// Initialize EmailJS for contact form
initEmailJS();

createRoot(document.getElementById("root")!).render(<App />);
