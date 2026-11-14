# RESULTS — rainy-konbini-diorama

- 完整模型: `magpie/opencode-go/muse-spark-1.3-contributor:xhigh`
- 候选显示 ID: `muse-spark-1.3`
- Reasoning: `xhigh`（按任务指定；会话内无回退、无切换）
- 基线 SHA: `9ec1360f064c8cef28862671c58bc40ecfb1bd75`（detached；`git rev-parse HEAD` 核对一致）
- 子代理 / 其他模型 / 回退：均未使用。本次全部工作由单一会话直接完成，未调用 Task/子代理、未使用 Codex/muse/其他模型 API。

## 交付物

`tasks/rainy-konbini-diorama/solution/`：Vite + Three.js（`three@0.180.0`）程序化微缩场景，无外部模型/贴图资源，无 UI 元素（全屏 canvas + 隐藏光标样式除外）。

- 第三人称 OrbitControls：拖拽旋转 / 滚轮缩放 / 阻尼；`enablePan=false`，距离 9–46，极角上限 1.45°（不会钻到底座下）。
- 初始化路径：`GET /` → 模块脚本构建场景 → 首帧渲染后置 `window.__dioramaReady=true`；运行时状态 `window.__doorOpen`（0–1）；异常置 `window.__dioramaError`。
- 运行：`npm run dev`（5173）/ `npm run preview`（4173，服务 `dist/`）；构建：`npm run build`。

## 实际执行命令及结果

1. `npm install --no-audit --no-fund` → 成功，16 packages，约 4s。
2. `npm run build` → 成功：`dist/assets/index-*.js 544KB（gzip 137KB）`，`tsc` 类型检查外（无 TS），vite 8.3.8。
3. `npm run preview` → `http://localhost:4173/`，preview server 全程稳定。
4. 浏览器验收（Headless Chromium 1254，SwiftShader，视口 1440×900，`page.mouse` 拖拽 + 滚轮 + 等待）：
   - `window.__dioramaReady=true` 约 1–3s 内成立；`window.__dioramaError=null`。
   - 首轮：1 条 console error（favicon 404），已修（`index.html` 加 `<link rel="icon" href="data:,">`）；复验 `CONSOLE_ERRORS=[]`。
   - 截图：初视（完整方形底座可读、街角/招牌/斑马线/护栏/贩卖机/自行车/伞架可辨）、拖拽后（视角变化、信号灯红灯）、缩放后（店内货架/关东煮/收银台/玻璃水痕/雨丝可辨）、延迟帧（信号灯转绿灯）。
   - 自动门：`__doorOpen` 2s 采样 16s → `[0,0,0,0,1,0.42,0,0]`，`DOOR_MOVED=true`（8s 周期；dt clamp 0.1，保证低帧率下仍推进）。
   - 动效：降雨 1400 点、屋檐滴水 60 点、26 环涟漪、70 玻璃水痕点、关东煮蒸汽、招牌 flicker、信号灯 绿6s/黄1.5s/红6s、路面霓虹反射呼吸。
5. 修复记录：中途一次多行编辑行号错位导致 `main.js` 重复声明，`grep` 定位后删除重复 lights 块，`vite build` 通过 + 浏览器复验通过。

## 浏览器环境

- 验收：Playwright-core 驱动 Chromium 1254（`ms-playwright/chromium-1254/chrome-win64/chrome.exe`，`--use-gl=angle --use-angle=swiftshader`），Windows，1440×900。
- 真机预期：60fps 下降雨/自动门/信号灯按 wall-clock 实时推进（headless 低帧率下 dt clamp 会等比放慢，属保护性限幅）。

## 限制与已知问题

- 反射为廉价假反射（高光路面 + additive 霓虹光斑 + 涟漪环），非平面反射；近看无真实镜像。
- 雨丝为 Points 竖线 + 风偏，无飞溅粒子；玻璃水痕为点状，非条纹流淌。
- 和室远景/底座外无任何场景（纯色夜空 + 星 + 月），属有意为之的微缩悬浮感。
- `dist/` 体积 544KB（three 全量），gzip 137KB，可接受，未做分包。

## 清理状态

- 已停止 preview server（taskkill），已删除 `solution/dist/`、`solution/node_modules/`、临时验证工程（含其 node_modules）与一次性脚本。
- 验收截图保留在 `solution/.evidence/`（`shot-initial/orbit/zoom/late.png`），该目录被 `solution/.gitignore` 忽略，不随 commit 提交。
- `git status` 仅 `tasks/rainy-konbini-diorama/solution/` 下 6 个源码文件为新增/修改：`package.json`、`vite.config.js`、`index.html`、`src/style.css`、`src/main.js`、`RESULTS.md`（+ `.gitignore`）。
