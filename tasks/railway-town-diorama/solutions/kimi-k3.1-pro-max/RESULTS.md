# Results

## Model and baseline

- 完整模型标识：`kimi-k3.1-pro:max`
- 实际 provider/model：`magpie/kimi-code-cn/k3.1-pro`
- 工具与思考程度：Codex CLI，`max`
- 起始 `main` commit：`d16fa111d3b6651e11d7c38e8773f7228b4edeb6`
- 未使用子代理、其他模型、模型回退或图像生成模型。

## Verification

- `npm install`：通过，15 个生产／构建依赖，审计无漏洞。
- `npm run build -- --base=/railway-town/ --outDir=dist`：通过，生成的 HTML、CSS 和 JS 使用指定子路径。Vite 提示主 JS 大于 500 kB，不影响构建结果。
- `npm run build`：通过，默认生产构建成功。
- `npm run dev -- --port 5173`：本地开发页面正常加载，WebGL 场景可见，浏览器无错误。
- `npm exec --yes --package=http-server -- http-server dist -p 4175 -s` 后在 `1440 × 900` Chromium 中运行 `.artifacts/browser-check.mjs`：通过。
- `npm exec --yes --package=http-server -- http-server dist -p 4176` 后以 `/railway-town/` 为入口运行相同检查：通过。验收脚本仅为该入口提供静态目录映射，不修改构建内容。

浏览器检查覆盖完整初始沙盘、默认运行、运行中暂停与恢复、站停中暂停超过两秒后继续、速度调整、夜景与傍晚切换、拖动旋转、滚轮缩放，以及不同状态下的两次复位。观察两圈共四次到站，站停暂停恢复后的停留实测约 `1.97s`；最终检查无控制台错误、未处理异常或资源加载失败。傍晚、夜景、圈次、旋转缩放和复位截图保存在未提交的 `.artifacts/`。

## Notes

- 验收使用 Playwright Chromium 的无头软件 WebGL 渲染；未在独立显卡浏览器中测量帧率。
- Vite 的主包体积提示仍存在；核心库与场景打包在同一入口，无运行时外部资源请求。
- 无已知功能失败，无需人工介入。
