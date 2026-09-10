# Vendored Three.js

本目录保存运行时实际导入的 Three.js ESM 构建及其 addon。应用通过
`vite.config.js` 中的 `resolve.alias` 把裸导入 `three` 映射到
`vendor/three/three.module.js`，保证运行时只加载本地副本，不经过 npm
或网络获取。

## 来源与版本

- 上游项目：<https://github.com/mrdoob/three.js>（three.js / threejs.org）
- 上游版本：**r186**（npm 包 `three`，版本 `0.186.0`）
- 获取方式：`npm install --no-save three@0.186.0` 后从包内原样复制以下文件：

| 本文件 | 上游路径（`node_modules/three/`） |
| --- | --- |
| `three/three.module.js` | `build/three.module.js` |
| `three/three.core.js` | `build/three.core.js` |
| `three/addons/OrbitControls.js` | `examples/jsm/controls/OrbitControls.js` |
| `three/LICENSE` | `LICENSE` |

未做任何内容修改。`three.module.js` 会相对导入同目录的 `three.core.js`；
`OrbitControls.js` 导入裸说明符 `three`，由 Vite 别名解析到本目录构建。

## 许可证

Three.js 以 MIT 许可证发布，全文见 `three/LICENSE`（版权所有 © 2010-2026
three.js authors）。
