# 结果记录

- 模型：`gpt-6-astra:ultra`
- 起始 main commit：`55b71efeded8a28b59af881484296ca606a067e1`，由本运行开始时的 `git rev-parse HEAD` 获取。
- 实现范围：`tasks/genshin-celestia/solution/`。
- 环境：Windows、Node.js `v24.21.0`、npm `11.19.0`；浏览器为 Chromium `158.0.8127.18`，视口 `1440 × 900`、DPR 1。

## 实际验证

以下 npm 命令的工作目录均为 `tasks/genshin-celestia/solution/`。

| 命令 / 操作 | 实际结果 |
| --- | --- |
| `npm install --cache .npm-cache --no-audit --no-fund` | 成功安装 24 个包并生成 `package-lock.json`。npm 提示 esbuild 安装脚本尚未列入 allowScripts；实际构建可正常执行。 |
| `npm run build` | TypeScript 严格检查和默认 Vite 构建通过，产物位于 `dist/`。 |
| `npm run build -- --base=/genshin-celestia/gpt-6-astra-ultra/ --outDir=dist-subpath` | TypeScript 严格检查和 Vite 生产构建通过，输出包含指定子路径。最终 JS 578.82 kB，gzip 151.14 kB。Vite 报单块超过 500 kB 的提示，没有抑制该提示。 |
| `npm run dev -- --port 5173 --strictPort` | 本地开发服务正常启动，浏览器能直接显示场景。验证后已结束。 |
| `npm run preview -- --base=/genshin-celestia/gpt-6-astra-ultra/ --outDir=dist-subpath --port 4173 --strictPort` | 生产子路径返回 HTTP 200，JS/CSS 均成功加载。验证后已结束。 |
| `npm install --no-save --package-lock=false --cache .npm-cache --no-audit --no-fund playwright` | 安装临时浏览器验证工具，不写入项目依赖或 lockfile。 |
| 设置 `PLAYWRIGHT_BROWSERS_PATH` 为本 solution 下 `.browser` 后执行 `.\node_modules\.bin\playwright.cmd install chromium` | 测试浏览器下载成功，存放在当前 solution 内。 |
| `node .verification/inspect.mjs http://127.0.0.1:5173/ 60 dev` | 开发版本连续观测 60.085 秒，无脚本错误、请求失败或上下文丢失；当时 SwiftShader 平均 1.85 FPS。该观测不代表最终代码性能。 |
| `node .verification/inspect.mjs http://127.0.0.1:5173/ 10 composition` | **未完成**：开发热更新重新加载了页面，导致 `page.evaluate: Execution context was destroyed, most likely because of a navigation.`。后续运行验证使用固定的生产产物。 |
| `node .verification/inspect.mjs http://127.0.0.1:4173/genshin-celestia/gpt-6-astra-ultra/ 60 production` | 生产观测通过，60.004 秒、平均 6.47 FPS，无脚本错误、请求失败或上下文丢失。 |
| `node .verification/inspect.mjs http://127.0.0.1:4173/genshin-celestia/gpt-6-astra-ultra/ 60 final` | 最终代码观测通过，60.105 秒、386 帧、平均 **6.42 FPS**，P95 帧间隔 183.2 ms；无脚本错误、请求失败或上下文丢失。 |

浏览器测试执行了拖动旋转、滚轮缩放、双击复位，并分别截图检查。默认画面直接呈现完整主岛、八座环形浮岛、白色拱桥、多层圣殿与金色天体仪，没有 UI。截图可辨认草地、树林、岩壁遗迹、断桥、悬空瀑布、碎石与云海；旋转后可观察真实三维体积。初始化无外部素材请求。

验证脚本、截图、运行数据、浏览器和构建产物保留在本运行目录的忽略路径中，不作为应用依赖提交。所有测试浏览器由脚本 `finally` 关闭。

`git diff --cached --check` 通过；暂存范围仅包含 solution 下 12 个项目文件。Windows 上 Ctrl+C 退出 npm 后 Vite 子进程仍在运行，确认其命令行属于本 solution 后执行 `Stop-Process -Id 19404,35240` 清理，端口 5173 与 4173 均无监听，测试浏览器无残留。

## 限制与失败

- 当前浏览器实际使用 `ANGLE / Vulkan / SwiftShader Device (Subzero)` 软件渲染；6.42 FPS 不流畅，不能声称已达到游戏帧率。未在硬件 GPU、其他浏览器或移动设备上验证。浏览器输出 `GPU stall due to ReadPixels` 性能警告。
- 内置浏览器工具返回 `The browser access host is unavailable`，因此没有通过该工具完成目测；上述画面检查来自独立 Chromium 的实际截图。
- 场景根据任务文字和对游戏远景的记忆程序化建模，未访问参考图片、官方模型或其他候选实现，无法声明与游戏资产精确一致。
- 云海和光束采用透明分层几何与着色器近似体积效果；远方大陆为低对比程序山地轮廓，不是完整提瓦特地图。
- 任务不提供固定可执行测试。已执行类型检查、实际构建和浏览器运行检查，没有声称通过不存在的测试套件。

## 人工介入

安装、运行与静态构建不需要凭证或人工配置。若需确认流畅度和最终美术还原度，需要在启用硬件加速的浏览器上按同一视口进行人工评审；本次没有部署到外部服务。
