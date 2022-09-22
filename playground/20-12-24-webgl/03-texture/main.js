const canvas = document.getElementById('canvas')
let gl = null
let glProgram = null
let samplerUniform = null

function setupContext () {
  try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  } catch (e) {
    console.error(e)
  }
  if (gl) {
    gl.clearColor(74 / 255, 115 / 255, 94 / 255, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }
}

function initShaders () {
  // get shader source
  const vsSource = `
    attribute vec3 aPos;
    attribute vec2 aVertexTextureCoord;
    varying highp vec2 vTextureCoord;
    void main(void){
        gl_Position = vec4(aPos, 1);
        vTextureCoord = aVertexTextureCoord;
    }
  `
  const fsSource = `
    varying highp vec2 vTextureCoord;
    uniform sampler2D uSampler;
    void main(void) {
        gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    }
  `
  // compile shaders
  const vertexShader = makeShader(vsSource, gl.VERTEX_SHADER)
  const fragmentShader = makeShader(fsSource, gl.FRAGMENT_SHADER)

  // create program
  glProgram = gl.createProgram()
  // attach and link shaders to the program
  gl.attachShader(glProgram, vertexShader)
  gl.attachShader(glProgram, fragmentShader)
  gl.linkProgram(glProgram)

  if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program.')
  }
  // use program
  gl.useProgram(glProgram)
}

function makeShader (src, type) {
  // compile the vertex shader
  const shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(`Error compiling shader: ${gl.getShaderInfoLog(shader)}`)
  }
  return shader
}

function getUniforms () {
  samplerUniform = gl.getUniformLocation(glProgram, 'uSampler')
}

const vertex = [
  -0.5, -0.5, 0.0,
  -0.5, 0.5, 0.0,
  0.5, -0.5, 0.0,
  0.5, 0.5, 0.0
]

const vertexIndice = [
  0, 1, 2,
  2, 1, 3
]

const triangleTexCoords = [
  0.0, 0.0,
  0, 1.0,
  1.0, 0.0,
  1.0, 1.0
]

function draw (texture) {
  // vertex data
  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex), gl.STATIC_DRAW)

  // indice data
  const vertexIndiceBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndiceBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndice), gl.STATIC_DRAW)

  // set position attribute
  const aVertexPosition = gl.getAttribLocation(glProgram, 'aPos')
  gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(aVertexPosition)

  // texture coordinate data
  const trianglesTexCoordBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTexCoordBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleTexCoords), gl.STATIC_DRAW)

  // set texture coordinate attribute
  const vertexTexCoordAttribute = gl.getAttribLocation(glProgram, 'aVertexTextureCoord')
  gl.enableVertexAttribArray(vertexTexCoordAttribute)
  gl.vertexAttribPointer(vertexTexCoordAttribute, 2, gl.FLOAT, false, 0, 0)

  // bind texture and set the sampler
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.uniform1i(samplerUniform, 0)

  gl.clearColor(74 / 255, 115 / 255, 94 / 255, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
}

function createTexture (source) {
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.bindTexture(gl.TEXTURE_2D, null)
  return texture
}

function loadTextureImage (src) {
  return new Promise((resolve) => {
    const img = new window.Image()
    img.onload = function onImgLoad () {
      const texture = createTexture(this)
      resolve(texture)
    }
    img.src = src
  })
}

(async function main () {
  setupContext()
  initShaders()
  getUniforms()
  const texture1 = await loadTextureImage('../assets/01.png')
  draw(texture1)
  setTimeout(async () => {
    gl.deleteTexture(texture1)
    const texture2 = await loadTextureImage('../assets/02.jpg')
    draw(texture2)
  }, 1000)
}())
