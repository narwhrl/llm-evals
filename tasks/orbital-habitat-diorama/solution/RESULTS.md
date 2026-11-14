# RESULTS · orbital-habitat-diorama

- 完整模型：`magpie/opencode-go/muse-spark-1.3-contributor:xhigh`（reasoning xhigh）
- 候选显示 ID：`muse-spark-1.3`
- 起始基线 SHA：`9ec1360f064c8cef28862671c58bc40ecfb1bd75`（detached run 目录，未创建其他 worktree/分支）
- 会话核对：`model_change` 记录 model 为 `magpie/opencode-go/muse-spark-1.3-contributor`，`resolvedModelIsFallback=false`，thinking `xhigh`，全程无回退。
- 未使用子代理、Task 委派、并行代理、嵌套会话、其他模型或其他模型 API。

## 实际执行的验证命令及结果

| 命令 | 结果 |
|---|---|
| `npx tsc --noEmit` | 通过，无错误 |
| `npm run gen`（地球贴图生成） | 通过，`earth_day/night 2048×1024`、`earth_clouds 512×256` |
| `npm run build`（根路径） | 通过，`dist/` 739ms |
| `npm run build -- --base=/orbital/ --outDir=dist-sub` | 通过，803ms |
| `node scripts/serve.mjs dist 5200` + `checkprod.mjs http://localhost:5200/` | state 正常，404 无，console error 无，渲染与 dev 一致 |
| `node scripts/serve.mjs subroot 5201` + `checkprod.mjs http://localhost:5201/orbital/` | state 正常，404 无，console error 无，与根构建像素一致 |
| `node scripts/shot.mjs`（1440×900，5 张） | 全部产出，console error 无 |
| `node scripts/interact.mjs`（真实鼠标） | 11/11 PASS：聚焦/返回、快进开/关、地球拖拽 scrub、笔旋转、植物灯开/关、灯带夜航开/关、旋转+缩放；console error 无 |

浏览器：Chromium 1254（`ms-playwright/chromium-1254/chrome-win64/chrome.exe`），视口 1440×900。

## 视觉自检记录（逐张读图后修改）

1. 首屏构图：大舷窗开在后方舱壁右侧 1/3，窗内地球（海/陆/云）直视可见且为视觉重心；地球另半边在舱后右侧背景形成"小舱室 + 大地球"对比。
2. 细节密度：后方舱壁无空白光板（面板接缝、铆钉排、加强筋、管线+扎带、通风栅、8+ 标签贴纸、设备指示灯）；端墙补了通风口与舱门编号牌；生活杂物按清单摆齐。
3. 昼夜：白天阳光涌入、光斑锐利带轮廓环；夜晚城市灯光带 + 舷窗框蓝色冷边光 + 暖色保留光，冷暖交界成立，暗部可见。
4. 光斑与贴图：光斑为带锐利轮廓环的椭圆池，随太阳位置移动拉伸；地球昼夜贴图同源大陆、接缝连续（球面左右包裹无缝）；云层独立旋转。
5. 文字与漂浮物：笔记本遥测曲线滚动、读数清晰；手册/便签/图纸/食品袋文字清晰；5 件漂浮物分区缓动、互不穿插。
6. 交互：聚焦 5 处（工作台/睡袋/种植架/座椅/健身车）机位均在舱内；地球拖拽 scrub 与单击快进用 6px 位移阈值区分；笔靠近躲避、点击旋转；植物灯、夜航灯带均有视觉反馈。

## 素材来源与许可

- `src/assets/earth_day.png`、`earth_night.png`、`earth_clouds.png`：由本项目 `scripts/gen-earth.mjs` 程序化生成（seeded value-noise fbm + 自手写 PNG 编码器，无外部输入）。昼夜共用同一陆地掩膜，大陆分布一致；城市灯光只落在陆地上。可 `npm run gen` 复现。许可：本项目原创，无第三方权利。
- 其余全部贴图（舱壁、地板、织物、屏幕、照片、便签、图纸、食品袋等）：运行时由 `src/world/textures.ts` 在 canvas 上程序化绘制，无外部资源、无远程请求。
## 已知限制

- 为保证阳光能穿过舷窗照进舱内，舱体太阳与地球光照做了 diorama 式解耦（地球永远把白昼面朝向观众，舱内阳光来自墙后）；物理上不严格，视觉上自洽。
- 工作台在默认视角部分被右端墙遮挡，旋转后可见；聚焦功能可直达。
- 地球自转较慢（0.008 rad/s），长时观察可见漂移，截图复现性已通过固定等待时长保证。

## 清理状态

已删除：dev/preview/verify 服务器（全部退出）、`dist/`、`dist-sub/`、`subroot/`、日志、诊断截图与一次性诊断脚本。`scripts/serve.mjs` 与 `scripts/checkprod.mjs` 作为构建验证工具随项目保留（README 已记录用法）。`node_modules` 已删除，仅剩 2 个被外部杀毒扫描锁定的二进制（`@esbuild/win32-x64`、`@rollup/rollup-win32-x64-msvc`，位于被忽略的 `node_modules/` 下，不进入提交）。`package-lock.json` 已提交。`git status` 仅 `solution/` 新增文件。
