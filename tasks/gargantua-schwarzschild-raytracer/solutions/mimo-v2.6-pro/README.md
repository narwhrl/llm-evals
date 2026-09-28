# GARGANTUA — Schwarzschild Black Hole Raytracer

全屏交互式史瓦西黑洞零测地线光线追踪网站。React + Vite + ES Modules + 本地 vendor Three.js，
运行时零网络依赖（无 CDN、远程贴图/HDRI/音频/字体/API）。

## 命令

```bash
npm install        # 安装依赖（生成/校验 package-lock.json）
npm run vendor     # 从 node_modules/three 再生成 vendor/（含导入改写与断言）
npm run dev        # 开发服务器  http://127.0.0.1:5177/
npm run build      # 生产构建 → dist/
npm run preview    # 静态预览    http://127.0.0.1:4177/（服务 dist/）
```

静态托管：`dist/` 为纯静态产物（`base: './'`），任意静态服务器可直接服务；
gallery 构建会以 `npm run build -- --base=/gargantua-schwarzschild-raytracer/mimo-v2.6-pro/ --outDir=... --emptyOutDir` 传参覆盖 base/outDir。

## 渲染核心

- 全屏自定义 Fragment Shader（`src/shaders/raytracer.frag.glsl`）逐像素数值积分史瓦西零测地线：
  轨道方程 `d²u/dφ² = −u + 3Mu²`（u = 1/r，M = rs/2），状态量 `(u, du/dφ)`，RK4 自适应步进，
  事件视界终止（r ≤ rs）/ 逃逸终止（r > 48 且向外）/ 步数耗尽兜底。
- 吸积盘沿弯曲路径与 y=0 平面求交（5 次二分定位穿越点），同一光线多次穿越按路径顺序
  前向→后向 alpha 合成（主像 + 次级像 + 高阶环状细节）。
- 发射：圆轨道 g 因子（相对论 Doppler × 引力红移）、径向温度梯度（内 14000K 蓝白 → 外 3000K 橙）、
  开普勒差速剪切的时变程序化湍流（周期性 value-noise fbm）。
- 背景：程序化星空 + 银河带，经逃逸方向透镜映射采样，无任何贴图/环境图。
- 后处理：HDR（HalfFloat）→ UnrealBloom → 径向色散 → 曝光 → ACES（Narkowicz 拟合）→ 暗角 → 颗粒 → sRGB。
- 本地 Three.js 仅承载全屏 Shader 与 OrbitControls 交互相机，不替代零测地线渲染（vendor 说明见 `vendor/README.md`）。

## 参数（21 项，均可生效、可单项复位 ↺、可全局重置）

相机镜头：视场角 FOV、相机距离、相机方位角、相机俯仰角、时间倍率
吸积盘：盘内半径、盘外半径、盘半厚度、盘温度、盘发射强度、轨道速度倍率、湍流幅度、湍流速度
背景：恒星密度、银河亮度
后处理：Bloom 强度、Bloom 阈值、曝光度、暗角强度、胶片颗粒强度、色散强度

全部可配置状态（参数、质量档、视角预设、HUD 状态、调试视图）版本化持久化于
`localStorage['gargantua.state.v1']`，逐字段校验回退，全局重置入口：HUD「全部重置」按钮或 `R`。

## 质量档（`Q` 循环）

| 预算 | Standard | High | Cinematic |
| --- | --- | --- | --- |
| 内部渲染比例 / DPR 上限 | 0.75 / 1.25 | 1.0 / 1.5 | 1.0 / 2.0 |
| 最大测地线步数 | 180 | 340 | 512 |
| 盘穿越合成数 | 3 | 5 | 8 |
| 湍流倍频 | 3 | 4 | 5 |
| Bloom 分辨率 | 0.5× | 0.75× | 1.0× |
| 色散采样 | 3 tap | 3 tap | 5 tap |

## 快捷键

- `0`–`9`：调试视图切换（0 最终合成；1–9 诊断输出，HUD 给出编号与说明）
- `Shift`+`1`–`4`：视角预设（视界边缘 / 极区俯瞰 / 光子环特写 / 广角透镜场）
- `Space`：播放/暂停电影镜头循环（手动拖拽/滑杆接管后保持控制权，不自动恢复）
- `H`：HUD 显隐（桌面右缘悬浮列，移动端底部抽屉）
- `R`：重置全部
- `Q`：质量档切换

氛围音乐为任务可选项，本实现未提供（无 `M` 键）。

## URL 截图契约与状态接口

```text
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

- `capture=1`：冻结模拟时间于 `time`（有限非负秒，缺省 0）、禁用电影镜头循环；
- `quality`：`standard|high|cinematic`；`preset`：整数 0–3；`debug`：整数 0–9；`hud`：`0|1`；
  出现但非法的值安全回退默认值，不抛异常、不黑屏；未出现的键沿用持久化/默认状态。
- shader 编译 + 初次渲染 + URL 状态应用后置
  `document.documentElement.dataset.gargantuaReady = "true"`（此时 `window.__GARGANTUA__` 已可用）。
- `window.__GARGANTUA__`：只读 `ready`；`getState()` 返回
  `{quality, preset, debug, time, hud, capture, params}` 快照；
  `setQuality(level)` / `setPreset(index)` / `setDebug(index)` / `setTime(seconds)`：
  合法 → 应用并返回更新后的状态快照；非法 → 返回 `false`；任何输入不抛未处理异常。

## 故障恢复

`webglcontextlost` → 暂停渲染并显示「上下文丢失 - 恢复中…」可恢复状态（`preventDefault` 以允许恢复）；
`webglcontextrestored` → 重建 render target/material/后处理链资源、恢复全部状态并继续渲染（不刷新页面）。

## 架构

```
src/
  state/    defaults.js（参数/预设/质量档/调试视图唯一定义表）store.js persistence.js urlState.js bridge.js
  render/   fullscreen.js（全屏三角形 + ShaderMaterial）RendererManager.js（管线/质量档/上下文恢复）
  shaders/  raytracer.frag.glsl（零测地线核心 + 盘 + 背景 + 10 调试视图）final.frag.glsl（后处理）
  ui/       Hud.jsx（状态/预设/参数/快捷键/重置）ParamSlider.jsx shortcuts.js
vendor/     本地 Three.js ESM 构建与 addon（来源与许可见 vendor/README.md）
evidence/   浏览器验收截图（见 RESULTS.md 索引）
```
