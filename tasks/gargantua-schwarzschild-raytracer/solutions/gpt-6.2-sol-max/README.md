# GARGANTUA / Schwarzschild Raytracer

这是一个离线可运行的 React + Vite 单页应用。Three.js 与 `OrbitControls` 从 `vendor/` 直接导入，主画面由全屏 Fragment Shader 完成 Schwarzschild 零测地线积分、事件视界终止、吸积盘多次穿越、程序化星空和后处理。

## 安装

```bash
npm install
```

## 开发

```bash
npm run dev
```

开发服务器默认监听 `http://127.0.0.1:5173/`。

## 生产构建

```bash
npm run build
```

构建产物写入 `dist/`。

## 静态预览

```bash
npm run preview
```

预览服务器默认监听 `http://127.0.0.1:4173/`。`dist/` 也可以交给任意静态服务器直接提供。

## 控制

- 拖拽或触摸画布使用 `OrbitControls`，滚轮调整相机距离。
- `Shift+1` 至 `Shift+4` 切换四个镜头预设。
- `Space` 播放或暂停电影镜头循环。
- `0` 至 `9` 切换诊断视图，`H` 显隐 HUD，`Q` 切换质量档，`R` 恢复默认状态。
- URL 截图契约支持 `capture`、`quality`、`preset`、`debug`、`time` 和 `hud` 参数。

`vendor/README.md` 记录本地 Three.js 文件的版本、来源与许可证。浏览器验收记录在 `RESULTS.md`，关键验收截图保存在 `evidence/`。
