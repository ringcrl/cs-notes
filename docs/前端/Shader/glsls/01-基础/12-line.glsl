#ifdef GL_ES
precision mediump float;
#endif

float progress(float time) { return mod(time, 3.0) / 3.0; }

// 在 Y 轴上使用 0.0-1.0 画一条线
float plot(vec2 st) {
  if (st.x > progress(iTime)) {
    return 0.0;
  } else {
    return smoothstep(0.01, 0.0, abs(st.y - st.x));
  }
}

void main() {
  // x、y 标准化到 0.0 - 1.0 区间
  vec2 st = gl_FragCoord.xy / iResolution.xy;

  // 0.0 - 1.0
  float y = st.x;

  // (0.0, 0.0, 0.0) 全黑，(1.0, 1.0, 1.0) 全白
  vec3 color = vec3(y);

  float pct = plot(st);

  color = pct * vec3(1.0, 0.0, 0.0);

  gl_FragColor = vec4(color, 1.0);
}
