# Vendor — Three.js (locally vendored)

This project uses Three.js as a locally vendored ESM build, copied into both
`public/vendor/three/` (served as a static asset under `/vendor/three/...`) and
into `src/vendor/` (imported by `src/Scene.jsx` via the Vite alias for `three`
and `three/addons/...`).

The vendored copy is intentionally duplicated to keep the development alias
purely relative and to make the built bundle self-contained, with no runtime
network dependency.

## Upstream

- Project: https://github.com/mrdoob/three.js
- Version: 0.160.1
- Source URLs (downloaded 2026-05-23 during task implementation):
  - https://unpkg.com/three@0.160.1/build/three.module.js
  - https://unpkg.com/three@0.160.1/examples/jsm/controls/OrbitControls.js

## License

Three.js is MIT-licensed:

```
MIT License

Copyright (c) 2010-present three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

## Integrity (SHA-256)

- `three.module.js`: 76dea8151bc9352aef3528b4262e249b2604f62543828328db978d060d61a495
- `OrbitControls.js`: 7aa4372a5ec60b49988edde81014c7361740a57962d032003ca33301c1f4edd5

No runtime network fetches against any CDN, HDR repository, audio provider, or
font CDN occur in this project. Everything required for first paint is bundled
or vendored.