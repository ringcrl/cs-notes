#ifdef GL_ES
precision mediump float;
#endif

#include "common/mosaic.glsl"

#iChannel0 "file://assets/vertical.jpg"

float grid_num = 50.0;

void main(void) {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec4 resultColor = mosaic(iChannel0, uv, iChannelResolution[0].xy, grid_num);

  gl_FragColor = resultColor;
}
