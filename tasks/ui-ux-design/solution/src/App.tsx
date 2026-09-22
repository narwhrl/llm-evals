import { useMemo } from "react";
import Experience from "./components/Experience";
import ReadingView from "./components/ReadingView";

export default function App() {
  const reading = useMemo(() => new URLSearchParams(window.location.search).has("text"), []);
  return reading ? <ReadingView /> : <Experience />;
}
