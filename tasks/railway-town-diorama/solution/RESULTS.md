# 运行结果

- 模型：`gpt-6-astra:ultra`
- 起始 `main` commit：`55b71efeded8a28b59af881484296ca606a067e1`，通过仓库根目录的 `git rev-parse HEAD` 实际读取。
- 环境：Windows、Node.js `v24.21.0`、npm `11.19.0`。
- 实现范围：`tasks/railway-town-diorama/solution/`，未修改共享输入。

## 实际验证

下列 npm、Node 命令均在 `solution/` 中执行。

| 命令 | 结果 |
| --- | --- |
| `npm install --cache .npm-cache --no-audit --no-fund` | 成功安装 15 个依赖包，生成 `package-lock.json`。npm 提示 esbuild 安装脚本尚未授权；现有平台二进制可正常构建，无需额外操作。 |
| `node --check src/buildings.js` | 语法检查通过。 |
| `node --test tests/railway.test.js`、`npm test` | 10 项测试全部通过，无跳过。覆盖闭环连接、切线、逐车采样间距、每圈停站、暂停计时、速度、复位及大步长与细步长一致性。 |
| `npm run build -- --base=/railway-town-diorama/gpt-6-astra-ultra/ --outDir=dist-check` | 最终源码构建成功；JS 562.79 kB，gzip 147.74 kB。保留 Vite 的超过 500 kB 分块提示，未屏蔽该提示。 |
| `npm run dev -- --port 5173 --strictPort` | 本地服务启动成功，用于实际浏览器验证，交付前已停止。 |
| `node .verification/inspect.mjs` | Chromium 实际渲染白天／夜晚截图，WebGL 场景正常，未记录页面或控制台错误。 |
| `node .verification/review-check.mjs` | 使用当前源码验证相机复位后持续 120 次更新不漂移；道床法线向上；26 处显式树位的树干避开列车运行包络，最小保守净空 0.5817。 |
| `node .verification/browser.mjs` | 最终运行全部通过：默认三节列车行驶、暂停冻结车辆、播放图标、速度倍率、真实灯光切换、拖动旋转、滚轮缩放、确定性复位、到站停留、停站期间暂停及继续发车、390px 窄屏不横向溢出；无页面或控制台错误。 |
| `npm run preview -- --outDir=dist-check --base=/railway-town-diorama/gpt-6-astra-ultra/ --port 4173 --strictPort` | 生产预览启动成功，交付前已停止。 |
| `node .verification/production.mjs` | 实际访问指定生产子路径，资源全部加载，WebGL 渲染、暂停图标与夜间切换正常，无 HTTP、页面或控制台错误。 |

浏览器验证临时使用 `npm install --no-save --package-lock=false --cache .npm-cache --no-audit --no-fund playwright@1.56.1` 和 `npx playwright install chromium`，均成功。设置 `PLAYWRIGHT_BROWSERS_PATH` 为本项目 `.cache/browsers`；使用 Chromium 141 的 SwiftShader 软件渲染。验证脚本与截图保存在忽略的 `.verification/`，不增加项目运行依赖。交互脚本仅注入只读状态采样，不替代列车或渲染实现。所有测试浏览器均在 `finally` 中关闭，Orca 创建的本地页面也已关闭。

## 验证中遇到的问题

- Orca 浏览器快照返回 `browser_owner_unavailable`，CUA 返回 `The browser access host is unavailable`；实际画面与交互检查使用本地 Chromium 完成。
- 早期浏览器检查有两次 30 秒超时：Vite 的热更新时间戳使验证脚本未匹配模块 URL；脚本兼容查询参数后检查继续通过。
- 一次到站检查 60 秒超时。`node .verification/timing.mjs` 测得软件渲染下实际经过 4.8665 秒、列车仅推进 1.4833 秒；当前动画采用真实帧间隔，停站与运动不再受每帧 0.1 秒截断影响，随后同一到站操作路径通过。
- 一次探索性几何检查错误地用 `JSON.parse` 解析 JavaScript 数组表达式而报 `SyntaxError`；最终 `review-check.mjs` 使用源码表达式完成检查。

## 限制与人工介入

- 无待处理的功能失败，无需人工介入即可本地安装和运行；未执行远程部署。
- 需要 WebGL 2。未在 Safari、Firefox 或真实移动设备上验证；390px 检查使用桌面 Chromium 的视口模拟。
- 软件渲染的 1440×1000 场景检查约每秒 4 帧，不能据此宣称硬件加速性能。当前场景约 256 次绘制、96,542 个三角形；真实 GPU 帧率未测量。
- 树位数值检查针对树干与列车包络，不是完整树冠碰撞检测。桌面白天、夜晚及窄屏截图均经过目视检查。
- Vite 的 JS 分块体积提示仍存在。
