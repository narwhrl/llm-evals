# 结果报告 — gargantua-schwarzschild-raytracer / glm-5.3-flash

## 模型与基线

- 完整模型标识：`account:bigmodel-individual-coding-plan/GLM-5.3-Flash`（ZCode CLI 会话，candidate-id `glm-5.3-flash`）
- 起始 `main` commit SHA：`8409ab9ad67e2999707f475ee1e871ebe0f1c7b1`（克隆以 `git clone --no-local` 建立并 detach 到该 SHA，remote 已移除；`.git/logs/HEAD` 首条记录可复核）
- 实现路径：`tasks/gargantua-schwarzschild-raytracer/solution/`
- 人工介入：无。任务由模型一次会话独立完成；过程中未接受人工提示、纠正或重试指令。

## 实现概要

React 18.3.1 + Vite 5.4.11 + three 0.170.0（本地 `vendor/` ESM，精确锁定，见 `vendor/README.md`）。主画面由全屏三角形上的自定义 GLSL3 fragment shader 实时渲染：每像素对 Schwarzschild 零测地线的 Binet 形式 `u'' = -u + 1.5·rs·u²` 做 RK4 自适应积分（光子平面基 {A,B,n}，状态量 (u, du/dφ)，注释说明坐标/步进/终止条件），视界 r≤rs 终止保持深黑，逃逸光线采样程序化星空/银河背景（经透镜映射）。吸积盘沿积分后弯曲路径监测赤道面穿越，按路径顺序做体积合成（一阶/二阶及更高阶像），含 Shakura-Sunyaev 温度剖面、Doppler 增束（g³）、引力红移与差速旋转剪切湍流。HDR（HalfFloat RT）→ UnrealBloom → 自定义合成 pass（ACES filmic、暗角、胶片颗粒、径向色散）→ sRGB。

交互：OrbitControls 相机（position/朝向/FOV 每帧传入 shader uniforms）、4 预设（Shift+1–4）、可暂停电影镜头循环（Space，手动接管即暂停）、21 项参数滑杆（任务列出的全部 21 项，均真实生效）、0–9 调试视图、三档质量（真实改变内部渲染比例/最大步数/步长/盘采样数/Bloom 缓冲）、版本化 localStorage 持久化与重置、移动端抽屉 HUD。

## 实际执行的命令与结果

环境：Windows 11 (10.0.26200)，Git Bash，Node v24.21.0（fnm），npm 11.19.0，registry https://registry.npmjs.org/

| 命令 | 结果 |
| --- | --- |
| `npm install`（solution/ 内） | 退出码 0；生成 `package-lock.json`；esbuild postinstall 告警（`npm warn install-scripts`）为 npm 策略提示，不影响安装，二进制 `node_modules/.bin/esbuild --version` → 0.21.5 验证可用 |
| `npm run build`（= `vite build`） | 退出码 0；48 modules；输出 `dist/index.html` 0.67 kB、`dist/assets/index-*.css` 5.87 kB、`dist/assets/index-*.js` 681.25 kB (gzip 184 kB)。多次增量重建均成功 |
| `npm run preview`（= `vite preview --port 4173 --strictPort`） | 退出码 0（后台运行）；监听 `localhost:4173`（IPv6 `[::1]`）；`curl` 首页返回 200 |
| `curl http://[::1]:4173/` | 200，HTML 正常 |

## 浏览器验收（实际观察）

使用 ZCode 内嵌 Chromium（IAB）驱动真实页面，全部结论来自实际截图与页面内状态读取。视口：桌面 1440×900；移动 390×844。宿主显示缩放 125%，故 `devicePixelRatio = 1.25`（非整数 DPR 实测覆盖）。

### 画面完整性

- 加载即呈现完整场景：事件视界深黑、光子环贴附阴影边缘、吸积盘前向穿越与上下弯折的透镜像、下方次级像弧、被透镜弯曲的星空，全部来自同一 fragment shader（无任何网格/贴图/背景伪造物）。桌面 High 档约 44–60 fps；移动 Standard 档 61 fps。
- 预设 0–3（赤道全景/光子环近观/极向俯瞰/掠面飞行）逐一截图：四者构图、FOV、倾角明显不同，均保持临界结构可读。
- 调试视图 0–9 逐一截图：0 合成画面、1 步进/终止（步数梯度+视界红+临界环绕紫）、2 视界掩码、3 盘交点阶次（橙色一阶/蓝色二阶像弧，直接证明多次穿越）、4 多普勒/红移因子（蓝移侧与增亮侧一致）、5 背景透镜坐标（经纬网格在光子球附近重复环绕）、6 星空银河、7 HDR 预览、8 温度场（黑体色）、9 HDR 亮度图。彼此可辨认且有诊断意义。

### 交互与控制

