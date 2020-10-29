<template>
  <div>
    <div class="canvas">
      <h1>
        <span>Canvas版本</span>
        <a @click="$router.push({name: 'dom'})" style="color: #1271c2; cursor: pointer;">切换至DOM版本</a>
      </h1>
      <div class="operate">
        <button @click="restore" :disabled="restoreObj.restored">悔棋</button>
        <button @click="cancelRestore" :disabled="!restoreObj.restored">取消悔棋</button>
      </div>
      <div class="chessboard-wrap">
        <div class="chessboard">
          <canvas id="can" width="600" height="600" @click="play"></canvas>
        </div>
      </div>
      <div class="text">
        <div v-if="!isOver" class="round">
          <span>当前轮到：</span>
          <span v-if="isBlack" style="color: red;">黑子下</span>
          <span v-if="!isBlack" style="color: red;">白子下</span>
        </div>
        <div v-if="isOver" class="over" style="color: red;">
          <p v-if="!isBlack">恭喜黑子获胜！</p>
          <p v-if="isBlack">恭喜白子获胜！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
  body {
    .canvas {
      padding-top: 10px;
      h1 {
        text-align: center;
      }
      .operate {
        text-align: center;
        padding: 10px 0;
        button {
          background-color: #137cc9;
          color: #fff;
          padding: 5px 10px;
        }
      }
      .chessboard-wrap {
        text-align: center;
        .chessboard {
          display: inline-block;
          margin-left: 20px;
          margin-top: 20px;
          width: 600px;
          height: 600px;
          overflow: hidden;
          margin: 40 0 0 40;
        }
      }
      .text {
        text-align: center;
      }
    }
  }

</style>

