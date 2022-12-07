import { Scene, PerspectiveCamera, WebGLRenderer, CircleGeometry, BoxGeometry, MeshBasicMaterial, Mesh } from 'three'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

let startTime = Date.now()

const a = new OrbitControls(camera, renderer.domElement)

let uniforms = {
  time: { type: "f", value: 1.0 },
  resolution: { type: "v2", value: new THREE.Vector2() }
};

var geometry = new BoxGeometry(1, 1, 1);
// const material = new MeshBasicMaterial({ color: 0xff00ff })

// Set up the vertex and fragment shaders
var vertexShader = `
void main()	{
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

var fragmentShader = `
uniform float time;
uniform vec2 resolution;
void main()	{
    float x = mod(time + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;
    float y = mod(time + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;
    gl_FragColor = vec4(vec3(min(x, y)), 1.);

    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;

// Create a new ShaderMaterial using the vertex and fragment shaders
var material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
});

// var material = new MeshBasicMaterial({
//   map: new THREE.TextureLoader().load(require('../1.png')),
//   transparent: true,
//   depthWrite: true,
//   blending: THREE.CustomBlending,
//   blendSrc: THREE.SrcAlphaFactor,
//   blendDst: THREE.OneMinusSrcAlphaFactor,
//   blendEquation: THREE.AddEquation
// });

const cube = new Mesh(geometry, material)
cube.rotation.x = 0.5
scene.add(cube)


// Set the camera position and orientation
camera.position.z = 5;
camera.lookAt(0, 0, 0);

// Render the scene
renderer.render(scene, camera);

camera.position.z = 5

function animate(): void {
  requestAnimationFrame(animate)

  var elapsedMilliseconds = Date.now() - startTime;
  var elapsedSeconds = elapsedMilliseconds / 1000.;
  uniforms.time.value = 60. * elapsedSeconds;
  renderer.render(scene, camera)
}
animate()
