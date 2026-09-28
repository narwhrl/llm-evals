# 候选实现结果报告 — cs-pvp-diorama

## 基本信息

- 任务：`cs-pvp-diorama`（CS PVP 巷战地图微缩沙盘，提示词见 [`../task.md`](../task.md)）
- 完整模型标识：`deepseek-v4.1-flash`
- 候选分支：`llm/cs-pvp-diorama/deepseek-v4.1-flash`
- 候选路径：`tasks/cs-pvp-diorama/solution/`
- 起始 `main` 基线提交（完整 SHA）：`ee2c9f2cc8b9b410ebd55d1c195e96a9cdbd4ce3`
- 运行环境：Windows / Node.js v24.21.0 / npm 11.19.0 / Vite 8.3.0 / three.js 0.186.0
- 浏览器：Chrome（`--headless=new`，`--use-angle=d3d11`），`WEBGL_debug_renderer_info` 报告
  `ANGLE (Intel, Intel(R) Arc(TM) 140T GPU (48GB) (0x00007D51) Direct3D11 vs_5_0 ps_5_0, D3D11)`，WebGL 2.0
- 评测视口：`1440 × 900`（CDP `Emulation.setDeviceMetricsOverride`，`deviceScaleFactor 1`，`drawingBuffer 1440×900`）

## 交付形态

Vite + three.js 单页应用，无任何界面元素：

- `/` 直接呈现整张沙盘，没有任何按钮、文字、HUD、加载页；`document.body` 可见子节点只有 `canvas`
- 交互：左键拖拽环绕、滚轮缩放、右键/中键平移（相机控制见 README）
- 全部贴图由 Canvas2D 在运行时按固定种子程序化生成，运行时**零外部资源请求**；
  生产构建的页面实测只发出 1 个资源请求（JS bundle 本身）
- 场景内容全部落在 64 × 64 的正方形混凝土底座内

## 验证命令与结果

> 以下命令均在本工作树 `.worktrees/cs-pvp-diorama/deepseek-v4.1-flash/tasks/cs-pvp-diorama/solution/` 中实际执行，
> 输出为观测到的原始结果（截取关键行）。

### 1. 依赖安装与生产构建

```
$ npm ci --no-audit --no-fund
added 16 packages in 6s

$ npm run build
vite v8.3.0 building client environment for production...
✓ 52 modules transformed.
dist/index.html                  0.53 kB │ gzip:   0.36 kB
dist/assets/index-BRvqt2W0.js  793.93 kB │ gzip: 211.29 kB
✓ built in 276ms
```

### 2. 本地运行命令

```
$ npm run preview
> vite preview
Port 4173 is in use, trying another one...
  ➜  Local:   http://127.0.0.1:4174/
```

在该 URL 上加载 `http://127.0.0.1:4174/`：页面正常、控制台无异常、`window.__diorama` 可用、审计全绿（数据见第 4 节）。
开发路径 `npm run dev`（`http://127.0.0.1:5173/`）同样实测通过，并额外用注入式 `window.__errs` 钩子捕获
`error` / `unhandledrejection` / `console.error` / `console.warn`，结果为空数组。

### 3. 部署同构构建（`base` 子路径）

仓库的 `deploy/build.mjs` 通过 `git for-each-ref refs/remotes/origin/llm/` 从 **origin 上已推送的候选分支**构建；
按仓库约定本候选分支未推送，因此**没有直接运行该脚本**，而是用与之逐字相同的构建命令做了等价验证：

```
$ npm run build -- --base=/cs-pvp-diorama/deepseek-v4.1-flash/ \
    --outDir=<worktree>/tasks/cs-pvp-diorama/.deploy-check/cs-pvp-diorama/deepseek-v4.1-flash --emptyOutDir
✓ built in 272ms
```

- 产物 `index.html` 中资源引用为 `src="/cs-pvp-diorama/deepseek-v4.1-flash/assets/index-BRvqt2W0.js"`（子路径正确）
- 以 `deploy/public` 的目录布局托管该目录后，用无头 Chrome 打开
  `http://127.0.0.1:4199/cs-pvp-diorama/deepseek-v4.1-flash/`，静态服务器日志只有两条、且全部 200：

```
GET /cs-pvp-diorama/deepseek-v4.1-flash/ -> 200 (566 B)
GET /cs-pvp-diorama/deepseek-v4.1-flash/assets/index-BRvqt2W0.js -> 200 (793932 B)
```

- 页面侧 `performance.getEntriesByType('resource')` 只有该 bundle 一条记录，**没有 404、没有多余请求**；
  CDP 的 `Runtime.exceptionThrown` 与 `Log.entryAdded` 均为空

> 备注（环境细节，不影响构建产物）：在 Git Bash 中直接把 `--base=/...` 作为参数传入会被 MSYS 路径转换改写成
> `C:/Program Files/Git/...`，必须加 `MSYS_NO_PATHCONV=1`；`deploy/build.mjs` 用 `spawnSync(cmdline, { shell: true })`
> 走 cmd.exe，不受此影响，本地复现它时才需要该变量。

