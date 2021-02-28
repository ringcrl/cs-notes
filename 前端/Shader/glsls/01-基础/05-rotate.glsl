// 矩阵旋转

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

// 旋转公式，参考 imgs/03.png
mat2 rotate2d(float _angle) {
  return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
}

float box(in vec2 _st, in vec2 _size) {
  _size = vec2(0.5) - _size * 0.5;
  vec2 uv = smoothstep(_size, _size + vec2(0.001), _st);
  uv *= smoothstep(_size, _size + vec2(0.001), vec2(1.0) - _st);
  return uv.x * uv.y;
}

float cross(in vec2 _st, float _size) {
  return box(_st, vec2(_size, _size / 4.)) + box(_st, vec2(_size / 4., _size));
}

void main() {
  vec2 st = gl_FragCoord.xy / iResolution.xy;
  vec3 color = vec3(0.0);

  // 将空间的原点从 (0.0, 0.0) 移动到 (0.5, 0.5)
  st -= vec2(0.5);

  // 旋转空间
  st = rotate2d(sin(iTime) * PI) * st;

  // 将其移回原始位置
  st += vec2(0.5);

  // 在背景上显示空间的坐标
  color = vec3(st.x, st.y, 0.0);

  // 在前景上添加形状
  color += vec3(cross(st, 0.4));

  gl_FragColor = vec4(color, 1.0);
}
