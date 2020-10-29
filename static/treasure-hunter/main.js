// 设置别名
const { Container } = PIXI
const { autoDetectRenderer } = PIXI
const { loader } = PIXI
const { resources } = PIXI.loader
const { TextureCache } = PIXI.utils
const { Texture } = PIXI
const { Sprite } = PIXI
const { Text } = PIXI
const { Graphics } = PIXI

// Create a Pixi stage and renderer and add the
// renderer.view to the DOM
// 创建 PIXI 舞台，renderer，添加 render.view 到 DOM 中
const stage = new Container()
const renderer = autoDetectRenderer(512, 512)
document.body.appendChild(renderer.view)

loader.add('images/treasureHunter.json').load(setup)

// 定义不知在一个地方使用的变量
let state
let explorer
let treasure
let blobs
let chimes
let exit
let player
let dungeon
let door
let healthBar
let message
let gameScene
let gameOverScene
let enemies
let id

// 初始化 Pixi、加载地图册文件
function setup() {
  // 初始化地图精灵，将游戏状态设置为 play，然后开始游戏

  // 创建游戏运行场景分组
  gameScene = new Container()
  stage.addChild(gameScene)

  // 为获取资源的方法设置一个简短的别名
  id = resources['images/treasureHunter.json'].textures

  // 创建地牢精灵
  dungeon = new Sprite(id['dungeon.png'])
  gameScene.addChild(dungeon)

  // 创建门精灵
  door = new Sprite(id['door.png'])
  door.position.set(32, 0)
  gameScene.addChild(door)

  // 创建探索者精灵
  explorer = new Sprite(id['explorer.png'])
  explorer.x = 68
  explorer.y = gameScene.height / 2 - explorer.height / 2
  explorer.vx = 0
  explorer.vy = 0
  gameScene.addChild(explorer)

  // 创建宝藏精灵
  treasure = new Sprite(id['treasure.png'])
  treasure.x = gameScene.width - treasure.width - 48
  treasure.y = gameScene.height / 2 - treasure.height / 2
  gameScene.addChild(treasure)

  // 设置游戏结束场景分组
  gameOverScene = new Container()
  gameOverScene.visible = false
  stage.addChild(gameOverScene)

  // 创建一堆的怪物
  const numberOfBlobs = 6
  const spacing = 48
  const xOffset = 150
  const speed = 2
  let direction = 1
  // 一个存储所有怪物的数组
  blobs = []
  // 根据设置的数量制造怪物实体
  for (let i = 0; i < numberOfBlobs; i++) {
    const blob = new Sprite(id['blob.png'])
    // 根据间距、偏移设置怪物实体的水平位置
    const x = spacing * i + xOffset
    // 给实体一个随机的 y 位置
    const y = randomInt(0, stage.height - blob.height)
    // 设置实体的位置
    blob.x = x
    blob.y = y
    // 设置实体的垂直加速度
    blob.vy = speed * direction
    // 翻转下一个实体的方向
    direction *= -1
    // 将实体塞入集合
    blobs.push(blob)
    // 将实体加入游戏场景
    gameScene.addChild(blob)
  }

  // 添加血条
  healthBar = new PIXI.DisplayObjectContainer()
  healthBar.position.set(stage.width - 170, 6)
  gameScene.addChild(healthBar)
  // 创建后面的黑色矩形
  const innerBar = new PIXI.Graphics()
  innerBar.beginFill(0x000000)
  innerBar.drawRect(0, 0, 128, 8)
  innerBar.endFill()
  healthBar.addChild(innerBar)
  // 创建前面的红色矩形
  const outerBar = new PIXI.Graphics()
  outerBar.beginFill(0xff3300)
  outerBar.drawRect(0, 0, 128, 8)
  outerBar.endFill()
  healthBar.addChild(outerBar)
  // 在 healthBar 上面添加个红色矩形的引用，过会儿能很方便的获取
  // 如果你想控制红色 outerBar 的宽度，可以这么做 healthBar.outer.width = 30;
  healthBar.outer = outerBar

  // 制作消息文字
  message = new Text('The End', { font: '64px Futura', fill: 'white' })
  message.x = 120
  message.y = stage.height / 2 - 32
  gameOverScene.addChild(message)

  // 捕获键盘操作
  const left = keyboard(37)
  const up = keyboard(38)
  const right = keyboard(39)
  const down = keyboard(40)
  left.press = function () {
    explorer.vx = -5
    explorer.vy = 0
  }
  left.release = function () {
    if (!right.isDown && explorer.vy === 0) {
      explorer.vx = 0
    }
  }
  up.press = function () {
    explorer.vy = -5
    explorer.vx = 0
  }
  up.release = function () {
    if (!down.isDown && explorer.vx === 0) {
      explorer.vy = 0
    }
  }
  right.press = function () {
    explorer.vx = 5
    explorer.vy = 0
  }
  right.release = function () {
    if (!left.isDown && explorer.vy === 0) {
      explorer.vx = 0
    }
  }
  down.press = function () {
    explorer.vy = 5
    explorer.vx = 0
  }
  down.release = function () {
    if (!up.isDown && explorer.vx === 0) {
      explorer.vy = 0
    }
  }

  // 设置游戏状态为 play
  state = play

  // 开始游戏循环
  gameLoop()
}

