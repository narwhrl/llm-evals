# RESULTS

- 模型标识：`claude-opus-5-5:max`
- 起始 commit：`f95b2e8c1380b78d2bce7ce335e0ad2e974a5183`（`git rev-parse HEAD`）
- 环境：Windows 11 Enterprise 10.0.26200，Node v24.21.0，npm 11.19.0。浏览器验证用的是系统自带的 Chrome 156.0.8078.76，以 headless 模式运行，由 playwright-core 1.64.0 驱动，视口 1440×900，启动参数 `--enable-unsafe-swiftshader --ignore-gpu-blocklist`。

## 实际运行的命令与结果

以下命令都在 `tasks/gaming-room-timeline/solution/` 下执行，另有说明的除外。

| 命令 | 结果 |
| --- | --- |
| `npm install` | 退出码 0，`found 0 vulnerabilities`，生成 `package-lock.json` |
| `npm run build` | 退出码 0，用时约 180 ms。产物 `dist/index.html` 2.53 kB；`assets/index-*.css` 4.56 kB；`assets/index-*.js` 721.48 kB（gzip 200.28 kB）。Vite 提示 chunk 超过 500 kB |
| `npm run build -- --base=/gaming-room-timeline/claude-opus-5.5/ --outDir=../../../.verify/dist-sub --emptyOutDir`（PowerShell） | 退出码 0。`index.html` 引用的是 `/gaming-room-timeline/claude-opus-5.5/assets/index-*.js` 和 `.css` |
| 同一条命令在 Git Bash 中执行 | 退出码 0，但 MSYS 路径转换把 base 改写成了 `/Program Files/Git/gaming-room-timeline/...`。这是 shell 环境的问题，README 里写明了规避办法 |
| `npx vite preview --base=/gaming-room-timeline/claude-opus-5.5/ --outDir=../../../.verify/dist-sub --port 5200 --strictPort` | 在 headless Chrome 中打开 `http://localhost:5200/gaming-room-timeline/claude-opus-5.5/`：1914 ms 后就绪。没有控制台错误，没有失败请求，也没有外部请求；2012 年屏幕视角渲染正常 |
| `npx vite --port 5199 --strictPort`（开发服务器） | 下文大部分交互检查都在这里完成 |
| `npm run preview -- --port 4173 --strictPort` | 用最终产物跑完整自动播放，结果见下文 |
| `node .verify/shot.mjs <url> '<步骤 JSON>'`（在仓库根目录的 `.verify/` 下执行） | 每次运行都输出 `logs: none` 和 `external requests: none` |

验证结束后，dev server 和 preview 都已关闭。我核对过：4173、5199、5200 端口没有监听，也没有残留的 vite 或 headless Chrome 进程。

## 浏览器中观察到的结果

以下都是 headless Chrome、1440×900 下的截图和页面状态。

- **加载**：从导航开始约 1.9–2.0 s 后，`#loading` 带上 `done` 类。
- **控制台和网络**：
  - 控制台没有 error，也没有 pageerror。
  - Chrome 的 ANGLE/D3D 着色器编译器会输出 X4122 警告（浮点精度提示，来自 GPU 后端，不是页面代码），验证脚本把它过滤掉了。
  - 没有失败的请求，也没有指向本地 origin 以外的请求。
- **关键年份**：我查看了 2005、2008、2012、2016、2020、2025 的全景。各年的电脑、显示器、外设、桌椅、游戏收藏和装饰都不同。
  - 2008 年以后，CRT 留在纸箱上。
  - 2016 年，旧写字台挪到床尾。
  - 2020 年翻新后，CRT、旧写字台和餐厅木椅组成复古角，CRT 循环播放像素赛车。
  - 2025 年，旧收藏摆进了玻璃柜。
- **屏幕操作**：
  - 2005：从桌面图标打开扫雷，左键翻开格子，计数显示 001；右键插旗。
  - 2008：在对战平台点“加入”，房间坐满 10 人，进入“正在载入地图”。
  - 2012：在游戏库选中“传送门 2”，显示“尚未安装”；点“安装”后出现下载进度（37%）。
  - 2016：在瞄准训练点“开始训练”，靶子出现；点空处后失误计数加 1。
  - 2020：点“下班!”后，工作窗口关闭，语音窗口打开，并弹出“下班啦，今天辛苦了!”。
  - 2025：在照片相册选中 2005，点“回到 2005”，时间轴跳回 2005，镜头飞到 CRT 屏幕前。
- **视角**：屏幕视角在 6 个关键年份都检查过；书桌和角落视角只抽查了部分年份，挡镜头的椅子会被隐藏。在近处拖动画布可以旋转视角，但镜头可能穿进家具（见下方限制）。
- **旧物与卡片**：
  - 点击右侧“妈妈的马克杯”，镜头飞到杯子，卡片显示 2025 年的回忆。
  - 点卡片里的 2005，时间轴跳回 2005，镜头跟到 2005 年杯子所在的位置，卡片换成 2005 年的回忆。
  - 悬停时显示物品名称，主屏幕的提示是“点击操作屏幕”。
- **自动播放**（生产构建，`npm run preview`）：
  - 按空格开始后，每隔约 8 s 读取一次滑块值：2009.73 → 2015.03 → 2019.84 → 2024.21 → 2025。
  - 到 2025 自动停止，按钮恢复为 ▶，全程约 32–40 s。
  - 之后拖动滑块到 2015.18，数值保持不动。
- **播放中拖动**：在自动播放过程中拖动滑块，播放停止，滑块停在 2019.98，2 s 后仍是 2019.98。
- **帧率**：headless 下测得 120.5 帧/秒。这是 SwiftShader / headless 环境下 requestAnimationFrame 的数值，不能代表真实 GPU 的性能。

## 已知限制与未验证项

- 没有在有界面的浏览器和真实 GPU 上测过，实际帧率未知。场景用了 2048 的阴影贴图；阴影只在时间或椅子可见性变化时更新，弱集显上的表现没有测。
- 只测了 Chrome，没有测 Firefox 和 Safari。窄屏（≤760px）有 CSS 适配，但没有实际打开验证。触屏操作也没有验证。
- 构建产物里的 JS 是单个 721 kB 的 chunk，three.js 占了大部分，所以 Vite 会给出 chunk 大小警告。没有做代码拆分。
- OrbitControls 没有碰撞检测，在近处旋转时镜头可能穿进家具。会自动隐藏的只有后墙和左墙（镜头位于其外侧时）。
- 只有当前主屏幕可以操作。副屏上的直播、竖屏聊天、笔记本表格和复古角 CRT 的像素赛车都只显示内容。
- 屏幕和卡片里的中文依赖系统的 CJK 字体（微软雅黑 / 苹方 / Noto Sans SC）。缺少这些字体的系统会回退到默认 sans-serif，外观会有差异。
- 房间里大多数物品都可以点击，其中 10 件带逐年回忆。我只抽查了其中一部分卡片（马克杯、各代显示器等），没有逐个点击全部物品。
- 在 Git Bash 下传 `--base=/...` 会被 MSYS 改写，见上表和 README。

## 人工介入

无。

验证脚本、它依赖的 playwright-core、截图和子路径构建产物都放在仓库根目录的 `.verify/` 下（`shot.mjs`、`shots/`、`dist-sub/`）。这些文件不在 solution 目录里，也没有提交。
