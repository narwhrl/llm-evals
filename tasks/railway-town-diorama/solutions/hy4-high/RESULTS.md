# 结果报告

## 候选信息

- 完整模型标识：`magpie/opencode-go/hy4:high`
- 思考程度：`high`
- Harness：`ZCode`
- 起始 `main` commit SHA（`git rev-parse HEAD`）：`1d1fcb9e1d745cca9a36285df78555dede277136`
- 交付路径：`tasks/railway-town-diorama/solution/`
- 环境：Node.js `v24.21.0`，npm `11.19.0`，Windows / Git Bash，Chrome（headless，SwiftShader 软件 WebGL）

## 实际执行的命令与结果

| 命令 | 结果 |
| --- | --- |
| `git rev-parse HEAD` | `1d1fcb9e1d745cca9a36285df78555dede277136` |
| `git status`（开始时） | `HEAD detached at FETCH_HEAD`，工作区干净 |
| `npm view three version` / `npm view vite version` | `0.187.0` / `8.3.8`（registry 可用） |
| `npm install`（初版 vite `6.3.5`） | 安装 15 个包；`npm audit` 报告 `1 high severity vulnerability`（vite，受影响范围 `<=6.4.3`，修复版本 `6.4.6`） |
| 将 `vite` 固定为 `6.4.6` 后再次 `npm install` | `found 0 vulnerabilities`；`npm audit --json` 的 `vulnerabilities` 计数全为 0 |
| `node --input-type=module -e "..."`（布局数值校验，两次） | `TRACK_LENGTH=134.66`、`BRIDGE_CENTERS` 恰好 2 处、`STATION_U=0.8092`、`START_U=0.5092`、站台坐标 `(-9.51, 0.62, 15.48)`、跨河抬升后轨道 `y=1.40`；道路调整后可用建筑地块 38 个（实际生成 29 个建筑），4 个地标的轨道/河流/道路间距均满足净空 |
| `npm run check` | 通过（`node --check` 逐个检查 6 个 `src/*.js`，无输出错误） |
| `npm run build` | 通过。`dist/index.html` 1.34 kB、`dist/assets/index-*.css` 2.53 kB、`dist/assets/index-*.js` 580.71 kB（gzip 152.28 kB），`built in 3.90s`。仅有一条 `>500 kB` 的 chunk 体积提示（Three.js 打入单包），不是错误 |
| `npm run dev` | 后台启动；`curl` 返回 `HTTP 200`，页面标题 `Little Railway Town · a tabletop miniature` |
| `npm run preview` | 后台启动；`curl` 对 `/` 与 `/assets/index-CWlhvcON.js` 均返回 `HTTP 200` |
| Chrome headless `--window-size=1440,900 --screenshot`（dev / production） | 生成 1440×900 截图；`--dump-dom` 中 `<div id="diag" data-ready="true">` 为 `READY calls=765 triangles=177564`，未收集到任何 `ERR` / `REJ` / `FATAL`，无资源加载失败 |
| Chrome DevTools Protocol 交互验证脚本（`.verify/cdp-verify.mjs`，强制 `Emulation.setDeviceMetricsOverride` 为 `1440×900`） | 21 项检查全部通过，`TOTAL FAILURES: 0` |

### 交互验证逐项结果（最终一轮，1440×900）

- `PASS` 场景初始化（`diag ready`），静态信息：`trackLength=134.66013265602862`、`bridgeCount=2`、`carCount=3`、`plotCount=29`
- `PASS` 运行时列车前进（2.6 秒内 `distance` 从 `72.13` 增至 `86.50`）
- `PASS` 三节车厢占据三个不同的轨道位置；在右端弯道上位置为 `[23.45,1.12,5.6]`、`[24.37,1.45,1.82]`、`[24.46,1.51,-2.07]`——相邻位移向量不平行，说明各车沿曲线独立循迹而非整列刚体旋转；`y` 随跨河抬升各自变化
- `PASS` 暂停冻结列车与三节车厢位置；`PASS` 恢复运行后继续前进
- `PASS` 速度调节（`speed=18`，面板显示 `2.3×`）
- `PASS` 夜晚切换（`night=1`、`nightMix=1`、`body.night`），`PASS` 白天切回（`nightMix=0`）；夜晚截图确认车站、路灯、部分窗户与车厢窗口发光，场景仍可看清
- `PASS` 拖拽旋转相机（`[58,56,64]` → `[42.22,59.92,72.24]`）
- `PASS` 滚轮缩放（相机距离 `102.9` → `84.7`）
- `PASS` 复位恢复初始机位 `[58,56,64]`、`target [0,-0.5,0]`、列车位置、速度 `8`、白天与运行态
- `PASS` 列车到站停留（`dwellCount=1`、`dwellRemaining=2`）；`PASS` 暂停时到站计时冻结（2 → 2）且车厢位置不变；`PASS` 停留结束后继续运行；`PASS` 第二次到站（`dwellCount=2`）

