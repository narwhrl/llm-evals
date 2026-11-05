# RESULTS — GARGANTUA Schwarzschild Black Hole Raytracer

## 候选信息

- 完整模型标识：`magpie/workbuddy/hy4free:high`
- 起始 `main` commit SHA：`8416a7da87b303d0489f47d09309a6fe2f671114`
- 交付路径：`tasks/gargantua-schwarzschild-raytracer/solution/`
- 评测仓库为隔离运行目录（单 commit、无历史、无分支/tag/remote）；未读取其它候选、未联网查找实现、未启动子代理、未修改 `task.md`、`README.md`（任务共享）、`AGENTS.md` 或任何共享文件。
- 环境：Windows 10.0.26200 x64，Node `v24.21.0`，npm `11.19.0`，Git Bash；浏览器为 omp eval `browser` 驱动的 headless Chromium + SwiftShader（`--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader --enable-webgl`）。`EXT_color_buffer_float` 可用，`WEBGL_lose_context` 可用。

## 实际执行的命令与结果

| 命令 | 结果 |
| --- | --- |
| `npm install --no-audit --no-fund` | exit 0，`added 64 packages in 6s`；生成 `package-lock.json`（56.2 KB）。npm 11 提示 `esbuild` postinstall 未执行，`node -e "require('esbuild')"` 返回 `esbuild 0.21.5 / function`，后续构建可用。 |
| `npm run build`（首次） | **exit 1**：`src/shaders.js (113:51): Expected a semicolon`。原因：GLSL 注释中的反引号提前结束了 JS 模板字符串。已修正注释后重建。 |
| `npm run build`（修正后，多次） | exit 0，`✓ built in 853ms / 943ms / 912ms / 916ms`；产物 `dist/index.html` + `dist/assets/index-BO6u4QXj.css` + `dist/assets/index-Dt25GFSr.js`（约 658 KB，gzip 178 KB）。Vite 给出单 chunk > 500 kB 的提示性警告，不影响运行。 |
| `npm run build -- --base=/gargantua/ --outDir=dist-base` | exit 0；`dist-base/index.html` 引用 `/gargantua/assets/index-Dt25GFSr.js`、`/gargantua/assets/index-BO6u4QXj.css`。 |
| `npx vite preview --host 127.0.0.1 --port 4173 --strictPort --outDir dist --base /` | Git Bash/MSYS 将空格形式的 `--base /` 转换为 `C:/Program Files/Git/`，服务器把 `/` 重定向到 `/Program%20Files/Git/`，资源 404。已停掉并改用不带 `--base` 的命令；带 base 的场景改用 `--base=/...`（等号形式）并加 `MSYS_NO_PATHCONV=1`。此为 shell 参数转换问题，非项目代码问题。 |
| `npm run dev -- --host 127.0.0.1 --port 5173 --strictPort` | 服务就绪；浏览器访问 `http://127.0.0.1:5173/` 得到 `dataset.gargantuaReady = "true"`、1 个 canvas、`window.__GARGANTUA__` 为 object、无 console/page error。 |
| `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort` | 服务 `dist/`，浏览器访问 `http://127.0.0.1:4173/` 得到 `ready=true`、API 存在、无错误。 |
| `MSYS_NO_PATHCONV=1 npm run preview -- --host 127.0.0.1 --port 4174 --strictPort --outDir dist-base --base=/gargantua/` | 服务 `dist-base/` 于 `/gargantua/`；浏览器访问 `http://127.0.0.1:4174/gargantua/` 得到 `ready=true`，加载 `/gargantua/assets/index-Dt25GFSr.js`，无错误。 |

生产构建与静态服务器路径均已实际运行并在浏览器中验证。`dist/`、`dist-base/`、`node_modules/` 由 `solution/.gitignore` 排除；`package-lock.json` 与 `vendor/` 随候选提交。

## 浏览器验收结果

验证在 headless Chromium 中完成。桌面实际视口 `1426 × 806`、DPR `1.5`、canvas 绘制缓冲 `2139 × 1209`；`browser.open` 的 `viewport` 参数在该共享浏览器上未生效，因此未能精确复现评测规定的 `1440 × 900`。移动端通过 `tab.emulate` 得到 `390 × 844`，DPR 被工具限制为 `1.25`（请求 2），canvas 缓冲 `487 × 1054`；应用按 `min(devicePixelRatio, 质量档上限)` 处理 DPR，resize 后缓冲随之改变。

