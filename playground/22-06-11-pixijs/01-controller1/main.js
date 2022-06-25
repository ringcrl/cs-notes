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

const lineBar = new PIXI.Graphics()
  .beginFill(0xffffff)
  .drawRect(0, 0, LINE_WIDTH, 3)
  .endFill()
lineBar.position.set(-LINE_WIDTH / 2, 0)
lineBar.interactive = true
lineBar.addListener('pointerdown', onLineBarDragStart)
lineBar.addListener('pointerup', onLineBarDragEnd)
lineBar.addListener('pointerupoutside', onLineBarDragEnd)
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
controller.addChild(lineBar)

const intensityBtn = new PIXI.Graphics()
  .beginFill(0x00ff00)
  .drawCircle(0, 0, 10)
  .endFill()
intensityBtn.interactive = true
intensityBtn.position.set(0, -INTENSITY_MIN)
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
  if (lineBar.toLocal(e.data.global).y > -BUTTON_GAP) {
    intensityBtn.position.y = -INTENSITY_MIN
  } else if (lineBar.toLocal(e.data.global).y < -INTENSITY_MAX) {
    intensityBtn.position.y = -INTENSITY_MAX
  } else {
    intensityBtn.position.y = lineBar.toLocal(e.data.global).y
  }
}
controller.addChild(intensityBtn)

const rotateBtn = new PIXI.Graphics()
  .beginFill(0xff0000)
  .drawCircle(0, 0, 10)
  .endFill()
rotateBtn.interactive = true
rotateBtn.position.set(0, BUTTON_GAP)
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
