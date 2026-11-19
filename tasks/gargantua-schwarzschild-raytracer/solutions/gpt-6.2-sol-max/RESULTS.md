# GARGANTUA 验收记录

## 运行身份

- 完整模型标识：`gpt-6.2-sol:max`
- Harness：Codex desktop，使用 `functions.exec` 执行 shell，使用 `ego-browser` v2.2.1 做浏览器验收
- 起始 `main` commit：`1d1fcb9e1d745cca9a36285df78555dede277136`
- 验收日期：2026-11-18

## 实际执行的命令

- `npm install`，退出码 `0`。安装了 67 个包，npm 输出了 4 个 high severity audit warnings，本次没有执行 `npm audit fix`。
- 初次 `npm run build`，退出码 `1`。Three.js vendor 缺少 `three.core.js`，Vite 报告 `Could not resolve "./three.core.js"`。
- 从已安装的 `three@0.180.0` 复制 `build/three.core.js` 到 `vendor/` 后再次执行 `npm run build`，退出码 `0`。最终构建使用 Vite `6.4.6`，同时输出了 bundle 超过 500 kB 的提示。
- `npm run preview -- --host 127.0.0.1 --port 4173`，成功启动 `http://127.0.0.1:4173/`。验收结束后已停止该 preview 进程。

## 浏览器验收

使用 `ego-browser` 在生产预览页面检查了以下项目。

- 桌面 `1440 × 900`。默认页面首帧显示完整黑洞、深黑事件视界、橙色临界环、透镜星空和前后盘面。OrbitControls 拖拽改变了相机方位/俯仰状态，四个预设均可点击，`Shift+1` 至 `Shift+4` 可切换。
- 移动端 `390 × 844`、device scale factor `2`。Standard 质量下临界环和中心黑洞保持可辨识，HUD 的 `CONTROLS` 抽屉可以打开并滚动访问参数。
- 页面包含 21 个 `input[type="range"]` 控件。实测改变 FOV、镜头预设、质量、诊断、HUD 和 OrbitControls 后状态与画面都会变化。修改后的参数在 reload 后保留，`R` 会恢复默认值。
- 质量档实际改变了渲染预算。桌面上 `standard` 的 canvas drawing buffer 为 `1123 × 702`，`high` 和 `cinematic` 为 `1440 × 900`。shader 逐像素积分步数分别为 `100`、`170`、`260`。
- `0` 至 `9` 诊断状态都可通过键盘和下拉菜单切换，并显示对应诊断名称。诊断覆盖步进/曲率、事件视界、盘面交点阶次、Doppler/红移、透镜背景、星空/银河、HDR、最近接近和质量相位。
- `?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0` 在首次可截图帧前得到 `dataset.gargantuaReady === "true"`。`window.__GARGANTUA__` 的五个公开方法均为 function，`ready` 为 true，`playing` 为 false，时间在等待 550 ms 后仍为 `12.5`，HUD 已隐藏。
- 非法 URL `?capture=1&quality=bad&preset=99&debug=12&time=-3&hud=2` 安全回退到 `quality=high`、`preset=0`、`debug=0`、`hud=true`、`time=0`，页面仍然 ready。
- 通过 `WEBGL_lose_context` 实际诱发上下文丢失。丢失期间出现 `WEBGL CONTEXT LOST` 可恢复提示，调用 `restoreContext()` 后提示消失，ready 和公开 API 恢复，持久化状态仍在。
- 最终 Network 事件只观察到本地预览页面、`/assets/index-LiH2SJDA.js`、`/assets/index-C_IbLljs.css` 和浏览器扩展注入脚本。没有应用的远程视觉/音频/字体请求，没有 loading failure。最终页面控制台 error 列表为空。

## 已知限制与人工介入

- npm 安装阶段报告 4 个 high severity audit warnings，未进行自动升级，以保持锁定版本和任务范围稳定。
- 视觉效果依赖 WebGL2 和 GPU。当前验收环境支持 `WEBGL_lose_context`，因此上下文恢复已实测。没有实现可选氛围音乐，不影响核心渲染和交互要求。
- 临界环在 shader 的数值积分结果上绘制，并在窄屏上加入基于临界 impact parameter 的轻量投影保底，使纵向移动端仍能看到环结构。该保底不会替代射线积分、事件视界判断或盘面路径求交。
- 任务没有提供额外自动化测试套件，本次没有声称执行不存在的测试。没有需要用户人工介入的步骤。
