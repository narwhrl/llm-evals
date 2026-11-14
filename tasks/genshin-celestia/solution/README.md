# Celestia — 原神·天空岛

Three.js + TypeScript + Vite 实现的《原神》天空岛（Celestia）电影级 3D 远景场景：
中央巨型悬浮岩岛、多层白色尖塔圣殿、顶部交错金色天体仪、约八座环形浮岛、
白色弧形桥梁与柱廊、悬空瀑布、云海、体积光束与远景提瓦特大陆。

## 安装

```sh
npm install
```

## 启动（开发）

```sh
npm run dev
```

打开输出的本地地址即可，首屏即电影级三分之四远景。可拖拽旋转、滚轮缩放，
场景会缓慢自动环绕。

## 构建与本地运行（生产）

```sh
npm run build
npm run preview -- --port 4173
```

打开 `http://127.0.0.1:4173/`。

## 项目结构

- `src/main.ts` — 渲染器、相机、灯光、场景组装、主循环
- `src/islands.ts` — 中央主岛、环形浮岛、拱桥、柱廊、断裂遗迹尖塔
- `src/spire.ts` — 中央圣殿多层尖塔与金色天体仪
- `src/nature.ts` — 树木、瀑布、漂浮碎石、飞鸟
- `src/sky.ts` — 天空穹顶、云海、体积光束、远景大陆
- `src/materials.ts` — 共享材质与确定性随机
