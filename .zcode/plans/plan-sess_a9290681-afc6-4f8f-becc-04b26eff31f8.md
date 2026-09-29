## 目标
在隔离克隆 `.runs/gargantua-schwarzschild-raytracer/opus-5.5`（detached @ `8409ab9ad67e2999707f475ee1e871ebe0f1c7b1`，即当前 main）的 `tasks/gargantua-schwarzschild-raytracer/solution/` 完成 task.md 全部要求，用 kimi-webbridge 在真实浏览器中自行视觉验收，提交候选 commit，再按 AGENTS.md 打 tag 并导入 `llm/gargantua-schwarzschild-raytracer`。全程不用子代理、不用其他模型，不读取其他候选。

## 0. 核对现有脚手架
- 已有：package.json（react/react-dom 19.3.0，vite 8.3.1，@vitejs/plugin-react 6.1.1，精确版本）、package-lock.json、node_modules、vendor/three（r186：three.module.js、three.core.js、addons/controls/OrbitControls.js、LICENSE，来自 `%TEMP%/gargantua-three-vendor/three-0.186.0.tgz`）。
- 确认 clone 无 origin、HEAD 为基线 SHA、`git status` 只有 solution/ 新文件，且 .gitignore 已覆盖 node_modules/dist。
- 验证 vendor 来源：本地 tgz 的 sha512 与 `npm view three@0.186.0 dist.integrity` 对比；逐文件 `cmp` vendor 与 tgz 内对应文件。OrbitControls 里的 `from 'three'` 通过 Vite `resolve.alias` 指向 `vendor/three/three.module.js`（不改 vendor 文件）。
- `npm ci` 复核锁文件可复现。

## 1. 项目结构（solution/）
- `index.html`、`vite.config.js`（react 插件 + three alias，`base: './'`）
- `src/main.jsx`、`src/App.jsx`：React 外壳 + HUD
- `src/state.js`：21+ 项参数定义（label/min/max/step/default）、质量档、预设、带版本的 `localStorage` 键 `gargantua.state.v1`、URL 解析与非法值回退
- `src/engine.js`：WebGLRenderer、全屏三角形、HalfFloat HDR 目标、Bloom（亮部提取 + 多级下采样/上采样）、合成 pass（ACES、暗角、颗粒、色散）、resize/DPR、context lost/restored 重建、`__GARGANTUA__` 与 ready 信号
- `src/shaders/blackhole.js`（核心 frag）、`src/shaders/post.js`
- `vendor/README.md`（版本 0.186.0、npm tarball 来源与 integrity、MIT）、`README.md`、`RESULTS.md`

## 2. 核心 Shader（逐像素）
- 单位 M=1，r_s=2。零测地线在轨道平面内等价于 Binet 方程 u'' = −u + 3u²；按 3D 笛卡尔形式积分 `a = −(3/2)·h²·x/r⁵`（h=|x×v| 为守恒量），用 RK4，步长随 r 自适应、靠近视界时缩小；以命名函数和注释写明坐标、状态量、步进和终止条件。
- 终止：r < 2(1+ε) 判为落入视界，输出纯黑；r > r_escape 且向外时判为逃逸，查询背景方向；步数耗尽按捕获处理，并在调试视图中标出。
- 盘面：每步检测 y 符号变化，插值求交点；落在 [r_in, r_out] 内时按路径顺序前向合成（发射 × 透射率），最多 N 次穿越（按质量档 2/3/4），记录阶次。盘厚用垂直方向的高斯权重体现。
- 发射：Novikov–Thorne 型温度剖面，近似黑体配色；Kepler 轨道速度 × 倍率；g = 引力红移 √(1−3/r) 与 Doppler 因子的合成，强度 ∝ g⁴，色温 ∝ g；程序化 fbm 湍流随时间沿轨道旋转。
- 背景：用最终逃逸方向生成程序化星空（哈希单元星点 + 密度参数）和银河带（大圆附近的 fbm 尘带）。
- 相机：OrbitControls 驱动 PerspectiveCamera；position、matrixWorld、FOV、aspect 作为 uniform 传给 shader。
- 调试 0–9：0 最终合成；1 步数热图；2 终止类型；3 视界掩码；4 盘交点阶次；5 红移/Doppler 因子 g；6 背景透镜坐标网格；7 仅星空/银河；8 盘面温度/发射；9 后处理前 HDR 亮度（对数假彩色）。

