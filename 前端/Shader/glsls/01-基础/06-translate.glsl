#ifdef GL_ES
precision mediump float;
#endif

#include "common/circleShape.glsl"

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;

  vec3 color = vec3(0.0, 0.0, 0.0);

  // 对整个画布进行移动
  vec2 translate = vec2(sin(iTime / 5.0), cos(iTime));
  uv += translate * 0.5;

  color = vec3(circleShape(uv, 0.2));

  gl_FragColor = vec4(color, 1.0);
}
