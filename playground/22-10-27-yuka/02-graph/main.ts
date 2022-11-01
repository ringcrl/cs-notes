import * as YUKA from 'yuka'
import * as THREE from 'three'
import * as DAT from 'dat.gui'

import {
  createGraphHelper,
  createPathHelper,
  createSearchTreeHelper
} from '../common/GraphHelper'

let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let raycaster: THREE.Raycaster

let searchTreeHelper: ReturnType<typeof createSearchTreeHelper>
let pathHelper: ReturnType<typeof createPathHelper>

const nodes: Array<THREE.Object3D<THREE.Event>> = []

let graph: YUKA.Graph
const from = 60 // source node index
let to = 104 // target node index

const params = {
  algorithm: 'AStar'
}

init()

function init (): void {
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(50, 50, 0)
  camera.lookAt(scene.position)

  raycaster = new THREE.Raycaster()

  // renderer

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  //

  window.addEventListener('resize', onWindowResize, false)
  document.addEventListener('mousedown', onDocumentMouseDown, false)

  // graph

  graph = YUKA.GraphUtils.createGridLayout(50, 10)

  const graphHelper = createGraphHelper(graph, 0.25)
  scene.add(graphHelper)

  graphHelper.traverse((child: any) => {
    if (child.isMesh !== undefined) nodes.push(child)
  })

  performSearch()

  // dat.gui

  const gui = new DAT.GUI({ width: 300 })
  gui.add(params, 'algorithm', ['AStar', 'Dijkstra', 'BFS', 'DFS']).onChange(performSearch)
  gui.open()
}

function performSearch (): void {
  const graphSearch = new YUKA[params.algorithm](graph, from, to)

  debugger

  graphSearch.search()

  const searchTree = graphSearch.getSearchTree()
  const path = graphSearch.getPath()

  // update helper

  if (searchTreeHelper !== undefined && pathHelper !== undefined) {
    scene.remove(searchTreeHelper)
    scene.remove(pathHelper)

    dispose(searchTreeHelper)
    dispose(pathHelper)
  }

  searchTreeHelper = createSearchTreeHelper(graph, searchTree)
  searchTreeHelper.renderOrder = 1
  scene.add(searchTreeHelper)

  pathHelper = createPathHelper(graph, path, 0.4)
  pathHelper.renderOrder = 2
  scene.add(pathHelper)

  // clean up

  graphSearch.clear()

  //

  renderer.render(scene, camera)
}

function dispose (object: any): void {
  object.traverse((child: any) => {
    if (child.isMesh !== undefined || child.isLine !== undefined) {
      child.geometry.dispose()
      child.material.dispose()
    }
  })
}

function onDocumentMouseDown (event: MouseEvent): void {
  const mouse = new THREE.Vector2()

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(nodes)

  if (intersects.length > 0) {
    const intersection = intersects[0]

    // set new target node

    to = intersection.object.userData.nodeIndex

    performSearch()
  }
}

function onWindowResize (): void {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)
}