## 3. 质量档（真实改变预算）
Standard / High / Cinematic：内部渲染比例 0.6/0.85/1.0，最大步数 160/300/520，盘面穿越 2/3/4，Bloom 级数 4/5/6，色散采样 1/3/5；移动端 DPR 上限约 1.5。

## 4. 交互与 HUD
- 电影镜头循环（缓慢改变方位角、俯仰角和距离）；用户拖拽后暂停循环并保留手动控制，Space 恢复。四个预设（低倾角正面 "Gargantua"、高倾角侧视、近距离掠射、极角俯视），Shift+1–4 切换，HUD 标注名称。
- 可折叠 HUD：显示质量档、调试编号与说明、镜头状态、快捷键列表；21 个滑块分组（相机/盘/背景/后处理）；重置按钮。移动端改为底部抽屉。快捷键：0–9、Shift+1–4、Space、H、R、Q。不做音频（可选项）。
- 相机滑块与 OrbitControls 双向同步。

## 5. 自动化契约
解析 `capture/quality/preset/debug/time/hud`；capture=1 时在首帧前冻结时间、停止循环；首次渲染完成后设置 `dataset.gargantuaReady="true"`；`window.__GARGANTUA__` 提供只读 `ready` 以及 `getState/setQuality/setPreset/setDebug/setTime`，非法输入返回 `{ok:false, error}`，不抛异常。

## 6. 验证（使用 kimi-webbridge 技能，亲自执行并如实记录）
- `npm ci`、`npm run build`（记录退出码），`npx vite preview --port <p> --strictPort` 作为后台静态服务。
- 浏览器操作全部通过 kimi-webbridge daemon（`http://127.0.0.1:10086/command`）完成，固定 session `gargantua-opus-verify`，group_title「GARGANTUA 验收」。按 Windows 规则，每个请求都写入唯一命名的临时 JSON 文件，用 `curl.exe --data-binary @file` 发送，完成后立即删除。daemon 未启动时运行 `%USERPROFILE%\.kimi-webbridge\bin\kimi-webbridge.exe start`；若报 extension_not_connected，则转告用户处理。
- 视口：用 `cdp` 的 `Emulation.setDeviceMetricsOverride` 设置 1440×900@1 和 390×844@2（mobile:true），需要时配合 `Emulation.setTouchEmulationEnabled`。
- 检查项：`navigate` 到基础 URL；`evaluate` 等待 `gargantuaReady` 并读取 `__GARGANTUA__.getState()`；`screenshot` 后用 Read 亲自查看；capture 矩阵 preset 0–3 × debug 0–9（hud=0，固定 time）逐张截图检查；非法 URL 值回退；用 `evaluate` 派发键盘事件（0–9、Shift+1–4、Space、H、R、Q），用 `cdp` `Input.dispatchMouseEvent` 做拖拽和滚轮；调整参数后刷新验证持久化，再点重置；质量档切换；`network start/list` 确认只有同源请求；控制台错误通过注入 error/unhandledrejection 收集器以及 `cdp` Runtime 检查；`WEBGL_lose_context` 丢失/恢复后截图对比。
- 视觉验收由我本人读取截图完成（不使用 visual-judge 等子代理），发现问题就修复、重新构建、重新验证。
- 结束时停止所有预览服务器，确认端口已释放；浏览器标签组留给用户决定是否关闭。

## 7. 提交与归档
- 在 clone 中提交 `feat: add opus-5.5 gargantua raytracer candidate`，只包含 solution/，不含 node_modules/dist。RESULTS.md 写入模型标识 `anthropic/claude-opus-5-5`、基线 SHA、实际命令与结果、浏览器验收结果、限制，以及人工介入（用户指定使用 kimi-webbridge）。
- 主仓库：fetch 该 commit，打 tag `candidate/gargantua-schwarzschild-raytracer/opus-5.5`；在 `.worktrees/` 临时 worktree 检出 `llm/gargantua-schwarzschild-raytracer`，用 `git read-tree --prefix=tasks/gargantua-schwarzschild-raytracer/solutions/opus-5.5/` 导入 solution 树，核对与 `<tag>:tasks/gargantua-schwarzschild-raytracer/solution` 的树哈希一致；按该分支现有约定记录导入，提交 `feat: import opus-5.5 candidate`。主仓库根保持在 main，不 push（未被要求）。