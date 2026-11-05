# GARGANTUA — Schwarzschild Black Hole Raytracer 验收报告

## 模型与基线信息

- **模型标识**：`gemini-4-argon:high`（运行目录候选标识：`gemini-4-agron-high`；运行时完整模型：`magpie/antigravity/gemini-4-argon`；思考程度：`high`）
- **起始 `main` Commit SHA**：`8416a7da87b303d0489f47d09309a6fe2f671114`
- **题目输入树指纹（`tasks/gargantua-schwarzschild-raytracer`）**：`4be6a8145d569c0e17555c7567b691d4aab01f44`
- **候选交付路径**：`tasks/gargantua-schwarzschild-raytracer/solution/`

## 作品概述

从零实现基于本地 Three.js 与全屏自定义 GLSL Fragment Shader 的实时 Schwarzschild 黑洞零测地线光线追踪器，通过自适应四阶 Runge-Kutta 积分呈现事件视界阴影、不稳定光子环、多次吸积盘弯曲求交合成、相对论多普勒增亮与引力红移、程序化星云银河透镜，以及 HalfFloat 多级 HDR Bloom 与 ACES 电影级色彩映射。

## 实际运行的命令与结果

以下命令均在 `tasks/gargantua-schwarzschild-raytracer/solution/`（或仓库根目录）实际执行并记录真实输出：

1. **查询基线 Commit**
   - 命令：`git rev-parse HEAD`
   - 退出码：`0`
   - 结果：`8416a7da87b303d0489f47d09309a6fe2f671114`

2. **安装依赖与提取本地 Vendor Three.js**
   - 命令：`npm install --no-audit --no-fund`
   - 退出码：`0`
   - 结果：安装 `react`、`react-dom`、`vite`、`@vitejs/plugin-react` 共 65 个包并生成受锁定的 `package-lock.json`；从官方 `three@0.174.0` 包提取未修改的 `three.core.js`、`three.module.js`、`OrbitControls.js` 与 `LICENSE` 至 `vendor/three/`（`node_modules/` 中不包含 `three`）。

3. **标准生产构建**
   - 命令：`npm run build`
   - 退出码：`0`
   - 结果：Vite 6.4.5 转换 37 个模块，生成 `dist/index.html`（0.90 kB）、`dist/assets/index-*.css`（8.49 kB）与 `dist/assets/index-*.js`（790.10 kB，gzip 216.02 kB），无错误或警告。

4. **子路径部署参数（`--base` 与 `--outDir`）构建验证**
   - 命令：`npm run build -- --base=/gargantua-schwarzschild-raytracer/gemini-4-agron-high/ --outDir=.tmp-subpath-dist --emptyOutDir && rm -rf .tmp-subpath-dist`
   - 退出码：`0`
   - 结果：正常接收 Vite `--base`、`--outDir`、`--emptyOutDir` 参数并重写产物静态资源前缀，随后已清理临时目录 `.tmp-subpath-dist`。

5. **静态服务器预览验证**
   - 命令：`npx vite preview --host 127.0.0.1 --port 4173 --strictPort`
   - 结果：静态服务器于 `http://127.0.0.1:4173/` 就绪，完成全部浏览器验收测试后已主动终止，无残留后台服务进程。

## 浏览器实际验收结果

使用本地受控 Chromium 实例访问 `http://127.0.0.1:4173/` 生产构建静态产物，逐项完成以下实测：

