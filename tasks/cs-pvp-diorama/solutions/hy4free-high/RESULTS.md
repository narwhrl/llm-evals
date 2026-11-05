# CS PVP Diorama — 结果报告

- 完整模型标识：`magpie/workbuddy/hy4free:high`
- 起始 commit（baseline，`git rev-parse HEAD`）：`8416a7da87b303d0489f47d09309a6fe2f671114`
  - 运行目录为该 commit 的隔离副本（detached HEAD，无分支/标签/远端）。
- 任务 ID：`cs-pvp-diorama`
- 交付路径：`tasks/cs-pvp-diorama/solution/`
- 交付时运行环境：Windows (win32)、Node.js v24.21.0、npm 11.19.0

## 作品概述

以 Three.js + Vite 实现一张 CS 经典拆除模式地图的雨夜微缩三维沙盘，第三人称全景视角，支持鼠标拖拽旋转、滚轮缩放（`OrbitControls`，带阻尼，限制俯仰避免钻到底座下方）。全部内容搭建在一块完整的正方形灰色混凝土底座内，底座带一圈抬高的混凝土边框；画面无任何 UI、无人物。场景用三渲二硬朗卡通材质（`MeshToonMaterial` 四级色阶 + `EdgesGeometry` 深色描边）与程序化 canvas 纹理（混凝土、沥青、锈迹、木纹、瓦楞纸、金属、弹孔、涂鸦、货运编号、警徽、A/B 炸弹区喷漆、警示条纹、铁格栅、值班表）表现冷峻工业雨夜质感。

地图按题面还原四大区域与三条路线：北侧 T 出生点（带刺铁丝网、破旧厢式货车与木梯、三层堆叠海运集装箱、缓坡与四连油桶、破损洞口）、西北侧 A 包点（半开放仓库、半卷锈迹卷帘门、木板窗与侧门、白漆 A 区标识、叉车、五层货架、承重柱、铁皮阁楼与垂直铁梯、冷白应急顶灯、后场门缝红光）、中轴中路（半开双开铁门对枪缝隙、两侧高墙高位射击孔、排水沟铁格栅、矮墙掩体、T/CT 两侧下水道出入口、两座岗亭）、东北侧 B 包点（两层铁皮门卫室、玻璃窗与双门、室内办公桌/翻倒椅/值班表/储物柜/暖黄破损日光灯、消防梯通向二楼阳台、B 区标识、货运托盘/垃圾桶/废弃自行车/翻倒铁艺桌椅、暖黄路灯与转角矮墙捷径）、南侧 CT 出生点（拒马与警盾防御阵型、警用面包车与车顶警灯、混凝土高台与室外楼梯、探照灯、印警徽与警戒标语的封闭围墙、装备箱）。左侧小巷、右侧高台侧翼与中路下水道共同构成绕后路线。全域散布制式木箱、蓝色油桶、瓦楞纸箱、拒马、隔离墩、橡胶轮胎、电线杆与黑色电线、排水沟与滴水点。

地面为一块自定义着色器 `Reflector` 平面：以 canvas 湿度遮罩把「干燥沥青」与「明亮积水」混合，积水实时倒映灯光、建筑轮廓与雨丝。动态效果包括持续雨丝、屋檐/集装箱/卷帘门滴水、积水涟漪、路灯/仓库灯/探照灯轻微闪烁、警灯红蓝交替、墙面/玻璃下滑水痕、通风口白色水汽、卷帘门偶发震动、远处雷光电光。冷蓝雨夜环境光与暖黄路灯、冷白仓库灯、红色警灯形成多重冷暖对比。

## 技术栈与文件

