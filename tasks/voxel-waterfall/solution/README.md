# 体素山水瀑布 · Voxel Waterfall

Three.js + React + Vite 实现的体素（Minecraft 风格）自然景观：体素山脉、山腰云带与穿云而出
的峰顶、从高处倾泻并沿山体表面顺势而下的瀑布、山脚植被与晨昏光影。

- 默认地形 256 × 256 体素（可切到 200 / 256 / 320），单帧约 12 个 draw call、约 12 万面、约 99 万体素。
- 页面打开即自动入景并缓慢环绕，无需任何操作即可看到全貌。
- 右侧面板提供世界 / 瀑布 / 云与雾 / 光照与画面四组选项，改动即时生效，部分选项会重建世界几何。

## 运行方式

```bash
cd tasks/voxel-waterfall/solution
npm install        # 安装依赖（three、react、vite、typescript、oxlint）
npm run dev        # 开发服务器，终端会打印本地地址（默认 5173，端口被占用时自动顺延）
npm run build      # 生产构建：tsc -b 类型检查 + vite build，产物在 dist/
npm run preview    # 预览 dist/ 产物
npm run lint       # oxlint 静态检查
```

浏览器打开终端输出的地址即可（默认 `http://localhost:5173/`）。需要 WebGL2，建议使用 Chrome / Edge / Firefox 较新版本。

## 目录结构

```
solution/
├── index.html                 页面外壳（标题、favicon、挂载点）
├── vite.config.ts             Vite 配置（react 插件；base 由命令行 --base 覆盖，便于按路径前缀部署）
├── tsconfig*.json             严格 TS 配置（erasableSyntaxOnly / verbatimModuleSyntax / noUnusedLocals）
├── .oxlintrc.json             lint 规则
└── src/
    ├── main.tsx               React 入口
    ├── App.tsx                React 外壳：创建/销毁 viewer、管理选项状态、HUD 与错误浮层
    ├── index.css              全屏画布、选项面板、HUD、加载与错误浮层、响应式
    ├── scene/
    │   ├── options.ts         选项类型、默认值与时段预设（黎明/上午/正午/黄昏/夜晚）、需重建的键
    │   ├── noise.ts           mulberry32 随机数、值噪声、fbm、可平铺噪声与插值工具
    │   ├── terrain.ts         山体生成：主峰 + 次峰 + 山脚基座、脊线噪声、山腰悬崖带、边缘收束
    │   ├── mesher.ts          面剔除体素网格化：高度场专用与通用两套，顶点色 + 线性空间转换
    │   ├── water.ts           水系生成：源头水潭 → 最陡下降 → 计划性落差刻蚀 → 水幕与水潭 → 入海
    │   ├── clouds.ts          环形云带：分位数控制云量、山体正上方留空、边缘减薄、逐格起伏
    │   ├── vegetation.ts      山脚植被：树木与灌木的抽样、择地与体素拼装
    │   ├── materials.ts       共用材质与程序化贴图（水面流纹、薄雾径向渐变、水雾着色器）
    │   ├── sky.ts             渐变天穹、时段取色/插值、光照与雾的应用
    │   ├── world.ts           组装一个世界：地形/植被/水体/海面/云/薄雾/水雾 + 顶点配色 + dispose
    │   └── viewer.ts          相机、OrbitControls、阴影、动画循环、统计、防抖重建与销毁
    └── ui/ControlPanel.tsx    选项面板（滑块 / 开关 / 下拉）与重置按钮
```

## 场景选项

| 分组 | 选项 | 说明 |
| --- | --- | --- |
| 世界 | 随机种子 | 任意整数，同种子完全可复现；「随机」按钮换一个种子 |
| | 地形尺寸 | 200 / 256 / 320 体素见方 |
| | 山体高度 | 主峰高度倍率 0.6–1.6 |
| | 山峰数量 | 主峰之外再生成 2–6 座次峰 |
| | 海平面 | 水平面高度，影响岸线与植被下限 |
| | 植被密度 | 树木与灌木数量 |
| 瀑布 | 瀑布道数 / 水幕宽度 | 1–3 道瀑布；每道水的格数 1–4 |
| | 水流速度 | 水面流纹滚动速度 |
| | 瀑布水雾 | 水潭上方的上升水雾粒子 |
| 云与雾 | 云层高度 / 云量 / 云层厚度 | 云带基准高度、覆盖率与层数 |
| | 云的方块尺寸 | 4 / 6 / 8 世界单位；越大越省、越块状 |
| | 云漂移速度 | 云带绕山体的往复摆动幅度与速度 |
| | 雾浓度 | 指数雾密度，决定远景的空气感 |
| | 云底薄雾 | 云底的一层加性薄雾平面（径向渐变，无硬边） |
| 光照与画面 | 时段 | 黎明 / 上午 / 正午 / 黄昏 / 夜晚，逐项插值天穹、阳光、雾与曝光 |
| | 昼夜循环 + 循环速度 | 让时段平滑推进 |
| | 阴影 / 阴影精度 | 平行光阴影开关与阴影贴图分辨率（1024/2048/4096） |
| | 自动旋转 / 旋转速度 | 打开页面即自动环绕 |
| | 云板留白 | 云带生成范围外扩量（128/256/384） |

面板底部还有「重置视角」（回到初始构图）与「恢复默认」。

## 实现要点

- **只画看得见的面**：地形按列高度场网格化，只输出邻居更低的侧面与列顶面；水体、植被、云用
  通用体素网格化并按六向遮挡剔除。因此 99 万体素的场景只有约 12 万个四边形、12 个 draw call。