### 4. 浏览器审计（1440 × 900，生产构建）

```
drawCalls 725   triangles 87600   meshes 228   instances 673
programs 35     materials 54      textures 77  geometries 210
lights 11       animatedLights 11
bounds { min: [-32, 0, -32], max: [32, 8.67, 32] }
violations []   forbiddenNames []  domNodes [{ canvas, visible: true }]
fx { rain: { drops: 3600, drawCalls: 1 },
     drips: { sources: 30, drops: 38, drawCalls: 1 },
     steam: { sources: 8, puffs: 14, drawCalls: 1 } }
```

- 灯光构成（`countLights()`）：point 10 / spot 1（区域灯）+ directional 2 / hemisphere 1（环境灯）；
  其余灯具一律用自发光材质 + Bloom 表现，不占实时光源预算
- `violations` 为空表示所有静态世界层网格的包围盒都在底座 64 × 64 内、且没有落到 y < 0；
  `bounds` 的最大 y = 8.67（电线杆与天桥，未越界）
- `forbiddenNames` 为空：场景里不存在名字命中 `person|human|mannequin|character|actor|player|soldier` 的对象

### 5. 交互回归（真实 CDP 输入事件，生产构建）

用 `Input.dispatchMouseEvent` / `Input.dispatchMouseEvent(mouseWheel)` 打真实指针与滚轮事件后读 `audit().camera`：

| 阶段 | distance | azimuth | polar |
| --- | --- | --- | --- |
| 初始 | 91.76 | 0.71 | 1.05 |
| 左键横向+纵向拖拽 12 段 | 91.76 | **-0.50** | **1.45** |
| 滚轮放大 ×6 | **58.91** | -0.57 | 1.47 |
| 滚轮缩小 ×14 | **155**（= `maxDistance`） | -0.57 | 1.47 |
| 继续向下拖拽 ×20 | 155 | -0.57 | **0.08**（= `minPolarAngle`） |
| 向上拖拽 3 轮 | 155 | -0.57 | **1.50**（= `maxPolarAngle`） |
| 滚轮放大 4 轮 | **10**（= `minDistance`） | -0.57 | 1.50 |

即：旋转、双向缩放均生效，且四个限位（10 / 155 / 0.08 / 1.5）都被精确夹住。同一次会话中
`window.__errs` 为空、`document.body` 可见子节点只有 `canvas`。

### 6. 性能

在 `1440 × 900` 视口下以同步步长推进帧，每批 30 帧后 `gl.finish()` 再计时（3 批）：

```
perFrameMs [4.89, 15.05, 14.36]   median 14.36 ms ≈ 70 FPS
```

取中位数 14.36 ms/帧作为保守结论（首批评测到 4.89 ms，属 GPU 时钟/队列深度带来的抖动，不作为结论）。
`step()` 是同步批处理、不含空闲时间，因此这是吞吐下界，真实交互帧率不低于该值。

### 7. 区域级离线审计（临时脚本，验证后已删除）

区域模块与 `layout` 蓝图可在 Node 中直接构建（不依赖 WebGL），统计与越界检查结果：

| 区域 | 合并网格 | 道具实例 | 批量 | 区域实时光源 | 贴花 | 滴水 | 白汽 | 水面 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| t-spawn | 51 | 141 | 32 | 1 (point) | 14 | 7 | 1 | 0 |
| a-site | 35 | 65 | 22 | 1 (point) | 11 | 8 | 1 | 0 |
| mid | 16 | 17 | 4 | 1 (point) | 17 | 5 | 1 | 1 |
| b-site | 63 | 63 | 32 | 2 (point,point) | 15 | 6 | 2 | 0 |
| ct-spawn | 32 | 54 | 21 | 2 (point,spot) | 11 | 6 | 1 | 0 |
| routes | 56 | 130 | 28 | 2 (point,point) | 44 | 10 | 1 | 2 |
| overhead | 7 | 11 | 3 | 0 | 5 | 6 | 0 | 0 |
| interiors | 44 | 46 | 23 | 2 (point,point) | 9 | 8 | 1 | 0 |

```
regions ok: 8/8
no problems detected
prop registry ok
```

检查项：无空网格、无 NaN 包围盒、无区域越出底座或穿地、道具 key 全部存在于注册表（64 种）、
材质名全部合法、地面贴花标高与铺装面一致。上述输出在 `routes.js` 重写后的**最终区域代码**上取得；
后续对入口、贴花材质、雨丝的修改不影响区域模块，最终代码状态下同一脚本再次运行结果一致（末尾三行）。

### 8. 视觉复核

通过 `window.__diorama.setView()` 的 14 个预设机位（overview / tSpawn / aSite / aSiteBay / mid / midDoor /
bSite / bSiteYard / ctSpawn / elevated / lowAngle / routeLeft / routeRight / sewer）逐个取景核对，
覆盖四个核心区、三条路线族、高台与天桥、两处室内、贴地低角度。评审中修正并复验的问题：

