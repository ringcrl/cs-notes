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
precision mediump float;
#endif

varying vec2 vUv;
uniform float rows;

void main() {
  // 获取重复的 rows 行 rows 列的值 st
  // vUv 是顶点着色器传来的 uv 属性（纹理坐标）
  // 函数 fract 用来获取一个数的小数部分
  vec2 st = fract(vUv * rows);

  // step 函数是一个阶梯函数
  // 当 step(a, b) 中的 b < a 时，返回 0；当 b >= a 时，返回 1
  float d1 = step(st.x, 0.9);
  float d2 = step(0.1, st.y);

  // 当 st.x 小于 0.9 且 st.y 大于 0.1，也就是 d1 * d2 等于 1 的时候
  // mix(vec3(0.8), vec3(1.0), d1 * d2) 的结果是 vec3(1.0)，也就是白色
  // 否则就是 vec3(0.8)，也就是灰色
  gl_FragColor.rgb = mix(vec3(0.8), vec3(1.0), d1 * d2);
  gl_FragColor.a = 1.0;
}
`

// 第一步:
const canvas = document.querySelector('canvas')
const renderer = new GlRenderer(canvas); // eslint-disable-line

// 第二步:
const program = renderer.compileSync(fragment, vertex)
renderer.useProgram(program)

// 步骤三: 设置 uniform 变量
renderer.uniforms.rows = 64

// 步骤四: 将顶点数据送入缓冲区
renderer.setMeshData([{
  positions: [ // 设置四个顶点，覆盖整个 Canvas 画布
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1]
  ],
  attributes: {
    uv: [ // 纹理坐标，这个坐标系左下角是（0，0），右上角是（1，1）
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 0]
    ]
  },
  cells: [[0, 1, 2], [2, 0, 3]] // 顶点索引，WebGL 只能渲染经过三角剖分后的多边形
}])

renderer.render()
