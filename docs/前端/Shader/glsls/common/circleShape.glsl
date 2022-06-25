#ifdef GL_ES
precision mediump float;
#endif

float circleShape(vec2 position, float radius){

  // 坐标原点从 (0, 0) 移动到画布中点 (0.5, 0.5)
  position -= vec2(0.5);

  // 画布不为正方形的时候，圆形会被压缩
  position.x *= iResolution.x / iResolution.y;

  return step(radius, length(position));
}
