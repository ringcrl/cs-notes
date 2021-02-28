#ifdef GL_ES
precision mediump float;
#endif

#include "common/blend.glsl"

#iChannel0 "file://assets/vertical.jpg"
#iChannel1 "file://05-特效/01-图片叠加/zhouzhe.png"

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec2 uv1 = vec2(uv.x, uv.y);

  lowp vec4 srcColor = texture2D(iChannel0, uv);
  lowp vec4 blendColor1 = texture2D(iChannel1, uv1);

  int blendMode1 = 1000;
  float alphaFactor = 0.2;

  vec4 blendColor =
      blendTwoColor(blendColor1, srcColor, blendMode1, alphaFactor);

  gl_FragColor = vec4(blendColor.rgb, 1.0);
}
