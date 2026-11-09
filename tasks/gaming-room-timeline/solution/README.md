# 电竞房 · 2005—2025 二十年时光

一个可在浏览器中实时探索的三维房间：同一间房，从 2005 年的卧室电脑角，慢慢变成 2025 年的完整电竞房。

## 安装与启动

```bash
npm install
npm run dev     # 开发预览（Vite dev server）
npm run build   # 生产构建 -> dist/
npm run preview # 预览构建产物
```

部署到子路径 `/gaming-room-timeline/crouton-alpha-max/` 时：

```bash
npm run build -- --base /gaming-room-timeline/crouton-alpha-max/ --outDir dist
```

## 操作说明

- 拖动鼠标查看房间全景，滚轮靠近桌面查看细节（OrbitControls 自由观察）
- 底部时间滑杆：拖动手动态切换 2005—2025 年，点击「自动播放」可自动走完 20 年
- 点击房间内物品（显示器、主机、键盘、海报、鱼缸、旧电脑等）：右侧面板显示该物品的年代说明或主人记忆
- 点击 3D 屏幕：打开屏幕面板；屏幕呈现对应年代的简化桌面，点击「开始游戏」进入可玩小游戏（贪吃蛇 / 靶场射击 / 星尘躲避，按年代轮换），方向键操作，支持鼠标点击与移动
- 贯穿二十年的情感线索：鱼缸、书架/书、绿植、旧臂chair、角落老电脑与小夜灯，2011 年后旧设备退役收入角落收藏

## 网络依赖

除 npm 安装时下载 `three` 与 `vite`（均为本地打包进构建产物）外，运行时不依赖任何外部网络资源：无字体/CDN 加载，全部材质与海报均为程序化生成。

## 技术

Three.js（WebGL）+ Vite；场景全部为程序化几何体与 `MeshStandardMaterial`；屏幕为 `CanvasTexture`；各年代物件按年份区间交叉淡化过渡。
