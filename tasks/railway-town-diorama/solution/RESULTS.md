# RESULTS

- 模型标识：`claude-opus-5-5:max`
- 起始 commit：`f95b2e8c1380b78d2bce7ce335e0ad2e974a5183`（`git rev-parse HEAD`）
- 运行环境：Windows 11，Node.js v24.21.0，npm 11.19.0；依赖锁定为 three 0.187.0、vite 8.3.6
- 验证浏览器：本机安装的 Google Chrome（headless，ANGLE/D3D11），通过 playwright-core 驱动，视口 1440 × 900

## 实际执行的命令与结果

均在 `tasks/railway-town-diorama/solution/` 下执行，除非另有说明。

| 命令 | 结果 |
| --- | --- |
| `npm install --no-audit --no-fund` | 成功，安装 16 个包，生成 `package-lock.json` |
| `npm test`（`node --test`） | 9 项通过，0 项失败：轨道闭合且位置、朝向连续；0.25×、1×、2.5× 三档速度下每圈都停在同一站位，停留 2 秒（误差 < 0.05 s）；停站时整列车都在站台范围内；复位后状态与初始状态完全相同；全环线上相邻车厢端部间距保持在 0.15–0.3；建筑与树木不压铁轨和河道；两座铁路桥都在直线段上，且位于河道正上方 |
| `npm run build` | 成功。三个产物：`index.html`、CSS 2.4 kB、JS 677 kB（gzip 177 kB）。Vite 提示单个 chunk 超过 500 kB，主要是 three.js 本身，只是提示，不影响构建 |
| `npm run build -- --base=/railway-town-diorama/claude-opus-5.5/ --outDir=<运行目录>/.runs/verify/site/railway-town-diorama/claude-opus-5.5 --emptyOutDir` | 成功，`index.html` 中的资源路径为 `/railway-town-diorama/claude-opus-5.5/assets/...`。在 Git Bash 中需加 `MSYS_NO_PATHCONV=1`，否则 Git Bash 会把 `--base=/...` 改写成 Windows 路径；这是 shell 行为，用 cmd、PowerShell 或 Node 的 `execSync` 调用时没有这个问题 |
| `vite preview`（上面的子路径构建，`--base /railway-town-diorama/claude-opus-5.5/`） | 页面 0.9 s 内 load。首屏默认即为傍晚、列车运行中、整块沙盘可见；暂停按钮生效；夜晚切换生效；控制台无错误，无资源加载失败。生产包中不包含开发用的 `window.__diorama` |
| `vite` 开发服务器 + 自动检查脚本 `.runs/verify/check.mjs` | 结果见下 |

开发服务器上的自动检查（`.runs/verify/check.mjs` 通过仅在 DEV 下存在的 `window.__diorama` 读取状态）：

- 行驶中暂停：1.5 s 内列车位置不变，状态显示「已暂停」；恢复后继续前进。
- 停站中暂停：2 s 内停站剩余时间保持 1.3 s 不变，状态显示「已暂停 · 停靠剩余 1.3 秒」；恢复后完成停站并出发。
- 2.5× 速度连续运行 36 s：到站 2 次，都停在弧长 7.75（站台位置），各停 2.00 s。
- 1× 速度连续运行 80 s：在 28.8 s 和 61.3 s 两次到站，停站位置相同，各停 2.00 s；一圈约 32.5 s。
- 复位确定性：两次从不同状态复位（分别把速度改成 0.4× 和 2.2×，并拖动、缩放镜头）。两次复位后，相机位置、目标点、列车弧长（11）、车速（3）、速度滑块（1）、运行状态逐项完全一致；复位 1.2 s 后相机没有因阻尼惯性漂移。
- headless Chrome 中帧率约 120 fps；全程控制台无错误。

人工查看的截图（`.runs/verify/*.png`）：默认傍晚全景、夜晚全景、车站近景（傍晚和夜晚）、桁架桥、板梁桥、石拱公路桥、列车在弯道上（三节车各自朝向）、道口栏杆随列车放下、农场角落、后方树林山丘。

## 已知限制

- 车轮固定在车体上，没有单独建模转向架的偏转。弯道上车轮相对钢轨会有很小的横向偏移，正常视距下看不出来。
- 蒸汽烟团使用 `Math.random`，不是逐帧确定的；复位时会清空烟团，不影响列车位置和机位的确定性。
- 复位恢复初始机位、列车位置和 1.00× 速度，并让列车继续运行；不会切换傍晚／夜晚。
- 初始机位的距离按当前视口宽高比计算，保证整块沙盘入画。同一视口尺寸下复位结果完全一致；窗口尺寸变了，复位距离也会随之变化。
- 渲染用了 4096² 阴影贴图、4× MSAA 和 bloom 后处理。只在本机 GPU 的 headless Chrome 中测过帧率，没有在低端显卡、其他浏览器或移动端上验证。
- 道口栏杆和闪灯、蒸汽、水面波纹属于任务之外的附加效果。

## 需要人工介入的地方

无。没有使用任何需要凭据的服务，也没有外部素材，所有模型和贴图都在浏览器里程序化生成。

验证脚本、截图、playwright-core 依赖和子路径构建产物都在运行目录的 `.runs/verify/` 下（已被仓库 `.gitignore` 忽略，未提交）。dev 和 preview 服务器已关闭，脚本启动的 headless 浏览器都已关闭。
