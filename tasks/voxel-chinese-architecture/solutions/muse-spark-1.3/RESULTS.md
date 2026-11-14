# RESULTS · voxel-chinese-architecture

- 完整模型：`magpie/opencode-go/muse-spark-1.3-contributor:xhigh`
- 候选显示 ID：`muse-spark-1.3`
- 推理档位：`xhigh`
- 起始 `main` 基线 SHA：`9ec1360f064c8cef28862671c58bc40ecfb1bd75`
- 子代理/其他模型/回退：未使用（单 worker 直接完成，无 Task/Agent 委派，无其他模型 API）

## 实现摘要

Vite + Three.js（`three@^0.170.0`）纯原生体素场景，无后端。体素按颜色分组，
每组一个 `InstancedMesh`，全场约 19k 实例、24 组。建筑共 7 座：
山门（三门、绿琉璃瓦）、钟楼（悬铜钟）/鼓楼（置红鼓）对称一对、
东/西配殿（歇山顶、山花封墙）、主殿（重檐庑殿顶、黄色琉璃瓦、体量最大居中轴）、
五层宝塔（攒尖顶群 + 金刹，最高点 y≈54）。
院落要素：红墙院墙（前墙为山门留口、四角墩 + 攒尖帽）、东西短廊、
汉白玉台基 + 台阶、斗拱层、藏青匾额金边、方格窗（窗纸微发光）、
御道 + 庭院铺装 + 门外广场、石狮两对、御道华灯（发光红）、松柏行道、
漂移体素云。暖昏光照：暖色方向光（2048 阴影）+ 半球光 + 雾。
页面打开即为全景机位并缓慢自动旋转，支持拖拽/缩放。

## 实际执行的验证命令与结果

1. `npm install --no-audit --no-fund` — 成功（vite 6.4.6 / three 0.170）。
2. `npm run build` — 成功，`dist/index.html` 1.41 kB，`dist/assets/index-*.js` 499.54 kB。
3. 节点冒烟（`node --input-type=module` 直接 import `src/buildings.js` 跑 `buildScene()`）—
   成功：实例 19155、颜色组 24、云 6 组、塔刹顶 y=54、包络 x±66 / y -2..54.5 / z -56..60。
   （首次手写测试脚本误迭代 `Voxels` 对象而非 `.groups`，属脚本笔误，修正后通过；实现代码无改动。）
4. `npm run preview -- --port 4173` + curl 取首页 — 200，`dist` 被正常 serving。
5. Headless Chrome 截图（1440×900，SwiftShader 软件渲染）— 两张截图均显示完整建筑群：
   初帧即全貌（主殿黄顶居中、宝塔居后、配殿对称、山门居前、红墙合围、阴影正常）；
   控制台无 JS 错误（仅一条 Windows 注册表观察项系统警告，与页面无关）。
6. `npx vite --port 5199` + curl 首页 — 200，dev server 可用。
7. 构建/截图/日志证据保留在 `solution/evidence/`（已忽略目录，不随 commit 提交）。

浏览器环境：`Google Chrome 157.0.8103.52` headless（`--enable-unsafe-swiftshader`），
视口 1440×900；Node v24.21.0，npm 11.19.0。

## 已知限制 / 失败 / 人工介入

- 无测试失败；无需人工介入。
- 限制：headless 软件渲染无法做真机交互验收（拖拽/缩放仅代码层面接线 OrbitControls，
  未逐项手点）；自动旋转在 SwiftShader 截图中因虚拟时钟几乎不推进，
  旋转效果仅由代码逻辑保证。体积光/后期泛光等氛围手段未做，以保构建一次通过。
- 门扇为贴面做法（墙体实心 + 深色门板浮贴），不可穿行；符合“观看场景”题设。

## 清理状态

- `node_modules/`、`dist/` 已删除；`evidence/` 内仅保留两张截图与控制台日志，
  其余临时抓取文件已删；preview/dev 服务器进程已全部终止，无残留服务。
- 待提交：`solution/` 下 `package.json`、`package-lock.json`、`vite.config.js`、
  `index.html`、`src/`、`README.md`、`RESULTS.md`、`.gitignore`。
