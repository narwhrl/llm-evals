# GARGANTUA — Schwarzschild Black Hole Raytracer · 结果报告

## 候选与基线

| 项 | 值 |
| --- | --- |
| 完整模型标识 | `builtin:bigmodel/GLM-5.3-Flash`（分支/目录标识 `glm-5.3-flash`） |
| 起始 `main` commit SHA | `830739e3c4aade4b7ee072c121860b7a9ee87b7e`（docs: add Gargantua raytracer evaluation task） |
| 工作分支 | `llm/gargantua-schwarzschild-raytracer/glm-5.3-flash` |
| 工作树 | `.worktrees/gargantua-schwarzschild-raytracer/glm-5.3-flash/`（基线工作树保持 `main`） |
| 候选路径 | `tasks/gargantua-schwarzschild-raytracer/solution/` |

## 提交记录（全部仅在本模型分支）

| SHA | 说明 |
| --- | --- |
| `2b2a270` | feat: scaffold Vite+React project with vendored Three.js ESM |
| `d33fc24` | feat: render Schwarzschild black hole via null-geodesic fragment shader |
| `4ee9e95` | feat: add HDR bloom and ACES post-processing chain |
| `4f331ce` | feat: add HUD controls, presets, persistence and cinematic loop |
| `9ca59a8` | feat: add debug views, capture contract and WebGL context recovery |
| （本次提交） | docs: add RESULTS report for glm-5.3-flash |

## 实现要点（供源码审查对照）

- **零测地线积分**：`src/gargantua/geodesic.js`。以 rₛ 为长度单位，逐像素反向追踪光子；采用与 Schwarzschild Binet 轨道方程 `d²u/dφ² + u = (3/2) rₛ u²`（对 null 测地线精确）数学等价的向量形式 `d²x/dλ² = −(3/2) rₛ h² x/|x|⁵`（`h² = |x×v|²` 守恒），RK4 积分，自适应步长（近黑洞与盘内加密）。终止条件：`r < rₛ` 落入视界（无发光深黑）、`r > 逃逸半径`（以最终方向采样程序化天空）、步数耗尽按捕获处理（锐化光子环）。文件头部注释完整写明坐标、状态量、步进与终止条件。
- **吸积盘**：赤道面高斯垂直剖面的薄体积，沿弯曲路径按序累积发射（自然产生一次/二次/高阶像）；Shakura–Sunyaev 型径向温度剖面；开普勒轨道速度 β = √(rₛ/(2(r−rₛ)))（ISCO 处 0.5c）、相对论 Doppler 束流 + 引力红移合成 g 因子作用于温度（g）与亮度（g³）；fbm 湍流随差速旋转 Ω ∝ r^(−3/2) 平流。
- **背景**：程序化星场（双层 hash 网格）+ fbm 银河带与尘埃带，以积分后的逃逸方向采样，透镜扭曲由测地线自然产生；无贴图/Cubemap/远程资源。
- **后处理**：`src/gargantua/post.js`。半浮点 HDR 目标 → UE 式软膝 bright-pass → Kawase 双线性降采样 Bloom 链（质量档控制 mip 数）→ 合成（HDR Bloom 叠加、ACES（Narkowicz 拟合）、径向色散、暗角、胶片颗粒、sRGB 编码）。调试视图 1–9 与 7 绕过艺术链直接输出原始场景值。
- **相机/HUD/状态**：OrbitControls 的相机位置/朝向/FOV 每帧真实传入 shader uniform；`store.js` 以版本化 `localStorage`（`gargantua.settings.v1`）持久化全部 21 项参数、质量档、视角预设、调试视图与 HUD 折叠状态，含校验与重置；快捷键 `0–9`、`Shift+1–4`、`Space`、`H`、`R`、`Q` 全部实现（音频为任务可选项，本候选未实现，`M` 未绑定）。
- **质量档**：Standard/High/Cinematic 真实改变内部渲染比例（0.55/0.75/1.0）、最大测地线步数（160/288/416）、湍流 octaves（3/4/5）、Bloom mip 数（3/4/5）与 DPR 上限（1.25/1.5/2.0）。
- **capture 契约**：`urlState.js` 在首帧前解析 `capture/quality/preset/debug/time/hud`，非法值安全回退；`capture=1` 冻结模拟时钟于 `time`（缺省 0）、镜头循环保持关闭；首帧渲染 + URL 状态应用后设置 `document.documentElement.dataset.gargantuaReady = "true"` 并暴露 `window.__GARGANTUA__`（`ready`、`getState()`、`setQuality/setPreset/setDebug/setTime`，全部校验输入、返回更新后状态或 null、不抛异常）。
- **上下文恢复**：`webglcontextlost` → preventDefault、暂停渲染、显示可恢复遮罩；`webglcontextrestored` → 重建渲染目标并自动继续，不刷新页面。

## 实际执行过的命令与结果

环境：macOS（Darwin 25.0.0，arm64），Node v24.18.0，npm 11.16.0。浏览器：Chromium（WebGL 2.0，agent-browser/CDP 自动化）。

