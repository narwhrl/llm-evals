# 运输船 · 甲板攻防

单机浏览器 5 对 5 第一人称团队竞技。玩家与四名友军电脑对阵五名敌军电脑；默认先达 100 击杀或 10 分钟结算。提供两分钟练习局。地图依 2018 年端游截图组重建，未使用官方游戏资源。

## 环境和启动

在本目录执行（本次验证环境：Windows、Node.js `v24.21.0`、npm `11.19.0`）：

```bash
npm ci
npm run dev
```

Vite 输出本地地址，默认 `http://127.0.0.1:5173/`。请用已启用 WebGL 的桌面 Chromium/Chrome 或 Edge 打开，点击「进入对局」锁定鼠标。初次交互后才会启动合成音频。游戏所有正式资源由本地源码生成；静态运行不需联网、账号或 API 密钥。

```bash
npm run typecheck
npm test
npm run build
npm run preview
```

非根路径部署验证：

```bash
npm run build -- --base=/cf-transport-ship/gpt-6-sol/ --outDir=dist-subpath --emptyOutDir
```

把 `dist-subpath/` 部署在对应前缀后直接打开 `.../cf-transport-ship/gpt-6-sol/`。普通构建的 `dist/` 可由任意静态 HTTP 服务器托管。`npm run test:e2e` 使用本机 Playwright Chromium；须先运行开发服务器，可用 `TEST_URL` 指向静态预览地址。`node scripts/feedback-e2e.mjs` 通过浏览器指针锁定验证鼠标方向，并用真实弹道验证命中与击杀反馈，截图保存在 `evidence/feedback-*.png`。`node scripts/controls-feedback-e2e.mjs` 验证 A/D 横移、狙击开镜和退镜动画、暂停后反馈到期及重开后清除，截图保存在 `evidence/scope-*.png`。`node scripts/visual.mjs` 保存固定机位实机截图；`node scripts/match-run.mjs` 跑两分钟练习局并保存结算与帧时间。测试浏览器使用软件渲染的数据不代表独立显卡帧率。

本地预览子路径构建时，预览服务器也需要同一 base：

```bash
npm run preview -- --base=/cf-transport-ship/gpt-6-sol/ --outDir=dist-subpath
```

## 操作

| 输入 | 行为 |
| --- | --- |
| 鼠标移动 | 瞄准；设置中可调灵敏度、反转 Y 轴与独立狙击灵敏度 |
| W / A / S / D | 移动，斜向归一化 |
| Shift / Ctrl 或 C / Space | 静步 / 蹲伏 / 跳跃 |
| 鼠标左键 / 右键 | 射击或挥刀 / 狙击开镜或刀重击 |
| 1 / 2 / 3 / 4 | 主武器 / 手枪 / 刀 / 投掷物（再次按 4 切换雷种） |
| 滚轮 / Q | 顺逆切装备 / 切回前一装备 |
| R / G | 换弹 / 快速投出当前雷种 |
| Tab / Esc | 按住看战绩 / 释放鼠标并暂停 |
| F1–F4 | 死亡等待时选择下次出生的主武器 |

默认主武器可在菜单选择：AR-47 高伤步枪、M4 稳定卡宾枪、K9 冲锋枪、M90 栓动狙击。每次出生另配 D7 手枪、战术刀、高爆手雷和烟雾弹。友伤关闭；自身手雷可造成伤害。木箱可由步枪和狙击有限穿透，钢箱、舱壁和甲板阻断弹道。烟雾遮蔽玩家视野与电脑感知，但不阻挡子弹。

## 设置、质量和故障排查

菜单及暂停层可修改垂直 FOV、总音量、音效音量、画质、镜头摆动等。设置会尝试保存在 `localStorage`；无法保存时本次会话仍可用。中画质以 1440×900、像素比 1 为主要目标；低画质降低像素比并关闭阴影，高画质提高阴影图与像素比。浏览器失焦或页面切后台会暂停，返回后点击「继续游戏」重新锁定鼠标。

若页面提示 WebGL 不可用，请启用浏览器硬件加速或换支持 WebGL 的桌面浏览器。若鼠标未锁定，点击「继续游戏」，并检查浏览器是否允许该页面的指针锁定。首次无声时，请先在页面内点击并确认系统音量。画面卡顿可将画质设为低，或降低浏览器窗口分辨率。构建日志中的大包警告来自本地 Three.js 游戏代码，项目没有运行时网络资源。

## 文档与验证

- [地图依据与尺度](docs/MAP_REFERENCE.md)
- [资源与授权](docs/ASSET_CREDITS.md)
- [逐项验收](docs/ACCEPTANCE.md)
- [模型运行报告](RESULTS.md)
- `evidence/` 保存真实浏览器截图、端到端日志和性能采样；`references/` 只供参照，不进入运行时打包。

本作是根据公开画面进行的独立重建。原版地图细节若缺乏同版本连续走图证据，均在地图文档中标注为近似；不包含官方商标、客户端提取资源或官方音频。
