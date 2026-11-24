# GARGANTUA — Schwarzschild Black Hole Raytracer

基于 React、Vite、ES Modules 与本地 vendored Three.js（`0.174.0`）构建的实时全屏广义相对论黑洞光线追踪交互网站。主画面完全由自定义全屏三角形 Fragment Shader 逐像素数值积分 Schwarzschild 度规零测地线生成，包含事件视界捕获阴影、不稳定光子球临界光子环、弯曲路径多次吸积盘穿越合成、相对论多普勒增亮与引力红移、开普勒差速剪切湍流、程序化星空与银河透镜映射，以及多尺度 HDR Bloom 与 ACES RRT+ODT 色调映射管线。

## 环境要求

- Node.js `>= 18`（验证环境：`v24.21.0`）
- npm `>= 9`（验证环境：`11.19.0`）
- 支持 WebGL 2（或 WebGL + 半精度浮点帧缓冲扩展）的现代桌面/移动浏览器
- 运行时零外部网络依赖：无需后端、API 密钥、CDN、远程贴图、HDRI、远程音频或远程字体

## 安装、开发、生产构建与静态预览命令

请在候选项目目录 `tasks/gargantua-schwarzschild-raytracer/solution/` 下执行以下命令：

### 1. 安装依赖

```bash
npm install
```

（在持续集成或只读锁文件验收环境中亦可使用 `npm ci`。）

### 2. 启动本地开发服务器

```bash
npm run dev
```

### 3. 执行生产构建

默认相对路径构建（输出至 `./dist`）：

```bash
npm run build
```

带子路径前缀与自定义输出目录构建（兼容评测画廊部署参数）：

```bash
npm run build -- --base=/gargantua-schwarzschild-raytracer/gemini-4-carbon-high/ --outDir=./dist --emptyOutDir
```

### 4. 静态服务器预览生产产物

先执行 `npm run build`，再启动静态资源预览服务器：

```bash
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

随后在浏览器访问 `http://127.0.0.1:4173/`。

## URL 自动化截图契约与全局接口

支持同源查询参数控制确定性渲染帧：

```text
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

- `capture=1`：在首帧完成前关闭电影镜头自动循环与动态时间推进，使用 `time`（有限非负秒数，缺省或非法值回退为 `0`）冻结模拟时间，并强制关闭可选程序化音效。
- `quality`：`standard` | `high` | `cinematic`（非法值安全回退默认档位 `high`）。
- `preset`：`0`–`3` 整数（非法值回退 `0`）。
- `debug`：`0`–`9` 整数（`0` 为最终合成画面，`1`–`9` 为物理与管线诊断视图；非法值回退 `0`）。
- `hud`：`0`（隐藏）或 `1`（显示）。
- 就绪信号与控制接口：首帧渲染同步完成后设置 `document.documentElement.dataset.gargantuaReady = "true"`，并挂载只读接口对象 `window.__GARGANTUA__`（提供只读 `ready`、`getState()`、`setQuality(level)`、`setPreset(index)`、`setDebug(index)`、`setTime(seconds)`）。

## 快捷键一览

| 快捷键 | 功能 |
| --- | --- |
| `0` – `9` | 切换最终合成画面（`0`）与 9 种诊断调试视图（`1`–`9`） |
| `Shift+1` – `Shift+4` | 切换四个预设观测视角 |
| `Space` | 播放 / 暂停电影镜头巡航（手动拖拽相机自动移交控制权） |
| `H` | 显示 / 隐藏可折叠 HUD 面板 |
| `Q` | 循环切换 `Standard` / `High` / `Cinematic` 质量档位 |
| `R` | 重置全部 21 项参数、预设与持久化状态 |
| `M` | 开启 / 关闭本地 Web Audio 程序化深空环境音效（默认关闭） |

## 本地 Vendor 说明

Three.js 核心模块（`three.module.js`、`three.core.js`）与 `OrbitControls.js` 均保存在 [`vendor/three/`](./vendor/three/) 下，版本来源与 MIT 许可证信息详见 [`vendor/README.md`](./vendor/README.md)。
