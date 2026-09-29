# 独立完成 gargantua-schwarzschild-raytracer @ glm-5.3-flash

## 背景（已勘察确认）
- 隔离克隆已存在于 `.runs/gargantua-schwarzschild-raytracer/glm-5.3-flash/`，detached HEAD 于固定基线 `8409ab9`（与主仓 main 一致），无 remote，符合 README 工作流。
- 任务：在克隆内 `tasks/gargantua-schwarzschild-raytracer/solution/` 从零构建 React+Vite+本地 Three.js 的 Schwarzschild 黑洞光线追踪网站，然后按 AGENTS.md 完成验证、提交、打 tag、导入任务分支。
- candidate-id 定为 `glm-5.3-flash`（与迁移记录中"模型标识即 id"的惯例一致）；tag：`candidate/gargantua-schwarzschild-raytracer/glm-5.3-flash`。

## 技术方案
**栈**：React 18.3 + Vite 5 + three（精确版本锁定，计划 pin 0.170.0，npm install 后视 node 版本调整）。`vite.config.js` 中将 `three` alias 到 `vendor/three.module.js`，源码与 vendored addons 共用同一模块实例。

**vendor/**（从 npm 包复制，保持上游目录结构，不改动文件内容）：`three.module.js` + `three.core.js`（若该版本需要）、`addons/controls/OrbitControls.js`、`addons/postprocessing/{EffectComposer,Pass,MaskPass,RenderPass,ShaderPass,UnrealBloomPass}.js`、`addons/shaders/{CopyShader,LuminosityHighPassShader}.js`；`vendor/README.md` 记录版本、来源 URL、MIT 许可证。`package-lock.json` 提交。

**渲染管线**：全屏 triangle + `ShaderMaterial(GLSL3)` 主 fragment shader；渲染到 HalfFloat RT → UnrealBloomPass → 自定义合成 pass（ACES tone mapping + 暗角 + 胶片颗粒 + 色散，debug≠0 时旁路）。renderer.toneMapping = NoToneMapping，ACES 在自己的 pass 内显式实现。

**物理核心**（GLSL，命名函数+注释说明坐标/状态/步进/终止）：
- 光子平面基 {A,B,n}，Binet 方程 `u''(φ) = -u + 1.5·rs·u²`（Schwarzschild 零测地线的等价坐标形式，注释给出推导来源），RK4 数值积分，自适应 dφ。
- 终止：u → 视界（r<rs 深黑，记终止类型）、u → 远场逃逸（采样程序化星空/银河背景）、最大步数（视作捕获）。
- 吸积盘：积分路径上监测赤道面符号翻转，每次穿越按路径顺序 alpha 合成（≥1、2 阶像）；穿越点沿盘半厚度 Gaussian 子采样（体柱积分），温度 T(r)∝r^-3/4 黑体配色；Doppler（局域轨道速度 β=sqrt(rs/2(r-rs))，倍率可调）× 引力红移 g·sqrt((1-rs/r_em)/(1-rs/r_cam))，强度 g³ 增束；fbm 湍流在差速旋转坐标 (r, φ−ω(r)t) 中随时间演化。
- 背景：多层 hash 星场 + 倾斜银河带 fbm，全部经积分后的逃逸方向采样（天然被透镜）。

**交互/HUD**：OrbitControls 的 position/朝向/FOV 每帧传入 uniforms；4 个预设（Shift+1..4+点击）；Space 电影镜头播放/暂停（手动拖拽即暂停、不抢控制权）；21+ 参数滑杆（任务列出的 21 项全含），全部真实生效；0–9 调试视图（0 合成、1 步进/终止、2 视界掩码、3 盘交点阶次、4 红移/Doppler、5 背景透镜坐标、6 星空/银河、7 后处理前 HDR、8 盘温度场、9 亮度/bright-pass）；H/R/Q 快捷键；质量三档真实改预算（renderScale、maxSteps、盘采样数、dφ、bloom 分辨率）；HUD 可折叠，移动端抽屉；版本化 localStorage（URL 参数 > 持久化 > 默认）+ 重置。

**URL 契约**：`?capture=1&quality=&preset=&debug=&hud=&time=` 解析+非法回退；capture 冻结时间、关循环与音频；就绪后设 `dataset.gargantuaReady="true"` 并暴露 `window.__GARGANTUA__{ready,getState,setQuality,setPreset,setDebug,setTime}`（校验输入、不抛异常）。

**健壮性**：resize/devicePixelRatio/Retina 正确处理；`webglcontextlost` preventDefault+暂停+提示，`webglcontextrestored` 重建 renderer/composer/资源并恢复持久化状态继续渲染。

## 执行步骤
1. 环境检查（node/npm 版本，必要时调整依赖版本）。
2. 脚手架 + npm install + vendor 复制 + vendor/README.md + solution/README.md（完整命令）。
3. 依上述方案实现全部源码（src/：engine/、ui/、main.jsx、App.jsx）。
4. `npm run build` 生产构建，`npx vite preview` 静态服务。
5. **视觉验收（本人执行，不用子代理）**：用 control-browser 技能开浏览器，桌面 1440×900 与移动 390×844@DPR2；检查基础画面、控制台零错误；逐个预设/调试视图/质量档/快捷键/滑杆截图检查；capture URL 矩阵抽查（含非法值回退）；验证 `gargantuaReady` 与 `__GARGANTUA__` API；`WEBGL_lose_context` 触发丢失/恢复验证；持久化重载与重置验证。截图逐张自行查看验收，发现问题即修复重建重验。
6. 写 `solution/RESULTS.md`：完整模型标识（GLM-5.3-Flash）、基线 SHA 8409ab9…、实际执行的命令与退出结果、浏览器验收记录、已知限制；确认无残留 dev server。
7. 克隆内提交（feat 实现提交 + docs 结果报告提交），打 tag `candidate/gargantua-schwarzschild-raytracer/glm-5.3-flash`。
8. 主仓导入：fetch 候选提交 → 主仓打同一 tag 并核对 → `.worktrees/` 建任务分支工作树 → 将 `solution/` 树原样导入 `tasks/gargantua-schwarzschild-raytracer/solutions/glm-5.3-flash/` → 校验源/目标 git tree hash 一致 → 更新任务分支上的 `migration/2026-09-28.json` → 提交任务分支（不 push、不部署 gallery）。

## 边界
- 不修改 task.md/README.md/共享输入；不使用子代理/其他模型；不 push 远端、不发布 Cloudflare gallery（如需发布请另行指示）。
- 验证结论只记录实际执行并观察到的结果；若 WebGL 上下文恢复在环境不可测，如实记录限制。