# 参考资料清单（仅布局分析用，不参与运行时）

下载时间：2026-09-28。来源页面：R04（https://ol.3dmgame.com/gl/21161.html 《CF》运输船点位小技巧，3DMGame）。
适用版本：端游《穿越火线》经典运输船（2008 前后经典版本）。

| 文件 | 来源 URL | SHA-256 | 尺寸 | 支持结论 | 不确定点 |
| --- | --- | --- | --- | --- | --- |
| R05-topview.png | https://olimg.3dmgame.com/uploads/images/raiders/20180524/1527151074_359577.png | `3966b2224488d4b4be20fb9c9d1656af5c3194117919cc7599a9155acdcb0311` | 553×415 | 甲板长宽关系、两端舱体、两侧箱墙与缺口、中段货物群、舷侧窄通道 | 分辨率低且整体偏暗；尺寸读数误差约 ±10%；箱体段落颜色归属按明暗估计 |
| R06-crates-close.png | https://olimg.3dmgame.com/uploads/images/raiders/20180524/1527151084_366917.png | `4a33b67b8963cbab28ba7d983f4537f1d25fdcc4111dfa223425777a07a33cb0` | — | 木箱单/叠放尺度（及腰≈1.1m）、人物视点高度、主通路宽度 | — |
| R07-end-cabin.png | https://olimg.3dmgame.com/uploads/images/raiders/20180524/1527151090_308629.png | `843e07f960c06a9c5b4bddc172f67d6731417767a3955ecf2b3c8f394a22d3a1` | — | 端部白色舱体、门外缓冲区、蓝色集装箱、可站箱顶 | 箱顶可达范围（哪些箱顶开放） |
| R08-green-cargo.png | https://olimg.3dmgame.com/uploads/images/raiders/20180524/1527151094_994064.png | `22359cb05d678bd57c22345b0c633ec8e95246c2d116107a95948f90d18ba4fc` | — | 中央长形篷布货物（篷布/绑带/底座）、摆放角度、周围通行空间 | 精确夹角（取 32°）与件数（取 2）为近似 |
| R09-high-overview.png | https://olimg.3dmgame.com/uploads/images/raiders/20180524/1527151100_444586.png | `3810b05514b6e4b1909522d54eaa26c7f58ad146069f6531a5a81b1b9d04a2fe` | — | 高台→甲板高度关系、中段斜置货物、两侧集装箱与海面围护 | 高台具体高度（按箱组推算） |

未采用：R10（CF2.0 画面，https://games.sina.com.cn/o/z/cf/2014-11-25/1419585697.shtml ）仅作海天/吊机氛围观察，未下载存档（版本与所选经典布局不同）。视频走图资料不可用（环境无法播放核验），以俯视图+实机截图+导航连通性测试交叉替代，已在 `docs/MAP_REFERENCE.md` §6 记录。

分析过程记录：对 R05 做了裁剪、亮度拉伸与网格化色彩分类（程序化读图），结论见 `docs/MAP_REFERENCE.md` §3。
