#ifdef GL_ES
precision mediump float;
#endif

mat2 scale(vec2 scale) {
  return mat2(scale.x, 0.0, 0.0, scale.y);
}
