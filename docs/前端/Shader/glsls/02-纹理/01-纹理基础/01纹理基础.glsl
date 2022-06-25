#ifdef GL_ES
precision mediump float;
#endif

#iChannel0 "file://assets/vertical.jpg"

void main(void) {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;

  gl_FragColor = texture2D(iChannel0, uv);
}
