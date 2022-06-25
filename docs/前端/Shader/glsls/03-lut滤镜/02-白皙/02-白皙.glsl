#ifdef GL_ES
precision mediump float;
#endif

#include "common/lookup.glsl"

#iChannel0 "file://assets/vertical.jpg"
#iChannel1 "file://03-lut滤镜/02-白皙/lut-baixi.png"

void main(void) {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;

  vec4 curColor = texture2D(iChannel0, uv);
  
  vec4 resultColor = lookup(curColor, iChannel1);
  
  gl_FragColor=resultColor;
}
