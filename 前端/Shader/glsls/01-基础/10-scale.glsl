#ifdef GL_ES
precision mediump float;
#endif

#include "common/circleShape.glsl"
#include "common/scale.glsl"

void main() {
  // 标准化当前坐标为 [0, 1]
  vec2 uv = gl_FragCoord.xy / iResolution.xy;

  // 默认黑色
  vec3 color = vec3(0.0, 0.0, 0.0);

  uv = scale(vec2(sin(iTime)) + 2.0) * uv;

  color = vec3(circleShape(uv, 0.2));

  gl_FragColor = vec4(color, 1.0);
}
