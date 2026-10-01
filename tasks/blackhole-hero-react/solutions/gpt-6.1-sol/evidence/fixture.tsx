import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BlackHoleHeroSection } from "../src/components/ui/blackhole-hero-section";
import type { BlackHoleHeroSectionProps } from "../src/components/ui/blackhole-hero-section";
import "../src/index.css";

const root = createRoot(document.getElementById("root")!);
let current: BlackHoleHeroSectionProps = {};
let clicks = 0;

function renderHero(props: BlackHoleHeroSectionProps = {}) {
  current = { ...current, ...props };
  root.render(
    <StrictMode>
      <BlackHoleHeroSection
        id="verification-hero"
        aria-label="Lifecycle test hero"
        data-fixture="true"
        className="min-h-[720px]"
        style={{ height: "720px" }}
        onClick={() => { clicks += 1; }}
        {...current}
      >
        <p className="relative z-10 px-6 pt-14 text-white">Lifecycle verification copy</p>
      </BlackHoleHeroSection>
    </StrictMode>,
  );
}

Object.assign(window, {
  renderHero,
  unmountHero: () => root.render(null),
  getHeroClicks: () => clicks,
});
renderHero();