| 命令 | 结果 |
| --- | --- |
| `npm install` | 退出码 0（react 19.x、react-dom 19.x、vite 7.x、@vitejs/plugin-react 5.x） |
| `npm install --no-save three@0.186.0` 后复制构建产物到 `vendor/` | 成功；`vendor/README.md` 记录版本、来源、MIT 许可证 |
| `npm run build`（多次，含最终复跑） | 退出码 0，产物 `dist/`（约 783 KB JS / gzip ≈ 200 KB，仅有 chunk 体积提示，非错误） |
| `npx vite preview --port 4173 --strictPort` | 退出码 0（服务 `dist/`，验证后已终止） |
| `npx vite --port 5173 --strictPort`（开发服务器，调试期使用） | 退出码 0（验证后已终止） |

交付时两个服务器均已终止（`lsof -i :4173 -i :5173` 确认无 LISTEN），无残留 dev server。

## 浏览器验收结果

### 桌面（1440×900，DPR 1）

- 基础 URL 打开即稳定出全貌：黑洞深黑核心、吸积盘高温亮色、前后盘面、光子环、背景透镜弯曲同时可辨；无加载遮罩卡死。
- 控制台错误：0（整个验证会话，含下述 40 组矩阵加载，`grep -iE '\[error\]|uncaught'` 计 0 行）。
- 交互：指针拖拽真实改变透镜视角（方位角 0° → 43.9°）；`Space` 播放/暂停电影镜头（播放时方位角自动推进 49.5°→53.4°，再次 `Space` 停止）；`Q` 循环质量档（high→cinematic→standard→high）；预设按钮与 `Shift+1–4` 均生效（如光子环特写：距离 7.5 rₛ、FOV 38，HUD 滑杆同步）；`H` 折叠/展开面板；`R` 重置（质量档、预设、调试、参数全部回默认并写回持久化）。
- 调试视图 0–9 逐个人工抽查：步进/终止热图、视界掩码、盘面交点阶次（橙=一次像、青=二次像清晰可辨）、红移/Doppler g 因子、透镜坐标网格、星空/银河、后处理前 HDR、仅盘面发射、捕获边界冲击参数带，均输出可辨认且有意义的诊断（HUD 显示当前编号与说明）。
- 持久化：写入 21 项参数 + 质量档 + 预设 + 调试视图 + HUD 折叠状态（`gargantua.settings.v1`，`v:1`）；植入一组非默认状态并刷新后逐项精确恢复；`R` 重置后回默认。

### capture 矩阵（`?capture=1&quality=high&time=12.5&hud=0` × preset 0–3 × debug 0–9，共 40 URL）

- 40/40 通过：`gargantuaReady === "true"`、`getState()` 的 `preset/debug/hud/time` 与 URL 一致、`timeFrozen === true`、`time === 12.5`。
- 确定性：同参数两帧截图 MD5 完全一致（冻结帧完全确定，颗粒/湍流/轨道均静止）。
- 抽查截图（preset 1/debug 1、preset 2/debug 2 等）画面正确、HUD 隐藏。
- 非法参数回退：`?capture=1&quality=bogus&preset=99&debug=44&hud=7&time=-3` → 全部回退默认（high/0/0/可见/0），无异常、无黑屏、ready 正常置位。
- API 校验：`setQuality('ultra')`→null、`setPreset(99)`→null、`setPreset(null)`→null、`setTime(-1)`→null；合法值正常生效并返回更新后状态。

### 移动端（390×844 视口）

- 稳定出图，构图正确；窄屏 HUD 自动收起为「☰ 面板」按钮，点按后以底部抽屉展开（画质/预设/电影镜头/参数滑杆可用），面板展开时隐藏与之重叠的悬浮条。
- resize 事件处理验证（1440×900 ↔ 390×844 切换均正常重定向渲染目标）。

### WebGL 上下文恢复

- 通过 `WEBGL_lose_context` 实测：`loseContext()` 后 `webglcontextlost` 触发、渲染暂停、显示「渲染上下文已中断」可恢复遮罩；2.5s 后 `restoreContext()`，`webglcontextrestored` 触发、渲染目标重建、遮罩自动消失、画面恢复且状态保留，全程无页面刷新。

## 已知限制与如实说明

1. **滚轮缩放的自动化验证方式**：本自动化环境（agent-browser/CDP）的原始 `mouse wheel` 通道未能向页面派发 wheel 事件；改为在页面内对 canvas 派发标准 `WheelEvent` 实测，OrbitControls 缩放正常（距离 14→11.88 rₛ）。真实用户滚轮事件与之同类，判定功能正常，但特此记录验证通道差异。
2. **移动端仿真深度**：移动端验证为视口尺寸切换（390×844，DPR 1）；自动化环境无法以 device scale factor 2 / 真实触摸合成输入。`devicePixelRatio`、触摸（OrbitControls 内建 touch + `touch-action: none`）为标准代码路径，但在本环境中未经真机级实测。
3. **音频**：任务标注为可选项（「若实现氛围音乐」），本候选未实现音频，`M` 键未绑定；不存在自动播放风险。
4. **画面风格**：吸积盘配色/湍流形态为程序化艺术取向（Shakura–Sunyaev 剖面 + 黑体配色），未以任何参考截图为目标克隆；所有可见现象均出自同一全屏 shader。

## 所需人工介入

无。开发过程中的两类缺陷（渲染器初始化顺序导致的挂载崩溃；GLSL 模板字符串闭合缺失）均在本轮内自主定位并修复，未遗留 TODO 或占位实现。
