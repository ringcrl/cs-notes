// 灰度图片
export function grayscale(p = 1) {
  const r = 0.2126 * p;
  const g = 0.7152 * p;
  const b = 0.0722 * p;

  return [
    r + 1 - p, g, b, 0, 0,
    r, g + 1 - p, b, 0, 0,
    r, g, b + 1 - p, 0, 0,
    0, 0, 0, 1, 0,
  ];
}

// 更改颜色通道强度
export function channel({ r = 1, g = 1, b = 1 }) {
  return [
    r, 0, 0, 0, 0,
    0, g, 0, 0, 0,
    0, 0, b, 0, 0,
    0, 0, 0, 1, 0,
  ];
}

// 改变亮度，p = 0 全暗，p > 0 且 p < 1 调暗，p = 1 原色， p > 1 调亮
export function brightness(p) {
  return [
    p, 0, 0, 0, 0,
    0, p, 0, 0, 0,
    0, 0, p, 0, 0,
    0, 0, 0, 1, 0,
  ];
}

// 饱和度，与grayscale正好相反
// p = 0 完全灰度化，p = 1 原色，p > 1 增强饱和度
export function saturate(p) {
  const r = 0.2126 * (1 - p);
  const g = 0.7152 * (1 - p);
  const b = 0.0722 * (1 - p);
  return [
    r + p, g, b, 0, 0,
    r, g + p, b, 0, 0,
    r, g, b + p, 0, 0,
    0, 0, 0, 1, 0,
  ];
}

// 对比度, p = 1 原色， p < 1 减弱对比度，p > 1 增强对比度
export function contrast(p) {
  const d = 0.5 * (1 - p);
  return [
    p, 0, 0, 0, d,
    0, p, 0, 0, d,
    0, 0, p, 0, d,
    0, 0, 0, 1, 0,
  ];
}

// 透明度，p = 0 全透明，p = 1 原色
export function opacity(p) {
  return [
    1, 0, 0, 0, 0,
    0, 1, 0, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 0, p, 0,
  ];
}

// 反色， p = 0 原色， p = 1 完全反色
export function invert(p) {
  const d = 1 - 2 * p;
  return [
    d, 0, 0, 0, p,
    0, d, 0, 0, p,
    0, 0, d, 0, p,
    0, 0, 0, 1, 0,
  ];
}

// 色相旋转，将色调沿极坐标转过deg角度
export function hueRotate(deg) {
  const rotation = (deg / 180) * Math.PI;
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  const lumR = 0.2126;
  const lumG = 0.7152;
  const lumB = 0.0722;
  return [
    lumR + cos * (1 - lumR) + sin * (-lumR), lumG + cos * (-lumG) + sin * (-lumG), lumB + cos * (-lumB) + sin * (1 - lumB), 0, 0,
    lumR + cos * (-lumR) + sin * (0.143), lumG + cos * (1 - lumG) + sin * (0.140), lumB + cos * (-lumB) + sin * (-0.283), 0, 0,
    lumR + cos * (-lumR) + sin * (-(1 - lumR)), lumG + cos * (-lumG) + sin * (lumG), lumB + cos * (1 - lumB) + sin * (lumB), 0, 0,
    0, 0, 0, 1, 0,
  ];
}
