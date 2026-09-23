# GARGANTUA — Schwarzschild Black Hole Raytracer

全屏交互式史瓦西黑洞光线追踪网站。每一帧由一个自定义全屏 Fragment
Shader 对每个像素数值积分史瓦西度规中的零测地线得到：事件视界、光子环、
吸积盘多次穿越像、引力红移与多普勒增亮、透镜化程序化星空全部来自这条积
分路径，而非任何几何替身或预烘焙贴图。

- React 18 + Vite 5 + TypeScript（ES Modules），无后端、无密钥、无运行时网络依赖。
- Three.js r180（`three@0.180.0`）以版本锁定方式本地内嵌于 `vendor/three/`，
  由 Vite alias 指向，`node_modules` 不参与运行时。

## 命令

```bash
npm install          # 安装依赖（生成版本锁定的 node_modules）
npm run vendor       # 从 node_modules 拷贝 three ESM 构建到 vendor/（提交内已含，可复现）
npm run dev          # 开发服务器
npm run build        # tsc --noEmit 类型检查 + vite 生产构建 -> dist/
npm run preview      # 静态服务器预览 dist/（默认 http://localhost:4173/）
```

生产验证路径：`npm run build && npm run preview`，然后用浏览器访问
`http://localhost:4173/`。结果与命令记录见 `RESULTS.md`。

## 物理内核（`src/engine/shaders/raytrace.ts`）

- **单位制与坐标**：G = c = 1，r_s = 2M = 1（视界 r = 1，光子球 r = 1.5，ISCO r = 3）。
  采用数学等价的稳定向量形式积分零测地线：
  `a(p) = -(3/2)·h²·p/r⁵`，`h = |p × v|` 守恒（等价于 Binet 方程 `u″ + u = (3/2)u²`）。
  文件头部注释完整说明坐标、状态量、步进与终止条件。
- **积分**：每像素 RK4，自适应步长 `dt = clamp((r-0.9)·0.18, 0.02, 0.8)`；
  终止条件为视界捕获（r < 1）、逃逸（r > rEscape 且向外）或步数预算（质量档）。
- **吸积盘**：沿弯曲路径检测赤道面（y = 0）符号翻转，线性插值求交点，
  单条光线按路径顺序合成至多 4 次穿越（首像 + 高阶像）。
  Shakura–Sunyaev 温度 T ∝ (r/r_in)^(-3/4)；引力红移 √(1-1/r) 与圆轨道
  多普勒（局域速度 β = √(0.5/r)/√(1-1/r)）合成移因子 g，作用于观测温度
  与 beaming（∝ g³）；开普勒差速剪切驱动的 4 阶 FBM 湍流随时间演化。
- **背景**：逃逸方向经八面体等面积映射进入三层哈希星栅 + 银河带 FBM
  尘埃结构，整体被引力透镜自然扭曲。无贴图/Cubemap/远程资产。

## 后处理（`src/engine/shaders/post.ts`）

HDR RGBA16F 缓冲 → 软膝阈值亮提取 → 每级下采样的 9 抽头可分离高斯
Bloom 金字塔 → 合成：径向色散、曝光、ACES 色调映射（Stephen Hill 拟合
版本，显式实现）、克制暗角、胶片颗粒、sRGB 编码。调试视图直通输出。

## 交互与 HUD

- **OrbitControls**：相机位置/朝向/FOV 每帧写入 shader uniforms，拖拽、
  滚轮与触摸真实改变透镜视角。
- **电影镜头循环**：默认开启（缓慢环绕），Space 播放/暂停；用户拖拽后
  自动交还控制权（HUD 显示"手动控制"）。
- **视角预设**（HUD 按钮 / Shift+1…4）：远景全景、电影位、光子环、俯瞰极轨。
- **参数控件**（21 项，分组滑杆，全部实际作用于渲染或相机）：
  FOV、相机距离/方位角/俯仰角、时间倍率、盘内/外半径、盘半厚度、盘温度、
  盘发射强度、轨道速度倍率、湍流幅度/速度、恒星密度、银河亮度、
  Bloom 强度/阈值、曝光度、暗角、胶片颗粒、色散。
- **调试视图** `0`–`9`：最终合成 / 射线步进与终止 / 视界掩码 / 盘面交点
  及阶次 / 红移-Doppler / 背景透镜坐标 / 星空银河 / 后处理前 HDR /
  最近邻近距离 / 偏折角。
- **快捷键**：`0`–`9` 调试、`Shift+1`–`4` 预设、`Space` 镜头、`H` HUD、
  `R` 重置、`Q` 质量档、`M` 氛围音乐（程序化 WebAudio，默认关闭）。
- **持久化**：全部可配置状态（参数、质量档、预设、HUD、调试视图）版本化
  存入 `localStorage`（`gargantua.state.v1`），`R` / HUD 按钮一键重置。

## 质量档

| 档位 | 内部渲染比例 | DPR 上限 | 最大测地线步数 | Bloom 级数 |
| --- | --- | --- | --- | --- |
| standard | 0.66 | 1 | 176 | 3 |
| high | 0.85 | 1.5 | 300 | 4 |
| cinematic | 1.0 | 2 | 448 | 6 |

## URL 截图自动化契约

```
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

- `capture=1`：首帧前冻结模拟时间为 `time`（有限非负秒，缺省 0），关闭
  电影镜头循环与音频，确定可截图。
- `quality` 仅接受 `standard|high|cinematic`；`preset` 0–3；`debug` 0–9；
  `hud` 0|1。非法值安全忽略回退，不抛异常。
- 首帧渲染完成后设置 `document.documentElement.dataset.gargantuaReady = "true"`，
  并暴露 `window.__GARGANTUA__`：
  - `ready`（只读布尔）、`getState()`（完整状态快照，含 `time`）；
  - `setQuality(level)` / `setPreset(index)` / `setDebug(index)` /
    `setTime(seconds)`：输入合法返回更新后的状态对象，非法返回
    `{ ok: false, error }`，均不抛出未处理异常。

## WebGL 上下文恢复

`webglcontextlost`：`preventDefault`、暂停渲染并显示"等待恢复"覆盖层；
`webglcontextrestored`：重建渲染目标与回退纹理、强制重编译程序，从已持
久化状态原位继续，不刷新页面。

## 目录结构

```
solution/
  index.html  vite.config.ts  tsconfig.json  package.json  package-lock.json
  scripts/vendor.mjs        # vendor/ 再生脚本（含来源与许可证说明）
  vendor/three/             # 运行时唯一 Three.js 来源（MIT，见 vendor/README.md）
  src/
    main.tsx  App.tsx
    engine/  Engine.ts  api.ts  audio.ts  shortcuts.ts  shaders/{raytrace,post}.ts
    state/   defaults.ts  store.ts
    ui/      Hud.tsx  Slider.tsx  hud.css
  README.md  RESULTS.md
```
