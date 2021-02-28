#ifdef GL_ES
precision mediump float;
#endif

#iUniform float u_vertical = 0.0 in { -1.0, 1.0 } step 1.0 // 1.0 下移动，0.0 不移动，-1.0 上移动
#iUniform float u_horizontal = 0.0 in { -1.0, 1.0 } step 1.0 // 1.0 左移动，0.0 不移动，-1.0 右移动
#iUniform float progress = 0.0 in { 0.0, 1.0 } step 0.001

#iChannel0 "file://assets/vertical.jpg"
#iChannel1 "file://assets/vertical2.jpg"

#include "common/bezierEffect.glsl"

void main() {
  vec2 direction = vec2(u_horizontal, u_vertical);

  vec2 uv = gl_FragCoord.xy / iResolution.xy;

  float time = easeInOutQuint(progress);
  vec2 p = uv + time * sign(direction);
  vec2 f = fract(p);
  vec4 fromTex = texture2D(iChannel0, f);
  vec4 toTex = texture2D(iChannel1, f);
  vec3 res =
      mix(toTex.rgb, fromTex.rgb,
          step(0.0, p.y) * step(p.y, 1.0) * step(0.0, p.x) * step(p.x, 1.0));

  gl_FragColor = vec4(res, 1.0);
}
