# 体素中国古典建筑群 · Voxel Chinese Architecture

Three.js 体素风中式皇家院落：山门 → 钟鼓楼 → 配殿 → 主殿 → 宝塔，共 7 座建筑，
中轴对称，浏览器打开即见全貌（场景缓慢自动旋转，可拖拽/缩放）。

## 运行

```sh
npm install
npm run dev      # 开发预览，默认 http://localhost:5173
npm run build    # 生产构建，产物在 dist/
npm run preview  # 预览生产构建，http://localhost:4173
```

无需后端、无需凭证，纯静态资源。

## 结构

- `index.html` — 页面与说明浮层
- `src/main.js` — 渲染器/暖调光照/阴影/轨道控制/主循环
- `src/voxel.js` — 体素收集器（按颜色分组，每组一个 InstancedMesh）
- `src/buildings.js` — 全部建筑与景观生成（殿堂/钟鼓楼/宝塔/院墙/廊/松/灯笼/石狮/云/地面）
