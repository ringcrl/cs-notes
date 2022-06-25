// 为了演示完整进度效果，模拟通过 uniform 传入的 progress
// float progress = getProgress(iTime, 3.0); // 3s 循环一次 0-1

float getProgress(float time, float duration) {
  return mod(time, duration) / duration;
}
