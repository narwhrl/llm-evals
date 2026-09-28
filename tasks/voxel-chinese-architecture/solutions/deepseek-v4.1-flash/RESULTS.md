# 结果报告 · 体素中式古典建筑群

## 模型与基线

| 项 | 值 |
| --- | --- |
| 完整模型标识 | `deepseek-v4.1-flash` |
| 起始 main commit SHA | `ee2c9f2cc8b9b410ebd55d1c195e96a9cdbd4ce3` |
| 分支 | `llm/voxel-chinese-architecture/deepseek-v4.1-flash` |
| 工作树 | `.worktrees/voxel-chinese-architecture/deepseek-v4.1-flash` |
| 交付路径 | `tasks/voxel-chinese-architecture/solution/` |
| 依赖 | `three@0.186.0`、`vite@7.3.6`（沿用任务既有依赖，未新增） |

分支起点与 main 一致（`git merge-base main HEAD` 即上述 SHA），未从其他模型分支取用任何内容。

## 交付内容

`tasks/voxel-chinese-architecture/solution/`：`index.html`、`vite.config.js`、`package.json`、
`package-lock.json`、`README.md`，以及 `src/` 下的体素引擎（`core/`）、程序化建筑生成
（`build/`：构件、屋顶、殿堂、钟鼓楼与宝塔、陈设、铺装、总平面）、渲染与交互
（`render/`：天穹与光照、机位、HUD）与引导（`main.js`）。

## 场景规模（实测）

`node .scratch/metrics.mjs`（构建 `buildScene()` 后统计）：

```
voxels:    289918
tight:     {"minX":-125,"maxX":125,"minY":0,"maxY":78,"minZ":-168,"maxZ":148}
floating:  0
compiled:  {"voxels":289918,"boxes":12263,"families":9,"instances":12263,"triangles":147156}
materials: 9
```

运行时（`renderer.info.render`）：`calls: 19`、`triangles: 295528`。

## 实际执行的验证命令与结果

| # | 命令 / 场景 | 结果 |
| --- | --- | --- |
| 1 | `npm install` | three 0.186.0 + vite 7.3.6 安装成功，`package-lock.json` 保留并提交 |
| 2 | Node 探针 `buildScene()` + `compileVoxels()` | 上表数字；**悬空体素 0**；9 个材质族 |
| 3 | `npm run build` | 成功：`dist/index.html` 1.81 kB、`dist/assets/index-FA17MqT.js` 593.94 kB（gzip 155.34 kB），约 0.7 s |
| 4 | `npm run preview` + 无头 Chrome 153（CDP，1440×900，dpr 1，WebGL 2.0） | 首屏无参数加载 → `view=bird`，完整建筑群入画；控制台 **logs: []**（无报错、无 404、无弃用警告） |
| 5 | 7 个机位逐一 `setView` 后截图 | 全部相机坐标为有限值（`bird`/`axis`/`top`/`gate`/`mainHall`/`courtyard`/`pagoda`） |
| 6 | 3 个时间档 `setTimeOfDay` 后截图 | 晨 / 午 / 昏太阳角度、色温、雾、曝光与灯笼自发光均有可见变化 |
| 7 | 深链 `?view=top`、`?view=mainHall&tod=dusk` | 回读 `view`/`tod` 与参数一致，相机坐标正确 |
| 8 | 真实鼠标输入（CDP `Input.dispatchMouseEvent`） | 拖拽旋转：`[160.4,202.6,334.7]` → `[-82.6,272.8,316.3]`；滚轮缩放：→ `[-75.2,240.6,272.9]` |
| 9 | 子路径画廊兼容：`MSYS_NO_PATHCONV=1 npm run build -- --base=/voxel-chinese-architecture/deepseek-v4.1-flash/ --outDir=…`，静态托管后加载 | 产物 `src="/voxel-chinese-architecture/deepseek-v4.1-flash/assets/…"`；页面 boot ready、深链正确、**logs: []**（无 404） |

