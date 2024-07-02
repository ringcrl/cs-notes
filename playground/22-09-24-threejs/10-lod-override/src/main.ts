import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import image1Path from "./usecases/3629x2041.png";
import image2Path from "./usecases/2667x1500.png";
import image3Path from "./usecases/1778x1000.png";

const textureLoader = new THREE.TextureLoader();

// 创建场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureHigh = textureLoader.load(image1Path);
const textureMedium = textureLoader.load(image2Path);
const textureLow = textureLoader.load(image3Path);

// 创建LOD对象
const lod = new THREE.LOD();

// 创建三个不同细节级别的球体
const geometryHigh = new THREE.SphereGeometry(1, 64, 64);
const geometryMedium = new THREE.SphereGeometry(1, 32, 32);
const geometryLow = new THREE.SphereGeometry(1, 16, 16);

// 为每个细节级别创建材质
const materialHigh = new THREE.MeshBasicMaterial({ map: textureHigh });
const materialMedium = new THREE.MeshBasicMaterial({ map: textureMedium });
const materialLow = new THREE.MeshBasicMaterial({ map: textureLow });

const meshHigh = new THREE.Mesh(geometryHigh, materialHigh);
const meshMedium = new THREE.Mesh(geometryMedium, materialMedium);
const meshLow = new THREE.Mesh(geometryLow, materialLow);

// 添加不同细节级别到LOD对象
lod.addLevel(meshHigh, 0); // 距离0-5显示高细节模型
lod.addLevel(meshMedium, 5); // 距离5-10显示中等细节模型
lod.addLevel(meshLow, 10); // 距离10以上显示低细节模型

lod.update = function (camera) {
  THREE.LOD.prototype.update.call(this, camera);

  for (let i = 0; i < this.levels.length; i++) {
    const level = this.levels[i];
    const distance = level.distance;
    const object = level.object;

    if (this._currentLevel === i && !object.material.map) {
      console.log(`Loading texture for object: ${object.name}`);
      let texturePath;
      // 确保在加载新纹理之前释放旧纹理
      if (object.material.map) {
        object.material.map.dispose();
        object.material.map = null;
      }
      if (object === meshHigh) texturePath = image1Path;
      else if (object === meshMedium) texturePath = image2Path;
      else if (object === meshLow) texturePath = image3Path;

      const texture = textureLoader.load(texturePath);
      object.material.map = texture;
      object.material.needsUpdate = true;
    } else if (this._currentLevel !== i && object.material.map) {
      console.log(`Disposing texture for object: ${object.name}`);
      object.material.map.dispose();
      console.log(`Texture disposed for object: ${object.name}`);
      object.material.map = null;
      object.material.needsUpdate = true;
    }
  }
};

// 将LOD对象添加到场景
scene.add(lod);

// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 添加平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 设置相机位置
camera.position.z = 5;

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 动画循环
function animate() {
  requestAnimationFrame(animate);

  // 更新LOD
  lod.update(camera);

  // 更新控制器
  controls.update();

  // 渲染场景
  renderer.render(scene, camera);
}

// 启动动画循环
animate();

// 处理窗口大小变化
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
