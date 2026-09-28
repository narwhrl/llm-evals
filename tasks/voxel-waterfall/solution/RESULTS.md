# 结果报告 — voxel-waterfall / glm-5.3-flash

## 模型与基线

- 完整模型标识：`account:bigmodel-individual-coding-plan/GLM-5.3-Flash`（ZCode CLI 会话，candidate-id `glm-5.3-flash`）
- 起始 `main` commit SHA：`8409ab9ad67e2999707f475ee1e871ebe0f1c7b1`（隔离克隆 `.runs/voxel-waterfall/glm-5.3-flash` 位于该 SHA 的 detached HEAD，remote 已移除，工作树起始为 clean）
- 实现路径：`tasks/voxel-waterfall/solution/`
- 基线说明：本轮开始时 `main` 已推进到 `ddfa997`，但 `git diff --stat 8409ab9..main` 仅涉及 `README.md`、`migration/`、`tasks/cf-transport-ship/`，均非本任务输入，故本候选仍以 pinned 基线 `8409ab9` 运行（与 gargantua 轮先例一致）。
- 人工介入：仅一条指令——用户要求浏览器视觉验收使用 kimi-webbridge 技能（禁止子代理 / 其他模型）。实现、调试、验收均由模型独立完成。

## 实现概要

React 18.3.1 + Vite 5.4.21 + three 0.170.0（npm 依赖）。208×208 体素世界：高度场（主峰 + 3 次峰、
ridged 山腰细节、环形阶地陡崖）→ 贪心下坡追踪瀑布河道（洼地涨水溢垭、两侧筑岸、终点挖湖）→
InstancedMesh 体素网格（顶块 + 暴露侧壁，按高度/坡度/噪声着色：草地、沙滩、岩壁、雪线）→
阶梯状水带 ShaderMaterial（沿流向滚动泡沫条纹）+ 湖面涟漪 + 跌水浪花粒子 + 贴山水雾 →
34 团多盒体云簇环抱山腰（主峰穿云）→ 渐变天空穹顶（太阳光晕 + 夜晚星空）、方向光阴影、
半球光、距离雾，4 个光照时段预设平滑过渡。UI 为 React 设置面板（时段、云层高度、云量、
瀑布数量、水流速度、树木密度、自动环绕、阴影、重新生成地形、重置视角），OrbitControls
相机（拖动旋转 / 滚轮缩放 / 右键平移，手动操作自动暂停环绕）。

## 实际执行的命令与结果

环境：Windows 11 (10.0.26200 x64)，Git Bash，Node v24.21.0 / npm 11.19.0（fnm），registry https://registry.npmjs.org/

| 命令（solution/ 内） | 结果 |
| --- | --- |
| `npm install --no-audit --no-fund` | 退出码 0，生成 `package-lock.json` |
| `npm run build`（= `vite build`） | 退出码 0；40 modules；`dist/index.html` 0.41 kB、CSS 2.60 kB、JS 658.63 kB (gzip 178.69 kB)。迭代期间约 8 次增量重建全部成功。Vite 的 >500 kB chunk 警告为 three.js 单包常态，未做代码分割 |
| `vite preview --port 4319 --strictPort`（PowerShell `Start-Process` 后台启动） | 正常服务 `dist/`；`curl http://[::1]:4319/` 返回页面 HTML，资源哈希与最新构建一致 |
| 多种子地形/水系健全性检查（`node -e` 调用 `terrain.js`） | seeds 7 / 42 / 99999 / 123456789：水系路径长 59–171 格，每条种子均含 1–4 处 ≥3 格跌水；默认种子 20260928 主河道 132 格、跌水 3/8/7 格，两条次级河道各含 4–6 格跌水 |
| 验收后回收 | `taskkill //PID 23096 //F` 终止 preview（`netstat` 确认 4319 无 LISTENING）；无残留 node 进程 |

调试过程中发现并修复的两个实质缺陷（均有复现）：

1. **水系为空**（首版浏览器验收页脚 `水域 0`）：源头世界坐标被直接当作网格下标使用，源点越界导致追踪立即终止。修复为 `grid = world + HALF - 0.5` 坐标变换后水域恢复 242 格。
2. **瀑布呈垂直竖井**（`node` 剖面复现：每步 -3 格、20 步内 17 次大跌水）：寻路把「平地」误判为「被山脊阻挡」而在圆顶平台上连续凿穿下切。修复为平地跨流、仅四邻严格更高时涨水溢垭口；配合将 ridged 细节改为山腰钟形分布（山顶保持平滑穹形），路径长度由 14–27 格提升到 41–132 格，主河道形成 3 级阶梯瀑布。

## 浏览器验收（kimi-webbridge，实际观察）

通过 Kimi WebBridge daemon v2.0.22 / extension 2.0.22 驱动用户真实 Chrome（session
`voxel-waterfall-glm-flash`，标签组「体素瀑布视觉验收」）。视口 CSS 2048×962、DPR 1.25。
页内注入 `error` / `unhandledrejection` 收集器。截图存于克隆 `verify/`（未提交）。

- **首屏**：打开页面即呈现完整场景（黄昏、主峰雪顶穿出云带、三道瀑布沿阶地跌落、涟漪湖面、森林、阴影），无需操作。页脚统计：体素 54,408 · 树木 1,400 · 水域 242。
- **控制台**：全部交互流程结束后 `error`/`unhandledrejection` 计数为 0。
- **光照时段**：黄昏→夜晚：深蓝星空、月光色调、白色水道发光（截图 `shot-night2.png`）；→正午：明亮蓝天、日照阴影（`shot-day2.png`）；均平滑收敛。注意：标签页处于后台时 rAF 节流会使过渡「看似停滞」，`Page.bringToFront`（focus emulation）恢复全速后正常收敛——这是浏览器行为，非应用缺陷；验证时曾误判为 bug，已排除。
- **滑杆**：云层高度 32→24（云带下移环抱山腰，截图 `shot-regen.png`）、树木密度 70%→20%（树木 1400→694）、水流速度 1x→3x（无错误），均通过真实 `<input type=range>` 的 React onChange 生效并即时反映。
- **瀑布数量**：3→1→3：页脚水域 242→132→242，场景实时重建。
- **重新生成地形**：整幅地貌更换（体素 54,143、树木 576、水域 290，新峰谷与湖位，`shot-regen.png`）。
- **视角**：CDP 滚轮 8 档推进相机、鼠标拖拽轨道均正常；拖拽触发 `controls.start` 后「自动环绕」复选框自动取消勾选；「重置视角」回到默认机位。
- **画质开关**：阴影开关即时切换 `DirectionalLight.castShadow`，无错误。
- **设置面板**：收起（—）/重新展开（⚙）正常。
- **帧率**：页脚 FPS 前台 25–60（后台节流时显示值滞后，见上）；默认机位前台 60。

## 已知局限

- 移动端布局未做专门适配（面板固定 268px 宽，窄屏可遮挡画面；未做移动视口验收）。
- 浪花粒子相位使用 `Math.random`，跨次加载不逐像素确定（仅影响浪花细节，不影响地形/水系——地形由固定种子派生）。
- 瀑布数量切换与重新生成地形为同步重建（主线程一次性生成，约百毫秒级卡顿一次）。
- 云为盒体簇拼接，近距离观察呈方块感（体素风格下的有意取舍）。
- Vite 构建提示 chunk >500 kB（three.js 未分割），不影响运行。