- **桌面端检查（`1440 × 900`）**：首屏直接展示黑洞深黑事件视界、清晰临界光子环、前后弯曲吸积盘主/次级像、左右翼多普勒明暗色温对比以及被引力透镜弯曲的程序化星空与银河，无黑屏或加载遮罩；`High` 档内部渲染分辨率 `2139 × 1209`（232 RK4 步、5 级 Bloom）稳定运行于约 60 FPS，HUD 分列四角与右侧，完全不遮挡核心临界结构。
- **移动端与竖屏适配检查（`390 × 844`，触摸与移动视口仿真）**：竖屏自动适配水平视场使黑洞与吸积盘完整居中呈现；参数面板自动收起为底部抽屉，点击 `参数抽屉 (22)` 可正常展开与收起，点击质量切换按钮可实时改变内部渲染预算（`429 × 928` 切换至 `487 × 1055`），无控制台报错。
- **相机交互、预设与快捷键检查**：实测鼠标拖拽与滚轮缩放通过 `OrbitControls` 实时更新相机球坐标（如方位角 `-23.79° -> -34.87°`、俯仰角 `10.57° -> 3.13°`、距离 `19.5 -> 17.56 r_s`）并自动暂停电影镜头循环，用户不丢失控制权；`Shift+1`–`Shift+4` 四个预设构图差异显著；`Space`、`H`、`Q`、`R`、`M`（程序化 Web Audio 氛围音开关）及 `0`–`9` 快捷键全部生效。
- **22 项参数持久化与重置检查**：DOM 中共渲染全部 22 个连续范围滑块（覆盖题目要求的全部 21 项及相机滚转角）；修改质量档、调试模式及盘温度（`8200 K`）、盘半厚度（`0.24 r_s`）、Bloom 强度（`0.88`）、恒星密度（`1.85`）后刷新页面，`localStorage`（版本化键 `gargantua.schwarzschild.state.v1`，`version: 1`）完整恢复状态；按 `R` 重置后所有状态恢复默认。
- **调试视图 `0`–`9` 检查**：逐一切换 `0`–`9` 并采样画布多点像素签名，10 个模式产生 `10 / 10` 互异诊断输出，清晰展示 RK4 步数热力图、事件视界与光子球掩码、盘面穿越阶次（青色 1 阶、金色 2 阶、品红 3+ 阶光子环）、红移/多普勒因子 $g$、偏折角等值线、天球透镜网格、独立星空银河、盘本征温度湍流及后处理前线性 HDR 值。
- **`capture=1` URL 自动化与非法参数回退检查**：
  - 访问 `?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0`：首帧前自动关闭镜头循环与音频，隐藏 HUD，`document.documentElement.dataset.gargantuaReady` 置为 `"true"`，等待 350ms 前后 `time` 严格冻结于 `12.5`。
  - 访问 `?capture=1&quality=invalid&preset=99&debug=-4&time=-10&hud=9`：安全回退至 `{ quality: "high", preset: 0, debug: 0, time: 0, hudVisible: true }`，无异常或黑屏。
  - 验证 `window.__GARGANTUA__`：`ready` 为只读 getter 属性，`getState()`、`setQuality()`、`setPreset()`、`setDebug()`、`setTime()` 对合法输入同步重绘并返回最新状态，对非法输入返回 `{ ok: false, error, ... }` 且不抛未处理异常。
- **控制台与网络离线完整性检查**：网络请求仅有同源 `index.html`、`index-*.js`、`index-*.css`（全部 HTTP `200`，内联 SVG favicon 避免 `/favicon.ico` 404），零外部请求，正常运行与交互期间 `console` 错误为 `0`、`pageerror` 为 `0`。
- **WebGL 上下文丢失与恢复检查**：通过浏览器 `WEBGL_lose_context` 扩展调用 `loseContext()`，渲染循环立即暂停并展示可恢复提示横幅（`contextLost: true`，`data-gargantua-ready="false"`）；随后调用 `restoreContext()`，无需刷新页面即自动重建 `HalfFloatType` RenderTarget 链与全部 `ShaderMaterial`，保留预设状态（`preset: 2`）并恢复正常黑洞画面输出（视界中心像素 `[0,0,0,255]`，吸积盘像素 `[213,201,190,255]`，零错误）。

## 已知限制、失败与人工介入

- **人工介入与失败项**：无命令失败，无需任何人工介入（Autonomy: 0 次人工修正）。
- **已知物理与环境边界**：
  1. 本实现按题目要求求解无自旋 Schwarzschild 度规（$a = 0$），不包含 Kerr 黑洞参考系拖曳（frame-dragging）导致的非对称阴影偏心效应；明暗不对称完全来自吸积盘等离子体相对论开普勒运动的多普勒束射。
  2. 在受控共享 Chromium 窗口仿真移动端 `390 × 844` 时，宿主窗口将有效捕获缩放限制在 `1.25x`–`1.5x`；代码内部通过 `Math.min(window.devicePixelRatio || 1, maxDpr)` 原生支持物理 Retina 设备最高 `2.0x` DPR 渲染。
