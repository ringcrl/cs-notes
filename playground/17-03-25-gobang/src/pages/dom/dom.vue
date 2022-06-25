<template>
  <div>
    <div class="dom">
      <h1>
        <span>DOM版本</span>
        <a @click="$router.push({name: 'canvas'})" style="color: #1271c2; cursor: pointer;">切换至Canvas版本 》</a>
      </h1>
      <div class="operate">
        <button @click="restore" :disabled="restoreObj.restored">悔棋</button>
        <button @click="cancelRestore" :disabled="!restoreObj.restored">取消悔棋</button>
      </div>
      <table id="chessboard">
        <tr v-for="(row,rowIndex) of 15">
          <td @click="play" v-for="(col,colIndex) of 15">
            <img src="../../assets/imgs/40x40.jpg">
            <span v-show="false">{{rowIndex}},{{colIndex}}</span>
          </td>
        </tr>
      </table>
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
    .dom {
      padding-top: 10px;
      text-align: center;
      .operate {
        text-align: center;
        padding: 10px 0;
        button {
          background-color: #137cc9;
          color: #fff;
          padding: 5px 10px;
        }
      }
      #chessboard {
        border-collapse: collapse;
        display: inline-block;
        td {
          width: 40px;
          height: 40px;
          // border: 1px solid #000;
          background-size: 100%;
          img {
            display: block;
            position: relative;
            z-index: -1;
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }

</style>

<script>
  export default {
    name: 'dom',
    data() {
      return {
        restoreObj: {
          col: '',
          row: '',
          target: null,
          player: 0,
          restored: false
        },
        chess: {
          black: '',
          white: ''
        },
        maps: null,
        isBlack: true,
        isOver: false
      }
    },
    methods: {
      initChess() {
        this.chess.black = require('../../assets/imgs/black.png')
        this.chess.white = require('../../assets/imgs/white.png')
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
      },
      restore() {
        if (this.restoreObj.player === 0 || this.isOver) {
          return
        }
        this.restoreObj.target.style.backgroundImage = ''
        this.maps[this.restoreObj.row][this.restoreObj.col] = 0
        this.restoreObj.restored = true
        this.isBlack = !this.isBlack
      },
      cancelRestore() {
        if (this.restoreObj.player === 0 || this.isOver) {
          return
        }
        let player
        this.restoreObj.player === 1 ?
          this.restoreObj.target.style.backgroundImage = `url(${this.chess.black})` :
          this.restoreObj.target.style.backgroundImage = `url(${this.chess.white})`
        this.maps[this.restoreObj.row][this.restoreObj.col] = this.player
        this.restoreObj.restored = false
        this.isBlack = !this.isBlack
      },
      play(e) {
        if (this.isOver) {
          return
        }

        this.restoreObj.restored = false

        let coordinate = e.target.textContent.split(',')
        let row = Number(coordinate[0])
        let col = Number(coordinate[1])
        let black = 1
        let white = 2
        if (this.maps[row][col] === 0) {
          if (this.isBlack) {
            this.maps[row][col] = black
            this.isBlack = false
            this.over(black, row, col)
            e.target.style.backgroundImage = `url(${this.chess.black})`
            this.restoreObj.player = black
          } else {
            this.maps[row][col] = white
            this.isBlack = true
            this.over(white, row, col)
            e.target.style.backgroundImage = `url(${this.chess.white})`
            this.restoreObj.player = white
          }
        }
        this.restoreObj.row = row
        this.restoreObj.col = col
        this.restoreObj.target = e.target
      },
      over(player, row, col) {
        let rawRow = row
        let rawCol = col
        let total = 1
        let black = 1
        let white = 2
        console.log(row, col)

        // 水平方向判断
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
