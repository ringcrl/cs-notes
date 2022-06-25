#ifdef GL_ES
precision mediump float;
#endif

float circle(in vec2 _st, in float _radius) {
  vec2 l = _st - vec2(0.5);
  return 1. - smoothstep(_radius - (_radius * 0.01), _radius + (_radius * 0.01),
                         dot(l, l) * 4.0);
}

void main() {
  vec2 st = gl_FragCoord.xy / iResolution.xy;
  vec3 color = vec3(0.0);

  st *= 8.0;       // 将空间变成8倍
  st = fract(st);  // 取出三份小数部分

  // 现在有了64个从0-1开始的空格
  color = vec3(st.x, st.y, 0.0);

  gl_FragColor = vec4(color, 1.0);
}
