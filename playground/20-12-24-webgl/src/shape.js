const vertex = `
  attribute vec2 a_vertexPosition;
  attribute vec2 uv;

  varying vec2 vUv;

  void main() {
    gl_PointSize = 1.0;
    vUv = uv;
    gl_Position = vec4(a_vertexPosition, 1, 1);
  }
`

const fragment = `
  #ifdef GL_ES
  precision highp float;
  #endif

  varying vec2 vUv;

  void main() {
    // 所有像素点都变成黑色
    // gl_FragColor = vec4(0, 0, 0, 1);

    // 左边黑、右边白渐变
    // gl_FragColor.rgba = vec4(vec3(vUv.x), 1);

    // 10 * 10 格子，左上到右下颜色渐变
    vec2 st = vUv * 10.0;
    gl_FragColor.rgb = vec3(fract(st), 0.0);
    gl_FragColor.a = 1.0;

    // 彩色格子
    // vec2 st = vUv * 10.0;
    // vec2 idx = floor(st);
    // vec2 grid = fract(st);
    // vec2 t = mod(idx, 2.0);
    // if(t.x == 1.0) {
    //   grid.x = 1.0 - grid.x;
    // }
    // if(t.y == 1.0) {
    //   grid.y = 1.0 - grid.y;
    // }
    // gl_FragColor.rgb = vec3(grid, 0.0);
    // gl_FragColor.a = 1.0;

    // 圆心渐变色，越接近终点颜色越黑
    // float d = distance(vUv, vec2(0.5));
    // gl_FragColor.rgb = d * vec3(1, 1, 1);
    // gl_FragColor.a = 1.0;

    // 非渐变色圆
    // float d = distance(vUv, vec2(0.5));
    // gl_FragColor.rgb = step(d, 0.5) * vec3(1.0);
    // gl_FragColor.a = 1.0;

    // 一条斜线
    vec3 line = vec3(1, 1, 0); // x、y 决定方向
    float d = abs(cross(vec3(vUv,0), normalize(line)).z);
    gl_FragColor.rgb = (1.0 - smoothstep(0.0, 0.01, d)) * vec3(1.0);
    gl_FragColor.a = 1.0;
  }
`

const canvas = document.querySelector('canvas')
const renderer = new GlRenderer(canvas); // eslint-disable-line
const program = renderer.compileSync(fragment, vertex)
renderer.useProgram(program)

renderer.setMeshData([{
  positions: [
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1]
  ],
  attributes: {
    uv: [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 0]
    ]
  },
  cells: [[0, 1, 2], [2, 0, 3]]
}])

renderer.render()
