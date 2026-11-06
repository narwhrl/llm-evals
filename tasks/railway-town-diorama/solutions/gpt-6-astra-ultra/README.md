# Willowbrook

Three.js 桌面微缩铁路镇。木纹展示底座上包含连续环线、三节蒸汽列车、车站、住宅与商店、教堂、河流、两座铁路桥和步行桥。模型、纹理及招牌均由项目代码生成，无需外部图片或网络服务。

## 启动

需要 Node.js 20.19+ 或 22.12+，以及支持 WebGL 2 的现代浏览器。

```sh
npm install
npm run dev
```

打开终端显示的本地地址。页面默认暖色日照、完整沙盘视角和运行中的列车。

## 操作

- 拖动场景旋转，滚轮或双指手势缩放。
- 底部圆形按钮运行或暂停列车；暂停同时冻结停站计时。
- `Train speed` 调整至 0.25–2 倍速，每圈在车站停留约两秒。
- `Day` / `Night` 切换光照，夜间路灯和部分窗户发光。
- `Reset` 恢复初始机位、列车位置、1 倍速度、运行状态和白天。
- 页面背景获得焦点时，空格运行／暂停，`R` 复位；按钮与滑块支持键盘操作。

## 构建与验证

```sh
npm run build
npm test
```

构建产物默认写入 `dist/`。Vite 参数直接透传，例如部署到指定子路径：

```sh
npm run build -- --base=/railway-town-diorama/gpt-6-astra-ultra/ --outDir=dist-check
npm run preview -- --outDir=dist-check --base=/railway-town-diorama/gpt-6-astra-ultra/
```

`src/railway.js` 集中维护闭环轨迹、按弧长独立采样的车辆位置和停站计时；`src/world.js` 与 `src/buildings.js` 创建沙盘模型；`src/main.js` 连接渲染、相机和界面。静态实体按材质合批，设备像素比上限为 1.75。

浏览器运行与截图的实际验证范围见 `RESULTS.md`。
