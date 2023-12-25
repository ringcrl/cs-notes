// 引入 Three.js
import * as THREE from 'three';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { ThreePerf } from 'three-perf'


// 创建场景
const scene = new THREE.Scene();

// 创建两个立方体的几何体
const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const geometry2 = new THREE.BoxGeometry(1, 1, 1);

// 设置第二个立方体的位置
geometry1.translate(-1, 0, 0);
geometry2.translate(1, 0, 0);

// 创建材质
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

// 合并添加
const mergeGeometry = mergeBufferGeometries([geometry1, geometry2])
const cube = new THREE.Mesh(mergeGeometry, material);
scene.add(cube);

// 独立添加
// const cube1 = new THREE.Mesh(geometry1, material);
// const cube2 = new THREE.Mesh(geometry2, material);
// scene.add(cube1);
// scene.add(cube2);

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 创建渲染器
const renderer = new THREE.WebGLRenderer();

const perf = new ThreePerf({
  anchorX: 'left',
  anchorY: 'top',
  domElement: document.body, // or other canvas rendering wrapper
  renderer: renderer // three js renderer instance you use for rendering
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 渲染函数
function animate() {
  requestAnimationFrame(animate);

  perf.begin();
  renderer.render(scene, camera);
  perf.end();
}

// 调用渲染函数开始渲染
animate();