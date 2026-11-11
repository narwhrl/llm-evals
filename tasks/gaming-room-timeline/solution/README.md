# 存档房间 · A Room in Time

一间微缩房间，记录一位玩家从 2005 到 2025 的游戏生活。基于 Three.js 和 Vite，所有几何体、木纹、海报和电脑桌面均由代码在本地生成。

## 安装与运行

```sh
npm install
npm run dev
```

打开终端显示的本地地址，默认是 `http://127.0.0.1:5173/`。

## 生产构建

```sh
npm run build
npm run preview
```

支持 Vite 的 `--base` 和 `--outDir` 参数，例如：

```sh
npm run build -- --base=/gaming-room-timeline/ --outDir=dist-subpath
```

产物默认写入 `dist/`。需支持 WebGL2 的现代桌面浏览器。

## 操作

- 拖动时间轴或点击年份切换年代，播放按钮自动从当前时间前进，拖到末端后再次播放会回到 2005。
- 鼠标左键拖动旋转、滚轮缩放、右键拖动平移；“桌面”按钮自动靠近电脑，“全景”恢复房间视角。
- 点击房间中的电脑、旧物、书架等查看年代说明与主人记忆。台灯、搪瓷杯、铁皮机器人贯穿全部年份。
- 点击显示器打开可操作的简化电脑界面：早年像素跳跃、后来的游戏库启动、近年的方向键 / WASD 飞船探索。
- 空格键播放 / 暂停时间。窄屏布局也可使用，主要按 1440×900 桌面视口设计。

代表年份为 2005、2009、2013、2017、2021、2025；年间平滑过渡，室内格局始终不变。

## 资源与环境

运行时无外部网络请求，无远程字体、图片、音频、后端或凭据要求；仅安装阶段需要 npm 包源。

## 验证

```sh
node scripts/verify.mjs
npm run verify:browser
```

浏览器验收使用 Playwright，自行启动并关闭本任务的生产预览和干净浏览器会话，输出截图与结构化报告到 `evidence/`。未安装 Playwright 浏览器时，可设置 `CHROME_PATH` 为本机 Chrome / Chromium 可执行文件路径；例如 Windows：

```cmd
set CHROME_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe
npm run verify:browser
```

验收覆盖 1440×900 实时渲染、六个代表年份、时间轴拖动和自动播放、全景旋转、桌面近景、记忆弹窗、三类电脑交互及资源错误检查。浏览器验证结果见 `RESULTS.md`。
