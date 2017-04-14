var GameState = function() {
  // this.board est un tableau à 2 dimension de 19x19 rempli de 0
  this.board = new Array(19);
  for(var i = 0; i < this.board.length; i++) {
    this.board[i] = new Array(19).fill(0);
  }

  // this.gameState = null;
  this.numRound = 0;
  this.nbTenaille = [0,0];
  this.lastMoveX = null;
  this.lastMoveY = null;
  this.turn = 1;
  this.nbTurn = 0;

  this.play = function(playerNum, x, y) {
    this.lastMoveX = x;
    this.lastMoveY = y;
    this.board[x][y] = playerNum;
    this.nbTenaille[playerNum] += this.checkTenailles(x, y);
    this.turn = playerNum === 1 ? 2 : 1;
  }

  this.getScore = function(playerNum) {
    // TODO : add more critera
    var points = this.nbTenaille[playerNum - 1] * 250;

    points += (this.checkFinalState() === playerNum) * 500;

    points += this.getPiecesInARowScore(playerNum, this.lastMoveX, this.lastMoveY);

    return points;
  }

  this.getEmptyCells = function() {
    var emptyCells = [];
    for(var x = 0; x < this.board.length; x++) {
      for(var y = 0; y < this.board[x].length; y++) {
        if(!this.board[x][y]) {
          emptyCells.push([x, y]);
        }
      }
    }
    return emptyCells;
  }

  // OPTIMIZE : trop de condition ! gérer ça avec deux directions peux (x : [-1, 1], y: [-1, 1]), divise le nombre de condition par 2 ou 4
  this.checkFinalState = function () {
    var B = this.board;
    for (var playerNum = 0; playerNum < 2; playerNum++) {
      if (this.nbTenaille[playerNum] === 5) {
        return playerID;
      }
    }

    for (var i = 0; i < B.length; i++) {
      for (var j = 0; j < B[i].length; j++) {
        if(
          this.getNbPiecesInARow(1, i, j, 0, 1) === 5 ||
          this.getNbPiecesInARow(1, i, j, 1, 1) === 5 ||
          this.getNbPiecesInARow(1, i, j, 1, 0) === 5 ||
          this.getNbPiecesInARow(1, i, j, 1, -1) === 5
        ) {
          return 1;
        } else if (
          this.getNbPiecesInARow(2, i, j, 0, 1) === 5 ||
          this.getNbPiecesInARow(2, i, j, 1, 1) === 5 ||
          this.getNbPiecesInARow(2, i, j, 1, 0) === 5 ||
          this.getNbPiecesInARow(2, i, j, 1, -1) === 5
        ) {
          return 2;
        }
      }
    }

    return 0;
  };

  this.checkTenaille = function(x, y, xD, yD) {
    // xD  = xDirection
    // yD = yDirection

    if((xD == 0 && yD == 0) || !this.board[x] || !this.board[x][y]) {
      return false;
    }

    for(var i = 0; i < 4; i++) {
      if(
        !this.board[x + (i * xD)] ||
        !this.board[x + (i * xD)][y + (i * yD)]
      ) {
        return false;
      }
    }

    if(
      this.board[x][y] === this.board[x + (3 * xD)][y + (3 * yD)] &&
      this.board[x][y] !== this.board[x + (1 * xD)][y + (1 * yD)] &&
      this.board[x + (1 * xD)][y + (1 * yD)] === this.board[x + (2 * xD)][y + (2 * yD)]
    ) {
      return true;
    }

    return false;
  }


  // OPTIMIZE : trop de condition ! gérer ça avec deux directions peux (x : [-1, 1], y: [-1, 1]), divise le nombre de condition par 2 ou 4
  this.checkTenailles = function (x, y) {
    for(var xDirection = -1; xDirection < 2; xDirection++) {
      for(var yDirection = -1; yDirection < 2; yDirection++) {
        if(this.checkTenaille(x, y, xDirection, yDirection)) {
          return true;
        }
      }
    }

    return false;
  };

  this.getNbPiecesInARow = function (value, x, y, xD, yD) {
    // xD  = xDirection
    // yD = yDirection

    if(xD === 0 && yD === 0) {
      return 0;
    }

    if(
      this.board[x + (1 * xD)] &&
      this.board[x + (1 * xD)][y + (1 * yD)] &&
      this.board[x + (1 * xD)][y + (1 * yD)] === value
    ) {
      return 1 + this.getNbPiecesInARow(value, (x + (1 * xD)), (y + (1 * yD)), xD, yD);
    }

    return 0;
  };

  this.getPiecesInARow = function (value, x, y) {
    var scoreMatrix = [];

    // xD  = xDirection
    // yD = yDirection
    for(var xD = -1; xD < 2; xD++) {
      for(var yD = -1; yD < 2; yD++) {
        if(!scoreMatrix[xD + 1]) {
          scoreMatrix[xD + 1] = [];
        }
        scoreMatrix[xD + 1][yD + 1] = this.getNbPiecesInARow(value, x, y, xD, yD);
        // if (scoreMatrix[xD + 1][yD + 1] > 0) console.log("X : " + x  + "; Y : " + y + "; Score : " + scoreMatrix[xD + 1][yD + 1]);
      }
    }

    return scoreMatrix;
  };

  // Valeur maximum : 160
  this.getPiecesInARowScore = function (value, x, y) {
    var piecesInARow = this.getPiecesInARow(value, x, y);
    var score = 0;

    for(var i = 0; i < piecesInARow.length; i++) {
      for(var j = 0; j < piecesInARow[i].length; j++) {
        score += Math.exp(piecesInARow[i][j]);
      }
    }

    return parseInt(score);
  };
};

module.exports = GameState;
