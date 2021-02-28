// 从模糊到清晰特效
#if __VERSION__ < 130
#define TEXTURE2D texture2D
#else
#define TEXTURE2D texture
#endif

vec4 directionBlur(sampler2D tex, vec2 resolution, vec2 uv, vec2 directionOfBlur, float intensity) {
	int num = 7;
	vec2 pixelStep = 1.0/resolution * intensity;
	float dircLength = length(directionOfBlur);
	pixelStep.x = directionOfBlur.x * 1.0 / dircLength * pixelStep.x;
	pixelStep.y = directionOfBlur.y * 1.0 / dircLength * pixelStep.y;

	vec4 color = vec4(0);
	for(int i = -num; i <= num; i++) {
		vec2 blurCoord = uv + pixelStep * float(i);
		vec2 uvT = vec2(1.0 - abs(abs(blurCoord.x) - 1.0), 1.0 - abs(abs(blurCoord.y) - 1.0));
		color += TEXTURE2D(tex, uvT);
	}
	color /= float(2 * num + 1);
	return color;
}

// 用法：
// float progress = getProgress(iTime, 1.0);
// vec2 uv = gl_FragCoord.xy / iResolution.xy;
// float blurStep = (1.0 - progress) * 3.0;
// vec2 blurDirection = vec2(1.0, 1.0);
// vec4 resultColor = directionBlur(iChannel0, iResolution.xy, uv, blurDirection, blurStep);
