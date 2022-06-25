#ifdef GL_ES
precision mediump float;
#endif

void main() {
  vec2 st = gl_FragCoord.xy / iResolution.xy;
  float pct = 0.0;

  // 方案一：当前像素到中点坐标的距离
  // pct = distance(st,vec2(0.5));

  // 方案二：向量之差，求 length
  // vec2 toCenter = vec2(0.5)-st;
  // pct = length(toCenter);

  // 方案三：通过勾股定理求距离
  vec2 tC = vec2(0.5) - st;
  pct = sqrt(tC.x * tC.x + tC.y * tC.y);

  vec3 color = vec3(pct);

  gl_FragColor = vec4(color, 1.0);
}