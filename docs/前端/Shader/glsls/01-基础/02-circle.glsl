void main() {
	// 标准化坐标成 [0, 1]
	vec2 uv = gl_FragCoord.xy / iResolution.xy;

	// 将圆心从左下角移动到视图中点
	uv -= 0.5;

	// 将 x、y 比例设置为 1:1
	uv.x *= iResolution.x / iResolution.y;

	// 求 uv 坐标距离中点的距离
	float d = length(uv);

	if (d < 0.1) {
		d = 1.0;
	} else {
		d = 0.0;
	}

	vec3 c = vec3(d);

	gl_FragColor = vec4(c, 1.0);
}