验证用的驱动器是无头 Chrome + CDP（`.scratch/wb/cdp.mjs`，Node 内置 `WebSocket`，不引入依赖）；
截图与探针脚本都在 `.scratch/`（已 gitignore，不随交付提交）。

## 本轮修复的问题（均先复现、后确认）

1. **机位相机为 NaN**：`layout.js` 的机位用 `fit: "ensemble"` 字符串指向取景盒，而 `controls.js`
   把 `anchor.fit` 直接当包围盒用，`box.maxX === undefined` → 相机坐标 NaN → 画面全空。
   修复：`applyView` 支持字符串取景盒名（回退到 `anchors[fit]`）。
2. **首屏取景盒偏小**：`ensemble` 原为 `x ±94、y ≤58、z -126..142`，而建筑群实测为
   `x ±119、y 2..78、z -155..147`——宝塔（高 78）与东西院墙都被切掉。按实测值放大取景盒。
3. **放生池被铺装盖住（看不到水面）**：`VoxelWorld.ring` 的第三条边宽度写成整宽 `w`，
   实际把圈内填实，于是池底水面（y=0）之上又铺了一层石面（y=1）。修复该边界盒宽度后，
   水面对外露出，石桥跨在水上（已在总平面机位截图确认）。
4. **匾额是空板**：`plaque` 的笔画分支条件为 `h >= 5`，而三处调用点全是 `h: 4`，属死代码。
   改为两行点阵（内高够时用三行），匾额现在有两个金色字块。
5. **`/favicon.ico` 404**：控制台唯一的一条错误。补内联 SVG favicon。
6. **three r186 两处弃用**：`PCFSoftShadowMap` 已被移除（three 会自动回退并告警）、
   `Clock` 已弃用。改用 `PCFShadowMap` 与 `Timer`（`Timer` 顺带接上 Page Visibility）。
7. **`tower.js` 里避坑用的 `wallRing` 重复实现了 `world.ring`**：改为转调原语，单一实现。
   改动前后 `buildScene()` 的体素数/合并盒/三角面完全一致，证明行为等价。
8. **`main.js:96` 两条语句挤在一行**：拆行。

## 已知限制与未验证项

- **帧率未实测**：无头环境下 `requestAnimationFrame` 被节流（HUD 的 FPS 显示 0），
  因此没有任何有意义的帧率数据。可用的负载证据是 19 个 draw call / 29.6 万三角面
  （约为任务给定 350 万三角面预算的 8%），**不能据此声称已达到 60 FPS**。
- **未在真实 GPU 的交互式浏览器里人工看过**：所有视觉核对都来自无头 Chrome 的截图
  （D3D11 / SwiftShader 渲染路径）。颜色与阴影层次与硬件差异应当很小，但未经确认。
- 阴影贴图为 4096、`normalBias 0.7`；低端设备若掉帧可降到 2048（未做自适应降档）。
- 匾额文字是 3×2 点阵示意，不是可读汉字。
- 钟楼与宝塔没有踏跺（`tower.js` 未做台阶，总平面也未接线）；任务形制清单未要求台阶升到塔基，
  故按「不动已验证代码」处理。
- 手动拖拽相机后，HUD 上原来高亮的机位按钮不会取消高亮（相机已不在该预设上）。
- 未做后处理（AO / 抗锯齿之外的抗锯齿），无 LOD、无按距离剔除。

## 需要人工介入

- **kimi-webbridge 扩展未连接**：本轮开始时 `http://127.0.0.1:10086/status` 返回
  `extension_connected: false`（且 `skills: []`），无法用用户的真实浏览器验证，
  故改用无头 Chrome + CDP 完成全部浏览器侧验证。若需在真实浏览器里复核，需人工连接该扩展。
- **未推送、未部署**：按仓库约定，候选实现只提交到本模型分支；画廊发布
  （`deploy/build.mjs` + 推送）需人工决定并执行。
- 本轮启动过的服务进程（`vite preview` 4173、临时静态服务 4180、无头 Chrome 9222）
  已全部回收，`netstat` 确认三个端口均无监听。