- 依赖：`three@0.180.0`（dependencies）、`vite@6.3.5`（devDependencies）；`package-lock.json` 已提交。
- 入口 `index.html` → `src/main.js`（渲染器、相机、控制器、光照、渲染循环）；`src/kit.js`（材质/程序纹理/描边助手/几何与道具构件）；`src/world.js`（底座、反射地面、四大区域、三条路线、道具、标记、灯光）；`src/fx.js`（雨、滴水、涟漪、灯光、警灯、水汽、震动、闪电）。
- `package.json` 的 `build` 脚本为 `vite build`，直接透传 `--base`、`--outDir`、`--emptyOutDir`；无 `vite.config.js`，无需额外配置。运行不需要任何外部资产或凭据。
- 静态场景只有一盏平行光投射阴影，`shadowMap.autoUpdate=false` 一次性烘焙阴影图，配合单块平面反射器控制开销。

## 实际执行的命令与结果

| 命令 | 结果 |
| --- | --- |
| `git rev-parse HEAD` | `8416a7da87b303d0489f47d09309a6fe2f671114` |
| `git branch --show-current` / `git status --short` | 空（detached HEAD，工作树干净） |
| `node --version` / `npm --version` | `v24.21.0` / `11.19.0` |
| `npm view three version --silent` | `0.187.0`（registry 可达） |
| `npm view three@0.180.0 version --silent` / `npm view vite@6.3.5 version --silent` | `0.180.0` / `6.3.5` |
| `npm install --no-audit --no-fund` | `added 15 packages in 5s`；npm 11 提示 esbuild postinstall 未被 `allowScripts` 覆盖（警告，非错误） |
| `node -e "const e=require('esbuild'); console.log(e.version, e.transformSync('const x=1').code.trim())"` | `esbuild 0.25.12 const x = 1;`（二进制可用） |
| 检查 `node_modules/@esbuild/win32-x64`、`three/examples/jsm/controls/OrbitControls.js`、`three/examples/jsm/objects/Reflector.js`、`three/package.json` exports | 均存在；`"./addons/*"` → `"./examples/jsm/*"` |
| `npm run build` | ✓ `vite v6.3.5`，`11 modules transformed`，生成 `dist/index.html` 与 `dist/assets/index-*.js`（553.58 kB / gzip 141.88 kB）；仅有 Vite 的 `>500 kB` 分包警告（three.js 体积，非失败） |
| `npm run build -- --base=/cs-pvp-diorama/hy4free-high/ --outDir=./dist-check --emptyOutDir` | ✓ 通过；生成的 `index.html` 引用 `/cs-pvp-diorama/hy4free-high/assets/index-*.js`，base 正确前缀 |
| `npm run dev -- --host 127.0.0.1 --port 5173` | 服务就绪（5173） |
| `npx vite preview --help` | 确认 preview 支持 `--base` / `--outDir` |
| `npm run build -- --base=/cs-pvp-diorama/hy4free-high/ --outDir=./dist-check --emptyOutDir`（最终代码） | ✓ 生成 `dist-check/index.html` 与 `assets/index-C4ggcvZJ.js`，script src 为 `/cs-pvp-diorama/hy4free-high/assets/index-C4ggcvZJ.js` |
| `npm ci --no-audit --no-fund`（用提交的 lockfile 重装） | ✓ `added 15 packages in 4s`；同样有 esbuild `install-scripts` 警告，非错误 |
| `npm run build -- --base=/cs-pvp-diorama/hy4free-high/ --outDir=./dist-final --emptyOutDir`（`npm ci` 之后） | ✓ 通过，生成 `index.html` 与 `assets/index-C4ggcvZJ.js`；随后清理 `dist-final/` |
| `npx vite preview --host 127.0.0.1 --port 4173 --base=/cs-pvp-diorama/hy4free-high/ --outDir=dist-check` | 首次失败：Git Bash/MSYS 把 `/cs-…` 转换成 `/Program%20Files/Git/cs-…`，服务端 base 错误导致根路径 404（本地 shell 路径转换，非作品问题） |
| `MSYS_NO_PATHCONV=1 npx vite preview --host 127.0.0.1 --port 4173 --base=/cs-pvp-diorama/hy4free-high/ --outDir=dist-check` | ✓ 服务就绪（4173），base 正确 |
| `rm -rf dist dist-check dist-final`、`find`、`git status --short` | 构建产物已清理；solution 内仅保留交付源文件 + 被忽略的 `node_modules/` |

