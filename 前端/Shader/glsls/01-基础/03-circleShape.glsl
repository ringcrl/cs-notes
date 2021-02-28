#include "common/circleShape.glsl"

void main(){
  // 标准化当前坐标为 [0, 1]
  vec2 uv = gl_FragCoord.xy / iResolution.xy;

  // 默认黑色
  vec3 color = vec3(0.0, 0.0, 0.0);

  color = vec3(circleShape(uv, 0.2));

  gl_FragColor = vec4(color, 1.0);
}
