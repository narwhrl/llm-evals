# Alderbrook Railway Diorama

原生 Three.js 桌面微缩铁路小镇，无后端或外部模型资源。

## 安装与运行

```sh
npm install
npm run dev
```

打开终端输出的本地地址。生产构建与预览：

```sh
npm run build
npm run preview
```

构建支持 Vite 参数，例如 `npm run build -- --base=/railway/ --outDir=dist`。

## 操作

- 拖动旋转视角，滚轮或双指缩放。
- 底栏可暂停／运行列车、调整 `0.5×–2×` 速度、切换傍晚／夜景。
- 复位按钮恢复初始机位、列车位置和 `1×` 速度，并继续运行。
- 空格暂停／运行，`R` 复位。

列车沿闭合轨道运行，三节车厢分别按弧长定位；每次到站停留两秒，暂停会同时冻结运行和到站计时。
