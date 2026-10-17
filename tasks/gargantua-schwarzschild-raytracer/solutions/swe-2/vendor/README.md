# Vendored Three.js

This directory contains the runtime ESM build of Three.js that the application
actually imports, plus the addons it uses. It is committed deliberately so the
built site renders without any CDN or package registry access.

- **Upstream package:** `three` 0.186.1 (exact resolved version is pinned in
  `../package-lock.json`)
- **Source:** files copied verbatim from the published `three@0.186.1` npm
  package (`build/three.module.js`, `build/three.core.js`, and the listed
  `examples/jsm/` addons)
- **License:** MIT License, © Three.js authors. The license header is preserved
  at the top of each vendored file; see
  https://github.com/mrdoob/three.js/blob/dev/LICENSE

## Layout

```
vendor/three/three.module.js    core re-export barrel + WebGL renderer (ESM)
vendor/three/three.core.js      math/scene/geometry core imported by the barrel
vendor/three/addons/controls/OrbitControls.js
vendor/three/addons/postprocessing/{EffectComposer,RenderPass,UnrealBloomPass,ShaderPass,Pass,MaskPass,OutputPass}.js
vendor/three/addons/shaders/{CopyShader,LuminosityHighPassShader,OutputShader}.js
```

## Resolution

- `vite build`: `vite.config.js` aliases `three` and `three/addons` to this
  directory, so production bundles contain only these vendored files.
- `vite dev` / `vite preview`: `index.html` ships a static
  `<script type="importmap">` mapping `three` and `three/addons/` to these
  vendored URLs, so the on-disk modules also load directly without a bundler
  rewrite.
