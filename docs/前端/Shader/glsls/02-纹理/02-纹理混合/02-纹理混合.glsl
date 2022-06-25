#iChannel0 "file://02-纹理/02-纹理混合/a.png"
#iChannel1 "file://02-纹理/02-纹理混合/wood.jpg"

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;

    vec3 pattern = texture2D(iChannel1, uv).rgb;
    float mask = texture2D(iChannel0, uv).a;

    vec3 maskedPattern = pattern * mask;
    gl_FragColor = vec4(maskedPattern, 1.0);
}
