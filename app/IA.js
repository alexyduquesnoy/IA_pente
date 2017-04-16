var findRecursive = require('./utils').findRecursive;
var searchHigherPositions = require('./utils').searchHigherPositions;
var clone = require('clone');

var IA = function(player, gameState) {
  this.player = player;
  this.gameState = gameState;
  this.movesPoints = new Array(19);

  for(var i = 0; i < this.movesPoints.length; i++) {
    this.movesPoints[i] = new Array(19).fill(0);
  }

  this.move = {
    x: null,
    y: null
  };

  // TODO : refactor le nom de la fonction
  this.run = function() {
    if (this.gameState.lastMoveX === null && this.gameState.lastMoveY === null) {
      this.player.first = true;
      this.move.x = (this.gameState.board.length / 2)|0;
      this.move.y = (this.gameState.board.length / 2)|0;
    } else if (this.player.first)  {
      this.player.first = false;
      this.move.y =  (this.gameState.board.length / 2)|0 + 4;
      this.move.x = (this.gameState.board.length / 2)|0 + 4;
    } else {
      this.getMovesPoints(this.gameState);
      // Here find the best move in this.movesPoints
      // And set this.move with that move
      // console.log(this.movesPoints);
      var bestPositions = searchHigherPositions(this.movesPoints);
      var position = bestPositions[parseInt(Math.random() * (bestPositions.length>1? bestPositions.length -1 : 0))];
      this.move.x = position.x;
      this.move.y = position.y;
    }
  };

  this.getMovesPoints = function(gameState) {
    var emptyCells = gameState.getEmptyCells();
    for(var i = 0; i < emptyCells.length; i++) {
      var x = emptyCells[i][0];
      var y = emptyCells[i][1];
      this.movesPoints[x][y] = this.minmax(this.gameState, x, y);
    }
  };

  this.minmax = function(currentGameState, x, y, points = 0) {
    var gameState = clone(currentGameState);
    var opponentNum = (this.player.num === 1 ? 2 : 1);
    gameState.play(this.player.num, x, y);
    points += gameState.getScore(this.player.num);

    // Permet de connaitre le meilleur mouvement de l'ennemi pour pouvoir le bloquer
    gameState.play(opponentNum, x, y);
    points += gameState.getScore(opponentNum);
    return points;
  };
};

module.exports = IA;
