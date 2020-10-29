const canvas = document.getElementById("chess");
const context = canvas.getContext("2d");
let me = true; // 判断该轮黑白棋落子权
let over = false; // 判断游戏是否结束
const chessBoard = []; // 棋盘二维数组,存储棋盘信息
const wins = []; // 赢法数组
let count = 0; // 赢法数组计数器
const myWin = []; // 玩家赢法统计数组
const aiGobangWin = []; // 电脑赢法统计数组

// 初始化赢法数组
(function () {
  for (var i = 0; i < 15; i++) {
    wins[i] = [];
    for (var j = 0; j < 15; j++) {
      wins[i][j] = [];
    }
  }
  // - 方向赢法
  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
      // wins[0][0][0] = true
      // wins[0][1][0] = true
      // wins[0][2][0] = true
      // wins[0][3][0] = true
      // wins[0][4][0] = true
      // 最后一个 0，代表的是第 0 种赢法

      // wins[0][1][1] = true
      // wins[0][2][1] = true
      // wins[0][3][1] = true
      // wins[0][4][1] = true
      // wins[0][5][1] = true
      // 最后一个 1，代表的是第 1 种赢法

      // ...

      // wins[10][14][572] = true
      // wins[11][13][572] = true
      // wins[12][12][572] = true
      // wins[13][11][572] = true
      // wins[14][10][572] = true
      // 最后一个 572，代表的是第 572 种赢法

      for (var k = 0; k < 5; k++) {
        wins[i][j + k][count] = true;
      }
      count++;
    }
  }

  // | 方向赢法
  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
      for (var k = 0; k < 5; k++) {
        wins[j + k][i][count] = true;
      }
      count++;
    }
  }

  // \ 方向赢法
  for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
      for (var k = 0; k < 5; k++) {
        wins[i + k][j + k][count] = true;
      }
      count++;
    }
  }

  // / 方向赢法
  for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
      for (var k = 0; k < 5; k++) {
        wins[i + k][j - k][count] = true;
      }
      count++;
    }
  }
})();

// 开始按钮逻辑:初始化棋盘,并让电脑黑棋先行(7,7)位置
function startGame() {
  // 初始化棋盘信息
  for (var i = 0; i < 15; i++) {
    chessBoard[i] = [];
    for (let j = 0; j < 15; j++) {
      chessBoard[i][j] = 0;
    }
  }

  // 清除棋盘
  cleanChess();
  // 绘制棋盘
  drawChess();

  // 轮到玩家(白棋)行棋
  me = true;
  // 重置游戏结束标志
  over = false;

  // 初始化赢法统计数组
  for (var i = 0; i < count; i++) {
    myWin[i] = 0;
    aiGobangWin[i] = 0;
  }

  // 让电脑先行，(7,7)处绘制黑棋，并存储信息
  oneStep(7, 7, false);
  chessBoard[7][7] = 2;
}

