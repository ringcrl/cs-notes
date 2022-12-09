import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  Mesh
} from 'three'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const a = new OrbitControls(camera, renderer.domElement)

const uniforms = {
  time: { type: 'f', value: 1.0 },
  resolution: { type: 'v2', value: new THREE.Vector2() }
}

const geometry = new BoxGeometry(1, 1, 1)
// const material = new MeshBasicMaterial({ color: 0xff00ff })

// Set up the vertex and fragment shaders
const vertexShader = `
varying vec3 vViewDir;
varying vec3 vWorldPos;

void main() {
  vViewDir = -vec3(modelViewMatrix * vec4(position, 1.0));
  vWorldPos = vec3(modelMatrix * vec4(position, 1.0));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
varying vec3 vViewDir;
varying vec3 vWorldPos;

float range(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
  vec3 sub = vec3(oldValue, newMax, oldMax) - vec3(oldMin, newMin, oldMin);
  return sub.x * sub.y / sub.z + newMin;
}

float crange(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
  return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMin, newMax), max(newMin, newMax));
}

float smootherstep(float edge0, float edge1, float x) {
  x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
}

bool isClipping(vec2 vUv, vec3 vWorldPos, float nearDistance) {
  vec2 uvRepeat = fract(vUv * 40.0) - 0.5;
  float radius = crange(length(cameraPosition - vWorldPos), 2.0, nearDistance, 1.0, 0.0);
  float circle = 1.0 - smootherstep(radius - radius * 0.1, radius, length(uvRepeat));
  return circle > 0.5;
}

void main() {
  if(isClipping(vViewDir.xy, vWorldPos, 6.0))
  discard;

  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

// Create a new ShaderMaterial using the vertex and fragment shaders
const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
})

const cube = new Mesh(geometry, material)
cube.rotation.x = 0.5
scene.add(cube)

// Render the scene
renderer.render(scene, camera)

camera.position.z = 5

function animate (): void {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()
