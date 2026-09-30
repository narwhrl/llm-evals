# 资产来源

本项目**没有使用外部模型、贴图、字体或音频文件**。所有运行时资产都由本仓库源码在浏览器中程序生成，作者即本候选实现。没有使用官方客户端解包资源，也没有使用品牌徽标。

| 资产 | 生成方式 | 源码 |
| --- | --- | --- |
| 甲板防滑钢板、船舱墙面、船壳、栏杆金属贴图 | Canvas 2D 程序绘制，带种子随机的斑点、流痕与接缝 | `src/render/textures.ts` |
| 集装箱侧板与箱门（多种配色）、波纹凹凸贴图 | Canvas 2D：波纹、边框、角件、铰链、闭锁杆、锈迹与污渍 | `src/render/textures.ts` |
| 木板、篷布贴图 | Canvas 2D：木纹与钉件、篷布褶皱 | `src/render/textures.ts` |
| 地图几何（甲板、船舱、集装箱、木箱、篷布货物、栏杆等） | 由 `src/map/layout.ts` 的碰撞盒体生成网格，再加上框架、绑带等细节构件 | `src/render/worldmesh.ts`、`src/render/ship.ts` |
| 海面 | 自写着色器，叠加 4 层 Gerstner 波 | `src/render/env.ts` |
| 天空、云层、吊机、直升机、海鸟 | Three.js 基础几何体，以及 Canvas 生成的云精灵 | `src/render/env.ts` |
| 武器模型（AK-47、M4A1、MP5、AWM、沙漠之鹰、战术刀、手雷） | Three.js 基础几何体组合 | `src/render/guns.ts` |
| 第一人称手臂与动画 | 基础几何体，程序动画 | `src/render/viewmodel.ts` |
| 角色模型与动画 | 分段人形，双骨骼手臂 IK，程序步态 | `src/render/characters.ts` |
| 枪口焰、弹痕、抛壳、烟雾、爆炸 | Canvas 渐变纹理配合精灵、实例化网格与点精灵 | `src/render/effects.ts` |
| 全部音效（枪声、空仓、换弹、拉栓、切枪、脚步、跳落、爆炸、命中/击杀提示、海风海浪底噪） | Web Audio 离线合成：噪声、谐振模态、滤波、早期反射与混响尾音 | `src/audio/synth.ts`、`src/audio/audio.ts` |
| 界面图标（favicon） | 内联 SVG | `index.html` |
| 字体 | 系统字体栈，不打包字体文件 | `src/style.css` |

`references/` 中的截图来自第三方网页，只用于分析地图布局，**不属于运行时资产**，也不进入构建产物。来源与校验值见 `docs/MAP_REFERENCE.md`。

npm 依赖：`three` 0.186.1（MIT）。开发依赖为 `typescript`、`vite`、`vitest`、`@types/three`，版本见 `package-lock.json`。
