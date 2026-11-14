# 轨道之家 · 空间站生活舱

正交等距视角的空间站生活舱微缩模型（Three.js + Vite + TypeScript），无任何页面 UI，所有交互都通过点击/拖拽三维物件完成。

## 安装

```sh
npm install
```

## 开发启动

```sh
npm run dev
# 浏览器打开 http://localhost:5173/
```

## 生产构建

```sh
npm run build                 # 输出到 dist/（根路径）
npm run build -- --base=/orbital/ --outDir=dist-sub   # 非根子路径构建
```

构建接受 Vite 原生的 `--base` 与 `--outDir` 参数，资源全部打包在本地 `assets/` 下，运行时无任何远程请求。

本地预览生产构建：

```sh
node scripts/serve.mjs dist 5200        # 根路径：http://localhost:5200/
node scripts/serve.mjs subroot 5201     # 子路径：http://localhost:5201/orbital/
```

## 取证与验证脚本

```sh
npm run gen                   # 重新生成地球贴图（src/assets/earth_*.png）
npm run evidence              # 1440×900 五张定格截图 → evidence/
npm run interact               # 真实鼠标交互回归（聚焦/快进/拖拽/笔/灯带/植物灯/旋转缩放）
```

`scripts/checkprod.mjs <url> <out.png>` 用于生产构建的加载验证（资源 404 与控制台错误检查）。

## 操作（页面上无 UI，全是点 3D 物件）

- 拖拽旋转 / 滚轮缩放（角度已限制在能看清舱内的范围）。
- 点击工作台 / 睡袋 / 种植架 / 座椅 / 健身车：聚焦，再点空白处返回。
- 在大舷窗里按住地球左右拖：手动 scrub 轨道时间；单击舷窗：90 秒 / 15 秒快进切换。
- 点击漂浮笔：旋转；靠近笔：笔会躲开。
- 点击植物灯：开关；点击地板中央灯带：夜航模式开关。
