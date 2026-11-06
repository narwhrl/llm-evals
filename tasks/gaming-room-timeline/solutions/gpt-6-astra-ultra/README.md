# 存档 · SAVE ROOM

一间房，一个玩家，二十年的存档。暖色微缩三维场景以 2005、2010、2015、2020、2025 五代设备和生活物品呈现成长；红杯、光盘、合照与小熊留在同一个房间里。

## 运行

需要 Node.js 20.19+ 或 22.12+，以及支持 WebGL 2 的现代浏览器。

```sh
npm install
npm run dev
```

打开终端显示的本地地址。生产构建与预览：

```sh
npm run build
npm run preview
```

部署在指定子路径时：

```sh
npm run build -- --base=/gaming-room-timeline/gpt-6-astra-ultra/ --outDir=dist-subpath
```

将输出目录作为静态网站发布，保留 `assets/`。`build` 直接使用 Vite，接受其 `--base` 和 `--outDir` 参数。

## 操作

- 拖动房间环视，滚轮缩放，右键拖动平移；触屏支持单指旋转、双指缩放和平移。
- 时间滑杆逐年选择 2005—2025；年份按钮跳转到五个代表年份，播放按钮自动前进。非代表年份保留最近一次设备配置。
- 点击物品或旁边的光点阅读记忆。旧光盘在后期被移至旧主机上的收纳盒，仍可查看。
- 「整个房间」恢复全景；「坐到桌前」靠近电脑。点击屏幕中的 `PLAY`，在二十秒内点击星星得分；屏幕左上 `BACK` 返回，结束后可以重玩。
- 月亮按钮切换灯光。空格播放或暂停，左右方向键切换年份，`Esc` 关闭卡片。

## 验证

```sh
npm test
```

屏幕测试覆盖五代桌面、游戏流程与年代边界。浏览器测试需要先启动开发服务器，并安装 Playwright Chromium。此评测将浏览器与临时文件保留在项目目录，PowerShell 命令如下：

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path (Get-Location) '.browsers'
npx playwright install chromium
$env:TEMP = Join-Path (Get-Location) 'evidence/tmp'
$env:TMP = $env:TEMP
New-Item -ItemType Directory -Force $env:TEMP | Out-Null
npm run test:browser
```

浏览器测试使用 `http://127.0.0.1:5173/`，也可用 `node tests/browser.mjs http://127.0.0.1:其他端口/` 指定开发地址。截图输出到忽略的 `evidence/`，测试结束自动关闭浏览器。

## 资源与范围

Three.js 负责实时渲染，Vite 负责构建。房间模型、木纹、布纹、海报、照片和屏幕全部由项目代码生成，字体使用系统字体；运行时不请求外部图片、字体、模型或 API。首次安装 npm 依赖和测试浏览器需要网络。

这是原创的年代化微缩作品，电脑桌面和小游戏为简化创作，不运行真实商业游戏。房间进度不写入本地存储，刷新后从 2005 年开始。未提供声音。
