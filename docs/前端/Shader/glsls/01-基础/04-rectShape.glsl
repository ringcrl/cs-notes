#ifdef GL_ES
precision mediump float;
#endif

#include "common/rectShape.glsl"

void main(){
  vec2 uv = gl_FragCoord.xy / iResolution.xy;

  vec3 color = vec3(0.0, 0.0, 0.0);

  color = vec3(rectShape(uv, vec2(0.5, 0.5)));

  gl_FragColor = vec4(color, 1.0);
}
