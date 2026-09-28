# 运输船 · 浏览器第一人称团队竞技

以端游《穿越火线》经典地图「运输船」为参照的 3D 第一人称枪战：5 对 5 团队竞技（1 名玩家 + 9 名本地电脑角色），Three.js + Vite + TypeScript，全部资源程序生成，本地运行、可静态部署。

## 环境要求

- Node.js ≥ 20（开发期需要；生产包只需静态服务器）
- 支持硬件加速 WebGL2/WebGL 的桌面浏览器（Chrome/Edge/Firefox）

## 命令

```bash
npm install          # 安装依赖（版本见 package-lock.json）
npm run dev          # 开发服务器（默认 http://localhost:5173/）
npm run build        # 类型检查 + 生产构建 -> dist/
npm run preview      # 静态预览 dist/（默认 http://localhost:4173/）
npm test             # 单元测试（vitest，59 项）
npm run typecheck    # 仅类型检查
```

生产构建支持子路径部署：

```bash
# PowerShell
$env:VITE_BASE='/ship/'; $env:VITE_OUT_DIR='dist-sub'; npm run build
# bash（需禁用路径转换）
MSYS_NO_PATHCONV=1 VITE_BASE=/ship/ VITE_OUT_DIR=dist-sub npm run build
```

生产包可直接用任意静态服务器托管 `dist/`（如 `npx serve dist`）。无后端、无密钥、无运行时网络请求。

## 默认操作

| 输入 | 行为 |
| --- | --- |
| 鼠标移动 | 第一人称观察 |
| W / A / S / D | 移动（斜向归一化） |
| Shift | 静步（降速降声） |
| Ctrl 或 C | 蹲伏 |
| Space | 跳跃 |
| 鼠标左键 | 开火（自动武器可按住） |
| 鼠标右键 | 狙击开镜 / 近战重击 |
| R | 换弹 |
| 1 / 2 / 3 / 4 | 主武器 / 手枪 / 近战 / 投掷物（4 可循环） |
| Q | 切回上一件装备 |
| 滚轮 | 循环切换装备 |
| G | 快速投出当前投掷物 |
| Tab（按住） | 双方战绩 |
| Esc | 释放鼠标并暂停 |

## 玩法

- 默认**正式局**：先到 100 击杀或 10 分钟（平分计平局）；菜单另提供练习局（25 杀 / 3 分钟）。
- 出生 100 生命 + 100 护甲（护甲吸收 50%）；阵亡约 3 秒后在本方舱内复活并补满装备，出生保护 2.5 秒（开火或远离出生区即失效）。
- 4 把主武器（高伤步枪 / 稳定卡宾 / 冲锋枪 / 栓动狙击）+ 手枪 + 军刀 + 高爆手雷 + 烟雾弹。
- 木箱可被步枪/狙击穿透（伤害衰减、累计厚度有限）；钢制集装箱与舱壁截停子弹；篷布货可穿透。
- 烟雾遮蔽视线（含电脑感知与小地图暴露），不阻挡子弹。

## 画质与设置

设置（主菜单/暂停菜单均可调）：鼠标灵敏度、开镜灵敏度、垂直视野（60–110°）、反转 Y、总/音效音量、画质档位（低：无阴影；中：1024 阴影；高：2048 阴影 + 提升像素比）、镜头晃动开关。保存于 localStorage，失败时仅本会话生效。

## 开发 / 验收入口

URL 加 `?dev=1` 启用：`window.__CF__` 提供 `snapshot() / shot(station) / release() / spawnDummies() / clearDummies() / nav() / perfStart(ms) / perfResult() / frame(n) / probeShot(...)`（复用生产碰撞与战斗逻辑，不提供改生命/比分捷径）；右上角显示调试面板。正式界面默认隐藏。

## 目录

```
src/
  core/       配置（全部平衡数值）、随机数
  geometry/   纯几何数学（射线/胶囊，node 可测）
  physics/    碰撞世界（静态盒 + 网格加速 + 角色移动）
  map/        地图数据（布局/导航图/机位）、程序纹理、场景构建
  entities/   角色（逻辑）、人形模型、第一人称视模
  combat/     武器状态机、射击判定（穿透/部位）、投掷物、烟雾
  ai/         A* 寻路、感知、bot 行为
  fx/ audio/  特效池、WebAudio 合成
  ui/         HUD、小地图、菜单、设置
  game/       对局状态机、Game 编排
  debug/      开发入口
tests/        vitest 单元测试（59 项）
docs/         地图参照、资产来源、验收记录
evidence/     截图、构建与性能证据
references/   参考图与分析（仅分析用）
```

## 常见问题

- **无法启动/黑屏**：确认浏览器硬件加速开启；页面会给出 WebGL 不可用提示。
- **点击画面没反应**：先点击"开始游戏"；Esc 后点"继续游戏"或直接点击画面重新锁定鼠标。
- **音频无声**：浏览器要求首次交互后才允许音频——点击开始游戏后即有声音。
