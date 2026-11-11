# Willow Creek Railway

An interactive Three.js tabletop railway diorama. The scene is built
procedurally and runs without external assets or services.

## Setup

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. For a production build:

```sh
npm run build
npm run preview
```

`npm run build` accepts Vite's standard `--base` and `--outDir` options, so
the result can be deployed below a URL prefix:

```sh
npm run build -- --base /railway-town-diorama/ --outDir dist-test
```

## Controls

- Use the play button to pause or resume the train.
- Drag the speed slider to travel between `0.5×` and `2.0×`.
- Use the lighting button to switch between dusk and night.
- Drag the scene to orbit and use the wheel to zoom.
- Select **Reset** to restore the initial camera, speed, lighting, and
  running train.
