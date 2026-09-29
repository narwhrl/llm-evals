# Candidate result report

- **任务：** `cf-transport-ship`
- **完整可用模型标识：** OpenAI `gpt-6-sol`（本次运行界面未提供更细的版本后缀）
- **候选 ID：** `gpt-6-sol`
- **起始 `main`：** `7c210c2dd734915419097074108efadec416e2e4`
- **候选提交：** 原始不可变标签 `candidate/cf-transport-ship/gpt-6-sol` 指向首版提交；本次反馈修订另以不可变修订标签保存。完整对象 SHA 记录在任务分支的导入溯源文件中。提交无法在自身内容里写入自身 SHA 而保持 SHA 不变。
- **工作区：** 独立克隆 `.runs/cf-transport-ship/gpt-6-sol/`，代码仅写在 `tasks/cf-transport-ship/solution/`；根检出一直保持 `main`。

## 实施结果

完成本地 5 对 5 第一人称团队竞技：狭长货轮甲板、端部舱体、斜置篷布货物、木/钢掩体、两侧有顶绕行、跳箱高点、海面和吊机；第一人称移动、碰撞、枪械、穿木不穿钢、部位伤害、护甲、手雷/烟雾、死亡复活、电脑路线与交战、比分计时、暂停、设置、HUD/小地图、合成音效。默认十分钟先达 100 击杀，另有两分钟练习局。运行时艺术和声音均由本地程序生成，不依赖远端服务或凭据。

地图高置信度部分是两端对称出生区、长形甲板、中央斜置绿色货物、两侧大型箱体、木箱阶梯和海/吊机大轮廓，依据同组 R05–R09 截图。米制尺寸、侧道内部结构及箱顶精确跳跃链缺同版本连续走图证据，均为明确标记的近似。详情见 `docs/MAP_REFERENCE.md`。

## 验证命令和结果

在候选 `solution/` 目录执行：

| 命令 | 实测结果 |
| --- | --- |
| `npm ci --no-audit --no-fund` | 退出 0，按锁文件安装 53 包；npm 提示 esbuild 的 postinstall 不在 allowScripts 覆盖内，随后构建仍成功。 |
| `npm test` | 退出 0；2 个文件、12 个测试通过，含 600 秒无操作对局、两侧道真实碰撞、30/60/144 Hz 对照及 5 次逻辑重开。 |
| `npm run build` | 退出 0；TypeScript 与 Vite 通过。主 JS 约 601.76 kB，Vite 给出 >500 kB 非阻断警告。 |
| `npm run build -- --base=/cf-transport-ship/gpt-6-sol/ --outDir=dist-subpath --emptyOutDir` | 退出 0；资源 URL 带正确子路径。 |
| `npm run preview -- --base=/cf-transport-ship/gpt-6-sol/ --outDir=dist-subpath --port=4174 --strictPort` | 在本机 `127.0.0.1:4174` 托管并供以下浏览器检查。 |
| `TEST_URL=... npm run test:e2e` | 退出 0；原生指针锁定、10 人开局、W 移动、30→29 发、Esc 暂停，0 页面错误、0 外部请求；`evidence/e2e-smoke.json`。 |
| `TEST_URL=... node scripts/interactions.mjs` | 退出 0；开镜、射速限制、换弹、Tab、5 次 Esc/继续、手枪/刀/烟雾、1920×1080、5 次 UI 重开、设置刷新保存、异源请求拦截后重新进入均通过；`evidence/interactions.json`。 |
| `TEST_URL=... node scripts/visual.mjs` | 退出 0；8 张固定机位实机截图，0 页面错误。 |
| `TEST_URL=... node scripts/match-run.mjs` | 退出 0；最终生产包两分钟局结束为赤隼 27:21，0 页面错误、0 外部请求；`evidence/match-run.json`、`match-result.png`。 |