视觉验收通过截图人工查看：默认等距视角下完整沙盘位于有厚度、带边框与铭牌的木底座上；闭合轨道连续、两处跨河石桥与一座公路桥位置合理；建筑未压占轨道；草地、水面、木底座、模型建筑材质可辨；傍晚暖色阳光有投影；夜晚发光且可读；列车为车头 + 两节车厢。

## 过程中发现并修复的失败（如实记录）

第一次 headless 截图暴露两个渲染缺陷：土壤盒顶面在单材质下被 three 忽略 `geometry.groups` 而渲染出来，遮住草地与河槽；水面带状网格延伸到底座之外，在四角露出蓝色矩形。改为四面竖墙裙边、并把水面裁剪到板边后复验通过。

第一次 CDP 交互验证有 5 项失败：

- `train advances while running`（`83.63 -> 86.43`）、`night toggle reaches night`（`nightMix=0.5`）、`day toggle returns to day`（`mix=0.35`）、`train dwells at station`（未观察到停留）：根因是软件 WebGL 在 1440×900 下只有约 2–3 fps，而 `dtReal` 上限被设为 `0.05`，导致仿真时间几乎停滞（注意：到站停留本身是正常工作的，车站近景截图的 status 已显示 `At station`）。将仿真时间步上限改为 `0.35` 秒（仍限制标签页切换造成的大跳变）后修复。
- `reset restores initial camera`（返回 `[12.23,66.63,77.44]`）：根因是 `OrbitControls` 内部保留阻尼累积量，直接写 `camera.position` 后下一次 `update()` 又把视角拉走。复位时先关闭阻尼并 `update()` 清空累积量，再写入初始机位，复验通过。

同批还做了观感修正：水面薄笔触改为柔和宽波纹（避免条纹状划痕）、教堂尖顶与市政厅穹顶改用独立浅色材质、控制面板从底部改到左上以免遮挡沙盘、阴影贴图降到 1024 以降低软件渲染开销。第二次与第三次（1440×900）CDP 验证均为 0 失败。

## 已知限制

- `npm run build` 输出一条 `>500 kB` chunk 提示：Three.js 被打包进单个 580.71 kB JS 文件。构建本身成功，未做代码分割，因为任务不要求且不影响运行。
- 无头 Chrome 使用 SwiftShader 软件 WebGL 时，765 次 draw call / 177,564 三角形在 1440×900 下只有数帧每秒。运行循环按真实时间推进，因此列车运动、到站计时与停留秒数仍然正确，但流畅动画需要硬件 GPU；在带 GPU 的普通浏览器中不受此限制。
- 无头 Chrome 的 stderr 出现过一条与页面无关的 `mail.google.com ... failed to install with reason 21`（Chrome 后台 Web App 安装器），应用内的错误诊断未收集到任何 JS 异常。
- 本任务没有提供固定测试或测试框架，因此没有单元测试套件；验证方式为静态语法检查、生产构建、真实浏览器渲染与 CDP 交互验证。
- 所有纹理均由运行时 Canvas 生成，无外部资源请求，无需凭据或后端；未观察到资源加载失败。
- `window.__diorama` 是保留在页面中的只读诊断钩子（状态与 `info()`），不影响使用。
- 不需要人工介入。

## 清理与提交

- 验证用的截图与 CDP 脚本放在仓库根目录下的 `.verify/`，不属于 `solution/`，提交前已删除。
- 开发服务器（`5173`）、生产预览服务器（`4173`）与所有已启动的 Chrome 实例在结束前关闭。
- 提交内容仅为 `tasks/railway-town-diorama/solution/`，提交信息 `feat: complete railway town diorama task`。