- 键盘（CDP 可信按键，先点击画布使面板聚焦后发送）：`0`–`9` 切调试、`Shift+2` 切预设（相机补间到位，FOV 78/距离 8.5/俯仰 4 实测）、`Space` 循环播放/暂停（反复切换验证）、`H` HUD 显隐、`Q` 质量档循环、`R` 重置。注：内嵌面板在失焦状态下不向页面投递键盘事件（环境焦点模型），点击画布聚焦后投递正常。
- OrbitControls 拖拽（方位角 210°→268.5°）、滚轮缩放（8.5→6.5 rs）、移动端画布触摸拖拽（20°→40°）均实际改变 shader 视角；拖拽后电影循环自动暂停、预设标记清除（不失去控制权）。
- HUD 滑杆共 21 个（`input[type=range]` 计数验证）：点击 FOV 轨道 78°→40°、拖动相机距离至 38.3 rs，渲染随之变化；相机滑杆与 OrbitControls 双向同步。
- 质量档实测预算：standard (maxSteps 170 / dφ 0.062 / 盘采样 6 / 缓冲 792px)、high (300 / 0.050 / 10 / 1152px)、cinematic (440 / 0.042 / 14 / 1440px)。

### 持久化与重置

- 修改状态后 250ms 防抖写入 `localStorage["gargantua.state.v1"]`（记录 `version:1`）；刷新后 fov 40 / 距离 38.3 / standard / HUD 状态精确还原。
- `R` 重置：参数与质量/预设/调试/循环恢复默认，随后记录为默认快照；再次刷新仍为默认。

### URL 截图契约

- `?capture=1&quality=high&preset=0..3&debug=0..9&time=7|12.5&hud=0` 多组合实测：URL 值在首帧前应用（getState 核对 quality/preset/debug/time/hud），capture 冻结模拟时间、关闭循环。
- 非法值 `quality=banana&preset=99&debug=42&time=-5&hud=7`：全部安全回退（high/0/0/0/true），无异常、无黑屏，ready 正常。
- `document.documentElement.dataset.gargantuaReady` 在初始化同步首帧后立即置 `"true"`（含隐藏标签页场景，见"已知限制"）；`window.__GARGANTUA__` 暴露 `ready/getState/setQuality/setPreset/setDebug/setTime`；非法输入（`setQuality("ultra")`、`setQuality({})`、`setPreset(-2)`、`setPreset(1.5)`、`setDebug(99)`、`setTime(-1)`、`setTime("abc")`）一律返回 `null` 且不抛异常，状态不变。

### 控制台

- 全程（加载、全部交互回归、capture 矩阵抽查、非法 URL）挂接 `console.error/warn` 与 `window.onerror` 捕获：**零错误、零警告**。

### WebGL 上下文丢失/恢复

- 通过 `WEBGL_lose_context.loseContext()` 实测触发：`webglcontextlost` 被 preventDefault，渲染循环停止，页面显示"WebGL 上下文已丢失"可恢复提示，模拟时间等状态保留。
- `restoreContext()` 后：`webglcontextrestored` 重建 renderer/composer/程序/缓冲（内部缓冲恢复 1440px），循环自动恢复，状态（time=77.7、quality）无损，画面恢复渲染，全程无页面刷新。

## 已知限制与说明

1. **隐藏标签页与 rAF**：后台标签中 `requestAnimationFrame` 被浏览器暂停，持续渲染停止（帧画面保持最后一帧，fps 徽标为 0）。为此初始化时的首帧渲染是同步执行的，`gargantuaReady` 与首张画面不依赖 rAF；截图自动化在后台标签中也能拿到完整首帧。标签重新可见后渲染自动恢复。
2. **物理触摸/捏合**：本环境无法模拟真实多点触控。触摸验证以 CDP 指针路径拖拽替代（单指旋转生效）；OrbitControls 的双指缩放为库内建路径，未单独实测。宿主 DPR 为 1.25（非整数缩放，已专门修复并覆盖）；恰为 2.0 的 Retina 未直接测得，但 DPR 处理与整数化缓冲逻辑相同。
3. **氛围音乐**：未实现（任务允许可选项）。`M` 键无绑定，HUD 快捷键说明中不含 M；音频自动播放风险因此不存在。
4. 初始化同步首帧若遇 WebGL 不可用会捕获并显示错误提示（fail-secure），未实测禁用 WebGL 的场景。

## 交付状态

- 无残留 dev/preview 服务器（验收结束后已停止 vite preview 进程）。
- `solution/` 内不含 `node_modules/`、不含构建产物 `dist/`（均被 `.gitignore` 排除）；`vendor/` 为 three.js r170 ESM 构建与所需 addon，来源与许可证见 `vendor/README.md`；运行时无任何 CDN/远程资源请求（依赖仅 react/react-dom/three，three 经 alias 全部指向本地 vendor）。
- 未修改 `task.md`、`README.md`、共享任务输入或仓库其他文件。