- 贴花（涂鸦/弹孔/货运编号/包点喷漆）原本以不受光的满亮度绘制，夜里像贴纸；改为按类型的
  压暗 + 不透明度控制，并让 12 处此前被忽略的 `opacity` 参数真正生效
- `aSiteInside` / `bSiteInside` 两个预设机位分别在阁楼下方、抬高地坪下方取景，画面被楼板遮住；
  换成仓库跨间内景（`aSiteBay`）与 B 区门前空场（`bSiteYard`），并覆盖检查
- 雨丝会穿进有顶的体量（A 区仓库、B 区住宅、下水道方涵）内部；在雨丝顶点着色器里加入 3 个屋顶
  矩形遮挡区，室内不再出现雨条，室外雨势不变

截图仅作为过程证据保存在工作树内的临时目录，验证后已随临时脚本一并删除（未进入提交）。

## 与验收轴的对照

- **沙盘构图**：单个 64 × 64 正方形底座，外围围墙把街区切成一块被取出的地块，`bounds` 与 `violations` 可证无外溢
- **地图拓扑**：T 出生点（北）/ CT 出生点（南）/ A 区（西北仓库）/ B 区（东北后街）由中轴主通道连接，
  另有左侧小巷、右侧高台与天桥两条侧翼路线，以及中路下方的低矮下水道；`elevated` 与 `routeLeft/routeRight` 机位可核对
- **区域还原度**：各区域体量、出入口、掩体与标志性道具见 README 的场景结构表；区域级审计给出每个区域的实际网格/道具/贴花/灯光数量
- **环境细节**：湿沥青（积水遮罩 + 雨涟漪 + 湿面高光 + 平面反射）、混凝土墙面雨痕与锈迹、空中电线、
  涂鸦/货运编号/弹孔/警徽/警戒标语、托盘油桶线缆盘沙袋等道具族
- **美术方向**：三渲二色阶 + Sobel 描边 + Bloom；冷色雨夜环境光与暖黄路灯、红蓝警灯形成对比
- **动态氛围**：GPU 雨丝、滴水、墙面淌水、积水涟漪与倒影、灯具轻微闪烁、探照灯扫动、警灯交替、蒸汽、雷光
- **交互与运行时**：无 UI、无人物；拖拽/缩放实测有效且限位精确；`npm run build` 与 `npm run preview` 通过；
  页面只请求 1 个资源且无 404；审计会话中无控制台异常

## 已知限制、失败与需要人工介入的点

1. **`deploy/build.mjs` 未直接运行**：该脚本只构建已推送到 `origin/llm/*` 的分支。本候选分支按仓库约定未推送，
   因此用逐字相同的构建命令 + 临时静态服务器做了等价验证（第 3 节）。若需要官方产物，请先推送本分支再运行
   `node deploy/build.mjs cs-pvp-diorama/deepseek-v4.1-flash`——这是唯一需要人工介入的步骤。
2. **没有参考图与人工评分**：本任务不提供参考画面与固定测试，美术方向、构图、还原度为自评，
   依据是浏览器实拍与审计数据，不含任何主观分数。
3. **性能数据的适用范围**：14.36 ms/帧 来自无头 Chrome + 真实 GPU（ANGLE/D3D11，Intel Arc 140T）。
   无头标签页不在前台时浏览器会节流 `requestAnimationFrame`，此时读到的 `fps/frameMs` 无参考价值，
   交互帧率必须在可见标签页中读取。同一帧内的反射更新为隔帧执行（`REFLECTION_INTERVAL = 2`）。
4. **无自动化视觉回归**：多机位取景、贴花强度、曝光基线都是人工逐张核对后手动调参，没有像素级基线可比对。
5. **屋顶遮挡区是矩形近似**：雨丝遮挡按 3 个矩形区域计算（A 区仓库、B 区住宅、下水道方涵），
   A 区屋顶的天窗没有被单独挖出，即天窗正下方也不会下雨；视觉上不可辨。
6. **区域交界处的体量交叠**：下水道方涵北端与 T 区坡道护墙、岗亭地台存在 LAYOUT 边界导致的少量体量交叠
   （被对方结构遮挡，未越界、无外露穿模），属已知并接受的情况。
7. **未做分辨率自适应**：`devicePixelRatio` 上限固定 1.75，没有按帧时动态降采样；当前帧时余量充足，
   未引入该复杂度。

## 提交说明

按仓库「每个提交一个逻辑变更」的要求按层拆分；本次是全新工程，因此**只有最后一个功能提交之后
`npm run build` 才可通过**，之前各提交是纯模块新增（入口尚未装配），这一点如实记录：

| 提交 | 内容 |
| --- | --- |
| `chore:` | Vite + three.js 工程骨架（依赖、构建配置、入口页面、README） |
| `feat:` | 渲染管线、程序化材质与几何构建层（`src/core`、`src/gfx`、`src/build`） |
| `feat:` | 坐标蓝图、八大区域、湿地面与动态特效（`src/scene`、`src/ground`、`src/fx`） |
| `feat:` | 入口渲染循环与调试审计接口（`src/main.js`） |
| `docs:` | 本结果报告 |