// 清除棋盘
function cleanChess() {
  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// 绘制棋盘
function drawChess() {
  for (let i = 0; i < 15; i++) {
    context.strokeStyle = "#BFBFBF";
    context.beginPath();
    context.moveTo(15 + i * 30, 15);
    context.lineTo(15 + i * 30, canvas.height - 15);
    context.closePath();
    context.stroke();
    context.beginPath();
    context.moveTo(15, 15 + i * 30);
    context.lineTo(canvas.width - 15, 15 + i * 30);
    context.closePath();
    context.stroke();
  }
}

/** 绘制棋子
 * @param i     棋子x轴位置
 * @param j     棋子y轴位置
 * @param me    棋子颜色
 */
function oneStep(i, j, isMe) {
  context.beginPath();
  context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
  context.closePath();
  const gradient = context.createRadialGradient(
    15 + i * 30 + 2,
    15 + j * 30 - 2,
    13,
    15 + i * 30 + 2,
    15 + j * 30 - 2,
    0
  );
  if (isMe) {
    gradient.addColorStop(0, "#D1D1D1");
    gradient.addColorStop(1, "#F9F9F9");
  } else {
    gradient.addColorStop(0, "#0A0A0A");
    gradient.addColorStop(1, "#636766");
  }
  context.fillStyle = gradient;
  context.fill();
}

// AI 出动
function aiGobangGo() {
  if (over) {
    return;
  }

  const myScore = []; // 玩家的分数
  const aiGobangScore = []; // 电脑的分数
  let u = 0; // 电脑预落子的 x 位置
  let v = 0; // 电脑预落子的 y 位置
  let max = 0; // 最优位置的分数

  // 初始化分数的二维数组
  for (let i = 0; i < 15; i++) {
    myScore[i] = [];
    aiGobangScore[i] = [];
    for (let j = 0; j < 15; j++) {
      myScore[i][j] = 0;
      aiGobangScore[i][j] = 0;
    }
  }

  // 通过赢法统计数组为两个二维数组分别计分
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      if (chessBoard[i][j] == 0) {
        for (var k = 0; k < count; k++) {
          if (wins[i][j][k]) {
            // 在这一步下棋是有意义的
            // 拦截玩家
            if (myWin[k] == 1) {
              // 第 k 种赢法已经实现了一颗子了
              myScore[i][j] += 200;
            } else if (myWin[k] == 2) {
              myScore[i][j] += 400;
            } else if (myWin[k] == 3) {
              myScore[i][j] += 2000;
            } else if (myWin[k] == 4) {
              myScore[i][j] += 10000;
            }

            // 取得胜利
            if (aiGobangWin[k] == 1) {
              aiGobangScore[i][j] += 220;
            } else if (aiGobangWin[k] == 2) {
              aiGobangScore[i][j] += 420;
            } else if (aiGobangWin[k] == 3) {
              aiGobangScore[i][j] += 2100;
            } else if (aiGobangWin[k] == 4) {
              aiGobangScore[i][j] += 20000;
            }
          }
        }

        // 如果玩家(i,j)处比目前最优的分数大，则落子在(i,j)处
        if (myScore[i][j] > max) {
          max = myScore[i][j];
          u = i;
          v = j;
        } else if (myScore[i][j] == max) {
          // 如果玩家(i,j)处和目前最优分数一样大，则比较电脑在该位置和预落子的位置的分数
          if (aiGobangScore[i][j] > aiGobangScore[u][v]) {
            u = i;
            v = j;
          }
        }

        // 如果电脑(i,j)处比目前最优的分数大，则落子在(i,j)处
        if (aiGobangScore[i][j] > max) {
          max = aiGobangScore[i][j];
          u = i;
          v = j;
        } else if (aiGobangScore[i][j] == max) {
          // 如果电脑(i,j)处和目前最优分数一样大，则比较玩家在该位置和预落子的位置的分数
          if (myScore[i][j] > myScore[u][v]) {
            u = i;
            v = j;
          }
        }
      }
    }
  }

  oneStep(u, v, false);
  chessBoard[u][v] = 2;

  for (var k = 0; k < count; k++) {
    if (wins[u][v][k]) {
      aiGobangWin[k]++;
      myWin[k] = 6;
      if (aiGobangWin[k] == 5) {
        window.alert("你输了");
        over = true;
      }
    }
  }

  if (!over) {
    me = !me;
  }
}

/** canvas 鼠标点击事件
 * @param e
 */
canvas.onclick = function (e) {
  if (over || !me) {
    return;
  }

  const x = e.offsetX;
  const y = e.offsetY;
  const i = Math.floor(x / 30);
  const j = Math.floor(y / 30);

  // 如果该位置没有棋子,则允许落子
  if (chessBoard[i][j] == 0) {
    // 绘制棋子(玩家)
    oneStep(i, j, me);
    // 改变棋盘信息(该位置有棋子)
    chessBoard[i][j] = 1;

    // 遍历赢法统计数组
    for (let k = 0; k < count; k++) {
      if (wins[i][j][k]) {
        // 如果存在赢法,则玩家此赢法胜算+1(赢法为5胜取胜)
        myWin[k]++;
        // 如果存在赢法,则电脑此赢法胜算赋值为6(永远不等于5,永远无法在此处取胜)
        aiGobangWin[k] = 6;
        // 玩家落子后,此处赢法数组凑够5,玩家取胜
        if (myWin[k] == 5) {
          window.alert("你赢了");
          // 游戏结束
          over = true;
        }
      }
    }

    // 如果游戏没有结束,轮到电脑行棋
    if (!over) {
      me = !me;
      aiGobangGo();
    }
  }
};
