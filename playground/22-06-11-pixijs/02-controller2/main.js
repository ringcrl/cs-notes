const app = new PIXI.Application({ antialias: true })
document.body.appendChild(app.view)

const PIC_RATIO = 9 / 16
const PIC_WIDTH = 300
const PIC_HEIGHT = PIC_WIDTH / PIC_RATIO
const CONTROLLER_LEFT = 250
const CONTROLLER_TOP = 30
const LINE_WIDTH = 2000
const INTENSITY_MAX = 100
const INTENSITY_MIN = 30
const BUTTON_GAP = 30
const LINE_GAP = 50
const LINE_BTN_WIDTH = 30
const LINE_BTN_HEIGHT = 14

const container = new PIXI.Container()

// 用于包裹精灵图，实现控件移动边界条件判断
const controllerWrapper = new PIXI.Container()
controllerWrapper.interactive = true
controllerWrapper.buttonMode = true
controllerWrapper.position.set(CONTROLLER_LEFT, CONTROLLER_TOP)
controllerWrapper.width = PIC_WIDTH
controllerWrapper.height = PIC_HEIGHT
controllerWrapper._left = CONTROLLER_LEFT
controllerWrapper._right = CONTROLLER_LEFT + PIC_WIDTH
controllerWrapper._top = CONTROLLER_TOP
controllerWrapper._bottom = CONTROLLER_TOP + PIC_HEIGHT

// 用于包裹控件，控件统一移动
const controller = new PIXI.Container()
controller.interactive = true
controller.buttonMode = true
controller.position.set(PIC_WIDTH / 2, 200)
controllerWrapper.addChild(controller)

const topLine = new PIXI.Graphics()
  .beginFill(0xffffff)
  .drawRect(0, 0, LINE_WIDTH, 3)
topLine.position.set(-LINE_WIDTH / 2, -LINE_GAP)
topLine.interactive = true
topLine.addListener('pointerdown', onLineBarDragStart)
topLine.addListener('pointerup', onLineBarDragEnd)
topLine.addListener('pointerupoutside', onLineBarDragEnd)
controller.addChild(topLine)

const bottomLine = new PIXI.Graphics()
  .beginFill(0xffffff)
  .drawRect(0, 0, LINE_WIDTH, 3)
bottomLine.position.set(-LINE_WIDTH / 2, LINE_GAP)
bottomLine.interactive = true
bottomLine.addListener('pointerdown', onLineBarDragStart)
bottomLine.addListener('pointerup', onLineBarDragEnd)
bottomLine.addListener('pointerupoutside', onLineBarDragEnd)
controller.addChild(bottomLine)

let lineBeginCursor = { x: 0, y: 0 }
function onLineBarDragStart (e) {
  e.stopPropagation()
  lineBeginCursor = controller.toLocal(e.data.global)
  app.stage.interactive = true
  app.stage.addListener('pointermove', onLineBarDragMove)
}
function onLineBarDragMove (e) {
  const newXY = controller.toLocal(e.data.global)
  const diffX = newXY.x - lineBeginCursor.x
  const diffY = newXY.y - lineBeginCursor.y
  let newY = controller.position.y + diffY
  if (newY < 0) { newY = 0 }
  if (newY > PIC_HEIGHT) { newY = PIC_HEIGHT }
  controller.position.y = newY

  let newX = controller.x + diffX
  if (newX < 0) { newX = 0 }
  if (newX > PIC_WIDTH) { newX = PIC_WIDTH }
  controller.position.x = newX
}
function onLineBarDragEnd () {
  app.stage.interactive = false
  app.stage.removeListener('pointermove', onLineBarDragMove)
}

const lineTopBtn = new PIXI.Graphics()
  .beginFill(0xffffff)
  .drawRect(0, 0, LINE_BTN_WIDTH, LINE_BTN_HEIGHT)
  .endFill()
lineTopBtn.interactive = true
lineTopBtn.position.set(-LINE_BTN_WIDTH / 2, -LINE_GAP - LINE_BTN_HEIGHT / 2)
lineTopBtn.addListener('pointerdown', onLineBtnDragStart)
lineTopBtn.addListener('pointerup', onLineBtnDragEnd)
lineTopBtn.addListener('pointerupoutside', onLineBtnDragEnd)
controller.addChild(lineTopBtn)

const lineBottomBtn = new PIXI.Graphics()
  .beginFill(0xffffff)
  .drawRect(0, 0, LINE_BTN_WIDTH, LINE_BTN_HEIGHT)
  .endFill()
