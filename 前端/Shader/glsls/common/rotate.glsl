#ifdef GL_ES
precision mediump float;
#endif

mat2 rotate(float angle) {
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}
