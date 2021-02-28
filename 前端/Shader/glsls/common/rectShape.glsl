#ifdef GL_ES
precision mediump float;
#endif

float rectShape(vec2 position, vec2 scale){

  scale = vec2(0.5, 0.5) - scale * 0.5;

  vec2 shaper = vec2(step(scale.x, position.x), step(scale.y, position.y));

  shaper *= vec2(step(scale.x, 1.0 - position.x), step(scale.y, 1.0 - position.y));

  return shaper.x * shaper.y;
}