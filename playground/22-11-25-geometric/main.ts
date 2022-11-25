import { Point, polygonRotate } from 'geometric'

const polygon: Point[] = [[0, 0], [0, 5], [10, 0], [10, 5]]
const rotated = polygonRotate(polygon, 30, [5, 2.5])
console.log(JSON.stringify(rotated))
