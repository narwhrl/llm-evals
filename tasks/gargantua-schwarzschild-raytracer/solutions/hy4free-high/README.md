# GARGANTUA — Schwarzschild Black Hole Raytracer

全屏交互式黑洞光线追踪器。主画面由本地 Three.js 承载的**单个全屏 Fragment Shader**实时渲染：每像素数值积分 Schwarzschild 零测地线，沿弯曲路径求交吸积盘并按路径顺序合成多次盘面像，再经 HDR Bloom、ACES、暗角、颗粒与色散输出。无后端、无 CDN、无远程贴图/字体/音频，静态服务器离线提供文件即可运行。

## 环境

- Node.js ≥ 18，npm ≥ 9（已在 Node v24.21.0 / npm 11.19.0 验证）。
- 支持 WebGL2 的浏览器；推荐 `EXT_color_buffer_float`（HalfFloat HDR 目标）。缺失时自动回退到 8-bit 目标。
- `package-lock.json` 锁定依赖版本；`vendor/` 保存运行时实际导入的 Three.js r170 ESM 构建与 `OrbitControls`，见 `vendor/README.md`。`node_modules/` 不提交。

## 命令

所有命令在 `solution/` 目录执行。

```sh
# 1. 安装依赖（生成/使用受版本锁定的 package-lock.json）
npm install

# 2. 开发启动
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
#    打开 http://127.0.0.1:5173/

# 3. 生产构建（输出到 dist/）
npm run build

# 4. 带 Vite --base / --outDir 的生产构建
npm run build -- --base=/gargantua/ --outDir=dist-base

# 5. 静态预览（服务 dist/）
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
#    打开 http://127.0.0.1:4173/

# 6. 静态预览带 base 的构建（服务 dist-base/ 于 /gargantua/）
npm run preview -- --host 127.0.0.1 --port 4174 --strictPort --outDir dist-base --base=/gargantua/
#    打开 http://127.0.0.1:4174/gargantua/
```

Git Bash / MSYS 会把以 `/` 开头的参数转换成本地路径。带 `--base=/...` 的预览命令在该环境下需加前缀 `MSYS_NO_PATHCONV=1`（其它 shell 不需要）：

```sh
MSYS_NO_PATHCONV=1 npm run preview -- --host 127.0.0.1 --port 4174 --strictPort --outDir dist-base --base=/gargantua/
```

`dist/` 与 `dist-base/` 是纯静态产物：任何静态文件服务器（例如上面的 `vite preview`）都能离线托管，无需运行时网络请求。

## 物理与渲染

- **坐标与状态**：Schwarzschild 坐标，几何单位 `G = c = 1`，视界 `r_s = 2M = 1`（`M = 0.5`）。球对称使每条零测地线保持在由观测者径向 `e1` 与射线切向 `e2` 张成的平面内；点 `p(φ) = r(φ)(cosφ·e1 + sinφ·e2)`，`u = 1/r`。
- **积分**：轨道方程 `d²u/dφ² = -u + 3M·u²`，第一积分 `(du/dφ)² + u² - 2M·u³ = 1/b²`（`b` 为局部静止观测者测得的碰撞参数）。状态 `(u, du/dφ)` 用固定步长的 RK4 对 φ 积分；步长与最大步数由质量档控制。
- **终止**：`u ≥ 1/r_s` 判定越过事件视界（捕获、不发光）；`u < 1/200 且 du < 0` 判定逃逸；逃逸时用解析渐近关系 `u ≈ (φ_∞ - φ)/b` 还原连续的渐近方向，避免把背景吸附到离散步长上。步数预算耗尽且仍在光子球附近盘旋的光线按捕获处理。
- **吸积盘**：盘位于赤道面 `y = 0`。每步检测世界坐标高度变号，插值求交点；`r ∈ [盘内半径, 盘外半径]` 时按前后顺序合成该次穿越的发射，因此一条光线可累积首级、次级及更高阶像。发射含温度梯度 `T ∝ r^(-3/4)`、圆轨道速度 `v = sqrt(M/(r-r_s))` 引起的 Doppler 增亮 `δ³`、圆轨道引力红移 `sqrt(1-3M/r)`、程序化差动旋转湍流与螺旋带。
- **背景**：星空与银河带完全程序化生成，并按逃逸后的渐近方向（即经透镜偏折后的天球坐标）采样。
- **后处理**：HalfFloat HDR 目标 → 亮部提取 → 可分离高斯模糊（迭代次数随质量档变化）→ 色散（RGB 径向分离）→ Bloom 合成 → 曝光 → Narkowicz ACES → 暗角 → 颗粒 → 线性转 sRGB。

