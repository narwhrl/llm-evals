# Voxel Waterfall — 体素山 · 瀑布 · 穿云

Three.js + React + Vite 的体素自然景观：平顶主峰、环列次峰、从山顶冰湖倾泻而下并落入山脚水潭的瀑布，以及缠绕山腰、被山峰穿过的体素云层。页面打开即进入完整场景，右侧面板可实时调整全部参数。

## 运行

```bash
npm install
npm run dev      # 本地开发，默认 http://localhost:5173
npm run build    # 生产构建，输出 dist/
npm run preview  # 预览生产构建
```

无后端、无外部资源、无需任何密钥。

## 交互

- 左键拖拽：环绕旋转
- 滚轮 / 双指：缩放
- 右键拖拽：平移
- 右上角面板：地形（网格分辨率、主峰高度、平顶半径、悬崖宽度、地面起伏、次峰高度、雪线）、瀑布（落瀑方向、宽度、水量粒子数）、穿云（云层高度、云量、飘移速度）、光影（正午 / 黄昏 / 清晨 / 夜晚四套配色、阳光与环境光、雾气浓度、实时阴影、太阳旋转）、镜头（自动环绕与速度）、随机 seed 重生成地形。

`prefers-reduced-motion: reduce` 时自动环绕与云层飘移默认关闭，场景本体照常渲染，可在面板重新开启。

## 实现要点

- `src/noise.js`：Mulberry32 可复现 PRNG + 可平铺 value noise + fBm，同一 seed 必得同一地形。
- `src/scene/terrain.js`：生成 `resolution × resolution` 高度场（默认 200×200，即 40000 根柱体），叠加起伏地面、ridged-noise 次峰与平顶主峰；随后把台地压平成一个浅盆以容纳山顶湖，沿落瀑方向切出溢流缺口，并在落水点挖出低于四周的水潭。水面高度取自处理后的高度场本身，因此水体始终贴在地形上而不会埋进或穿透地形。
- 体素以「外壳填充」方式生成：每根柱体只从最矮相邻柱顶填到自己的柱顶，因此悬崖是实心的而平地只花费 1 个方块；构建前先数一遍实例数，TypedArray 按精确大小分配。
- `src/scene/sceneManager.js`：地形 / 云 / 瀑布 / 水潭 / 山顶湖各为一个 `InstancedMesh`，整帧仅约 6–7 次 draw call；瀑布与浪花是带速度与重力的实例方块，落到水面后在溢流口重生，因此水流是持续状态而非单次播放动画；云层按簇生成并按簇内高度做明暗，未受光（`MeshBasicMaterial`）以保持雾感。
- 天空是 canvas 背后的 CSS 渐变，WebGL 以透明背景渲染，雾色与地平线色一致，四套配色切换时一起更新。
- 参数变化按结构 / 外观分级处理：只有影响高度场的参数才重建地形，其余仅调整材质、灯光与雾，避免每次拖拽滑块都重算地形。

## 目录

```
solution/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── RESULTS.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── options.js
    ├── styles.css
    ├── noise.js
    ├── scene/terrain.js
    ├── scene/sceneManager.js
    └── ui/ControlPanel.jsx
```
