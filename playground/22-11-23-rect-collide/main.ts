import { isRectCollide } from './lib'

const rect1 = { x: 0, y: 0, w: 100.5, h: 100.5, angle: 60 }
const rect2 = { x: 50, y: 0, w: 100.5, h: 100.5, angle: -10 }

const isColliding = isRectCollide(rect1, rect2)
console.log('isColliding', isColliding)