上表的 `TEST_URL` 为 `http://127.0.0.1:4174/cf-transport-ship/gpt-6-sol/`，PowerShell 中通过 `$env:TEST_URL='...'` 设置。开发服务器上的早期 e2e 也通过；最终完整记录以生产子路径构建为准。`npm test` 在默认沙箱中初次因 Vitest 子进程 `spawn EPERM` 未执行任何用例；获准启动本地测试子进程后通过。子路径预览初次漏传服务器 `--base`，导致 JS URL 返回 HTML、浏览器等待菜单超时；加上相同 base 后通过。交互脚本重开压力测试初次在未等待渲染稳定时取到不同几何计数；稳定采样后五次均为 1000 几何、9 纹理。以上失败没有当成通过结果，也未更改任务标准。

## 浏览器与性能范围

Windows 11 企业版 `10.0.26200`，Intel Core Ultra 9 285H；系统枚举 GameViewer Virtual Display Adapter 与 Intel Arc 140T GPU。实测浏览器是无头 Chromium `153.0.8010.12`，使用 **SwiftShader 软件 WebGL**，中画质、1440×900、像素比 1。最终两分钟局测得约 6.25 FPS，帧时间中位 166.6 ms、P95 316.7 ms、P99 450 ms；最后报告堆使用约 17.1 MB。该数据只描述自动化软件渲染环境，不能推断 Intel GPU 上的帧率。未取得带图形界面的硬件渲染十分钟性能结果。

## 已知限制与人工介入

- `docs/ACCEPTANCE.md` 逐项列出 A01–A32；未验证的交互不冒充通过。尤其是完整玩家路线/跳箱、头身腿固定靶、近战与高爆弹极端情形、同分结算、音频听辨、全屏切换和硬件浏览器性能。
- 程序美术仍偏低多边形；烟雾边缘与第一人称武器近景的精细度不及目标参考。侧道内部与精确箱顶路线为资料不足时的独立近似。
- 需要人工使用普通桌面浏览器从出生点持续游玩、逐条走查路线与跳箱链，并在实际 GPU 上做 10 分钟性能与声音验收。其余安装、构建、自动化对局和画面证据不需人工干预。

## 2026-09-29 鼠标与战斗反馈修订

本次仍在上述起始 `main` 的隔离候选克隆中完成，原始候选标签不移动。浏览器复现记录：原版在原生指针锁定下鼠标右移 100 像素，水平角变为 `+0.21`，实际镜头向左；默认垂直向下为 `-0.21`，方向正确。普通命中在对局时间 0.25 秒后不可见，击杀提示在 1.5 秒后不可见。修订后水平角变为 `-0.21`，命中十字和伤害文字显示 0.48 秒，击杀卡片显示 2.2 秒；爆头采用金色强调，命中和击杀合成音更明确。原有反转 Y 轴选项未改动。

在 `solution/` 下实际执行：

| 命令 | 实测结果 |
| --- | --- |
| `node scripts/feedback-e2e.mjs`（当时脚本默认指向开发服务器 5175） | 修复前退出 1：方向、命中时长、击杀时长三个断言失败；修复后退出 0。提交前将脚本默认端口改为项目常规的 5173。 |
| `npm test` | 退出 0；2 个文件、12 项通过。 |
| `npm run build` | 退出 0；TypeScript 和 Vite 通过，仍有原有 >500 kB 包体非阻断警告。 |
| `npm run build -- --base=/cf-transport-ship/gpt-6-sol/ --outDir=dist-subpath --emptyOutDir` | 退出 0；生产子路径构建通过。 |
| `TEST_URL=http://127.0.0.1:4175/cf-transport-ship/gpt-6-sol/ node scripts/feedback-e2e.mjs` | 退出 0；原生鼠标右移与下移方向正确，真实弹道两次造成伤害，击杀比分加 1，0 页面错误。`evidence/feedback-e2e.json`，并人工目视检查 `feedback-hit.png`、`feedback-kill.png`，文字、准星和卡片可读。 |
| `TEST_URL=http://127.0.0.1:4175/cf-transport-ship/gpt-6-sol/ npm run test:e2e` | 退出 0；十人开局、指针锁定、移动、射击和 Esc 暂停仍通过，0 页面错误、0 外部请求。 |

以上生产子路径验证由 `npm run preview -- --base=/cf-transport-ship/gpt-6-sol/ --outDir=dist-subpath --port=4175 --strictPort` 托管。自动化浏览器用 SwiftShader，合成音已接入命中和击杀事件，但听感仍需桌面人工试听；没有新增运行时依赖。
