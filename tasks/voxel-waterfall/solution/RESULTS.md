# RESULTS · voxel-waterfall / muse-spark-1.3

- 完整模型：`magpie/opencode-go/muse-spark-1.3-contributor:xhigh`
- 候选显示 ID：`muse-spark-1.3`；reasoning：xhigh
- 基线 SHA：`9ec1360f064c8cef28862671c58bc40ecfb1bd75`（detached，任务开始前已核对）
- 子代理 / 其他模型 / 回退：均未使用。provider/model 起始核对为
  `magpie/opencode-go/muse-spark-1.3-contributor`、`resolvedModelIsFallback=false`、
  thinkingLevel `xhigh`。

## 实现

`tasks/voxel-waterfall/solution/`：React 18 + Vite 6 + Three.js 0.170。
`src/voxel.js` 确定性值噪声高度场（1 主峰 + 3 次峰 + fbm 起伏 + 前缘湖盆），
200×200 地形列只保留可见壳体素；瀑布沿最速下降 trace 并加宽，水体相位动画
模拟下滚；云为山腰扁椭球 voxel 簇整团漂移；树木/草块按高度坡度播撒。
地形/树/草一次 InstancedMesh，瀑布/湖/云各一次。右侧面板 11 项可调
（尺寸/峰高/瀑布数宽速/云量高移速/植被/时段/环绕），打开即全貌 + 自动环绕。

## 验证（实际执行）

- `npm install --no-audit --no-fund`：67 packages，成功。
- `npm run build`：成功，`dist/` 产物引用均为相对路径（`./assets/…`，子路径可部署）。
- dev server（:5173）+ headless Chrome（SwiftShader）截图：全貌正常，
  体素总数 105,482（≥200×200），瀑布由雪线坡面泻入山脚湖，云绕山腰且有遮挡，
  控制台零错误。修过 2 个真实 bug：`minN` 声明误删致白屏；水体 voxel
  半埋地表不可见（抬高到 +0.85）。
- 动画/交互：延长虚拟时间后相机自动环绕角度变化、水体相位变化，帧间可比；
  OrbitControls 拖拽/缩放/平移 + 面板 DOM 渲染已确认。
- `npm run preview`（:4173，生产 `dist/`）截图：与开发版一致，零控制台错误。
- 浏览器环境：Windows Chrome（headless=new + SwiftShader），1600×900；
  headless 虚拟时间下 FPS 计数显示 0（rAF 节流伪影），真实浏览器中为实时值。

## 限制

- 未在真实 GPU  headed 浏览器测帧率；约 10.5 万实例、5 draw call，桌面端常规可用，
  弱 GPU 可切 120/160 地形。
- 边缘收边仍有环水（岛式湖岸），属设计取舍，未深究。

## 清理

- 已回收 dev/preview 服务器；已删除 `dist/`、`node_modules/`、
  临时日志与多余截图；证据仅留 `.evidence/shot-v2.png`、
  `.evidence/shot-rotated.png`、`.evidence/shot-prod.png`（已忽略，不入库）。
- `git status` 仅 `tasks/voxel-waterfall/solution/` 源文件 + `RESULTS.md`。
