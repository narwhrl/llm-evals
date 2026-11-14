# GARGANTUA — Schwarzschild Black Hole Raytracer

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production build

```bash
npm run build
```

## Static preview

```bash
npm run build
npx vite preview --host 127.0.0.1 --port 4173 --strictPort
```

The application uses the local vendored Three.js modules under `vendor/three/` and does not require CDN or runtime network assets. The capture contract is available at URLs such as:

```text
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```