- **颜色在顶点上**：全部体素共用《不透明体素材质》《水体材质》《云材质》三份材质，颜色与明暗
  抖动写进顶点色；写入前把 sRGB 调色板转成线性空间，避免整体发灰。
- **山体**：主峰用 `height·(1-d/r)^exponent` 叠加山脚盾状基座，再叠加脊线噪声与隆起来打破圆锥感；
  山腰一段高度带做水平台地（`terrace`）形成悬崖与挂谷，边缘用 smoothstep 收束到海面以下。
- **水系**：在山体高处环带挑选源头（按方位角评分、互不重叠），用最陡下降法沿表面逐格推进，
  遇洼地就刻开缺口继续下行；每隔 6–12 格安排一次 4–10 格的计划性落差，落差≥3 格即生成竖直
  水幕与崖下水潭（水幕挂在崖壁外侧的空中，不是埋进沟里），溪流只下挖一格保持水面与地表齐平，
  最后汇入海面并做浅滩过渡。
- **云带**：以云格（默认 4 世界单位）为单位生成，覆盖率由噪声分位数反解阈值，山体正上方留空
  让峰顶穿出，云带外缘靠逐格减薄收边（不会留下孤立碎块）；云整体绕山体往复摆动，不做周期回绕。
- **光影**：Lambert 材质 + 平行光阴影 + 半球光，时段预设逐项插值（天穹上下色、太阳方位/高度角/
  颜色/强度、半球光、雾色、曝光），renderer 用 ACESFilmic 色调映射与 sRGB 输出。
- **帧循环只做轻活**：水面流纹偏移、海面起伏、云带摆动、水雾 uniform 更新与统计刷新；几何构建
  （约 90–350 ms）只在选项变化后防抖 180 ms 重建一次。

## Result Report

- **模型标识**：`deepseek-v4.1-flash`（候选分支 `llm/voxel-waterfall/deepseek-v4.1-flash`，
  worktree `.worktrees/voxel-waterfall/deepseek-v4.1-flash/`）
- **起始 main commit**：`ee2c9f2cc8b9b410ebd55d1c195e96a9cdbd4ce3`
  （与分支起点、评估基线一致）

### 实际执行的验证命令与结果

| 命令 | 结果 |
| --- | --- |
| `npm install` | 成功（依赖已锁定在 `package-lock.json`：three 0.186.0、react 19.2.8、vite 8.3.0、typescript 6.0.2、oxlint 1.81） |
| `npm run build` | 成功：`tsc -b` 无错误；`vite build` → `dist/index.html` 0.62 kB、`assets/index-*.css` 4.34 kB、`assets/index-*.js` 810.93 kB（gzip 219.3 kB）。Vite 会提示单个 chunk >500 kB，来源是 three.js 体积，不是错误 |
| `npm run lint` | 成功：`Found 0 warnings and 0 errors`（15 个文件、116 条规则） |
| `npm run dev` + 无头 Chrome 实际加载页面 | 成功：页面渲染出画布（1782 × 904），运行态统计 `window.__voxelStats` = `{voxels 992,962, quads 121,935, triangles 243,870, drawCalls 12, buildMs 89, size 256, seaLevel 12, peakHeight 82, trees 91, waterFalls 28, streams 99, waterVoxels 5,796, cloudVoxels 1,388, plantVoxels 4,738, timeOfDay 'morning'}`；无异常浮层与报错。截图（原图放大）确认：雪山峰顶、山腰云带与前后遮挡、山脚植被、瀑布水潭与崖壁水幕均可见 |
| 面板交互（无头 Chrome 内驱动 DOM） | 成功：`云量` 滑块调到 0 即时生效并触发重建（`cloudVoxels` 1,388 → 0）、`自动旋转` 开关即时生效 |
| `npm run build -- --base=/voxel-waterfall/deepseek-v4.1-flash/ --outDir=<tmp>/voxel-waterfall/deepseek-v4.1-flash --emptyOutDir` | 成功：产物 `index.html` 内资源路径带前缀（`/voxel-waterfall/deepseek-v4.1-flash/assets/…`） |
| `vite preview` + 无头 Chrome 加载 `http://localhost:4175/voxel-waterfall/deepseek-v4.1-flash/` | 成功：静态产物按路径前缀正常加载（HTTP 200）并渲染出场景，运行态统计与 dev 一致 |

> 说明：以上都在本机实际执行并观察过。调试用的 dev server 与临时 preview server 均已回收，
> 交付后不会自动运行任何服务。

### 已知限制

- **帧率**：HUD 的 FPS 取自 `requestAnimationFrame` 间隔，会顶到浏览器的 60 Hz 上限（本机无头
  软件渲染下读数也是 60），因此它不能当作性能基准。可核对的性能证据是量级指标：单帧 12 个
  draw call、约 24.4 万三角形、几何构建 90–350 ms，且帧循环里没有逐帧几何运算。
- **瀑布在默认全景视角下视觉占比有限**：山体 256 格见方、水渠宽 3 格，水幕在整幅画面里偏细，
  拉近相机（滚轮）或把「云量」调低更易观察；默认已把瀑布设为 3 道 × 3 格宽以增强可读性。
- **云是体素块**（默认 4 世界单位一块），风格上接近 Minecraft 的块状云，不是体积云/粒子云；
  云带外缘用逐格减薄收边，仍会保留方块轮廓。
- **未做移动端实测**：面板有响应式布局，但触摸手势（单指旋转 / 双指缩放）未在真机上验证。
- 相机禁用平移（`enablePan = false`），只支持拖拽旋转与滚轮缩放，这是刻意的取景约束。
