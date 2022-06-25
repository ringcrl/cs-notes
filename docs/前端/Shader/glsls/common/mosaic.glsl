#if __VERSION__ < 130
#define TEXTURE2D texture2D
#else
#define TEXTURE2D texture
#endif

#ifdef GL_ES
precision mediump float;
#endif

// 马赛克效果：
// vec2 uv = gl_FragCoord.xy / iResolution.xy;
// vec4 resultColor =
//     mosaic(iChannel0, uv, iChannelResolution[0].xy, grid_num);

vec4 mosaic(sampler2D inputTexture, vec2 uv, vec2 texResolution,
                     float grid_num) {
  vec2 p = uv;
  int baseTexWidth = int(texResolution.x);
  int baseTexHeight = int(texResolution.y);

  if (baseTexWidth < baseTexHeight) {
    float grid_side = float(baseTexWidth) / grid_num;
    float grid_num_vertical = float(baseTexHeight) / grid_side;
    float y_offset =
        float(baseTexHeight) - floor(grid_num_vertical) * grid_side;
    p.y -= y_offset * 0.5 / float(baseTexHeight);
    p.x = floor(p.x * grid_num) / grid_num + 0.5 / grid_num;
    p.y = floor(p.y * grid_num_vertical) / grid_num_vertical +
          0.5 / grid_num_vertical;
  } else {
    float grid_side = float(baseTexHeight) / grid_num;
    float grid_num_horizonal = float(baseTexWidth) / grid_side;
    float x_offset =
        float(baseTexWidth) - floor(grid_num_horizonal) * grid_side;
    p.x -= x_offset * 0.5 / float(baseTexWidth);
    p.x = floor(p.x * grid_num_horizonal) / grid_num_horizonal +
          0.5 / grid_num_horizonal;
    p.y = floor(p.y * grid_num) / grid_num + 0.5 / grid_num;
  }
  vec4 resultColor = TEXTURE2D(inputTexture, p);
  return resultColor;
}
