#include "common/blur.glsl"
#include "common/getCenterDisplayColor.glsl"
#include "common/getScalarRatio.glsl"

#iChannel0 "file://assets/horizon.jpg"  // 分辨率 1280 * 720，通过
                                        // iChannelResolution[0].xy 获取

void main() {
  vec2 st = gl_FragCoord.xy / iResolution.xy;

  float canvasRatio = iResolution.x / iResolution.y;
  float iChannel0Ratio = iChannelResolution[0].x / iChannelResolution[0].y;
  vec2 scalarRatio = getScalarRatio(canvasRatio, iChannel0Ratio);

  vec4 color = getCenterDisplayColor(
      iChannel0, st, scalarRatio,
      blur(iChannel0, st, 1.0 / iChannelResolution[0].xy));

  gl_FragColor = color;
}
