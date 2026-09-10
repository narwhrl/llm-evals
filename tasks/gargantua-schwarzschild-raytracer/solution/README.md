# GARGANTUA — Schwarzschild Black Hole Raytracer

React + Vite + 本地 vendored Three.js ESM 的全屏交互黑洞光线追踪。运行时不依赖
CDN、远程贴图、远程字体或任何网络服务；用任意静态服务器离线提供构建产物即可运行。

## 命令

在 `tasks/gargantua-schwarzschild-raytracer/solution/` 目录下执行：

| 用途 | 命令 | 说明 |
| --- | --- | --- |
| 安装依赖 | `npm install` | 安装 react/react-dom/vite/@vitejs/plugin-react；Three.js 已 vendor 进 `vendor/`，不经 npm 引入 |
| 开发启动 | `npm run dev` | 开发服务器，默认 <http://localhost:5173> |
| 生产构建 | `npm run build` | 产物输出到 `dist/` |
| 静态预览 | `npm run preview` | Vite 静态服务器服务 `dist/`，默认 <http://localhost:4173> |

生产构建也可用任意静态文件服务器离线提供，例如：

```bash
python3 -m http.server 8080 --directory dist
```

## 目录结构

- `vendor/` — 运行时实际导入的本地 Three.js ESM 构建与 addon；版本、来源、许可证见 `vendor/README.md`
- `src/` — 应用源代码（`gargantua/` 为渲染器、shader、状态与 HUD 逻辑）
- `RESULTS.md` — 候选结果报告：模型标识、基线 commit、实际执行过的命令与结果、浏览器验收记录、已知限制
