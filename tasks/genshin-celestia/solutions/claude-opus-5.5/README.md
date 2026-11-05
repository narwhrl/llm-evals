# 天空岛 Celestia

Three.js + TypeScript + Vite 实现的《原神》天空岛远景场景。所有几何、材质、天空与云海均在运行时程序化生成，没有外部贴图、模型或后端服务。

## 命令

```bash
npm install        # 安装依赖
npm run dev        # 开发服务器（Vite，默认 http://localhost:5173/）
npm run build      # 类型检查 + 生产构建，输出到 dist/
npm run preview    # 本地预览生产构建
```

构建接受 Vite 参数，例如部署到子路径：

```bash
npm run build -- --base=/genshin-celestia/claude-opus-5.5/ --outDir=<目录> --emptyOutDir
```

## 观看

页面打开约 1–2 秒后直接进入默认的三分之四电影远景，镜头缓慢摆动，天体仪圆环转动，云海、瀑布和浮石持续运动。没有 UI。

任何鼠标操作后由 OrbitControls 接管：左键拖动旋转，滚轮缩放，右键拖动平移。

## 结构

| 文件 | 内容 |
| --- | --- |
| `src/main.ts` | 场景组装：主岛、八座环岛、桥梁、植被、瀑布、远景岛、相机与渲染循环 |
| `src/env.ts` | 太阳方向、天空渐变、高度相关的空气透视（替换 three.js 内置雾的 shader chunk）、灯光 |
| `src/rock.ts` | 浮岛岩体（倒悬岩锥 + 草地台面）与碎石几何 |
| `src/architecture.ts` | 中央圣殿尖塔、金色天体仪、拱廊/柱廊/尖塔/穹顶等建筑件、开腹拱桥 |
| `src/kit.ts` | 卡通材质（toon ramp + 边缘光）、单位图元、实例化/合并批处理、扫掠与车削几何 |
| `src/nature.ts` | 树木、垂藤、瀑布、漂浮碎石 |
| `src/clouds.ts` | 云海高度场、积云公告板、云下的提瓦特大陆、体积光束 |
| `src/postfx.ts` | 屏幕空间太阳光束、暗角、Bloom、色调映射输出 |
| `src/noise.ts` | 随机数、Perlin/fbm（CPU）与共享 GLSL 噪声 |
