export default class Vector {
  constructor ({ x = 0, y = 0 } = {}) {
    this.x = x
    this.y = y
  }

  get magnitude () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  // Add(5)
  // Add(Vector)
  // Add({x, y})
  Add (factor) {
    const f = typeof factor === 'object'
      ? { x: 0, y: 0, ...factor }
      : { x: factor, y: factor }
    return new Vector({
      x: this.x + f.x,
      y: this.y + f.y
    })
  }

  Minus (factor) {
    const f = typeof factor === 'object'
      ? { x: 0, y: 0, ...factor }
      : { x: factor, y: factor }
    return new Vector({
      x: this.x - f.x,
      y: this.y - f.y
    })
  }

  // Multiply(5)
  // Multiply(Vector)
  // Multiply({x, y})
  Multiply (factor) {
    // @LATER: Use an helper in order to transform `factor`
    //  into a Vector of same Dimensions than this
    const f = typeof factor === 'object'
      ? { x: 0, y: 0, ...factor }
      : { x: factor, y: factor }

    return new Vector({
      x: this.x * f.x,
      y: this.y * f.y
    })
  }

  Rotate (theta) {
    // https://en.wikipedia.org/wiki/Rotation_matrix#In_two_dimensions
    return new Vector({
      x: this.x * Math.cos(theta) - this.y * Math.sin(theta),
      y: this.x * Math.sin(theta) + this.y * Math.cos(theta)
    })
  }

  // Todo: Use scalar product

  Project (line) {
    const dotvalue = line.direction.x * (this.x - line.origin.x) +
      line.direction.y * (this.y - line.origin.y)

    return new Vector({
      x: line.origin.x + line.direction.x * dotvalue,
      y: line.origin.y + line.direction.y * dotvalue
    })
  }
}
