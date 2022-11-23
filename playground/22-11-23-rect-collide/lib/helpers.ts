export const toRadians = (degrees) => degrees * Math.PI / 180
export const toDegrees = (radians) => radians * 180 / Math.PI

// .1 - .3 > -0.19999999999999998
// fixFloat(.1 - .3) > -0.2
export const fixFloat = (number, precision = Math.log10(1 / Number.EPSILON)) => number ? parseFloat(number.toFixed(precision)) : 0