- **首屏与就绪**：基础 URL 打开后 `document.documentElement.dataset.gargantuaReady = "true"`，`window.__GARGANTUA__` 为 object，DOM 中 1 个 `<canvas>`，无加载遮罩、无黑屏；`gl.getError()` 为 `0`。视觉确认（JPEG 与无损 PNG 截图）可见完整黑洞全貌：深黑事件视界、清晰光子环、前后盘面、被引力透镜弯曲成同心弧的银河带、程序化恒星、Doppler 造成的左右亮度差与高阶盘面像。
- **控制台错误**：所有检查批次 `tab.console()` 为空或仅含信息性 `THREE.WebGLRenderer: Context Lost. / Context Restored.`（level `log`）；`tab.errors()` 均为空数组。无未处理异常、无资源 404（除上述已修正的 `--base /` 事故）。
- **capture=1 URL**：`?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0` → `ready=true`、`api.ready=true`，状态为 `quality=high, preset=0, debug=0, hud=false, playing=false, time=12.5, frozen=true`。间隔 1.2 s 的两张 JPEG 截图字节完全一致（859035 bytes，sha256 前缀 `477f837acb5a8fd7`），证明镜头循环与非确定性推进已关闭。
- **非法 URL 回退**：`?capture=1&quality=bogus&preset=99&debug=42&hud=x&time=-5` → `ready=true`，状态回退为默认 `quality=high, preset=0, debug=0, hud=true, time=0, frozen=true`，无异常、无黑屏。
- **`window.__GARGANTUA__`**：`getState()` 返回含 `version/ready/quality/preset/debug/hud/playing/params/time/frozen/contextLost` 的快照。`setQuality('bogus')`、`setPreset(9)`、`setDebug(42)`、`setTime(-1)`、`setTime('abc')`、`setTime(Infinity)` 均返回 `{ok:false,error:...}` 且不抛异常；合法调用返回更新后的状态。只读 `ready` 被赋值后仍为 `true`。
- **调试视图 0–9**：在固定帧 `?capture=1&...&time=7.5&hud=0` 上逐个 `setDebug(0..9)` 截图，10 张 JPEG 的 sha256 前缀互不相同（`3f80fac9…` / `37506b80…` / `6672fe0c…` / `e9a23571…` / `d65b0dfb…` / `91822d71…` / `f91fa018…` / `15705c5d…` / `85b3ff44…` / `66435ed6…`）。抽样目视：`2` 为灰色视界掩码 + 青色临界环；`3` 用绿/青区分首级/次级盘面穿越；`4` 用红/蓝区分净红移/蓝移；`6` 为纯程序化透镜星空；`9` 为仅盘面多次像。HUD 状态条显示当前编号与中文说明。
- **视角预设**：`setPreset(0..3)` 分别得到 `distance/elevation/fov = 16/9/55`、`19/72/58`、`8.5/19/68`、`30/34/82`，四张截图 hash 互异。
- **质量档**：`standard / high / cinematic` 三张截图 hash 互异（`af9ffad2…` / `de067729…` / `0bb96622…`）；源码中三档的内部渲染比例、最大步数、dφ、盘噪声八度、Bloom 模糊迭代、DPR 上限均不同。
- **OrbitControls 与相机**：拖拽使 `azimuth/elevation` 由 `-40/19` 变为 `-4.65/37.85`，滚轮缩放使 `distance` 由 `8.5` 变为 `6.85`；拖拽前 `playing=true`、拖拽后 `playing=false`（手动控制后电影镜头让出控制权）。相机位置/朝向/FOV 每帧作为 uniform 传入 shader，预设与参数变化均改变渲染画面。
- **21 项参数控件**：DOM 中 `input[type=range]` 数量为 21。在 `hud=0` 的冻结帧上逐项设为最大值并复位，20 项使渲染画面 hash 改变；`timeScale` 为时域控件，冻结帧不变，另以非冻结页面测量 2 s 内 `getState().time` 增量：`timeScale=0 → 0`，`timeScale=4 → 7.93`，证明该项真实生效。所有控件均非装饰性。
- **持久化与重置**：`localStorage` 键 `gargantua.state.v2`，`version: 2`。把 FOV 改为 77 并 reload 后 `fov=77`、`quality`、`distance` 保持；`debug=3, preset=2, hud=false, quality=cinematic` reload 后完全一致；按 `R` 后恢复 `fov=55, quality=high, preset=0, debug=0, hud=true, distance=16`。
- **快捷键**：`Space` 切换播放、`5` 切到调试 5、`Shift+3` 切到预设 2、`H` 切 HUD、`Q` 切质量档，均真实改变 `getState()`。HUD 内列出 `0–9`、`Shift+1…4`、`Space`、`H`、`R`、`Q` 与触摸/滚轮提示。
- **resize / Retina**：视口从 `1426×806` 改为 `1100×700` 后 canvas 绘制缓冲由 `2139×1209` 变为 `1374×874`，无错误。
- **移动端**：`390×844` 下默认 HUD 收起（`hud=false`）、状态条可见、FAB 显示「显示 HUD」；点击 FAB 打开底部抽屉（`390×490`），含 21 个滑块，无错误。移动端全屏画面可直接看到黑洞与盘面。
- **WebGL 上下文恢复**：`WEBGL_lose_context` 可用。`loseContext()` 后显示「WebGL 上下文已丢失」可恢复提示，`getState().contextLost=true`，`dataset.gargantuaReady` 仍为 `true`，`version=2` 保留；`restoreContext()` 后提示消失、`contextLost=false`、`quality=high / debug=0` 保持、完整画面恢复、无 console error。恢复瞬间 `gl.getError()` 曾返回一次 `1282 (GL_INVALID_OPERATION)`，随后连续三次 `getError()` 均为 `0`，判定为恢复过程中的瞬态错误。控制台仅有 Three.js 的信息性 Context Lost / Context Restored 日志。
- **开发过程中定位并修正的渲染缺陷**（均有修复前后截图证据）：① GLSL 中 `pow(负数, 2.0)` 未定义行为导致银河亮度异常；② 逃逸终止使用离散步数上的 φ 使天球方向量化，产生硬边同心环/方格；改为解析渐近外推 `φ += b·u` 后消失；③ 复合 shader 颗粒哈希在大坐标下量化；换成 Hoskins 哈希并降低坐标量级。最终无损 PNG 截图背景平滑无硬边块。

