# RESULTS

## 模型与基线

- 模型标识：`hy4:high`
- 起始 `main` commit：`0f0501c504b94f8d8baed437de4bb894a3bb40ab`
  （在 run 仓库根执行 `git rev-parse HEAD` 实测；该 run 仓库为 detached HEAD，只有这一个 commit）
- 任务 ID：`gargantua-schwarzschild-raytracer`
- 交付路径：`tasks/gargantua-schwarzschild-raytracer/solution/`
- 环境：Windows 10 / Node.js v24.21.0 / npm 11.19.0 / Chrome（系统安装）+ SwiftShader 软件 WebGL

## 实际运行过的命令与结果

全部在 `solution/` 目录下执行，除特别标注外。

| 命令 | 结果 |
| --- | --- |
| `git rev-parse HEAD`（run 仓库根） | `0f0501c504b94f8d8baed437de4bb894a3bb40ab` |
| `npm install --no-audit --no-fund` | exit 0，`added 63 packages in 7s`；生成 `package-lock.json`（lockfileVersion 3，three 0.170.0 / react 18.3.1 / vite 5.4.11）。npm 11 提示 `esbuild postinstall` 未被 `allowScripts` 覆盖，不影响后续构建 |
| `npm run build` | exit 0，`✓ built in ~1.0–1.4s`，产出 `dist/index.html` + `dist/assets/*.js|css`。仅有 Vite 的 500 kB chunk 体积警告（单 chunk 660.58 kB，主要是本地 vendored Three.js r170），非错误 |
| `npm run build -- --base=/gargantua-schwarzschild-raytracer/hy4-high/ --outDir=<绝对路径> --emptyOutDir` | exit 0；产物 `index.html` 的 `script`/`link` 均带 `/gargantua-schwarzschild-raytracer/hy4-high/assets/...` 前缀 |
| `npm ci --no-audit --no-fund` | exit 0，`added 63 packages in 6s` |
| `npm run build`（`npm ci` 之后重跑） | exit 0，`✓ built in 1.16s` |
| `sha256sum vendor/* node_modules/three/...` | `three.module.js` 与 `OrbitControls.js` 的 vendor 副本与 `three@0.170.0` 安装文件哈希完全一致 |
| `node static-server.mjs 8080 ../../.buildcheck` | 静态服务器启动成功，以子路径 `/gargantua-schwarzschild-raytracer/hy4-high/` 提供 `--base` 构建产物 |
| `node static-server.mjs 8081 dist` | 静态服务器启动成功，以根路径 `/` 提供默认 `dist/` |
| `node probe.mjs` / `node check.mjs`（临时 Playwright 验收脚本，位于 `tasks/.verify/`，验证后已删除） | 首轮用于定位问题；修复后复测 `CHECK_EXIT=0`、`PROBLEMS: (none)` |

未运行：`npm run dev`、`npm run preview`（验收只走生产构建 + 静态服务器路径，因此没有启动或遗留 dev server）。

## 浏览器验收结果（最终复测）

验收用 `playwright-core` 驱动系统 Chrome headless（`--use-angle=swiftshader`），脚本对 `console.error/warning`、`pageerror`、`requestfailed` 全程监听并汇总为 `PROBLEMS`。截图通过页面内 `Image`+2D canvas 解码统计亮度（`litRatio` 非黑像素比例、`mean` 平均亮度、`centerLitRatio` 中心区域非黑比例）。

**桌面 1440 × 900，deviceScaleFactor 1，基 URL 无参数**
- `document.documentElement.dataset.gargantuaReady = "true"`；`window.__GARGANTUA__` 存在，含只读 `ready` 与 `getState/setQuality/setPreset/setDebug/setTime` 五个方法。
- 默认状态 `quality=high, debug=0, preset=0, hudOpen=true, playing=true`；21 个 `input[type=range]` 控件。
- 截图非黑屏：`litRatio 0.9386`、`mean 65.56`、`max 724`、`centerLitRatio 0.8425`。画面可直接看到深黑事件视界、清晰光子环、被引力透镜弯曲的上下盘面（多次穿越的高阶像）、Doppler 不对称、程序化星空与银河。
- `Space` 暂停生效；鼠标拖拽使 `cameraAzimuth`/`cameraElevation` 改变，滚轮使 `cameraDistance` 改变（相机状态真实反馈到 shader 观察射线）。

