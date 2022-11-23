import { Rect } from './utils'

export * from './helpers'
export * from './utils'

export const isRectCollide = (rectA, rectB) => {
  const rA = typeof rectA !== Rect ? new Rect(rectA) : rectA
  const rB = typeof rectB !== Rect ? new Rect(rectB) : rectB
  return isProjectionCollide({ rect: rA, onRect: rB }) &&
   isProjectionCollide({ rect: rB, onRect: rA })
}

const isProjectionCollide = ({ rect, onRect }) => {
  const lines = onRect.getAxis()
  const corners = rect.getCorners()

  let isCollide = true

  lines.forEach((line, dimension) => {
    const futhers = { min: null, max: null }
    // Size of onRect half size on line direction
    const rectHalfSize = (dimension === 0 ? onRect.size.x : onRect.size.y) / 2
    corners.forEach(corner => {
      const projected = corner.Project(line)
      const CP = projected.Minus(onRect.center)
      // Sign: Same directon of OnRect axis : true.
      const sign = (CP.x * line.direction.x) + (CP.y * line.direction.y) > 0
      const signedDistance = CP.magnitude * (sign ? 1 : -1)

      if (!futhers.min || futhers.min.signedDistance > signedDistance) {
        futhers.min = { signedDistance, corner, projected }
      }
      if (!futhers.max || futhers.max.signedDistance < signedDistance) {
        futhers.max = { signedDistance, corner, projected }
      }
    })

    if (!(futhers.min.signedDistance < 0 && futhers.max.signedDistance > 0 ||
      Math.abs(futhers.min.signedDistance) < rectHalfSize ||
      Math.abs(futhers.max.signedDistance) < rectHalfSize)) {
      isCollide = false
    }
  })
  return isCollide
}
