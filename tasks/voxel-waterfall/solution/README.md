# 体素山川 · Voxel Waterfall

React + Vite + Three.js 实现的 Minecraft 风格体素景观：主峰与次峰、沿山体倾泻的瀑布、山腰穿云，以及山脚植被。打开页面后相机会自动环绕，无需操作即可看到全貌。

默认地形为 **128×128** 体素柱，可在侧栏调到 160 / 192。

## 环境

- Node.js 18+
- npm 9+

## 安装与启动

在本目录执行：

```bash
npm install
npm run dev
```

浏览器访问终端提示的地址。开发服务监听 `0.0.0.0:5173`，本机可用 `http://127.0.0.1:5173`，局域网用本机 IP，例如 `http://192.168.x.x:5173`。

## 生产构建

```bash
npm run build
npm run preview
```

`preview` 同样监听 `0.0.0.0:4173`，本机访问 `http://127.0.0.1:4173`。

## 场景操作

- 页面加载后自动进入场景并缓慢环绕
- 拖拽旋转、滚轮缩放、右键平移
- 右侧面板可调：随机种子、地形尺寸、山体高度、起伏、瀑布宽度、云层高度/密度/透明度、植被、水流速度、晨昏时段、雾气、自动旋转
- 「重新生成」按当前地形参数重建世界；「恢复默认」回到初始配置

## 项目结构

```text
src/
  App.jsx                 # 页面与场景生命周期
  scene/engine.js         # Three.js 渲染、相机、光影
  world/generate.js       # 山脉、瀑布路径、云、植被
  world/mesh.js           # 体素网格合并与实例化
  world/shaders.js        # 水流与天空
  ui/ControlPanel.jsx     # 场景调整选项
```
