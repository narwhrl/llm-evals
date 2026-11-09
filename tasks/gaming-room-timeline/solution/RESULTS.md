# 游戏房间时间线作品 · 结果报告

- 模型标识：`stealth/crouton-alpha:max`
- 起始 commit（`git rev-parse HEAD`）：`bb5e741d5c1148ab73932f26803d54d9da42b062`

## 实际运行过的命令与结果

| 命令 | 结果 |
|---|---|
| `npm install`（经 npm-cli.js，`--no-audit --no-fund`） | ✅ 成功，`added 15 packages in 4s`，生成 `package-lock.json`（35653 字节） |
| `npm run build`（默认 base） | ✅ 成功，`✓ built in 566ms`，产出 `dist/index.html` + `dist/assets/index-Bep5g-E3.js`（523.09 kB） |
| `npm run build -- --base /gaming-room-timeline/crouton-alpha-max/ --outDir dist`（含 `VITE_BASE`） | ✅ 成功，`✓ built in 564ms`，`dist/index.html` 内含 `/gaming-room-timeline/crouton-alpha-max/assets/...` 路径，`BASE_OK` |
| `node --check`（`src/main.js` / `src/screen.js` / `src/room.js`） | ✅ 三个文件均通过语法检查（退出码 0） |
| 静态源码检查脚本（grep/存在性） | ✅ `has_three/has_orbit/has_slider/has_play/has_ray/has_screen/room_buildYear/room_shell/room_keeps/screen_snake/screen_shooter/screen_dodge/lockfile` 均为 `true` |

说明：本环境 `npm`/`npx` 包装脚本在 Git Bash 下报 `/dev/null` 路径错误，故改用 `node <npm-cli.js>` 直接执行 npm CLI；等效于正常 `npm` 命令。`npm run build` 的 `--base` 通过 `VITE_BASE` 环境变量 + Vite CLI `--base` 参数共同验证（`vite.config.js` 读取 `process.env.VITE_BASE`，默认 `./`）。

## 已知限制与失败

1. **未进行真实浏览器/CDP 验证**：本机无 Chromium/Chrome 可用，未能按评测步骤 5—8 在 1440×900 浏览器中手动拖动滑杆、点击物品、运行小游戏并截图。注释里 claim 的 UI 行为仅经构建与静态检查证明，未经真实浏览器打开验证。需要人工介入：外接浏览器打开 `npm run dev`，逐项走一遍评测流程。
2. **-dev server 已启动后关闭**：本次未实际保持 dev server 运行（仅执行构建命令），无残留进程。
3. **单 chunk 523 kB**：Vite 构建提示 chunk 过大（three.js 占主体），属可接受阈值，未拆分。gzip 后约 135 kB。
4. **屏幕贴图映射为简化方案**：3D `screenPlane` 固定在桌面上显示器位置，年代组切换显示器形态（CRT/宽屏/双屏/三屏/超宽）后，贴图平面尺寸不变；关闭遮罩为装饰性实现。
5. **海报与贴纸**：程序化 CanvasTexture，无外部图片。
6. **`node_modules/` 与 `dist/` 已被 `.gitignore` 排除**，提交仅含源码 + `package-lock.json` + 文档。

## 需要人工介入

- 在有桌面的浏览器里启动 `npm run dev`（或 `npm run preview`），逐年拖动滑杆确认各年代物件与过渡、点击物品查看说明、点击显示器体验三款小游戏，确认无控制台报错。
- 若部署到子路径，确认生产产物在 `/gaming-room-timeline/crouton-alpha-max/` 下可正常加载（已验证 base 路径写入，但未实际 HTTP 路由验证）。

## 实现概要

- 场景：Three.js + Vite，程序化几何体，`OrbitControls` 自由观察
- 年代系统：2005/2008.5/2011/2014/2017/2020/2023 七段区间，透明度交叉淡化（窗口 ±0.5 年），2011 后旧物入角落收藏
- 持续物：鱼缸、书架/书、绿植、旧臂chair、角落老电脑、小夜灯、天花灯
- 屏幕：512×320 CanvasTexture，按 2005—2025 分 7 段配三款小游戏（贪吃蛇/靶场射击/星尘躲避），支持鼠标点击与键盘
