# 资源与授权记录

## 运行时资源

| 资源 | 作者 / 生成方式 | 本地位置 | 外部许可 |
| --- | --- | --- | --- |
| 船体、舱壁、钢箱、篷布货物、木箱、吊机、栏杆、人物、武器、手部模型 | 本候选自行编写的 Three.js 程序几何和 CanvasTexture | `src/assets.ts`, `src/map.ts` | 不适用：本作生成 |
| 金属、木纹、篷布、甲板与海面表面 | 本候选用 Canvas 伪随机纹理和 GLSL 海面着色器生成 | `src/assets.ts` | 不适用：本作生成 |
| 射击、装填、脚步、爆炸、海风声音 | 本候选用 Web Audio 振荡器、滤波噪声和包络生成 | `src/audio.ts` | 不适用：本作生成 |
| 简体中文 HUD、菜单、图标、小地图和标注布局图 | 本候选 HTML/CSS/Canvas/SVG | `src/ui.ts`, `src/style.css`, `docs/layout.svg` | 不适用：本作生成 |
| Three.js | three.js authors | npm 包 `three` | MIT，见 npm 包 `LICENSE` |
| Playwright Core | Microsoft | 测试依赖 `playwright-core` | Apache-2.0，见 npm 包 `LICENSE` |

构建依赖（Vite、Vitest、TypeScript 及其传递依赖）由 `package-lock.json` 固定，具体许可证以各 npm 包附带的许可文件为准。没有外部正式图片、模型、音效、字体、徽标、密钥或远程服务调用。

## 参照截图

`references/R05-overview.png` 至 `R09-highpoint.png` 是任务指定的原版画面分析资料，来源和 SHA-256 详见 [MAP_REFERENCE.md](MAP_REFERENCE.md)。它们**不被游戏加载，也不被复制成正式美术资源**；仅用于空间核验和评审。截图版权属于原权利人，若公开仓库的再分发条件不允许保留这些参考副本，应由仓库维护者替换为仅链接的引用方式，不影响运行时游戏。
