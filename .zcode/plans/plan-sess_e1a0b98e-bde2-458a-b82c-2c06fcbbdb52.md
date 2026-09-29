# cs-pvp-diorama · glm-5.3-flash 运行计划

## 0. 范围与隔离（AGENTS.md）

- 全程只用我自己（glm-5.3-flash，无子代理、无其他模型）；浏览器视觉验收用 kimi-webbridge 由我自行判图（不派 visual-judge）。
- 代码只写在隔离 clone `C:\Users\narwhrl\workspace\llm-evals\.runs\cs-pvp-diorama\glm-5.3-flash` 内的 `tasks/cs-pvp-diorama/solution/`，不改 task.md/README/评估脚本。
- 运行期间不读其他候选的 solutions/（公平性）；导入阶段仅按惯例统计数量、不读内容。
- 基线：clone 已 detach 于 `8409ab9ad67e2999707f475ee1e871ebe0f1c7b1`（本轮 pinned main）。运行时用 `git -C` 确认该 SHA 在 main 历史上，并核对 8409ab9 之后 main 的后续提交未改动 `tasks/cs-pvp-diorama/`（写入 RESULTS.md）。

## 1. 技术方案

**栈**：Vite + three.js（npm 安装最新稳定版并锁定版本号记录进 RESULTS.md；自定义 shader 一律用默认 GLSL1，规避 r170 GLSL3 `gl_FragColor` 不别名问题）。纯前端、零运行时服务、无外部资源文件——贴图（沥青、涂鸦、货运编号、弹孔、警示标语等）全部用 canvas 程序化生成，保证"资源可靠加载"且仓库无二进制文件。

**目录**（candidate 目录自带 `.gitignore`：`node_modules/`、`dist/`）：
```
solution/
├── package.json   # scripts: dev / build(vite build) / preview；deps: three, vite
├── index.html     # 无任何 UI 的单页
├── RESULTS.md
└── src/
    ├── main.js        # renderer/camera/OrbitControls/resize/主循环；首帧同步渲染
    ├── palette.js     # 调色板、toon 渐变贴图、canvas 程序化纹理工厂
    ├── outline.js     # 描边工具：硬表面 EdgesGeometry 线框 + 曲面 inverted-hull
    ├── ground.js      # 方形混凝土底座、潮湿沥青路面、积水、排水沟
    ├── regions/       # tSpawn / aSite(仓库) / mid(铁门+岗亭) / bSite(铁皮屋) / ctSpawn(高台)
    ├── props.js       # 木箱/油桶/拒马/水泥墩/轮胎/托盘/电线杆电线等
    └── fx/            # rain(片)==、puddle(Reflector 镜面)、lights(闪烁/警灯/探照灯)、steam、lightning、drips
```

**渲染要点**
- 三渲二：MeshToonMaterial（4 阶渐变）+ 深色描边；ACES tone mapping、冷蓝雨夜环境光。
- 积水倒影：整块地面用 three `Reflector`（低分辨率 RT，固定整数值，规避 fractional-DPR 帧缓冲坑），其上半透明沥青+积水 alpha 遮罩层，反射 shader 加程序化涟漪扰动（波及"倒映灯光、建筑轮廓与雨丝"）。
- 动效：GPU 雨丝（GLSL1 顶点动画）、檐口滴水、探照灯摇摆闪烁、警灯缓脉动、卷帘门偶发震动、通风口蒸汽精灵、周期性雷电天光、灯暖黄/仓冷白/警红三色光源对比；阴影仅主光 + 2-3 个关键 SpotLight，控面数保 60fps。
- 相机：OrbitControls 阻尼拖拽/旋转/缩放，限制在底座范围，maxPolarAngle 不穿地；载入后 2s 轻推入场动画后交还控制。页面零 DOM UI、零人物。
- 首帧同步渲染一次（后台标签 rAF 节流下截图验证不依赖 rAF）。

## 2. 实施顺序

1. 环境准备：`export PATH` fnm Node v24.21.0；避免 `cd` 后直接调 node（用绝对路径 node.exe）；`npm create` 手写 scaffold，`npm install` 生成 lockfile。
2. 搭建渲染骨架 → 底座与五大区域几何 → 道具/细节贴图 → 光照 → 特效 → 调优。
3. 每阶段 `npm run build` 保证可构建。

## 3. 验证（写入 RESULTS.md 的原始证据）

- `npm install`、`npm run build`（生产构建成功）、`node node_modules/vite/bin/vite.js preview`（本机 4173 端口，注意 `--noproxy '*'`、IPv6/localhost）。
- kimi-webbridge（daemon status→必要时 start；Windows 全部走临时 JSON 文件 + `curl.exe --data-binary @file`；session 名 `cs-pvp-diorama-glm535`，中文 group_title 并告知用户分组）：
  - `network start` + `Page.addScriptToEvaluateOnNewDocument` 挂 console error 收集器 → 打开 `http://localhost:4173/`；`Emulation.setDeviceMetricsOverride 1440×900 dsf1`（记录用户 Chrome 缩放导致 DPR≈1.1 的限制）。
  - 按任务 README 评审轴逐项检查：多轨道角度+缩放截图（Read 自查判图；若截图走 CDN 无法内显，则退回 PowerShell 像素栅格分析法）；`Input.dispatchMouseEvent` 拖拽旋转、滚轮缩放验证响应；确认无 UI/无人/无底座外几何；四大区域、三条路线、高位点、内部陈设、掩体、涂鸦/弹孔/电线、明暗光影、积水实时倒影、雨丝/滴水/涟漪/闪烁/蒸汽/雷电等动态（前后帧对比）。
  - `network list` 核对资源全 200、console 无报错。
- 发现问题即修复重建重验；bug 类问题先复现再验证消除。

## 4. 提交与 RESULTS.md

- RESULTS.md 按 AGENTS.md：完整模型标识（glm-5.3-flash / account:bigmodel-start-plan/GLM-5.3-Flash）、起始 main SHA 8409ab9…、实际执行的命令与结果、浏览器观察记录、已知局限（后台标签实时性、DPR 等）、所需人工干预（用户指示本次运行与 kimi-webbridge 自验收）、自主性统计。
- clone 内单提交 `feat: ...`（solution 树 + RESULTS.md），node_modules/dist 不入库；提交前自查范围、验证结果与敏感信息。

## 5. 策展导入（用户已确认，不 push 不部署）

按 candidate-import-procedure 在主仓库执行：
1. 重查 `git log main`（并行会话可能已前进）；
2. `git fetch --no-tags .runs/cs-pvp-diorama/glm-5.3-flash <sha>` → 打**annotated tag** `candidate/cs-pvp-diorama/glm-5.3-flash`，message：`Original candidate from local-clone:.runs/cs-pvp-diorama/glm-5.3-flash at <sha> (baseline 8409ab9...)`；
3. 临时 worktree `.worktrees/import-glm-5.3-flash` 于 `llm/cs-pvp-diorama`，`git read-tree --prefix=tasks/cs-pvp-diorama/solutions/glm-5.3-flash/ -u <tag>:tasks/cs-pvp-diorama/solution`，**核对源/目标 tree hash 一致**，撤 worktree；
4. 分支提交 `feat: import glm-5.3-flash cs-pvp-diorama candidate`：solution 树 + README status 行（十二个候选）+ `migration/2026-09-28.json` 新条目；
5. main 上独立提交 `docs: record glm-5.3-flash cs-pvp-diorama import`（仅 migration JSON）。
6. 汇报：结果、证据、遗留限制。