#ifdef GL_ES
precision mediump float;
#endif

float plot(vec2 st, float pct) {
  return smoothstep(pct - 0.02, pct, st.y) - smoothstep(pct, pct + 0.02, st.y);
}

void main() {
  vec2 st = gl_FragCoord.xy / iResolution.xy;

  // st.x 小于 0.2 设置为 0.0
  // st.x 大于 0.8 设置为 1.0
  // st.x 在 0.2-0.8 区间 0.0-1.0 线性变化
  float y = smoothstep(0.2, 0.8, st.x);

  vec3 color = vec3(y);

  float pct = plot(st, y);
  color = (1.0 - pct) * color + pct * vec3(0.0, 1.0, 0.0);

  gl_FragColor = vec4(color, 1.0);
}
