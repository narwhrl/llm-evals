# Black Hole Hero · React integration

This project integrates the supplied `BlackHoleHeroSection` and responsive demo. It uses React, Vite, TypeScript, Tailwind CSS v4, and shadcn-compatible paths. The scene is live WebGL; there are no remote runtime assets, images, icons, providers, or backend services.

## Run

Use Node.js 22.12 or newer. Dependencies have exact versions and are reproducible from `package-lock.json`.

```bash
npm ci
npm run dev -- --port 5173 --strictPort
npm run typecheck
npm run build
npm run preview -- --port 4176 --strictPort
```

The development and preview servers bind to `127.0.0.1`. Open the printed local URL. Stop each server with Ctrl+C.

For a non-root deployment:

```bash
npm run build -- --base=/blackhole-hero-react/eval/ --outDir=dist-subpath
npm run preview -- --base=/blackhole-hero-react/eval/ --outDir=dist-subpath --port 4177 --strictPort
```

Open `http://127.0.0.1:4177/blackhole-hero-react/eval/`. On Windows **Git Bash**, use `MSYS_NO_PATHCONV=1` before each command containing `--base=/...` to prevent MSYS from rewriting the URL prefix into a Windows filesystem path. This is not needed in PowerShell, cmd, macOS, or Linux.

## Structure and initialization

- `src/components/ui/blackhole-hero-section.tsx`: the supplied component, including its public props, children slot, DOM attributes, default values, shaders, temporal averaging, bloom, and tone mapping.
- `src/demo.tsx`: byte-identical to the supplied responsive demo. It switches at `(max-width: 767px)` and retains the original copy, links, camera parameters, and layout classes.
- `src/main.tsx`: React StrictMode entry point; imports the global stylesheet.
- `src/index.css`: Tailwind v4 import, neutral dark shadcn tokens, black page background, and keyboard-focus styling. Fonts are local system fonts.
- `components.json`: shadcn configuration using `src/index.css` and `@/components/ui`.
- `tsconfig.json` and `vite.config.ts`: matching `@/*` → `src/*` resolution.

The source root is `src/`, so the default UI component directory is **`src/components/ui/`**, not `/components/ui` at the repository root. Keeping this directory and the `@/components/ui` alias aligned lets both the demo and shadcn CLI resolve the same components. Tailwind v4 uses its Vite plugin and CSS configuration, so `components.json` deliberately has an empty `tailwind.config` field.

No additional initialization is necessary after cloning. A fresh host with the same convention can be initialized with:

```bash
npm create vite@9.2.1 blackhole-hero -- --template react-ts
cd blackhole-hero
npm install --save-exact react@19.3.0 react-dom@19.3.0
npm install --save-dev --save-exact vite@8.3.2 @vitejs/plugin-react@6.1.1 typescript@7.0.2 @types/react@19.3.0 @types/react-dom@19.3.0 @types/node@26.6.3 tailwindcss@4.3.3 @tailwindcss/vite@4.3.3
```

Then apply this project's Vite plugin, TypeScript alias, stylesheet, and `components.json` configuration before copying the component and demo. For shadcn-managed initialization on a fresh host, the applicable CLI command is:

```bash
npx shadcn@4.21.1 init
```

Select a Vite/TypeScript project, the neutral theme, `src/index.css`, and the aliases above. This already-configured candidate does not run the CLI or install unused shadcn components. `@/lib/utils`, `@/lib`, and `@/hooks` are conventional destinations for future CLI-generated utilities/hooks, not runtime dependencies of this component. A future shadcn component can be installed with `npx shadcn@4.21.1 add button`; that is optional and is not part of this evaluation.

## Browser verification

`RESULTS.md` records the executed commands, original-code fixes, environment, visual review, and limitations. `evidence/01-desktop.png` and `evidence/02-mobile.png` are actual production screenshots at 1440 × 900 and 390 × 844.

The lifecycle fixture is a separate test entry, excluded from the normal gallery build:

```bash
npm run build -- --config=evidence/vite.fixture.config.ts --outDir=dist-fixture
npm run preview -- --outDir=dist-fixture --port 4178 --strictPort
```

Open `http://127.0.0.1:4178/evidence/fixture.html`. The fixture exposes `window.renderHero({ paused: true })`, `window.renderHero({ paused: false })`, and `window.unmountHero()` to test the component's real public API without adding controls to the delivered demo.

`evidence/browser-probe.js` is passive instrumentation installed by the harness with Kimi WebBridge's `Page.addScriptToEvaluateOnNewDocument`. It observes uniforms, frames, console errors, and pixels without changing the renderer. With an owned tab in the extension's `blackhole-hero-gpt61` session and production servers on 4176, 4177, and 4178, `node evidence/verify-browser.mjs` records checks to `evidence/browser-results.json`. When rerunning in the same tab, set `PROBE_IDENTIFIER` to the identifier printed by the preceding run so the old probe is removed before reinstalling. It does not invoke another model. The verification harness hides only the extension-injected operator frame in screenshots, not application content.

## Behavior and scope

The demo has no business destinations for its two `href="#"` links; they intentionally stay as supplied. Reduced motion renders a still, pause freezes the simulation and displayed frame, and parameter/viewport changes redraw the same WebGL scene. Context loss temporarily hides the canvas while retaining copy; restoration rebuilds the GPU resources. Unsupported WebGL leaves readable text on a black background.
