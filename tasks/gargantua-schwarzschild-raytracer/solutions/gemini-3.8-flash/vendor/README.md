# Vendored Dependencies

This directory contains vendored ES Modules used directly at runtime by the Gargantua Schwarzschild Black Hole Raytracer.

## 1. Three.js Core (`three.module.js`)
- **Upstream Version**: Three.js r170 (`0.170.0`)
- **Source**: `npm:three@0.170.0` (extracted from `three/build/three.module.js`)
- **License**: MIT License (Copyright (c) 2010-2024 Three.js Authors)
- **Repository**: https://github.com/mrdoob/three.js

## 2. OrbitControls Addon (`OrbitControls.js`)
- **Upstream Version**: Three.js r170 (`0.170.0`)
- **Source**: `npm:three@0.170.0` (extracted from `three/examples/jsm/controls/OrbitControls.js`)
- **License**: MIT License (Copyright (c) 2010-2024 Three.js Authors)
- **Local Adaptation**: Upstream import statement adjusted to resolve locally from `./three.module.js`.
