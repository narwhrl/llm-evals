# Railway Town Diorama

A desktop miniature railway town built with Three.js: a closed-loop track on a
thick wooden display base, a small planned town around it, and a three-car train
that runs laps with a station stop on every pass. Vanilla JavaScript + Vite, no
backend.

## Install & run

```sh
npm install
npm run dev      # dev server, opens on http://localhost:5173
```

## Production build

```sh
npm run build    # outputs to dist/ (base path "./")
npm run preview  # serve the built bundle locally
```

Custom base path and output dir are supported, e.g.

```sh
npx vite build --base /railway-town-diorama/swe-2-max/ --outDir out
```

## Controls

- **Pause / Run** — freeze or resume the train; while paused at the station the
  dwell timer also stops and resumes with the train.
- **Reset** — restore the initial isometric camera, train position and 1.00×
  speed.
- **Night / Day** — toggle between warm evening sun and a lit night scene
  (station lamps, street lights, and some windows glow).
- **Speed** — slider from 0.20× to 2.50×.
- Drag to orbit, scroll to zoom.

## Scene notes

- Board is roughly 68×44 units on a raised wood base; the camera starts at a
  near-isometric angle so the whole layout is visible on load.
- The river enters from the eastern rim and ends inside the board, so the loop
  crosses it once on a truss bridge; a lighthouse marks the mouth.
- Each car (locomotive + two coaches) is placed independently on the curve with
  fixed coupler gaps, so spacing and heading stay correct through bends.

### URL parameters (used by automated checks, harmless otherwise)

- `?night=1` start in night mode
- `?paused=1` start paused
- `?speed=1.5` start at a given speed factor
- `?ff=12` fast-forward the simulation by N seconds before first frame
