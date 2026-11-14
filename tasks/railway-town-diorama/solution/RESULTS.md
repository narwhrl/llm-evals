# RESULTS — railway-town-diorama / muse-spark-1.3

- 完整模型：`magpie/opencode-go/muse-spark-1.3-contributor:xhigh`
- 候选显示 ID：`muse-spark-1.3`
- 推理等级：`xhigh`
- 起始 `main` 基线 SHA：`9ec136f064c8cef28862671c58bc40ecfb1bd75`
- 子代理 / 其他模型 / 回退：均未使用。OMP 会话启动记录
  `model=magpie/opencode-go/muse-spark-1.3-contributor`，
  `thinkingLevel=xhigh`，`resolvedModelIsFallback=false`。
  全程单模型、无委派。

## 实际执行的验证命令与结果

1. `npm install --no-audit --no-fund`（solution 内）
   → `added 15 packages`，成功。
2. `npm run build`（vite build）
   → 成功，`dist/index.html + assets`，约 660–700ms；
   仅一条 chunk 体积提示（three 单包 543kB，页面场景可接受），无报错。
3. `npm run preview`（vite preview，4173 端口）+ `node fetch`
   → `http://localhost:4173/` 返回 200。
4. `.verify/verify.mjs`（puppeteer-core 驱动系统 Chrome，
   `Google Chrome 157.0.8103.52`，headless，视口 1440×900）：
   - `#app canvas` 存在；首屏状态 `运行中 · 1.0×`。
   - 点击「夜晚」→ 场景变暗、灯光/窗口点亮；切回白天正常。
   - 点击「暂停」→ 状态 `已暂停`；再点恢复 `运行中 · 1.0×`。
   - 速度滑到 2.5 → 标签 `2.5×`；点击「复位」→ 回到 `1.0×` 且运行中。
   - 拖拽旋转 + 滚轮缩放后渲染正常。
   - 到站停靠：复位后约 14s 出现 `到站停靠…`，约 2–2.5s 后恢复
     `运行中 · 1.0×`（含一次完整启停循环）。
   - 第一轮：console error 1 条（favicon 404），已加内联空 favicon 修复；
     修复后重跑：**console errors 0**，pageerror 0。
5. 截图证据（未提交，仅存于已忽略目录 `solution/.verify/`）：
   `shot-day.png`、`shot-night.png`、`shot-paused.png`、`shot-rotated.png`、
   `shot-dwell.png`、`verify.log`。
   目检确认：开场即见全沙盘与运行列车；暖色傍晚阳光与投影；
   轨道闭合、两次跨河均有桥；车头 + 两车厢弯道各自朝向；
   夜晚路灯/车站/部分窗口发光且场景可读。

## 浏览器环境

- `Google Chrome 157.0.8103.52`（headless=new + SwiftShader 软件 WebGL）
- Node `v24.21.0`，npm `11.19.0`，three `^0.180.0`，vite `^6.0.0`

## 已知限制 / 需人工介入

- 无需人工介入即可安装、构建、运行。
- 列车烟雾为 7 个循环 Mesh 气团的简化效果；河面为静态材质（无流动动画）。
- 「复位」恢复机位、列车位置与速度，昼夜模式保持当前值（已在 README 注明）。
- 夜晚真实点光源仅 3 盏（车站 + 主街两盏），其余灯具用自发光 + 光晕保证帧率。
- 构建产物 chunk 偏大（three 打包约 543kB / gzip 约 138kB），属单页 3D 场景正常范围。

## 清理状态

- 已退出预览服务器；已删除 `solution/dist`、`solution/node_modules`、
  `.verify/node_modules`、`.verify/package*.json` 与临时验证脚本
  `.verify/verify.mjs`；`.verify/` 下仅保留截图与 `verify.log`（已被
  `solution/.gitignore` 忽略，不进入 commit）。
- 本次仅提交 `solution/` 下源码、配置与文档；未改动题面、共享测试与仓库其余文件。
