import { World } from './World/World.js'

// create the main function
function main () {
  // code to set up the World App will go here

  // Get a reference to the container element
  const container = document.querySelector('#scene-container')

  // Create an instance of the World app
  const world = new World(container)

  // produce a single frame (render on demand)
  // 按需渲染
  // world.render();

  // start the animation loop
  world.start()
}

// call main to start the app
main()
