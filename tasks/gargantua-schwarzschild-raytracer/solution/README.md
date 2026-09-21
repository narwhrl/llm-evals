# GARGANTUA — Schwarzschild Black Hole Raytracer

全屏 Schwarzschild 黑洞光线追踪。画面由本地 Three.js 的自定义片段着色器逐像素积分零测地线生成，不请求运行时网络资源。

## 命令

在本目录执行：

```bash
npm install
npm run dev
npm run build
npm run preview
```

- `npm run dev`：Vite 开发服务器。
- `npm run build`：生产构建，输出到 `dist/`。
- `npm run preview`：用 Vite 静态预览生产构建，地址为 `http://127.0.0.1:4173/`。

## 运行时

- Three.js `0.186.0` 的 ESM 构建和 `OrbitControls` 位于 `vendor/`。来源、许可证和导入改写说明见 `vendor/README.md`。
- 恒星、银河、湍流和颗粒都在着色器内程序化生成。
- 可配置状态保存在 `localStorage` 键 `gargantua-state-v1`。带 `capture=1` 的截图地址不读取、也不写回这份存档。

## 截图地址

```text
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

页面完成首次渲染后会设置 `document.documentElement.dataset.gargantuaReady = "true"`，并提供 `window.__GARGANTUA__`。

## 代码入口

- `src/shaders.js`：Schwarzschild RK4 积分、视界终止、盘面多次穿越、多普勒与后处理。
- `src/engine.js`：Three.js 渲染循环、OrbitControls、质量档、WebGL 上下文恢复。
- `src/App.jsx`：HUD、21 项参数、预设、调试和快捷键。
