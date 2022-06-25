// 二维矩阵-移动
// 移动元素的本质是移动整个坐标系

#ifdef GL_ES
precision mediump float;
#endif

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

  // 为了移动十字架，需要移动整个空间
  vec2 translate = vec2(sin(iTime), cos(iTime));
  st += translate * 0.3;

  // 根据空间显示背景色
  color = vec3(st.x, st.y, 0.0);

  // 在前景上添加形状
  color += vec3(cross(st, 0.10));

  gl_FragColor = vec4(color, 1.0);
}