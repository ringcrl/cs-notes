const canvas = document.querySelector('canvas')
const gl = canvas.getContext('webgl')

// 我们可以把顶点着色器理解为处理顶点的 GPU 程序代码。
// 它可以改变顶点的信息（如顶点的坐标、法线方向、材质等等），从而改变我们绘制出来的图形的形状或者大小等等
const vertex = `
  attribute vec2 position;
  varying vec3 color;

  void main() {
    gl_PointSize = 1.0;
    color = vec3(0.5 + position * 0.5, 0.0);
    gl_Position = vec4(position * 0.5, 1.0, 1.0);
  }
`

const fragment = `
  precision mediump float;
  varying vec3 color;

  void main()
  {
    gl_FragColor = vec4(color, 1.0);
  }
`

// 将着色器创建成 shader 对象
const vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, vertex)
gl.compileShader(vertexShader)

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, fragment)
gl.compileShader(fragmentShader)

// 创建 WebGLProgram 对象，并将这两个 shader 关联到这个 WebGL 程序上
// 然后将这个 WebGLProgram 对象链接到 WebGL 上下文对象上

const program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)

// 通过 useProgram 选择启用这个 WebGLProgram 对象
gl.useProgram(program)

// 定义三角形的三个顶点，没有z轴数据
const points = new Float32Array([
  -1, -1,
  0, 1,
  1, -1
])

// 将定义好的数据写入 WebGL 的缓冲区
const bufferId = gl.createBuffer() // 创建缓存对象
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId) // 绑定为当前操作对象
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW) // 把数据写入缓存对象

// 把缓存数据绑定给定点着色器中的 position 变量
const vPosition = gl.getAttribLocation(program, 'position') // 获取顶点着色器中的position变量的地址
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0) // 给变量设置长度和类型
gl.enableVertexAttribArray(vPosition) // 激活这个变量

// 将当前画布的内容清除
gl.clear(gl.COLOR_BUFFER_BIT)
gl.drawArrays(gl.TRIANGLES, 0, points.length / 2) // gl.TRIANGLES 是图元类型，三角型
