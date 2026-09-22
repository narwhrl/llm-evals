// 全屏三角形直通顶点着色器：裁剪空间坐标直接输出，vUv 覆盖 [0,1]。
varying vec2 vUv;

void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
