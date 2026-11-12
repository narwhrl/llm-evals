# 原神·天空岛（Celestia）｜Three.js + TypeScript 3D 场景

一座悬浮在提瓦特云海之上的天空神域：中央巨型岩岛、八座环岛与白色拱桥环路、六层白色尖塔和塔顶的金色天体仪。全部几何与着色由代码程序化生成，不加载任何外部资源，也不需要后端或凭据。

## 环境

- Node.js 20+（验证时使用 v24.21.0）与 npm
- 支持 WebGL2 的桌面浏览器

## 安装

```bash
npm install
```

有 `package-lock.json`，也可以用 `npm ci`。

## 启动

```bash
npm run dev
```

打开终端打印的地址（默认 `http://localhost:5173/`）。页面没有加载步骤：场景在约一秒内同步构建完成，直接进入默认镜头。

## 构建

```bash
npm run build
```

产物输出到 `dist/`，资源使用相对路径，可放在任意目录下访问。部署到子路径时把 Vite 参数追加在后面：

```bash
npm run build -- --base=/genshin-celestia/<candidate-id>/ --outDir=<输出目录> --emptyOutDir
```

本地查看生产构建：

```bash
npm run preview
```

## 观看

- 默认镜头：四分之三俯角远景，完整框住主岛、环岛、尖塔与天体仪；镜头每分钟约 9° 缓慢环绕。
- 鼠标左键拖拽旋转，滚轮缩放。页面没有任何 UI。

## 场景构成

| 模块 | 内容 |
| --- | --- |
| `src/rock.ts` | 浮岛生成：不规则草甸台地、带层理的倒悬岩体与多座垂峰、漂浮碎石 |
| `src/arch.ts` | 建筑构件：尖拱墙、柱、针状屋顶、拱廊、塔层、小尖塔、圆亭、空中拱桥桥跨 |
| `src/sanctum.ts` | 中央圣殿：台基、六层拱廊尖塔、飞拱与附塔、塔针、五环转动加一环固定的金色天体仪 |
| `src/ring.ts` | 八座环岛、环形天路与柱廊、通往主岛的弧形桥、断桥与悬浮残块 |
| `src/ruins.ts` | 岛上神殿与瞭望塔、残柱阵、断塔，以及倒悬岩壁里半埋的古老拱廊与倒挂尖塔 |
| `src/nature.ts` | 树丛、悬空瀑布与水池、碎石带、远处的姊妹浮岛 |
| `src/sky.ts` | 天穹与卷云、日光与半球光、体积光束、云层之下的提瓦特大陆 |
| `src/clouds.ts` | 多层噪声云海与卡通积云 |
| `src/atmos.ts` | 全场景共用的空气透视（改写 three.js 的雾着色片段） |
| `src/materials.ts` | 分段色阶的卡通材质 |
| `src/main.ts` | 渲染器、镜头、轨道控制、HDR 泛光后期与主循环 |

验证记录见 [RESULTS.md](RESULTS.md)。
