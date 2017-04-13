var findRecursive = require('./utils').findRecursive;
var clone = require('clone');

let IA = function(player, gameState) {
  this.player = player;
  this.gameState = gameState;
  this.movesPoints = new Array(19);

  for(let i = 0; i < this.movesPoints.length; i++) {
    this.movesPoints[i] = new Array(19).fill(0);
  }

  this.move = {
    x: 0,
    y: 0
  };

  // TODO : refactor le nom de la fonction
  this.run = function() {
    if(!findRecursive(this.gameState.board,1) && !findRecursive(this.gameState.board, 2)) {
      let boardMiddle = parseInt(this.gameState.board.length / 2);
      this.move.x = boardMiddle;
      this.move.y = boardMiddle;
    } else {
      this.getMovesPoints();
      // Here find the best move in this.movesPoints
      // And set this.move with that move
    }
  };

  this.getMovesPoints = function() {
    let emptyCells = this.gameState.getEmptyCells();
    for(let i = 0; i < emptyCells.length; i++) {
      let x = emptyCells[i][0];
      let y = emptyCells[i][1];
      this.movesPoints[x][y] = this.predictScore(this.gameState, x, y);
    }
  };

  this.predictScore = function(currentGameState, x, y, points = 0) {
    let gameState = clone(currentGameState);
    let opponentNum = this.player.num === 1 ? 2 : 1;

    gameState.play(gameState.turn, x, y);

    points += gameState.getScore(this.player.num);
    points += gameState.getScore(opponentNum);

    return points;
  };
};

module.exports = IA;
