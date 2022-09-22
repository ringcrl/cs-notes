// 将 color 通过颜色矩阵映射成新的色值返回
export function transformColor(color, ...matrix) {
  // 颜色向量与矩阵相乘
  const [r, g, b, a] = color;
  matrix = matrix.reduce((m1, m2) => multiply(m1, m2));
  color[0] = matrix[0] * r + matrix[1] * g + matrix[2] * b + matrix[3] * a + matrix[4];
  color[1] = matrix[5] * r + matrix[6] * g + matrix[7] * b + matrix[8] * a + matrix[9];
  color[2] = matrix[10] * r + matrix[11] * g + matrix[12] * b + matrix[13] * a + matrix[14];
  color[3] = matrix[15] * r + matrix[16] * g + matrix[17] * b + matrix[18] * a + matrix[19];
  return color;
}
// 将颜色矩阵相乘
export function multiply(a, b) {
  // 颜色矩阵相乘
  const out = [];
  const a00 = a[0]; const a01 = a[1]; const a02 = a[2]; const a03 = a[3]; const a04 = a[4]; // eslint-disable-line one-var-declaration-per-line
  const a10 = a[5]; const a11 = a[6]; const a12 = a[7]; const a13 = a[8]; const a14 = a[9]; // eslint-disable-line one-var-declaration-per-line
  const a20 = a[10]; const a21 = a[11]; const a22 = a[12]; const a23 = a[13]; const a24 = a[14]; // eslint-disable-line one-var-declaration-per-line
  const a30 = a[15]; const a31 = a[16]; const a32 = a[17]; const a33 = a[18]; const a34 = a[19]; // eslint-disable-line one-var-declaration-per-line

  // Cache only the current line of the second matrix
  let b0 = b[0]; let b1 = b[1]; let b2 = b[2]; let b3 = b[3]; let b4 = b[4]; // eslint-disable-line one-var-declaration-per-line
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  out[4] = b0 * a04 + b1 * a14 + b2 * a24 + b3 * a34 + b4;

  b0 = b[5]; b1 = b[6]; b2 = b[7]; b3 = b[8]; b4 = b[9];
  out[5] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[6] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[7] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[8] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  out[9] = b0 * a04 + b1 * a14 + b2 * a24 + b3 * a34 + b4;

  b0 = b[10]; b1 = b[11]; b2 = b[12]; b3 = b[13]; b4 = b[14];
  out[10] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[11] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[12] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[13] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  out[14] = b0 * a04 + b1 * a14 + b2 * a24 + b3 * a34 + b4;

  b0 = b[15]; b1 = b[16]; b2 = b[17]; b3 = b[18]; b4 = b[19];
  out[15] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[16] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[17] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[18] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  out[19] = b0 * a04 + b1 * a14 + b2 * a24 + b3 * a34 + b4;

  return out;
}
