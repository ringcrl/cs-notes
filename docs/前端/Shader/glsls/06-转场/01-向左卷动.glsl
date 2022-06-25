#ifdef GL_ES
precision mediump float;
#endif

#include "common/getProgress.glsl"

#iChannel0 "file://assets/vertical.jpg"
#iChannel1 "file://assets/vertical2.jpg"

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float progress = getProgress(iTime, 2.0);

  vec4 src1Color = texture2D(iChannel0, uv);
  vec4 src2Color = texture2D(iChannel1, uv);

  float mProgress = 1.0 - progress;
  float mixPercent = 0.0;

  if (uv.x <= mProgress) mixPercent = 1.0;

  gl_FragColor = mix(src2Color, src1Color, mixPercent);
  gl_FragColor.a = 1.0;
}
