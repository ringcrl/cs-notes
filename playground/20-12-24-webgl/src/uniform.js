const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

const vertex = `
  attribute vec2 position;

  uniform float u_rotation;
  uniform float u_time;
  uniform float u_duration;
  uniform float u_scale;
  uniform vec2 u_dir;


  varying float vP;

  void main() {
    // 当前动画进度
    float p = min(1.0, u_time / u_duration);
    // 旋转角度，初始值是 u_rotation + 10π，动画过程中会绕自己旋转5周
    float rad = u_rotation + 3.14 * 10.0 * p;
    // 缩放比例，p * (2.0 - p) 是一个缓动函数，scale 变化量随着时间推移逐渐减小
    float scale = u_scale * p * (2.0 - p);
    // 这里的 2.0 表示它的最大移动距离为 2，p * p 也是一个缓动函数，作用是让位移的变化量随着时间增加而增大
    vec2 offset = 2.0 * u_dir * p * p;
    mat3 translateMatrix = mat3(
      1.0, 0.0, 0.0,
      0.0, 1.0, 0.0,
      offset.x, offset.y, 1.0
    );
    mat3 rotateMatrix = mat3(
      cos(rad), sin(rad), 0.0,
      -sin(rad), cos(rad), 0.0,
      0.0, 0.0, 1.0
    );
    mat3 scaleMatrix = mat3(
      scale, 0.0, 0.0,
      0.0, scale, 0.0,
      0.0, 0.0, 1.0
    );
    gl_PointSize = 1.0;
    vec3 pos = translateMatrix * rotateMatrix * scaleMatrix * vec3(position, 1.0);
    gl_Position = vec4(pos, 1.0);
    vP = p;
  }
`;

const fragment = `
  precision mediump float;
  
  uniform vec4 u_color;

  // vP 就是定点着色器通过 varying 传过来的进度，让 alpha 值随着 vP 值变化，实现淡出效果
  varying float vP;

  void main()
  {
    gl_FragColor.xyz = u_color.xyz;
    gl_FragColor.a = (1.0 - vP) * u_color.a;
  }    
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

// 创建三角型
const position = new Float32Array([
  -1, -1,
  0, 1,
  1, -1,
]);
const bufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);

const vPosition = gl.getAttribLocation(program, 'position');
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(vPosition);

// 随机创建三角型属性
function randomTriangles() {
  const u_color = [Math.random(), Math.random(), Math.random(), 1.0]; // 随机颜色
  const u_rotation = Math.random() * Math.PI; // 初始旋转角度
  const u_scale = Math.random() * 0.05 + 0.03; // 初始大小
  const u_time = 0;
  const u_duration = 3.0; // 持续3秒钟

  const rad = Math.random() * Math.PI * 2;
  const u_dir = [Math.cos(rad), Math.sin(rad)]; // 运动方向
  const startTime = performance.now();

  return {
    u_color, // 颜色
    u_rotation, // 初始旋转角度
    u_scale, // 初始大小
    u_time, // 初始时间
    u_duration, // 动画持续时间
    u_dir, // 运动方向
    startTime, // 创建时间
  };
}

function setUniforms(gl, {
  u_color, u_rotation, u_scale, u_time, u_duration, u_dir,
}) {
  // gl.getUniformLocation 拿到 uniform 变量的指针
  let loc = gl.getUniformLocation(program, 'u_color');
  // 传入四个浮点数，对应的 uniform 变量类型为 float[4]
  gl.uniform4fv(loc, u_color);

  loc = gl.getUniformLocation(program, 'u_rotation');
  // 传入一个浮点数，对应的 uniform 变量的类型为 float
  gl.uniform1f(loc, u_rotation);

  loc = gl.getUniformLocation(program, 'u_scale');
  gl.uniform1f(loc, u_scale);

  loc = gl.getUniformLocation(program, 'u_time');
  gl.uniform1f(loc, u_time);

  loc = gl.getUniformLocation(program, 'u_duration');
  gl.uniform1f(loc, u_duration);

  loc = gl.getUniformLocation(program, 'u_dir');
  gl.uniform2fv(loc, u_dir);
}

let triangles = [];
function update() {
  // 每次新建数个随机三角型
  for (let i = 0; i < 5 * Math.random(); i++) {
    triangles.push(randomTriangles());
  }
  gl.clear(gl.COLOR_BUFFER_BIT);
  triangles.forEach((triangle) => {
    // 对每个三角形重新设置 u_time
    triangle.u_time = (performance.now() - triangle.startTime) / 1000;
    setUniforms(gl, triangle);
    // 移除已经结束动画的三角形
    gl.drawArrays(gl.TRIANGLES, 0, position.length / 2);
  });

  triangles = triangles.filter((triangle) => triangle.u_time <= triangle.u_duration);
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
