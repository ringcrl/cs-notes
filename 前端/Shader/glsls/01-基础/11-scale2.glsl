// 缩放

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

mat2 scale(vec2 _scale) { return mat2(_scale.x, 0.0, 0.0, _scale.y); }

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

  st -= vec2(0.5);
  st = scale(vec2(sin(iTime))) * st;
  st += vec2(0.5);

  // 根据坐标在空间上显示不同颜色
  color = vec3(st.x, st.y, 0.0);

  // 在前景上添加形状
  color += vec3(cross(st, 0.2));

  gl_FragColor = vec4(color, 1.0);
}