## 已知限制 / 失败

- 首次 `npm run build` 因模板字符串语法错误失败一次，已修正；其后所有构建成功。
- `--base /`（空格形式）在 Git Bash 下被路径转换破坏，已改用 `--base=/...` 并在需要时加 `MSYS_NO_PATHCONV=1`；最终交付命令已验证可用。
- headless 工具的 `viewport` 参数在共享浏览器上未生效：桌面实际为 `1426×806 / DPR 1.5`，移动端 DPR 被限制为 `1.25`（未能达到评测规定的 `1440×900` 与 `390×844 DPR 2`）。这是验证环境限制，不是代码缺陷；应用按 `min(devicePixelRatio, 质量档上限)` 正确处理 DPR 与 resize。
- 上下文恢复瞬间出现一次瞬态 `GL_INVALID_OPERATION`，随后清除；未观察到持续错误或渲染失败。
- 高阶光子环像受质量档步数预算限制；预算内无法逃逸的近临界光线按捕获处理。
- 未实现可选氛围音乐，因此没有 `M` 快捷键（任务允许音频为可选项）。
- Vite 提示单 chunk > 500 kB（Three.js 被 vendor 进同一 bundle），属提示性警告。
- 软件 WebGL（SwiftShader）下 Cinematic 档较慢；低性能设备建议 Standard。

## 所需人工介入

- 无需人工介入即可 `npm install` / `npm run build` / 静态预览。
- 建议 curator 在评测规定的 `1440×900`（DPR 1）与 `390×844`（DPR 2）配置文件下做最终视觉复核；本环境无法精确复现这两个 DPR/视口组合。
- 按仓库规则由 curator 负责为候选提交打 `candidate/<task-id>/<candidate-id>` tag 并把 `solution/` 树导入 `llm/<task-id>`，本运行不创建 tag、不改动 `main`。

## 交付

`git add tasks/gargantua-schwarzschild-raytracer/solution` 后以 `feat:` 开头提交一次；提交后确认 `solution/` 无未提交改动。所有 dev / preview 服务与浏览器页面在交付前关闭。
