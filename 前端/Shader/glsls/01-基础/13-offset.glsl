// 偏移的图形

#ifdef GL_ES
precision mediump float;
#endif

vec2 brickTile(vec2 _st, float _zoom) {
  _st *= _zoom;

  // 进行根据基、偶行数进行偏移
  _st.x += step(1., mod(_st.y, 2.0)) * sin(iTime);
  _st.x += step(0., mod(_st.y, 2.0)) * cos(iTime);

  return fract(_st);
}

float box(vec2 _st, vec2 _size) {
  _size = vec2(0.5) - _size * 0.5;
  vec2 uv = smoothstep(_size, _size + vec2(1e-4), _st);
  uv *= smoothstep(_size, _size + vec2(1e-4), vec2(1.0) - _st);
  return uv.x * uv.y;
}

void main(void) {
  vec2 st = gl_FragCoord.xy / iResolution.xy;
  vec3 color = vec3(0.0);

  // 贴片偏移
  st = brickTile(st, 3.0);

  color = vec3(box(st, vec2(0.9)));

  gl_FragColor = vec4(color, 1.0);
}
