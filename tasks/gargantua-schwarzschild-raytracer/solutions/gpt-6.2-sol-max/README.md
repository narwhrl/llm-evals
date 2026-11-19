# GARGANTUA — Schwarzschild Raytracer

这是一个 React + Vite + ES Modules 的全屏 Three.js 光线追踪演示。可见图像由 `src/shaders.js` 中的全屏 Fragment Shader 逐像素生成。射线在 Schwarzschild areal-radius 坐标中数值积分，记录角动量、曲率、事件视界终止、光子环临界行为和按路径顺序的吸积盘穿越。星空、银河、湍流、Doppler 增亮、引力红移、ACES tone mapping、Bloom、暗角、颗粒和色散都在 shader 中完成。

Three.js 与 `OrbitControls` 的运行时文件位于 `vendor/`。`vendor/README.md` 记录上游版本、来源和许可证。运行时不加载 CDN、远程字体、贴图、HDRI、音频或 API。

## 安装

```powershell
npm install
```

## 开发启动

```powershell
npm run dev
```

Vite 默认使用 `http://127.0.0.1:4173/`。

## 生产构建

```powershell
npm run build
```

## 静态预览

```powershell
npm run preview -- --host 127.0.0.1 --port 4173
```

预览服务提供 `dist/` 中的生产文件，不需要后端。

## 交互

- `OrbitControls` 支持拖拽、滚轮和触摸旋转/缩放。
- `Shift+1` 至 `Shift+4` 切换四个镜头预设。
- `Space` 播放或暂停电影镜头，`H` 显隐 HUD，`R` 恢复默认参数，`Q` 切换质量档。
- `0` 至 `9` 切换最终合成和九种诊断视图。
- HUD 内的质量、预设、诊断和参数控件都会同步 shader 或相机状态。

状态以 `gargantua-state-v1` 版本键写入 `localStorage`。URL capture 参数会在首帧前覆盖对应状态，例如：

```text
/?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

页面就绪后设置 `document.documentElement.dataset.gargantuaReady="true"`，并提供 `window.__GARGANTUA__` 的 `getState()`、`setQuality()`、`setPreset()`、`setDebug()` 和 `setTime()` 方法。
