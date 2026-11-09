# 评测报告

- 完整模型标识：`stealth/crouton-alpha:max`
- 起始 commit：`bb5e741d5c1148ab73932f26803d54d9da42b062`

## 实现概述

- 项目：Vite + Three.js（`npm install` → `npm run dev` / `npm run build`）。
- 场景：木纹展示底座（厚边框）、草地、横贯河流、双侧跨河石桥、圆角矩形闭合轨道、车站（站台 + 顶棚 + 站名牌）、民居群、道路、树木、路灯、水塔、货箱。
- 列车：1 节车头 + 2 节车厢，每节按轨道弧长独立采样定位，转弯朝向由前方切向决定，间距恒定，不做整列刚体旋转。
- 光照：默认暖色黄昏阳光 + 投影；夜晚模式切换站名牌、路灯、窗户发光，场景仍可辨认。
- 交互：暂停／继续（同时暂停到站计时）、速度滑杆（0.2–2.5×）、日／夜切换、复位（恢复初始机位、列车位置、速度 1.0×、暂停状态不写入复位）、OrbitControls 旋转与缩放。

## 实际验证

在隔离环境实际执行过：

```
npm install --no-audit --no-fund
```
结果：成功，安装 15 个包（three、vite 及依赖），写入 `package-lock.json`。

```
npm run build -- --base /railway-town-diorama/crouton-alpha-max/ --outDir dist
```
结果：成功构建，输出 `dist/index.html` 与 `dist/assets/index-*.js`；构建命令支持 Vite 的 `--base` / `--outDir` 参数。

以本机 Chrome headless（`--headless=new --window-size=1440,900 --virtual-time-budget=9000`）访问构建后静态服务截图：

- 首屏显示整块底座、等距视角、暖色傍晚光照与阴影、闭合轨道、河流与桥、建筑群与列车（车头 + 两节车厢在轨上运行）。
- 观察到列车在环道上运行，未观察到脱轨或整列刚体旋转。

## 已知限制、失败与需要人工介入

- 未通过交互式浏览器逐项点测暂停计时、夜晚切换、复位确定性与旋转缩放，仅做了截图观察与代码可读性核查；夜间、停留计时与复位逻辑未在真实浏览器中连续观察验证。
- 桥面栏杆、个别道路与圆角处存在视觉上的轻微错位或浮起，以等距视角辨认不影响主体构图，但近景略显手工拼接感。
- 未在 CI 环境或异网环境验证。
- 构建产物位于 `dist/`；`node_modules/` 为本地安装产物，提交时仅保留源码与 `package-lock.json`。
