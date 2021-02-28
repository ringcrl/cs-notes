// 根据传入的画布比例、纹理比例
// 计算图像缩放比例
vec2 getScalarRatio(float canvasRatio, float textureRatio) {
    vec2 scalarRatio; // 图像画布比例调整
    if(canvasRatio < textureRatio) {
      scalarRatio = vec2(1.0,  canvasRatio / textureRatio);
    } else {
      scalarRatio = vec2(textureRatio / canvasRatio, 1.0);
    }

    return scalarRatio;
}
