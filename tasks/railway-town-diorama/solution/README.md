# 桌面微缩铁路小镇

Three.js + Vite 的桌面沙盘：闭合铁路环绕小镇，一台机车带两节车厢沿轨道行驶，每次到站停靠约 2 秒。

## 安装与启动

需要 Node.js 20.19+ 或 22.12+（Vite 8 的要求）。

```bash
npm install        # 或 npm ci
npm run dev        # 开发服务器，按终端提示的地址打开
npm run build      # 生产构建，输出到 dist/
npm run preview    # 本地预览 dist/
npm test           # 轨道与列车运动的自检（node --test）
```

部署到子路径时把 Vite 参数接在构建命令后面：

```bash
npm run build -- --base=/railway-town-diorama/<candidate-id>/ --outDir=<目录> --emptyOutDir
```

在 Windows 的 Git Bash 里，以 `/` 开头的 `--base` 会被 shell 改写成本地路径，需要加前缀 `MSYS2_ARG_CONV_EXCL='--base='`。

## 使用

打开页面即是默认机位下的傍晚全景，列车已经在行驶。

| 操作 | 方式 |
| --- | --- |
| 旋转 | 鼠标左键拖动 |
| 缩放 | 滚轮 |
| 运行 / 暂停 | 底部「暂停 / 运行」按钮；暂停时车厢和到站计时一起停住 |
| 速度 | 「速度」滑块，0.25× – 2.50× |
| 昼夜 | 「夜晚 / 白天」按钮；夜晚车站、路灯和部分窗户发光 |
| 复位 | 「复位」按钮：恢复初始机位、列车位置、速度并继续运行；昼夜保持当前选择 |

## 结构

| 文件 | 内容 |
| --- | --- |
| `src/track.js` | 闭合轨道：直线与四分之一圆弧，按弧长参数化 |
| `src/motion.js` | 列车状态机（巡航、进站减速、停靠、暂停）和按两个转向架定位车辆 |
| `src/terrain.js` `rails.js` `town.js` `scenery.js` `train.js` | 底座与河道、铁路与桥、街道与建筑、树与路灯、列车模型 |
| `src/lighting.js` | 傍晚 / 夜晚两套光照及其过渡 |
| `src/main.js` | 相机、轨道控制器、控制面板和渲染循环 |
| `test/train.test.mjs` | 轨道闭合连续、到站停靠 2 秒、暂停冻结计时、车距与朝向、复位确定性 |

每节车辆都由自己前后两个转向架在轨道上的位置决定中心和朝向，所以过弯时各车依次转向。
