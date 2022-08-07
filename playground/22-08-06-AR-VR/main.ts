const canvas = document.querySelector('#c') as HTMLCanvasElement
// 跟 css 设置的 canvas 宽高不是一回事
// gl.drawingBufferWidth 和 gl.drawingBufferHeight
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gl = canvas.getContext('webgl')
if (gl === null) {
  throw new Error('WebGL not supported')
}

// define the points in the scene
const coordinates = [
  -0.7, 0.7,
  -0.7, 0,
  0.7, 0
]

// draw red color on the screen
// gl.clearColor(1, 0, 0, 1)
// gl.clear(gl.COLOR_BUFFER_BIT)

const vertexShaderSource = `
  attribute vec4 vertex_points;
  void main() {
    gl_Position = vertex_points;
  }
`
const fragmentShaderSource = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(1, 0, 0, 1);
  }
`

// compile the shaders into GLSL
const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader
gl.shaderSource(vertexShader, vertexShaderSource)
gl.compileShader(vertexShader)
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader
gl.shaderSource(fragmentShader, fragmentShaderSource)
gl.compileShader(fragmentShader)

// create a carry-out container that will pass
// the shader functions to the GPU
const program = gl.createProgram() as WebGLProgram

// attach the shaders to the program
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)

// link the shaders to the program
gl.linkProgram(program)

// create an empty buffer object to store the vertex points
const pointsBuffer = gl.createBuffer() as WebGLBuffer
// connect the empty buffer object to the Gl context
gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuffer)

// load the vertices into the GL's connected buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coordinates), gl.STATIC_DRAW)

// locate the attribute from the vertex shader source in the program
const pointsAttributeLocation = gl.getAttribLocation(program, 'vertex_points')

// Connect the attribute to the points data currently in the buffer object
let size = 2;   // components per iteration (2 because just x,y points)
let type = gl.FLOAT;    // data is 32bit floats
let normalize = false;  // don't normalize the data
let stride = 0;    // don't skip indices between coordinate pairs
let offset = 0; // start at beginning of buffer
gl.vertexAttribPointer(pointsAttributeLocation, size, type, normalize, stride, offset)

// send the points data to the GPU
gl.enableVertexAttribArray(pointsAttributeLocation)

// clear the screen to transparent
gl.clearColor(0, 0, 0, 0)
gl.clear(gl.COLOR_BUFFER_BIT)

// define the active program of the GL context
gl.linkProgram(program);
gl.useProgram(program);

// draw the points on the screen
const mode = gl.TRIANGLES;
const first = 0;
const count = 3;
gl.drawArrays(mode, first, count);
