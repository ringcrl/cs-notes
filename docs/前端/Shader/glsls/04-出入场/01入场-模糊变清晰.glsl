#ifdef GL_ES
precision mediump float;
#endif

#include "common/directionBlur.glsl"
#include "common/getProgress.glsl"

#iUniform float progress = 0.0 in { 0.0, 1.0 } step 0.01

varying vec2 vTextureCoord;

#iChannel0 "file://assets/vertical.jpg"

void main() {
  // float progress = getProgress(iTime, 1.0);

  vec2 uv = vTextureCoord;

  float blurStep = (1.0 - progress) * 3.0;

  vec2 blurDirection = vec2(1.0, 0.0);

  vec4 resultColor =
      directionBlur(iChannel0, iResolution.xy, uv, blurDirection, blurStep);

  gl_FragColor = resultColor;
}
