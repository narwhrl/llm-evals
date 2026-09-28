# 云瀑山境

React、Vite 和 Three.js 实现的 200 × 200 体素山脉场景。瀑布沿山体阶梯落下，山腰云层与山峰存在深度遮挡，水沫和云层持续运动。

## 运行

```bash
npm install
npm run dev
```

打开终端显示的本地地址。生产构建运行 `npm run build`，产物位于 `dist/`；可用 `npm run preview` 本地查看构建结果。

鼠标拖动旋转视角，滚轮缩放。控制面板可调整时段、云量、水速、植被和自动环绕，也可重置视角或下载画面。手机上点击右上角设置图标打开面板。

## 候选记录

- 模型：`gpt-6-sol`（GPT-6 Sol）
- 起始 `main`：`ee2c9f2cc8b9b410ebd55d1c195e96a9cdbd4ce3`
- 安装：`npm install --offline=false --fetch-retries=0 --fetch-timeout=15000` 成功，审计未发现漏洞。
- 验证：`node --check src/scene.js` 通过；`npm run build` 通过（Vite 提示单个 JS 包超过 500 kB，gzip 约 200 kB）。浏览器检查了 1280 × 720 与 390 × 844 视口、画布像素、持续动画及场景调节控件，均正常，控制台无错误。
- 环境记录：默认 `npm install` 因缺少离线包索引返回 `ENOTCACHED`；受限环境中的首次构建返回 `spawn EPERM`；5177 端口已被占用。在线安装、允许子进程的构建环境及 5183 临时端口分别解决了这些问题，临时服务器已停止。
- 已知限制：当前基线没有固定的自动验收测试。
- 所需人工介入：无。
