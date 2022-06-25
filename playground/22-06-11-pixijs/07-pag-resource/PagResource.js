/* eslint-disable-next-line */
class PAGResource extends PIXI.resources.Resource {
  constructor (PAG, pagFile) {
    super(pagFile.width(), pagFile.height())
    this.PAG = PAG
    this.pagPlayer = PAG.PAGPlayer.create()
    this.pagPlayer.setComposition(pagFile)
    this.pagSurface = null
    this.needFlush = true
    this.needUpload = false
    this.renderTargetID = -1
    this.fbo = null
    this.texture = null
    this.backendCtx = null
  }

  upload (
    renderer,
    baseTexture,
    glTexture
  ) {
    const { width, height, PAG } = this
    const { gl } = renderer
    if (!gl) return false

    // 注册 context
    if (!this.backendCtx) {
      this.backendCtx = PAG.BackendContext.from(gl)
    }
    // 创建 texture & frameBuffer
    if (!this.texture) {
      this.texture = gl.createTexture()
      if (!this.texture) return false
      gl.bindTexture(gl.TEXTURE_2D, this.texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
      gl.bindTexture(gl.TEXTURE_2D, glTexture.texture)
    }
    if (!this.fbo) {
      this.fbo = gl.createFramebuffer()
      if (!this.fbo) return false
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }

    // 注册 renderTarget
    if (this.renderTargetID < 1) {
      this.renderTargetID = this.backendCtx.registerRenderTarget(this.fbo)
      this.backendCtx.makeCurrent()
      this.pagSurface = PAG.PAGSurface.FromRenderTarget(this.renderTargetID, width, height, false)
      this.pagPlayer.setSurface(this.pagSurface)
      this.backendCtx.clearCurrent()
    }

    if (this.needFlush) {
      this.needFlush = false
      requestAnimationFrame(() => {
        this.pagPlayer.flush().then((res) => {
          this.needUpload = res
          renderer.reset()
          // reset scissor
          gl.disable(gl.SCISSOR_TEST)
          if (res) this.update()
        })
      })
    }

    if (this.needUpload) {
      this.needUpload = false
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo)
      // 分配内存不然绑定 frameBuffer 会失败
      gl.texImage2D(
        baseTexture.target,
        0,
        baseTexture.format,
        width,
        height,
        0,
        baseTexture.format,
        baseTexture.type,
        null
      )
      gl.copyTexSubImage2D(baseTexture.target, 0, 0, 0, 0, 0, width, height)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      return true
    }
    return false
  }

  setProgress (progress) {
    this.pagPlayer?.setProgress(progress)
    this.needFlush = true
    this.update()
  }

  flush () {
    this.needFlush = true
    this.update()
  }
}
