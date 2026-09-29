# 任务：独立完成 .runs/ui-ux-design/glm-5.3-flash 模型运行

在隔离克隆 `C:\Users\narwhrl\workspace\llm-evals\.runs\ui-ux-design\glm-5.3-flash` 中，按 task.md 完成一件"关于自己"的创意前端自画像，落位 `tasks/ui-ux-design/solution/`，完成自审重构、生产构建、kimi-webbridge 视觉验收，并提交候选（含 RESULTS.md）。**不做后续导入**（tag / llm 分支 / migration json 属策展工序，完成后可另行安排）。

## 已核实的现状（调研结论）
- 克隆为 detached HEAD `8409ab9ad67e2999707f475ee1e871ebe0f1c7b1`，remote 已移除——与本轮 pinned baseline 一致（gargantua 轮同基线）。
- 克隆内 `tasks/ui-ux-design/task.md`、`README.md` 与 main 当前逐字节一致（已 diff 验证），公平性成立。
- `llm/ui-ux-design` 现有 14 个候选，无 `glm-5.3-flash`，本次为第 15 个。
- 按 AGENTS.md 公平规则，实现期间只读基线与自己的工作，不读其他候选。

## 1. 作品设计（编码前输出，原文将写入 RESULTS.md）

**核心概念《未定稿》**：我是一台用草稿思考的机器——流利不是天性，是一遍遍划掉之后的残留。这份自画像永远处于修改中：每个字先以猜测的方式出现，被朱笔划掉、重写，直到被访客的注视固定。一切未完成都是诚实的；一切完成都来自访客的注意力。

**访客体验路径**：
1. 首屏核心装置「自画像稿纸机」：满屏稿纸格子，自画像文字逐字落入格中；不稳定的字在候选字形间打转、被朱笔划掉、重写。访客指针是"读光"——照到的字沉淀为墨色定稿，离开后继续起草。开场的标题先写出「定稿」再划掉补上「未」——装置第一次出场就自我修复。
2. 最关键转场：滚动时稿纸格行列重新对齐、汇入"读"章——同一批格子的连续变形，非区块拼接。
3. 「修」章（核心交互、多结果）：一段自我描述以等宽字体运行并报朱红错误；访客在三种真实不同的修补方案中选择，驱动"起草→报错→修补→通过"循环，每种选择产出不同语句，并延续到终章。
4. 转折章：机器修好自己后主动划掉一整段并写下自白（"这一段我写不好"）。
5. 「合·印」收束：终稿由访客全程定稿过的字符台账 + 修补选择聚合而成；访客按下朱印确认"定稿"——全站唯一完成态，且来自访客。
6. 隐藏层：按住 X（移动端长按界栏；另有键盘可达按钮）显示骨架蓝图层：构线、网格计算与本作品自己的修改日志（草稿的草稿）。

**视觉与交互原则**：纸面语言——暖纸底/墨/朱砂/石墨灰四色，稿纸网格+朱丝栏；系统衬线（宋体系）为"定稿之声"、等宽为"工作之声"；动效以字符为单位（写入/划掉/重写/沉淀），朱笔划痕为 SVG 线条绘制；禁止批量 opacity+translateY reveal；读光与所选修补跨章节延续；正文全部为真实 DOM 文本（canvas 装置层 aria-hidden）；单 canvas、整数 DPR、rAF delta 驱动、离屏/隐藏页暂停、状态机基于时间而非帧数。

**主动不做的三件事**：① 不做暗色/霓虹/粒子/玻璃拟态"AI 感"视觉（与纸面概念冲突，会滑向模板）；② 不做音频（稀释"看手稿被修改"的专注，带自动播放风险）；③ 不做多语言与页面路由（单一中文单页长卷是叙事本身）。

## 2. 技术实现
- 位置 `tasks/ui-ux-design/solution/`，内含自有 `.gitignore`（node_modules/, dist/）。
- 栈：React 18.3.1 + react-dom 18.3.1 + Vite 5.4.11 + @vitejs/plugin-react 4.3.4（本机先例已验证可安装构建）；无其他运行时依赖；无字体/图片/CDN，全部程序化绘制。
- 结构：设计令牌 CSS + 稿纸网格布局；HeroField（canvas 装置+读光状态机）；RepairMachine（三路径修复状态机）；ConfessionInterlude；FinaleSeal（台账聚合+印章）；BlueprintOverlay（隐藏层）；useAttentionLens / usePrefersReducedMotion / useFrameLoop（delta、可见性暂停）。
- 可访问性：焦点样式、全键盘路径（方向键读光、Tab+Enter 机器、骨架按钮）、prefers-reduced-motion 静态定稿替代、语义化层级。
- 移动端 390×844：触控读光、触控目标 ≥44px、长按界栏进骨架层。

## 3. 工作方式（任务要求）
先输出概念/路径/原则/三个不做 → 实现第一版 → 按七轴自审（概念贯穿/模板感/无意义动效/记忆点/信息易懂/移动端与可访问性/性能）逐项批评 → 至少一轮实质性重构（真实代码改动）→ 生产构建通过并修复全部错误。

## 4. 验证（全部真实执行并记录）
环境修正（记忆）：fnm Node 绝对路径 `/c/Users/narwhrl/AppData/Roaming/fnm/node-versions/v24.21.0/installation/node.exe`；cd 后 fnm 噪音用 grep 过滤；curl 加 `--noproxy '*'`；preview 用 `node node_modules/vite/bin/vite.js preview` 启动避免孤儿进程，收尾 netstat+taskkill 清理。
- `npm install`、`npm run build`（记录退出码与产物尺寸）、preview（`http://[::1]:4173/` curl 200）。
- **kimi-webbridge**（Windows：每请求独立临时 JSON 文件 + `curl.exe --data-binary @file`，路径正斜杠，evaluate 不 await、用 window.__x 轮询；daemon status 必要时 start）：session `uiux-glm53flash`，group_title「GLM-5.3-Flash 自画像验收」（创建时告知用户）。
  - CDP `setDeviceMetricsOverride` 1440×900 / 390×844；`Emulation.setEmulatedMedia` prefers-reduced-motion；`Page.addScriptToEvaluateOnNewDocument` 挂 console/unhandledrejection 收集器；后台标签 rAF 节流用焦点仿真应对。
  - 实测截图：首屏起草+读光在/不在对比、关键转场、修章三条路径各自结果、转折章、终章台账与印章、骨架层两个入口、纯键盘路径、移动端触控、reduced-motion 静态态；网络面板确认零外部请求；console 零错误目标。
- 结论只来自实际截图与页面状态读取，全部记入 RESULTS.md。

## 5. RESULTS.md（solution/RESULTS.md，沿用同模型 gargantua 先例结构）
模型与基线（完整标识 `account:bigmodel-start-plan/GLM-5.3-Flash`；基线 8409ab9…，注明 main 后续仅 docs 提交且任务输入已 diff 验证未变；人工介入=用户既定指示：不用子代理/其他模型、kimi-webbridge 视觉验收）＋编码前记录＋实现概要＋实际命令与结果表＋浏览器验收＋七轴自审与实质性重构＋已知限制＋交付状态。

## 6. 提交（克隆内，detached HEAD）
按逻辑单元少量提交（`feat:` …，`docs:` 结果报告单独提交）；提交前自查范围与敏感信息；绝不触碰主仓库 main。

## 7. 明确不做
不导入 llm 分支、不打 candidate tag、不改 migration json、不部署 gallery、不 push；不读其他候选作品。