<script>
  export default {
    name: 'canvas',
    data() {
      return {
        restoreObj: {
          col: '',
          row: '',
          colPosition: '',
          rowPosition: '',
          player: 0,
          restored: false
        },
        maps: null,
        ctx: null,
        black: null,
        white: null,
        cover: null,
        isBlack: true,
        isOver: false
      }
    },
    methods: {
      initChess() {
        this.black = new Image()
        this.white = new Image()
        this.cover = new Image()
        this.black.src = require('../../assets/imgs/black.png')
        this.white.src = require('../../assets/imgs/white.png')
        this.cover.src = require('../../assets/imgs/cover.png')
      },
      restore() {
        if (this.restoreObj.player === 0 || this.isOver) {
          return
        }
        this.ctx.drawImage(this.cover, this.restoreObj.colPosition, this.restoreObj.rowPosition)
        this.maps[this.restoreObj.row][this.restoreObj.col] = 0
        this.restoreObj.restored = true
        this.isBlack = !this.isBlack
      },
      cancelRestore() {
        if (this.restoreObj.player === 0 || this.isOver) {
          return
        }
        let player
        this.restoreObj.player === 1 ? player = this.black : player = this.white
        this.ctx.drawImage(player, this.restoreObj.colPosition, this.restoreObj.rowPosition)
        this.maps[this.restoreObj.row][this.restoreObj.col] = this.player
        this.restoreObj.restored = false
        this.isBlack = !this.isBlack
      },
      initChessboard() {
        let maps = new Array(15)
        let mapsLen = maps.length
        for (let i = 0; i < mapsLen; i++) {
          maps[i] = new Array(15)
          let mapLen = maps[i].length
          for (let j = 0; j < mapLen; j++) {
            maps[i][j] = 0
          }
        }
        this.maps = maps

        let can = document.getElementById('can')
        this.ctx = can.getContext('2d')
        this.ctx.beginPath()
        this.ctx.lineWidth = 1.0
        this.ctx.strokeStyle = '#000'
        for (let i = 0; i < 15; i++) {
          this.ctx.moveTo(0, 20 + 40 * i)
          this.ctx.lineTo(600, 20 + 40 * i)
          for (let j = 0; j < 15; j++) {
            this.ctx.moveTo(20 + 40 * i, 0)
            this.ctx.lineTo(20 + 40 * i, 600)
          }
        }
        this.ctx.stroke()
      },
      play(e) {
        // 结束判断
        if (this.isOver) {
          return
        }
        // 可复位
        this.restoreObj.restored = false

        // 下棋点计算
        let row = Math.round(Math.abs((e.offsetY - 20) / 40))
        let col = Math.round(Math.abs((e.offsetX - 20) / 40))
        let x = col * 40 + 20
        let y = row * 40 + 20

        console.log(`[${row},${col}],(${x},${y})`)

        let black = 1
        let white = 2

        if (this.maps[row][col] === 0) {
          if (this.isBlack) {
            this.ctx.drawImage(this.black, x - 20, y - 20)
            this.maps[row][col] = black
            this.isBlack = false
            this.over(black, row, col)
            this.restoreObj.player = black
          } else {
            this.ctx.drawImage(this.white, x - 20, y - 20)
            this.maps[row][col] = white
            this.isBlack = true
            this.over(white, row, col)
            this.restoreObj.player = white
          }
        }
        this.restoreObj.col = col
        this.restoreObj.row = row
        this.restoreObj.colPosition = x - 20
        this.restoreObj.rowPosition = y - 20
      },
      over(player, row, col) {
        let rawRow = row
        let rawCol = col
        let total = 1
        let black = 1
        let white = 2

        // 水平方向判断
        row = rawRow
        col = rawCol
        total = 1
        while (col - 1 >= 0 && this.maps[row][col - 1] === player) {
          console.log(`水平方向左边有相同子`)
          total++
          col--
        }
        col = rawCol
        while (col + 1 <= 14 && this.maps[row][col + 1] === player) {
          console.log(`水平方向右边有相同子`)
          total++
          col++
        }
        if (total >= 5) {
          this.isOver = true
          player === black ? alert('黑子胜') : alert('白子胜')
        }

        // 垂直方向判断
        row = rawRow
        col = rawCol
        total = 1
        while (row - 1 >= 0 && this.maps[row - 1][col] === player) {
          console.log(`垂直方向上边有相同子`)
          total++
          row--
        }
        row = rawRow
        while (row + 1 <= 14 && this.maps[row + 1][col] === player) {
          console.log(`垂直方向下边有相同子`)
          total++
          row++
        }
        if (total >= 5) {
          this.isOver = true
          player === black ? alert('黑子胜') : alert('白子胜')
        }

        // \方向判断
        row = rawRow
        col = rawCol
        total = 1
        while (row - 1 >= 0 && col - 1 >= 0 && this.maps[row - 1][col - 1] === player) {
          console.log(`\\方向\\左上角有相同子`)
          total++
          col--
          row--
        }
        row = rawRow
        col = rawCol
        while (row + 1 <= 14 && col + 1 <= 14 && this.maps[row + 1][col + 1] === player) {
          console.log(`\\方向\\右下角有相同子`)
          total++
          col++
          row++
        }
        if (total >= 5) {
          this.isOver = true
          player === black ? alert('黑子胜') : alert('白子胜')
        }

        // /方向判断
        row = rawRow
        col = rawCol
        total = 1
        while (row - 1 >= 0 && col + 1 <= 14 && this.maps[row - 1][col + 1] === player) {
          console.log(`/方向/左下角有相同子`)
          total++
          col++
          row--
        }
        row = rawRow
        col = rawCol
        while (row + 1 <= 14 && col - 1 >= 0 && this.maps[row + 1][col - 1] === player) {
          console.log(`/方向/右上角有相同子`)
          total++
          col--
          row++
        }
        if (total >= 5) {
          this.isOver = true
          player === black ? alert('黑子胜') : alert('白子胜')
        }
      },
      init() {
        this.initChess()
        this.initChessboard()
      }
    },
    mounted() {
      this.init()
    }
  }

</script>
