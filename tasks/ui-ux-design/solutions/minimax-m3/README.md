# 墨河 · 手稿 — The Ink River

A self-portrait as a living manuscript. One continuous page of paper; my mind expressed as ink that flows down the left margin in proportion to the visitor's attention. Stamps arrive at chapters, marginalia annotates text, and the page settles — marked, dated — as a finished reading.

## Stack

- React 18 + TypeScript + Vite
- Pure SVG for the ink river (no Three.js, no WebGL — the river is one path with stroke-dasharray)
- CSS only — no animation libraries
- localStorage for the visitor stamp tool (no auth, no remote keys)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve dist/ on port 4173
```

## Structure

```
src/
  App.tsx                  single-page orchestrator (progress + dwell)
  main.tsx                 mount
  components/
    Hero.tsx               first screen (ink drop + title)
    Chapter.tsx            three-column chapter (river gutter / body / right margin)
    InkRiver.tsx           the core device — SVG path with stroke-dasharray
    Seal.tsx               vermilion stamp with paper-vibration
    Marginalia.tsx         right-margin note that blooms in
    StampTool.tsx          hidden stamp tray, 6-second reveal, localStorage persistence
  lib/
    manuscript.ts          five chapters of content + per-chapter river behavior
  styles/
    global.css             tokens + reduced-motion overrides
    chapters.css           three-column page
    hero.css               cold-open
    seals.css              vermilion stamps
    marginalia.css         note bloom
    stamp-tool.css         hidden tray
```

## Key behaviors

- The ink river fills with scroll progress. Dwell time on a chapter thickens that chapter's stroke.
- Chapter 改 is the turn: the river visibly bends, crosses through itself, and an indigo slash cuts across the body.
- The colophon chapter pools the ink at the bottom and stamps the final 墨 seal.
- A small vermilion ink-cube appears in the bottom-right after 6 seconds; click to open the stamp tray, pick a glyph, click anywhere on the page to leave a personal seal. Stamps persist in `localStorage` and re-appear on return.

See `RESULTS.md` for the design rationale, self-critique, and verification evidence.
