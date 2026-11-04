# GARGANTUA — Schwarzschild Black Hole Raytracer

一个全屏交互式黑洞光线追踪器。可见的黑洞、吸积盘、光子环、引力透镜星空
全部由**本地 Three.js 驱动的全屏自定义 Fragment Shader** 逐像素数值积分
Schwarzschild 零测地线产生；Three.js 的几何体只承载全屏 quad 与交互相机。

## 命令

在 `solution/` 目录下执行（Node.js 18+，需 npm registry 可访问以安装依赖）：

```bash
npm install                 # 按 package-lock.json 安装（或 npm ci）
npm run dev                 # 开发服务器 http://127.0.0.1:5173/
npm run build               # 生产构建，输出到 dist/
npm run preview             # 用 Vite 预览 dist/，http://127.0.0.1:4173/
```

静态服务器（不依赖 Vite，直接托管 dist/，离线可用）：

```bash
node static-server.mjs 8080 dist
# 打开 http://127.0.0.1:8080/
```

构建接受 Vite 的 `--base` 与 `--outDir`，用于部署到子路径：

```bash
npm run build -- --base=/gargantua-schwarzschild-raytracer/hy4-high/ \
  --outDir=/absolute/path/to/public/gargantua-schwarzschild-raytracer/hy4-high \
  --emptyOutDir
```

`vite.config.js` 默认 `base: './'`，因此未传 `--base` 时 dist 也能在任意子路径
下由纯静态服务器提供。部署时传入的 `--base` 覆盖该默认值。

## 运行时依赖

- React 18 + Vite 5，ES Modules。
- Three.js **r170** 以本地 `vendor/three.module.js` + `vendor/OrbitControls.js`
  提供，`vite.config.js` 用正则 alias 让运行时实际导入这些文件；来源、版本与
  MIT 许可证见 `vendor/README.md`。
- 运行时不请求任何 CDN、贴图、HDRI、字体、音频或 API；星空/银河/湍流全部
  在 shader 内程序化生成。可选氛围音为 WebAudio 振荡器，默认关闭、仅在用户
  按 `M` 后创建，不会触发自动播放错误。

## 物理实现

`src/shaders/blackhole.frag.glsl`：

- 坐标：Schwarzschild 坐标下的笛卡尔空间，单位 `G = c = 1`，`RS = 2M = 1`。
  事件视界 `r = RS`，光子球 `r = 1.5 RS`，临界碰撞参数 `b = 3√3 M`。
- 方程：零测地线的 Binet 形式 `d²u/dφ² = 3M u² − u` 的等价笛卡尔形式
  `d²p/dλ² = −(3/2)·RS·h²·p/|p|⁵`，其中 `h = |p × v|` 为守恒角动量。
- 状态与步进：`(p, v)` + velocity-Verlet（每步两次力求值）；仿射步长随 `r`
  自适应，近光子球更小、远场更大。
- 终止：`r ≤ RS`（视界，内部不发光）、`r ≥ 45 RS`（逃逸）、积分预算用尽
  （近临界绕行）。相机由 OrbitControls 的位置/朝向/FOV 分解为 ray 基向量上传。
- 吸积盘：沿**积分后的弯曲轨迹**检测 `y = 0` 面穿越并插值求交；同一条光线
  按路径顺序前后合成多次穿越（初级像、次级像及更高阶环）。发射含 Kepler
  速度导致的相对论 Doppler 增亮/去增亮、引力红移 `√(1−RS/ρ)`、径向温度梯度
  `T ∝ ρ^(−3/4)`、有限半厚度光学深度，以及随时间变化的程序化 fbm 湍流。
- 背景：以积分结束后的（已偏折）方向采样程序化星场与银河带 —— 透镜映射
  来自测地线本身，不是预烘焙形变图。

`src/shaders/post.frag.glsl`：HDR 半浮点目标 → 亮度阈值预滤波 → 可分离高斯
Bloom → ACES filmic tone mapping（Narkowicz 拟合）→ 暗角 / 胶片颗粒 / 轻微
色散 → 显式 sRGB 编码。

## 交互

- 拖拽 / 滚轮 / 双指：OrbitControls 改变相机，真实改变透镜视角。
- 4 个视角预设：`1 Edge-On`、`2 Inclined`、`3 Overhead`、`4 Wide Field`；
  点击或 `Shift+1`–`Shift+4`。
- 电影镜头循环：`Space` 播放/暂停；手动拖拽后自动暂停且不夺回控制权。
- `0`–`9`：最终合成 + 9 个诊断视图（步进/终止、视界掩码、盘面交点与阶次、
  红移/Doppler、透镜背景坐标、星空/银河、后处理前 HDR、偏折角、光子环临界度）。
- `H` HUD 显隐、`R` 重置、`Q` 质量档切换、`M` 氛围音。
- 三档质量 `Standard / High / Cinematic` 真实改变内部渲染比例、最大测地线
  步数、积分步长与 Bloom 模糊趟数；移动端另做 DPR 与渲染比例降级。
- 21 项参数（相机 4 + 模拟 1 + 盘面 8 + 背景 2 + 后处理 6）全部连接 shader
  uniform 或相机状态，可复位。全部状态（含质量档、预设、HUD、调试视图）
  以 `gargantua.state.v1` 版本化持久化到 `localStorage`；`R` 或 Reset 按钮清除并恢复默认。
- `webglcontextlost` 时暂停渲染并显示可恢复提示；`webglcontextrestored` 时
  重建 render target / material / quad、恢复持久化状态与模拟时间并继续渲染，
  不刷新页面。

## URL 截图契约

```text
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

`capture=1` 冻结模拟时间（默认 `0`）、关闭镜头循环与音频；非法值安全回退。
首帧渲染成功后设置 `document.documentElement.dataset.gargantuaReady = "true"`，
并暴露 `window.__GARGANTUA__`：只读 `ready`、`getState()`、`setQuality(level)`、
`setPreset(index)`、`setDebug(index)`、`setTime(seconds)`。方法校验输入，成功
返回更新后的状态，失败返回 `{ ok:false, error, state }`，不抛异常。截图路径
与正常渲染共用同一套 shader，无静态替代。

## 目录

```text
solution/
├── index.html, vite.config.js, package.json, package-lock.json
├── vendor/                 # 本地 Three.js r170 + OrbitControls + LICENSE + README
├── static-server.mjs       # 零依赖静态预览服务器
├── README.md, RESULTS.md
└── src/
    ├── main.jsx, App.jsx, styles.css
    ├── config.js           # 参数 / 预设 / 质量 / 持久化 / URL 契约
    ├── gargantua.js        # 渲染引擎（相机、RT、后处理、循环、上下文恢复）
    └── shaders/            # 全屏顶点 shader、测地线 shader、后处理 shader
```
