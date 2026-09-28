# 资产来源与授权

本项目**运行时资产 100% 程序生成**，不包含任何外部模型、贴图、音频文件或官方客户端解包资源；生产构建后无任何运行时网络请求。

## 程序生成资产（自制）

| 资产 | 生成方式 | 源码位置 |
| --- | --- | --- |
| 集装箱波纹/门端闭锁杆贴图 | Canvas 2D 程序绘制（波纹明暗、锈蚀斑块、角件） | `src/map/textures.ts` `containerTex/containerDoorTex` |
| 木箱板拼贴图 | Canvas 2D（板条、木纹贝塞尔、边框钉件） | `src/map/textures.ts` `crateTex` |
| 绿色篷布贴图 | Canvas 2D（织纹、褶皱渐变） | `src/map/textures.ts` `tarpTex` |
| 防滑甲板贴图 | Canvas 2D（菱形防滑纹、板缝、油污锈渍） | `src/map/textures.ts` `deckTex` |
| 舱壁/金属/海面贴图 | Canvas 2D | `src/map/textures.ts` `cabinTex/metalTex/seaTex` |
| 全部几何（船体/舱室/箱体/吊机/角色/武器） | three.js 程序建模（Box/Cylinder/Plane 组合 + 按材质合并） | `src/map/build.ts`、`src/entities/characterModel.ts`、`src/entities/viewmodel.ts` |
| 全部音效（枪声×5 类、换弹、拉栓、脚步、爆炸、烟雾、命中提示、海浪底噪） | Web Audio 程序合成（噪声脉冲 + 滤波 + 振荡器包络 + LFO） | `src/audio/audio.ts` |
| 界面图标/准星/小地图 | CSS/DOM/Canvas 程序绘制 | `src/style.css`、`src/ui/` |

字体使用系统字体栈（微软雅黑/苹方/Noto Sans SC），无网络字体。

## 第三方库

| 库 | 版本 | 许可 | 用途 |
| --- | --- | --- | --- |
| three | 0.180.0 | MIT | 渲染（npm 安装，锁定版本，见 package-lock.json） |
| vite | 5.4.20 | MIT | 构建工具（仅开发期） |
| typescript | 5.7.3 | Apache-2.0 | 类型检查（仅开发期） |
| vitest | 2.1.9 | MIT | 单元测试（仅开发期） |

three.js 以 npm 依赖方式打进产物（MIT 许可文本随包分发于 node_modules；无修改）。

## 参考资料目录（`references/`，仅分析用，不参与运行时）

| 文件 | 来源 URL | 用途 |
| --- | --- | --- |
| R05-topview.png | https://olimg.3dmgame.com/uploads/images/raiders/20180524/1527151074_359577.png | 俯视布局 |
| R06-crates-close.png | https://olimg.3dmgame.com/uploads/images/raiders/20180524/1527151084_366917.png | 箱组近景 |
| R07-end-cabin.png | https://olimg.3dmgame.com/uploads/images/raiders/20180524/1527151090_308629.png | 端部舱体 |
| R08-green-cargo.png | https://olimg.3dmgame.com/uploads/images/raiders/20180524/1527151094_994064.png | 绿色篷布货 |
| R09-high-overview.png | https://olimg.3dmgame.com/uploads/images/raiders/20180524/1527151100_444586.png | 高处俯瞰 |
| manifest.md | — | 来源与 SHA-256 校验 |

R04 页面（https://ol.3dmgame.com/gl/21161.html ）为上述图片的索引页。参考截图仅用于布局分析，未提取任何像素进入游戏资产；不含官方徽标、UI、角色模型或音频。

## 商标与合规

「穿越火线/CrossFire」为腾讯/Smilegate 相关商标，本项目为非官方的布局研究性重建，不使用其任何美术资产、徽标、名称排版或音频；游戏内阵营名（保卫者/潜伏者）为通用词。武器命名（AR-47、M4-C、MP-9、AWM-S、DE-50）为避免真实商标的近似化自命名，数值为自行设计。