## 质量档

| 档 | 内部渲染比例 | 最大步数 | 步长 dφ | 盘噪声八度 | Bloom 模糊迭代 | DPR 上限 |
| --- | --- | --- | --- | --- | --- | --- |
| Standard | 0.62 | 130 | 0.055 | 2 | 1 | 1.25 |
| High | 0.82 | 240 | 0.032 | 3 | 2 | 1.75 |
| Cinematic | 1.00 | 460 | 0.020 | 4 | 3 | 2.0 |

三档同时改变分辨率、积分预算、盘面采样成本与后处理采样数，而不只是标签。`Q` 循环切换。

## 交互、状态与快捷键

- `OrbitControls` 驱动唯一相机；其位置、朝向、FOV 每帧传入 Fragment Shader 作为观察射线输入。手动拖拽会暂停电影镜头循环并交出控制权（`Space` 可再次播放/暂停）。
- 四个视角预设：`边缘视角 / 俯瞰极区 / 近距掠影 / 广域全景`，点击或 `Shift+1` … `Shift+4`。
- 可折叠 HUD：桌面为右侧面板，移动端为底部抽屉（默认收起）。状态条常显质量档、调试编号/说明、镜头状态与预设名。
- 21 项参数控件（相机、时间、吸积盘、星空、后处理）全部实时生效并支持重置。全部可配置状态以 `version: 2` 持久化到 `localStorage`（键 `gargantua.state.v2`），`R` 或「重置全部」恢复默认值。
- 快捷键：`0`–`9` 调试视图、`Shift+1`–`Shift+4` 预设、`Space` 播放/暂停、`H` HUD 显隐、`R` 重置、`Q` 质量档。未实现音频，故无 `M`。

### 调试视图

`0` 最终合成；`1` 测地线步进/终止；`2` 事件视界掩码与临界边界；`3` 盘面交点与像阶次；`4` 红移/Doppler 因子；`5` 背景透镜坐标；`6` 星空与银河（透镜后）；`7` 后处理前 HDR 值；`8` 光子环/临界绕转；`9` 盘面发射（多次像）。调试视图绕过 Bloom 与色调映射，直接显示诊断色。

## URL 截图自动化契约

```text
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

- `capture=1`：冻结模拟时间到 `time`（有限非负秒数，缺省 `0`），关闭电影镜头与非确定性推进，关闭音频（本项目无音频）。
- `quality` ∈ `standard|high|cinematic`；`preset` ∈ `0..3`；`debug` ∈ `0..9`；`hud` ∈ `0|1`。非法值忽略并回退到默认值，不抛异常、不黑屏。
- shader 编译、初次渲染与 URL 状态应用完成后设置 `document.documentElement.dataset.gargantuaReady = "true"`。
- `window.__GARGANTUA__` 暴露只读 `ready`、`getState()`、`setQuality(level)`、`setPreset(index)`、`setDebug(index)`、`setTime(seconds)`。方法校验输入，成功返回更新后的状态快照，非法输入返回 `{ ok: false, error }` 且不抛异常。截图接口走完整 Shader 管线，不替换为静态结果。

## WebGL 上下文恢复

`webglcontextlost` 时 `preventDefault()`、暂停渲染并显示可恢复提示；`webglcontextrestored` 时重建 HDR 渲染目标、强制重编译材质、恢复已持久化状态并继续渲染，不刷新页面。状态存于 React/localStorage，不受上下文丢失影响。

## 已知限制

- 光子环高阶像受质量档步数预算限制；预算内无法逃逸的近临界光线按捕获处理。
- 软件 WebGL（SwiftShader）下高分辨率 + Cinematic 档较慢；低性能设备建议 Standard。
- Vite 构建会提示单 chunk > 500 kB（Three.js 被 vendor 进同一 bundle），属提示性信息，不影响运行。
