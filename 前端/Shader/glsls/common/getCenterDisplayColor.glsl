// 根据图像缩放比例scalarRatio
// 居中显示图像

#if __VERSION__ < 130
#define TEXTURE2D texture2D
#else
#define TEXTURE2D texture
#endif

vec4 getCenterDisplayColor(sampler2D inputTexture, vec2 st, vec2 scalarRatio) {
    vec4 bgColor = vec4(0.0, 0.0, 0.0, 1.0);
    st = (st - vec2(0.5, 0.5)) / scalarRatio + vec2(0.5, 0.5);
    if (st.x < 0.0 || st.x > 1.0 || st.y < 0.0 || st.y > 1.0) {
      return bgColor;
    }
    return TEXTURE2D(inputTexture, st);
}

vec4 getCenterDisplayColor(sampler2D inputTexture, vec2 st, vec2 scalarRatio, vec4 bgColor) {
    st = (st - vec2(0.5, 0.5)) / scalarRatio + vec2(0.5, 0.5);
    if (st.x < 0.0 || st.x > 1.0 || st.y < 0.0 || st.y > 1.0) {
      return bgColor;
    }
    return TEXTURE2D(inputTexture, st);
}