## 浏览器观察（1440 × 900 视口，真实 Chromium）

- 开发服务器 `http://127.0.0.1:5173/`：首次加载出现 `ReferenceError: sphere is not defined`（`src/world.js` 的 `bSite` 中 `sphere` 未导入）。定位为 `world.js` 从 `kit.js` 的导入遗漏，补上 `sphere` 后重载：`pageerror` 为空，`gl.getError()=0`，canvas 存在且尺寸 `2139×1209`（设备像素比缩放），`document.body.innerText` 为空（无 UI 文字）。
- 初次画面偏暗、偏单色蓝，暖冷对比不足。自主调整 `toneMappingExposure`（1.18 → 1.85）、半球光/环境光/月光强度、各战术点光源强度、反射器颜色变亮、雨量 2000 → 1500 / 不透明度 0.3 → 0.2 后重载：无错误，画面亮度与冷暖层次明显改善。
- 交互验证：鼠标按下拖拽 → 相机角度显著变化（低角度侧视），无错误；滚轮 `deltaY:-700` → 拉近显示更多细节，无错误；再次拖拽到俯视角度 → 可读出 A、B 炸弹区喷漆标识、中路双开铁门与排水沟、三条路线、散布掩体与积水面。所有角度均无任何 `pageerror` 与非 debug 级 console 警告。
- 生产构建子路径 `http://127.0.0.1:4173/cs-pvp-diorama/hy4free-high/`：标题 `CS PVP Diorama`、canvas 正常、无 `pageerror`、无非 debug console 输出；`document.querySelector('script[type=module]').src` 为 `…/cs-pvp-diorama/hy4free-high/assets/index-C4ggcvZJ.js`；网络记录中文档与脚本均为 304（缓存有效，非失败）；截图确认完整渲染。
- 结束前已关闭全部浏览器标签页，停止 dev server 与 preview server，删除 `dist/` 与 `dist-check/`。

## 已知限制与失败

- 全部几何由 Three.js 基础体与程序化 canvas 纹理拼装，无外部美术资产；细节是风格化近似，不是照片级高模。
- `npm install` 在 npm 11 下会打印 esbuild postinstall 的 `install-scripts` 警告；已验证 esbuild 二进制可用且构建成功，不影响交付（部署侧使用 `npm ci`）。
- Vite 构建打印 `>500 kB` 分包警告，因为 three.js 被打进单一 chunk；非错误，未做代码分割以免增加复杂度。
- 在 Git Bash/Windows 下直接运行 `vite preview --base=/…` 会被 MSYS 路径转换破坏，需要 `MSYS_NO_PATHCONV=1`；这是本地 shell 特性，部署流程由 Node 直接 spawn，不受影响。
- 反射采用单块平面 `Reflector` + 湿度遮罩，而非逐水洼屏幕空间反射；阴影为静态烘焙（场景静止，仅灯光强度变化），这是为控制平面反射器重绘开销的有意取舍。
- 雨、滴水、水汽、涟漪、闪电均为程序化近似动效。
- 本任务无固定可执行测试；验证方式为构建 + 真实浏览器多角度/缩放/交互观察，未编写单元测试。

## 失败记录与自主修正

- 运行期 `sphere is not defined`：已通过补齐 `world.js` 的 `kit.js` 导入修复，重载后不再复现。
- `vite preview --base` 的 MSYS 路径转换：通过 `MSYS_NO_PATHCONV=1` 重启服务解决，作品本身无需改动。
- 首版画面过暗：通过调参改善，非失败。

## 需要人工介入

无需人工介入。上述两处问题均在本次运行内自主定位并修正；安装、构建、运行、浏览器验证与提交均由本运行独立完成。

## 交付提交

写入本报告后执行：`git add tasks/cs-pvp-diorama/solution`，随后以 `feat:` 前缀提交一次（`feat: implement CS PVP rainy-night diorama scene`），提交后确认 `tasks/cs-pvp-diorama/solution` 无未提交改动。
