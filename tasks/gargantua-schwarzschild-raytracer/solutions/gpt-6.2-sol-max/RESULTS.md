# GARGANTUA 验收记录

## 候选信息

- 完整模型标识：`gpt-6.2-sol:max`
- 实际运行 harness：Codex API agent，使用 `functions.exec` 执行命令，使用 `ego-browser` v2.2.1 进行浏览器验收
- 起始 main commit：`1d1fcb9e1d745cca9a36285df78555dede277136`

## 实际执行的命令

| 命令 | 结果 |
| --- | --- |
| `npm install` | 默认沙箱首次因 npm cache-only 网络限制返回 `ENOTCACHED`。在允许网络的执行环境重试成功，安装 62 packages，退出码 `0`。npm 报告 2 个 audit vulnerabilities，未执行 `npm audit fix`。 |
| `npm run build` | 默认沙箱首次因 esbuild 子进程 `spawn EPERM` 失败。在允许启动子进程的执行环境重试成功，Vite `6.0.11` 生成 `dist/`，退出码 `0`。 |
| `npm run preview` | 成功启动 `http://127.0.0.1:4173/`，用于下列静态产物验收。 |

## 浏览器证据

- 桌面端使用 `1440 × 900`、device scale factor `1`。页面首帧将 `document.documentElement.dataset.gargantuaReady` 设为 `true`，`window.__GARGANTUA__.ready` 为 `true`，默认画面显示深黑事件视界、光子环、前景吸积盘带、星空和银河背景。控制台错误数为 `0`。截图见 `evidence/desktop-1440.png`。
- 移动端使用 `390 × 844`、device scale factor `2`。HUD 面板边界为 `x=10,y=58,width=370,height=776`，页面没有横向溢出。隐藏 HUD 后通过 `Input.dispatchTouchEvent` 拖拽画布，方位角从 `24` 变为 `13.12`，俯仰角从 `18` 变为 `9.79`，电影循环自动停止。截图见 `evidence/mobile-390.png`。移动端控制台错误数为 `0`。
- 截图 URL `?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0` 应用为 `quality=high`、`preset=0`、`debug=0`、`time=12.5`、`hud=false`、`moviePlaying=false`。等待两个时间采样后时间仍为 `12.5`，ready 标志为 `true`，截图见 `evidence/capture.png`。
- 完整 capture 矩阵实际加载了 4 个 preset 与 10 个 debug 编号共 40 个 URL，40/40 通过状态断言，无失败。
- 非法 URL `?capture=2&quality=broken&preset=12&debug=99&time=-4&hud=4` 安全回退为默认 `quality=high`、`preset=1`、`debug=0`、`time=0`、`hud=true`，页面仍 ready。
- `window.__GARGANTUA__` 暴露 `getState`、`setQuality`、`setPreset`、`setDebug`、`setTime` 与只读 `ready`。四个 preset、三档质量和十个 debug 编号均通过 API 返回更新后的状态。非法 API 输入保留当前合法状态，不抛出未处理异常。
- Orbit 拖拽让相机从 `cameraAzimuth=−18,cameraElevation=52` 变为 `−36.36,43.65`。滚轮后相机距离从 `9.4` 变为 `12.024`。质量切换实际改变 canvas drawing buffer，High 为 `971×704`、Standard 为 `734×532`、Cinematic 为 `1185×859`。
- 参数滑块将 FOV 从 `46` 改为 `78`，重新加载后仍为 `78`。可见 `RESET INSTRUMENT` 恢复为默认状态。HUD、preset、质量与 debug 状态均写入版本化 `localStorage`。
- `WEBGL_lose_context` 在当前浏览器可用。主动丢失上下文时观察到恢复提示，调用恢复后 banner 消失，`ready=true`、画布重新渲染且控制台错误数为 `0`，未刷新页面。截图见 `evidence/context-restored.png`。
- 页面资源检查只看到同源的 `http://127.0.0.1:4173/assets/index-*.js` 与 `index-*.css`，没有运行时 CDN、贴图、音频、字体或 API 请求。

## 已知限制与人工介入

- npm 安装和 Vite 构建在默认受限沙箱中分别遇到 `ENOTCACHED` 与 `spawn EPERM`，已在允许网络和子进程的执行环境完成同一命令。该环境差异不是应用运行时失败。
- npm 安装输出包含 2 个 audit vulnerabilities，未自动升级依赖，以保持锁定版本与任务范围不变。
- Vite 报告生产 JavaScript chunk 超过 `500 kB` 的非致命警告，主要来自本地 Three.js 与 shader 应用合并到同一入口。
- 当前验收环境支持 `WEBGL_lose_context`，因此上下文恢复路径已实际验证。没有需要人工介入的浏览器步骤。
