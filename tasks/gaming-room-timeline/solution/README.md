# Gaming Room Timeline

A miniature 3D scene of one room evolving through 20 years of a gamer's life
(2005-2025): a cramped bedroom computer corner grows into a full gaming room.

## Install / Run / Build

```sh
npm install        # or: npm ci
npm run dev        # dev server (Vite), open the printed URL
npm run build      # production build to dist/
npm run preview    # serve the production build
```

The build honors Vite `--base` and `--outDir`, e.g.

```sh
npx vite build --base /gaming-room-timeline/swe-2-max/ --outDir dist-prod
```

then serve `dist-prod/` so that `/gaming-room-timeline/swe-2-max/` resolves to
the built files.

## Controls

- Drag to orbit the room, scroll to zoom in on the desk.
- Drag the 2005-2025 slider or press play for an automatic replay.
- Number keys 1-9 (and the year ticks under the slider) jump to
  representative years.
- Click objects (monitor, tower, trophy, plush shark, Game Boy, mug, ...)
  to read era notes and owner memories.
- The monitor shows an era-appropriate simplified desktop; some widgets are
  clickable (WoW boss HP bar, DOTA2 queue button, OBS clip saver).

## Network resources

None. All geometry is procedural and all screens are inline SVG; the page
loads no external assets.

## Implementation notes

- `src/era.ts` - the timeline registry: which variant of each slot exists at
  which year, clutter fade windows, phase labels, and the click-info text.
- `src/parts.ts` - procedural builders for every furniture/peripheral variant.
- `src/room.ts` - room shell, slot management, keepsake relocation,
  clutter fading, per-era lighting.
- `src/screens.ts` - inline-SVG era desktops (XP / 7 / 10 / 11) with small
  interactive widgets.
- `src/screenSurface.ts` - projects a DOM overlay onto the 3D monitor so the
  SVG desktop is interactive with a real mouse.
- `src/main.ts` - renderer, OrbitControls, raycast picking, slider/autoplay.
