# GARGANTUA — Schwarzschild Black Hole Raytracer

React + Vite + 本地 Three.js。主画面由一个全屏自定义 Fragment Shader 实时渲染：
每像素对 Schwarzschild 度规的零测地线做 RK4 数值积分（Binet 形式
`u'' = -u + 1.5·rs·u²`，`u = 1/r`），吸积盘沿积分后的弯曲路径按顺序求交并合成
多次穿越像，星空/银河为程序化生成并经透镜映射。无任何 CDN、远程贴图或运行时网络依赖。

## 命令

```bash
npm install          # 安装依赖（package-lock.json 已锁定版本）
npm run dev          # 开发服务器（Vite 默认端口）
npm run build        # 生产构建，输出到 dist/
npm run preview      # 静态预览生产构建（http://localhost:4173/）
```

静态预览也可以用任意静态服务器直接托管 `dist/`，例如
`npx serve dist` 或 `python -m http.server -d dist`。

Three.js 以 ESM 形式内置于 `vendor/`（详见 `vendor/README.md`），
`vite.config.js` 将 `three` 别名到该本地构建，运行时不接触 `node_modules` 与网络。

## 截图自动化契约

```
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

- `capture=1`：冻结模拟时间（`time`，缺省 0，非负秒）、关闭电影镜头循环；本版本无音频。
- `quality`：`standard|high|cinematic`；`preset`：0–3；`debug`：0–9；`hud`：0/1。
  非法或缺失值安全回退，不会异常或黑屏。
- 就绪后 `document.documentElement.dataset.gargantuaReady === "true"`，
  并暴露 `window.__GARGANTUA__`：`ready`、`getState()`、`setQuality(level)`、
  `setPreset(index)`、`setDebug(index)`、`setTime(seconds)`（非法输入返回 `null`/`false`，不抛异常）。

## 快捷键

| 键 | 功能 |
| --- | --- |
| `0`–`9` | 调试视图（0 = 最终合成画面） |
| `Shift+1`–`Shift+4` | 视角预设 |
| `Space` | 播放/暂停电影镜头循环 |
| `H` | HUD 显隐 |
| `R` | 重置全部（含 localStorage） |
| `Q` | 质量档切换 |

## 结构

```
src/engine/         渲染引擎：测地线积分 shader、HDR+Bloom+ACES 后期、相机、状态
src/engine/shaders/ 主 raytracer（GLSL3）与合成 pass（ACES/暗角/颗粒/色散）
src/ui/             HUD（预设、调试、21 项参数、质量档、快捷键）
vendor/             本地 Three.js ESM 构建与 addon（版本、来源、许可证见 README）
```