**预设 / 质量 / 调试**
- `Shift+1`–`Shift+4` 四个预设全部生效，FOV 分别 55/60/50/72、距离 14/11/16/24，截图 `mean` 分别 56.4 / 71.15 / 62.98 / 54.87（视觉差异明显）。
- `setQuality('standard'|'high'|'cinematic')` 三档 `applied=true`。
- `0`–`9` 十个调试视图全部 `applied=true`，十个视图的 `mean` 两两不同（`debugDistinctMeans = 10`），覆盖步进/终止、视界掩码、盘面交点阶次、红移/Doppler、透镜背景坐标、星空/银河、后处理前 HDR、偏折角、光子环临界度。

**参数 / 持久化 / 重置 / API 校验**
- 修改 `diskOuter` 11 → 18 后 `getState()` 反映变化；`page.reload()` 后仍为 18（`localStorage` 版本化持久化生效）；按 `R` 后回到 11、`quality=high`、`debug=0`。
- 非法输入 `setQuality('ultra')`、`setPreset(999)`、`setDebug(999)`、`setTime(-1)` 四个方法均返回 `{ok:false, state}` 且不抛异常；合法 `setTime(3.5)` 返回 `time=3.5`。

**capture=1 URL 矩阵**
- `?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0`：`ready=true`、`dataset=true`、`time=12.5`、`quality=high`、`hudOpen=false`、`playing=false`、HUD 面板数 0，截图 `litRatio 0.8869`、`centerLitRatio 0.871`。
- `preset=0..3` 各一条、`debug=0..9` 各一条，均 ready 且截图非黑。
- 非法查询 `?capture=1&quality=ultra&preset=99&debug=42&hud=9&time=-5` 安全回退到 `high/0/0/hudOpen=true/time=0`，无异常、无黑屏（截图 `litRatio 0.912`）。

**移动端 390 × 844，deviceScaleFactor 2**
- `ready=true`，2 个 HUD 面板可用，viewport 390×844 / dpr 2，截图 `litRatio 0.903`、`centerLitRatio 0.7159`；在未被 HUD 遮挡的画布区域拖拽使 `cameraAzimuth` 改变。

**WebGL 上下文恢复**
- `WEBGL_lose_context` 扩展可用；`loseContext()` 后出现 `.overlay` 可恢复提示（count 1）；`restoreContext()` 后 overlay 消失，`time=8`、`quality`、`diskOuter` 等状态保留，画面恢复（截图 `litRatio 0.8889`、`centerLitRatio 0.8688`），未刷新页面。

**默认 dist 静态根路径**
- `http://127.0.0.1:8081/`（无 `--base`）ready，截图 `litRatio 0.9481`、`centerLitRatio 0.8342`。

**控制台**：最终复测 `PROBLEMS: (none)` —— 无 console error/warning、无 pageerror、无 requestfailed。

## 调试过程中发现并修复的问题

- 首轮探测：缺少 favicon 导致 404；共享 uniform 字典中的 `uBloom` 在 prefilter/blur pass 被绑定到当前 framebuffer 的纹理，产生 `GL_INVALID_OPERATION: Feedback loop formed between Framebuffer and active Texture`。修复：加内联 favicon；bloom pass 前把 `uBloom` 指向 `rtScene.texture`。
- 首轮全量验收：context 恢复时对已失效的旧 GPU 对象调用 `dispose()` 产生 `INVALID_OPERATION: delete/deleteVertexArray` 警告。修复：`rebuild()` 直接覆盖旧引用、新建 GPU 资源，不再对失效对象 dispose。
- 验收脚本自身两处误判（给 `setTime` 传了合法的 `999`、移动端拖拽点落在 HUD 面板上），已修正后复测通过。

## 已知限制与需要人工介入

- 浏览器验收在 headless Chrome + **SwiftShader 软件 WebGL** 下完成，不是真实 GPU；`WEBGL_lose_context` 由扩展模拟，非真实驱动丢失。Retina 由 `deviceScaleFactor=2` 模拟，未使用真实移动设备；触摸用 pointer/mouse 事件模拟，未在真机上验证双指手势。
- 软件渲染下 High/Cinematic 在 1440×900 每帧需数秒，因此交互矩阵在切到 Standard 档后执行；**默认 High 的首帧已在 1440×900 单独截图验证通过**。真实 GPU 环境无此性能限制。
- 可选氛围音默认关闭、仅在用户按 `M` 后创建 AudioContext（无自动播放错误）；headless 环境无音频输出，未实际听音验证。
- 未运行 `npm run dev` / `npm run preview`；未留下任何 dev server。验收结束后 8080/8081 静态服务器、所有 Playwright 浏览器页面均已关闭，临时目录 `tasks/.verify/`、`tasks/.buildcheck/` 已删除。
- **无阻塞性失败，无需人工介入的必做项。** 若需在真实 GPU 上确认 High/Cinematic 的交互帧率、真机触摸或音频输出，可在桌面/移动浏览器打开构建产物人工检查。
