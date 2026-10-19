# Margin Notes — swe-2 candidate

A single-page portfolio that behaves like an annotated manuscript. The pen is
the site: everything the visitor does — moving, pressing, dragging, lingering,
double-clicking — leaves ink in the margins.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # dist/
npm run preview
```

## The idea in one line

You don't read this portfolio — you *mark it up*. It is a draft of how I work,
and you are holding the red pen.

## What is here

- `src/ink.ts` — the annotation engine. Strokes carry speed/pressure-derived
  width, underlines sag, circles wobble, margin notes are stamped in a hand
  font. Marks live in **document space**, so they scroll with the page.
- `src/App.tsx` — the manuscript (four sections + colophon) and the event
  wiring: cursor→stroke, press-on-phrase→underline, hold→thinking-circle,
  double-click→margin note, scroll→the author's own marginalia stamps itself in
  reading order.
- `src/styles.css` — the editorial system: laid paper, Palatino serif, mono
  kickers, a Caveat-style hand for the marginalia, a vermilion progress ribbon.

See `RESULTS.md` for the concept, journey, principles, non-goals and the
creative-director self-review.
