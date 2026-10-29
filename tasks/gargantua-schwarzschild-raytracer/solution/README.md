# Gargantua — Schwarzschild Black Hole Raytracer

单页 React + Vite 应用，用逐像素 fragment shader 实时渲染史瓦西黑洞：
引力透镜、吸积盘、光子环与程序化星空全部来自同一个 shader，
没有任何球体网格、贴图、视频或 cubemap 代偿。

## 运行

```bash
npm install
npm run dev      # 开发服务器
npm run build    # 生产构建到 dist/
npm run preview  # 预览构建产物
```

## 渲染管线

- `src/shaders/blackHole.js` — 全屏 fragment shader。相机射线在三维中按
  施瓦西零测地线积分（`dp/ds = v`，`dv/ds = -3M h² p / r⁵`，`h = |p × v|` 守恒），
  位置因此是真实的，吸积盘（`y = 0`）求交才有物理意义。
  盘面按内外缘半径筛选交点，同一射线可收集多次穿越（黑洞背面像与光子环）。
- `src/shaders/post.js` — Bloom 亮部提取、可分离高斯模糊、ACES tone mapping、
  暗角、颗粒与径向色散。
- `src/pipeline.js` — HDR half-float 目标 + Bloom 金字塔 + 合成，
  并含调试直通通道（诊断色原样上屏，不过 tone mapping）。
- `src/state.js` — 22 个参数、5 个分组、4 个预设、10 个调试视图、
  URL 状态解析与 localStorage 持久化。

## 单位约定

取史瓦西半径 `r_s = 1`，于是 `M = 0.5`，事件视界 `r = 1`，
不稳定光子轨道 `r = 1.5`，临界瞄准参数 `b_c = 3√3/2 ≈ 2.598`。

## 快捷键

| 键 | 行为 |
| --- | --- |
| `0`–`9` | 切换调试视图 |
| `Shift+1`–`Shift+4` | 切换相机预设 |
| `Space` | 暂停/继续 |
| `H` | 折叠 HUD |
| `R` | 重置 |
| `Q` | 循环质量档 |

## 第三方代码

`vendor/` 下的 Three.js 0.180.0 为 MIT 许可的本地副本，
来源与校验见 `vendor/README.md`。
