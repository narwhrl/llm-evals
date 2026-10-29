# 结果报告 — gargantua-schwarzschild-raytracer

## 模型

- 模型标识：`deepseek-v4.1-flash (DeepSeek Harness, qoder-cn/dfmodel)`
- 基线 `main` 提交：`091c801b98342f2e778bd356e0c55b7372398541`
- 工作目录：`.worktrees/run-gargantua-deepseek/tasks/gargantua-schwarzschild-raytracer/solution/`

## 实现要点

- React + Vite + ES Modules，Three.js 0.180.0 以本地副本形式放在 `vendor/`，
  通过 Vite alias 解析，无 CDN、远程纹理、HDRI、字体或音频。
- 可见的黑洞、吸积盘、星空与透镜全部由 `src/shaders/blackHole.js` 的
  逐像素 fragment shader 生成：没有黑洞球体、环状网格、图片、视频或 cubemap。
- 测地线积分在三维中完成：`dp/ds = v`、`dv/ds = -3M h² p / r⁵`（`h = |p × v|` 守恒），
  半径用 RK4 推进；盘面（`y = 0`）按真实线段与平面求交，支持多次穿越。
- 后处理链：HDR half-float → Bloom 亮部提取 + 可分离高斯金字塔 →
  ACES tone mapping + 暗角 + 颗粒 + 径向色散。
- 契约实现：4 个预设（按钮 + `Shift+1..4`）、可折叠 HUD、22 个滑杆与重置、
  `0`–`9` 调试视图、`Space`/`H`/`R`/`Q`、localStorage 持久化、
  `capture=1` URL 参数（`quality`、`preset`、`debug`、`time`、`hud`，非法值回落默认）、
  `document.documentElement.dataset.gargantuaReady = "true"`、
  `window.__GARGANTUA__`（只读 `ready`，`getState`、`setQuality`、`setPreset`、
  `setDebug`、`setTime`）、`webglcontextlost` / `webglcontextrestored` 恢复。

## 执行过的验证

| 命令 / 操作 | 结果 |
| --- | --- |
| `npm install` | 成功，依赖含 react 19.1.1、vite 7、three 0.180.0 |
| `npm run dev`（端口 5210） | 开发服务器启动，页面可访问 |
| `TMP=<pwd>/.tmp TEMP=<pwd>/.tmp npm run build` | 成功：`dist/index.html` 0.71 kB、`index-*.css` 4.75 kB、`index-*.js` 994.20 kB（gzip 272.25 kB） |
| 浏览器视觉验收（1440×900） | 预设 0/1/2/3 均正确渲染：光子环、黑洞背面次级像、盘面多普勒亮度差、星空透镜拉伸 |
| 调试视图 7（盘面穿越次数） | 深蓝=未命中、橙=1 次、黄=2 次，几何与真实测地线一致 |
| `window.__GARGANTUA__.getState()` | `ready: true`、22 个参数、`render` 预算字段完整 |
| `setQuality("cinematic")` / `setQuality("bogus")` | 前者生效并返回新状态，后者返回 `{ error: "invalid quality: bogus" }` |
| `setPreset(2)` / `setDebug(4)` / `setTime(3.5)` | 均即时生效，返回值反映最新状态 |
| `document.documentElement.dataset.gargantuaReady` | `"true"` |
| 移动端 390×844（DPR 2） | HUD 变为底部抽屉，画布单列铺满，控件可读 |

## 已知限制

- 采用施瓦西度规的零测地线空间形式近似，未包含克尔自转；无参考系拖曳。
- 盘面为解析发射模型（黑体色温 + 湍流噪声 + 多普勒/引力红移），
  未做辐射转移积分。
- `vendor/three.module.js` 被静态与动态同时引用，构建时出现
  "dynamic import will not move module into another chunk" 警告，不影响产物正确性。
- 默认质量档 `standard` 在集成显卡上约 30 fps；`cinematic` 需要独显。
