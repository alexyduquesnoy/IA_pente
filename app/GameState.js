let GameState = function() {
  // this.board est un tableau à 2 dimension de 19x19 rempli de 0
  this.board = new Array(19);
  for(let i = 0; i < this.board.length; i++) {
    this.board[i] = new Array(19).fill(0);
  }

  // this.gameState = null;
  this.numRound = 0;
  this.nbTenaille = [0,0];
  this.lastMoveX = 0;
  this.lastMoveY = 0;

  this.addMove = function(playerNum, x, y) {
    this.lastMoveX = x;
    this.lastMoveY = y;
    this.board[x][y] = playerNum;
    this.checkTenailles();
  }

  this.getScore = function(playerNum, weight) {
    return (this.nbTenaille[this.player.num] * 1 * weight + (this.checkFinalState == this.player.num ? 100 * weight : 0));
  }

  this.getEmptyCells = function() {
    let emptyCells = [];
    for(let x = 0; x < this.board.length; x++) {
      for(let y = 0; y < this.board[x].length; y++) {
        if(!this.board[x][y]) {
          emptyCells.push([x, y]);
        }
      }
    }
    return emptyCells;
  }

  this.checkFinalState = function () {
    let B = this.board;
    for (let playerID = 0; playerID < 2; playerID++) {
      if (this.nbTenaille[playerID] === 5) {
        return playerID;
      }
    }

    for (let x = 0; x < this.board.length; x++) {
      for (let y = 0; y < this.board[x].length; y++) {
        if (B[x][y] !== 0 && B[x][y] === B[x + 1][y] && B[x + 1][y] === B[x + 2][y] && B[x + 2][y] === B[x + 3][y] && B[x + 3][y] === B[x + 4][y]) {
          return B[x][y];
        }
        if (B[x][y] !== 0 && B[x][y] === B[x][y + 1] && B[x][y + 1] === B[x][y + 2] && B[x][y + 2] === B[x][y + 3] && B[x][y + 3] === B[x][y + 4]) {
          return B[x][y];
        }
        if (B[x][y] !== 0 && B[x][y] === B[x + 1][y + 1] && B[x + 1][y + 1] === B[x + 2][y + 2] && B[x + 2][y + 2] === B[x + 3][y + 3] && B[x + 3][y + 3] === B[x + 4][y + 4]) {
          return B[x][y];
        }
        if (B[x][y] !== 0 && B[x][y] === B[x + 1][y - 1] && B[x + 1][y - 1] === B[x + 2][y - 2] && B[x + 2][y - 2] === B[x + 3][y - 3] && B[x + 3][y - 3] === B[x + 4][y - 4]) {
          return B[x][y];
        }
      }
    }
    return 0;
  };

  this.checkTenailles = function () {
    let i = this.lastMoveX;
    let j = this.lastMoveY;
    let B = this.board;

    if (B[i][j] !== 0 && B[i][j + 1] !== 0 && B[i][j] === B[i][j + 3] && B[i][j] !== B[i][j + 1] && B[i][j + 2] === B[i][j + 1]) {
      this.nbTenaille[B[i][j] - 1]++;
      this.board[i][j + 1] = 0;
      this.board[i][j + 2] = 0;
    }
    if (B[i][j] !== 0 && B[i + 1][j] !== 0 && B[i][j] === B[i + 3][j] && B[i][j] !== B[i + 1][j] && B[i + 2][j] === B[i + 1][j]) {
      this.nbTenaille[B[i][j] - 1]++;
      this.board[i + 1][j] = 0;
      this.board[i + 2][j] = 0;
    }
    if (B[i][j] !== 0 && B[i + 1][j + 1] !== 0 && B[i][j] === B[i + 3][j + 3] && B[i][j] !== B[i + 1][j + 1] && B[i + 2][j + 2] === B[i + 1][j + 1]) {
      this.nbTenaille[B[i][j] - 1]++;
      this.board[i + 1][j + 1] = 0;
      this.board[i + 2][j + 2] = 0;
    }
    if (B[i][j] !== 0 && B[i + 1][j - 1] !== 0 && B[i][j] === B[i + 3][j - 3] && B[i][j] !== B[i + 1][j - 1] && B[i + 2][j - 2] === B[i + 1][j - 1]) {
      this.nbTenaille[B[i][j] - 1]++;
      this.board[i + 1][j - 1] = 0;
      this.board[i + 2][j - 2] = 0;
    }
    if (B[i][j] !== 0 && B[i][j - 1] !== 0 && B[i][j] === B[i][j - 3] && B[i][j] !== B[i][j - 1] && B[i][j - 2] === B[i][j - 1]) {
      this.nbTenaille[B[i][j] - 1]++;
      this.board[i][j - 1] = 0;
      this.board[i][j - 2] = 0;
    }

    if (B[i][j] !== 0 && B[i - 1][j] !== 0 && B[i][j] === B[i - 3][j] && B[i][j] !== B[i - 1][j] && B[i - 2][j] === B[i - 1][j]) {
      this.nbTenaille[B[i][j] - 1]++;
      this.board[i - 1][j] = 0;
      this.board[i - 2][j] = 0;
    }
    if (B[i][j] !== 0 && B[i - 1][j - 1] !== 0 && B[i][j] === B[i - 3][j - 3] && B[i][j] !== B[i - 1][j - 1] && B[i - 2][j - 2] === B[i - 1][j - 1]) {
      this.nbTenaille[B[i][j] - 1]++;
      this.board[i - 1][j - 1] = 0;
      this.board[i - 2][j - 2] = 0;
    }
    if (B[i][j] !== 0 && B[i - 1][j + 1] !== 0 && B[i][j] === B[i - 3][j + 3] && B[i][j] !== B[i - 1][j + 1] && B[i - 2][j + 2] === B[i - 1][j + 1]) {
      this.nbTenaille[B[i][j] - 1]++;
      this.board[i - 1][j + 1] = 0;
      this.board[i - 2][j + 2] = 0;
    }
  };
};

module.exports = GameState;
