# GARGANTUA — Schwarzschild Black Hole Raytracer

基于 React、Vite（ES Modules）与本地 `vendor/` Three.js 构建的实时全屏 **Schwarzschild 黑洞零测地线光线追踪器**。所有可见现象——事件视界阴影、不稳定光子球临界环、主/次/高阶弯曲吸积盘像、相对论多普勒增亮、引力红移、磁流体湍流旋臂，以及经引力透镜弯曲的程序化星空与银河——均由全屏自定义 Fragment Shader 逐像素数值积分生成，不依赖任何远程资源、贴图或替代几何体。

## 目录结构

```text
solution/
├── index.html                  # 离线自包含入口（内联 SVG 图标，零外部请求）
├── package.json                # React + Vite 依赖与构建脚本
├── package-lock.json           # 锁定依赖树
├── vite.config.js              # 本地 vendor/three 别名与构建配置（支持 --base / --outDir）
├── vendor/
│   ├── README.md               # Three.js 0.174.0 上游来源、SHA-256 校验与 MIT 许可证说明
│   └── three/                  # 本地 Three.js ESM 核心与 OrbitControls 插件
└── src/
    ├── main.jsx                # React 挂载入口
    ├── App.jsx                 # HUD 控制台、快捷键、持久化与 window.__GARGANTUA__ 接口
    ├── styles.css              # 响应式观测台 HUD 与移动端抽屉样式
    ├── state/schema.js         # 22 项参数规格、预设、质量档、localStorage 版本化与 URL 解析
    ├── renderer/GargantuaEngine.js # WebGL2 HalfFloat HDR 管线、多级 Bloom 与上下文恢复
    ├── shaders/raytracerShader.js  # Schwarzschild 零测地线 RK4 积分与吸积盘/星空 Shader
    ├── shaders/postShaders.js      # Jimenez 13-tap Bloom、Stephen Hill ACES 与镜头后处理
    └── audio/cosmicAudio.js        # Web Audio 纯程序化深空管风琴氛围合成器
```

## 安装、开发、构建与静态预览命令

在 `tasks/gargantua-schwarzschild-raytracer/solution/` 目录下执行：

```bash
# 1. 安装依赖（或使用 npm ci 严格按 package-lock.json 安装）
npm install

# 2. 启动本地开发服务器
npm run dev

# 3. 生产构建（默认输出到 dist/）
npm run build

# 3b. 子路径部署构建（支持 Vite --base 与 --outDir 参数）
npm run build -- --base=/gargantua-schwarzschild-raytracer/gemini-4-agron-high/ --outDir=dist --emptyOutDir

# 4. 启动静态文件预览服务器
npx vite preview --host 127.0.0.1 --port 4173 --strictPort
```

## 物理与渲染管线说明

1. **Schwarzschild 零测地线积分**：采用几何单位制（$G = c = 1$，$r_s = 2M = 1.0$，光子球 $r_{\text{ph}} = 1.5\,r_s$，临界碰撞参数 $b_{\text{crit}} = \frac{3\sqrt{3}}{2}\,r_s \approx 2.598\,r_s$）。通过静态观测者正交标架初始化局部光线四动量，守恒比角动量 $\mathbf{h} = \mathbf{x} \times \frac{d\mathbf{x}}{d\lambda}$，对无坐标奇点的精确三维测地线方程 $\frac{d^2\mathbf{x}}{d\lambda^2} = -\frac{3}{2} r_s h^2 \frac{\mathbf{x}}{\|\mathbf{x}\|^5}$ 执行自适应步长四阶 Runge-Kutta（RK4）积分。
2. **多阶弯曲吸积盘与辐射传输**：每个 RK4 步段使用三次 Hermite 曲线插值求交赤道盘半厚体积层，按光线传播路径顺序累积主像（1st crossing）、次级上下透镜拱像（2nd crossing）及光子环高阶像（3rd+ crossing），结合开普勒轨道速度 $\beta(r) = \sqrt{r_s / [2(r - r_s)]}$、引力红移与相对论多普勒因子 $g = \nu_{\text{obs}} / \nu_{\text{emit}}$、Novikov-Thorne 温度梯度及双相位开普勒剪切湍流计算黑体辐射。
3. **HDR 后处理**：基于 `HalfFloatType` 浮点帧缓冲区的 Jimenez 13-tap 下采样 + 9-tap 帐篷滤波上采样多级 Bloom、Stephen Hill 拟合矩阵 ACES Tone Mapping、边缘径向色散、光学暗角与确定性胶片颗粒。

## 快捷键与自动化契约

- `0`–`9`：切换最终合成画面（`0`）与 9 种物理诊断视图（`1`–`9`）
- `Shift+1`–`Shift+4`：切换 4 个相机预设
- `Space`：播放/暂停电影镜头巡航（手动拖拽或缩放后自动移交控制权）
- `Q`：循环切换 `Standard` / `High` / `Cinematic` 渲染预算档位
- `H`：显示/隐藏 HUD
- `R`：重置所有参数、预设、质量档并清除持久化存档
- `M`：开启/静音程序化深空管风琴氛围音
- URL 截图自动化示例：`?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0`（就绪后 `document.documentElement.dataset.gargantuaReady === "true"`，并暴露 `window.__GARGANTUA__`）。
