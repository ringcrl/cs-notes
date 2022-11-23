import { toRadians } from '../helpers'
import { Vector, Line } from '.'

export default class Rect {
  constructor ({
    x = 0, y = 0, w = 10, h = 10,
    // 0 is Horizontal to right (following OX) - Rotate clockwise
    theta = null, angle = 0, // theta (rad) or angle (deg)
    rgb = '0,0,0'
  }) {
    this.center = new Vector({ x, y })
    this.size = new Vector({ x: w, y: h })
    this.theta = theta || toRadians(angle)
    this.rgb = rgb
  }

  getAxis () {
    const OX = new Vector({ x: 1, y: 0 })
    const OY = new Vector({ x: 0, y: 1 })
    const RX = OX.Rotate(this.theta)
    const RY = OY.Rotate(this.theta)
    return [
      new Line({ ...this.center, dx: RX.x, dy: RX.y }),
      new Line({ ...this.center, dx: RY.x, dy: RY.y })
    ]
  }

  getCorners () {
    const axis = this.getAxis()
    const RX = axis[0].direction.Multiply(this.size.x / 2)
    const RY = axis[1].direction.Multiply(this.size.y / 2)
    return [
      this.center.Add(RX).Add(RY),
      this.center.Add(RX).Add(RY.Multiply(-1)),
      this.center.Add(RX.Multiply(-1)).Add(RY.Multiply(-1)),
      this.center.Add(RX.Multiply(-1)).Add(RY)
    ]
  }
}
