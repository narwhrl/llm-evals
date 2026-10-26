# Orbital Home / Habitat 04

A browser-local, orthographic miniature of a one-person orbital habitat. No UI overlays, remote runtime assets, credentials, or backend services.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev -- --port 5177 --strictPort
npm test
npm run build
npm run preview -- --port 5178 --strictPort
```

Open the local address printed by Vite. The default view is a 90-second orbit, with both interior light strips and the grow light on.

## Subpath Build

```sh
npm run build -- --base=/orbital-habitat-diorama/gpt-6-astra/ --outDir=.preview/site --emptyOutDir
npm run preview -- --base=/orbital-habitat-diorama/gpt-6-astra/ --outDir=.preview/site --port 5178 --strictPort
```

Open `http://127.0.0.1:5178/orbital-habitat-diorama/gpt-6-astra/`.

On a Windows host whose system temporary directory denies esbuild access, set a process-local temporary directory before building:

```powershell
New-Item -ItemType Directory -Force .preview/temp | Out-Null
$env:TEMP = Join-Path (Get-Location) '.preview\temp'
$env:TMP = $env:TEMP
npm run build
```

## Interaction

- Drag the cabin or background to rotate; wheel or pinch to zoom. Rotation remains within the readable interior hemisphere.
- Click the workbench, sleeping bag, plant rack, chair, exercise bike, or personal storage to focus. Click the same fixture again, click empty space, or press Escape to return.
- Drag horizontally inside the large porthole to scrub orbital time. Release to resume from that phase. A single click toggles 90-second / 15-second cycles; motion beyond six pixels is a drag, not a click.
- Approach the floating pen to displace it; click it to spin it.
- Click the overhead grow-light housing to toggle it.
- Click either floor light strip to toggle night cruise. It suspends the main strips and grow light, preserving the grow-light switch for restoration. Sunlight still follows the orbit; night cruise is darkest on the night side.
- With the canvas focused, arrow keys rotate and `+` / `-` zoom.

## Implementation

- `src/habitat.js`: geometry, physical labels, fixtures, materials and light placement.
- `src/main.js`: one 3D Earth rendered through all three apertures, atmospheric shader, projected sunlight, lighting, camera and pointer handling.
- `src/textures.js`: deterministic local Canvas textures, illustrations, papers and live telemetry display.
- `src/orbit.js`: orbit timing, click/drag threshold and disjoint floating-object envelopes.
- `public/textures/`: attributed, locally packaged Earth maps.
- `evidence/`: unaltered browser captures; see `RESULTS.md` for verification and limitations.

Earth textures are credited in `public/textures/ATTRIBUTION.txt`. All remaining visual assets are generated from the project's own source code. There are no external fonts or model-generated images.
