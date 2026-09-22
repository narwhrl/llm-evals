import { useMemo } from "react";
import Experience from "./components/Experience";
import ReadingView from "./components/ReadingView";
import Lab from "./Lab";

export default function App() {
  const mode = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("lab")) return "lab";
    return params.has("text") ? "reading" : "experience";
  }, []);

  if (mode === "lab") return <Lab />;
  return mode === "reading" ? <ReadingView /> : <Experience />;
}