lineBottomBtn.interactive = true
lineBottomBtn.position.set(-LINE_BTN_WIDTH / 2, LINE_GAP - LINE_BTN_HEIGHT / 2)
lineBottomBtn.addListener('pointerdown', onLineBtnDragStart)
lineBottomBtn.addListener('pointerup', onLineBtnDragEnd)
lineBottomBtn.addListener('pointerupoutside', onLineBtnDragEnd)
controller.addChild(lineBottomBtn)
let lineBtnBeginCursor = { x: 0, y: 0 }
let beginDiff = {
  topLine: 0,
  bottomLine: 0,
  intensityBtn: 0,
  rotateBtn: 0,
  lineTopBtn: 0,
  lineBottomBtn: 0
}
function onLineBtnDragStart (e) {
  e.stopPropagation()
  lineBtnBeginCursor = controller.toLocal(e.data.global)
  beginDiff.topLine = topLine.position.y
  beginDiff = {
    topLine: topLine.position.y,
    bottomLine: bottomLine.position.y,
    intensityBtn: intensityBtn.position.y,
    rotateBtn: rotateBtn.position.y,
    lineTopBtn: lineTopBtn.position.y,
    lineBottomBtn: lineBottomBtn.position.y
  }
  app.stage.interactive = true
  app.stage.addListener('pointermove', onLineBtnDragMove)
}
function onLineBtnDragEnd () {
  app.stage.interactive = false
  app.stage.removeListener('pointermove', onLineBtnDragMove)
}
function onLineBtnDragMove (e) {
  if (lineBtnBeginCursor.y < 0) {
    // 拉动上方按钮
    if (controller.toLocal(e.data.global).y >= 0) {
      return
    }

    const diffY = controller.toLocal(e.data.global).y - lineBtnBeginCursor.y
    topLine.position.y = beginDiff.topLine + diffY
    intensityBtn.position.y = beginDiff.intensityBtn + diffY
    lineTopBtn.position.y = beginDiff.lineTopBtn + diffY

    bottomLine.position.y = beginDiff.bottomLine - diffY
    rotateBtn.position.y = beginDiff.rotateBtn - diffY
    lineBottomBtn.position.y = beginDiff.lineBottomBtn - diffY
  }

  if (lineBtnBeginCursor.y > 0) {
    // 拉动下方按钮
    if (controller.toLocal(e.data.global).y <= 0) {
      return
    }

    const diffY = controller.toLocal(e.data.global).y - lineBtnBeginCursor.y
    topLine.position.y = beginDiff.topLine - diffY
    intensityBtn.position.y = beginDiff.intensityBtn - diffY
    lineTopBtn.position.y = beginDiff.lineTopBtn - diffY

    bottomLine.position.y = beginDiff.bottomLine + diffY
    rotateBtn.position.y = beginDiff.rotateBtn + diffY
    lineBottomBtn.position.y = beginDiff.lineBottomBtn + diffY
  }
}

const intensityBtn = new PIXI.Graphics()
  .beginFill(0x00ff00)
  .drawCircle(0, 0, 10)
  .endFill()
intensityBtn.interactive = true
intensityBtn.position.set(0, -INTENSITY_MIN - LINE_GAP)
intensityBtn.addListener('pointerdown', onInensityBtnDragStart)
intensityBtn.addListener('pointerup', onInensityBtnDragEnd)
intensityBtn.addListener('pointerupoutside', onInensityBtnDragEnd)
function onInensityBtnDragStart (e) {
  e.stopPropagation()
  app.stage.interactive = true
  app.stage.addListener('pointermove', onInensityBtnDragMove)
}
function onInensityBtnDragEnd () {
  app.stage.interactive = false
  app.stage.removeListener('pointermove', onInensityBtnDragMove)
}
function onInensityBtnDragMove (e) {
  if (topLine.toLocal(e.data.global).y > -INTENSITY_MIN) {
    intensityBtn.position.y = -INTENSITY_MIN - LINE_GAP
  } else if (topLine.toLocal(e.data.global).y < -INTENSITY_MAX) {
    intensityBtn.position.y = -INTENSITY_MAX - LINE_GAP
  } else {
    intensityBtn.position.y = topLine.toLocal(e.data.global).y - LINE_GAP
  }
}
controller.addChild(intensityBtn)

const rotateBtn = new PIXI.Graphics()
  .beginFill(0xff0000)
  .drawCircle(0, 0, 10)
  .endFill()
rotateBtn.interactive = true
rotateBtn.position.set(0, BUTTON_GAP + LINE_GAP)
rotateBtn.addListener('pointerdown', onRotateBtnDragStart)
rotateBtn.addListener('pointerup', onRotateBtnDragEnd)
rotateBtn.addListener('pointerupoutside', onRotateBtnDragEnd)
let originCenterCursor = { x: 0, y: 0 }
function onRotateBtnDragStart (e) {
  app.stage.interactive = true
  e.stopPropagation()
  originCenterCursor = { x: controller.x, y: controller.y }
  app.stage.addListener('pointermove', onRotateBtnDragMove)
}
function onRotateBtnDragEnd () {
  app.stage.interactive = false
  app.stage.removeListener('pointermove', onRotateBtnDragMove)
}
function onRotateBtnDragMove (e) {
  const newXY = controllerWrapper.toLocal(e.data.global)
  const rotate = Math.atan2(originCenterCursor.y - newXY.y, originCenterCursor.x - newXY.x) + 0.5 * Math.PI
  controller.rotation = rotate
}
controller.addChild(rotateBtn)

const sprite = PIXI.Sprite.from('../../assets/imgs/vertical.jpg')
sprite.width = PIC_WIDTH
sprite.height = PIC_HEIGHT
sprite.x = CONTROLLER_LEFT
sprite.y = CONTROLLER_TOP
container.addChild(sprite)

container.addChild(controllerWrapper)

app.stage.addChild(container)
