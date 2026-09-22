# 本地 Three.js vendor

运行时实际导入的 Three.js ESM 构建与 addon，随源码提交，运行时零网络依赖。

- 上游版本：three@0.180.0
- 来源：https://www.npmjs.com/package/three （github.com/mrdoob/three.js）
- 许可证：MIT（见 `three/LICENSE`）
- 改写说明：`examples/jsm/**` 内 bare `from 'three'` 导入已改写为指向 `three.module.js` 的相对路径，其余内容未改动。
- 再生成：`npm ci && npm run vendor`

## 文件清单

- `LICENSE`
- `build/three.core.js`
- `build/three.module.js`
- `examples/jsm/controls/OrbitControls.js`
- `examples/jsm/postprocessing/EffectComposer.js`
- `examples/jsm/postprocessing/MaskPass.js`
- `examples/jsm/postprocessing/Pass.js`
- `examples/jsm/postprocessing/RenderPass.js`
- `examples/jsm/postprocessing/ShaderPass.js`
- `examples/jsm/postprocessing/UnrealBloomPass.js`
- `examples/jsm/shaders/CopyShader.js`
- `examples/jsm/shaders/LuminosityHighPassShader.js`