// 游戏循环运行
function gameLoop() {
  // 每秒 60 次更新 state 函数
  requestAnimationFrame(gameLoop)

  // 更新游戏状态，state 函数有 play 和 end 两种状态
  state()

  // 渲染舞台
  renderer.render(stage)
}

// 所有让精灵移动的游戏逻辑都在 play 里，这是一个被循环执行的函数
function play() {
  // 移动探索者，并限制他在地牢范围内
  explorer.x += explorer.vx
  explorer.y += explorer.vy
  contain(explorer, { x: 28, y: 10, width: 488, height: 480 })

  // 在碰撞前设置 exploreHit 为 false
  let explorerHit = false

  // 移动怪物实体
  blobs.forEach(function (blob) {
    // 移动怪物
    blob.y += blob.vy
    // 检查怪物的屏幕边界
    const blobHitsWall = contain(blob, { x: 28, y: 10, width: 488, height: 488 })
    // 如果实体碰到上下边缘，改变它的方向
    if (['top', 'bottom'].indexOf(blobHitsWall) > -1) {
      blob.vy *= -1
    }
    // 碰撞测试，如果碰到归爱武，设置 exploreHit 为 true
    if (hitTestRectangle(explorer, blob)) {
      explorerHit = true
    }
  })

  // 检查探索者与怪物的碰撞
  if (explorerHit) {
    // 设置探索者半透明
    explorer.alpha = 0.5
    // 减少血条长度
    healthBar.outer.width -= 1
  } else {
    // 设置探索者不透明
    explorer.alpha = 1
  }

  // 检查探索者与宝藏的碰撞，携带宝藏移动
  if (hitTestRectangle(explorer, treasure)) {
    treasure.x = explorer.x + 8
    treasure.y = explorer.y + 8
  }

  // 检查宝藏与门的碰撞，赢得游戏
  if (hitTestRectangle(treasure, door)) {
    state = end
    message.text = 'You won!'
  }

  // 游戏失败，将 state 函数设为 end
  if (healthBar.outer.width < 0) {
    state = end
    message.text = 'You lost!'
  }
}

// 游戏结束
function end() {
  gameScene.visible = false
  gameOverScene.visible = true
}

// The game's helper functions:
// `keyboard`, `hitTestRectangle`, `contain` and `randomInt`
function keyboard(keyCode) {
  const key = {}
  key.code = keyCode
  key.isDown = false
  key.isUp = true
  key.press = undefined
  key.release = undefined
  key.downHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) {
        key.press()
      }
      key.isDown = true
      key.isUp = false
    }
    event.preventDefault()
  }
  key.upHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) {
        key.release()
      }
      key.isDown = false
      key.isUp = true
    }
    event.preventDefault()
  }
  window.addEventListener('keydown', key.downHandler.bind(key), false)
  window.addEventListener('keyup', key.upHandler.bind(key), false)
  return key
}

function hitTestRectangle(r1, r2) {
  // 定义我们需要计算的变量
  let hit
  let combinedHalfWidths
  let combinedHalfHeights
  let vx
  let vy
  // hit决定是否有碰撞
  hit = false
  // 找到每个精灵的中心点
  r1.centerX = r1.x + r1.width / 2
  r1.centerY = r1.y + r1.height / 2
  r2.centerX = r2.x + r2.width / 2
  r2.centerY = r2.y + r2.height / 2

  // 找到每个精灵的一半宽度和一半高度
  r1.halfWidth = r1.width / 2
  r1.halfHeight = r1.height / 2
  r2.halfWidth = r2.width / 2
  r2.halfHeight = r2.height / 2
  // 计算精灵之间的向量距离
  vx = r1.centerX - r2.centerX
  vy = r1.centerY - r2.centerY
  // 计算出两个精灵的的一半宽度和一半高度的和
  combinedHalfWidths = r1.halfWidth + r2.halfWidth
  combinedHalfHeights = r1.halfHeight + r2.halfHeight
  // 检测 x 轴的碰撞
  if (Math.abs(vx) < combinedHalfWidths) {
    // 碰撞可能发生，检查 y 轴碰撞
    if (Math.abs(vy) < combinedHalfHeights) {
      // 确实有碰撞发生
      hit = true
    } else {
      // 在 y 轴没有碰撞
      hit = false
    }
  } else {
    // 在x轴没有碰撞
    hit = false
  }
  // `hit` 返回 `true` 或者 `false`
  return hit
}

function contain(sprite, container) {
  let collision
  // Left
  if (sprite.x < container.x) {
    sprite.x = container.x
    collision = 'left'
  }
  // Top
  if (sprite.y < container.y) {
    sprite.y = container.y
    collision = 'top'
  }
  // Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width
    collision = 'right'
  }
  // Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height
    collision = 'bottom'
  }
  // 返回 collision 结果
  return collision
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Pixi的类继承体系
// DisplayObject > Container > Sprite
