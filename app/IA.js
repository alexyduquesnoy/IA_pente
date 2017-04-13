var findRecursive = require('./utils').findRecursive;
var searchHigherPositions = require('./utils').searchHigherPositions;
var clone = require('clone');

let IA = function(player, gameState) {
  this.player = player;
  this.gameState = gameState;
  this.movesPoints = new Array(19);

  for(let i = 0; i < this.movesPoints.length; i++) {
    this.movesPoints[i] = new Array(19).fill(0);
  }

  this.move = {
    x: parseInt(this.gameState.board.length / 2),
    y: parseInt(this.gameState.board.length / 2)
  };

  // TODO : refactor le nom de la fonction
  this.run = function() {
    if(!findRecursive(this.gameState.board,1) && !findRecursive(this.gameState.board, 2)) {
      return;
    } else {
      this.getMovesPoints(this.gameState);
      // Here find the best move in this.movesPoints
      // And set this.move with that move
      let bestPositions = searchHigherPositions(this.movesPoints);
      let position = bestPositions[parseInt(Math.random() * this.gameState.board.length)];
      this.move.x = position.x;
      this.move.y = position.y;
    }
  };

  this.getMovesPoints = function(gameState) {
    let emptyCells = gameState.getEmptyCells();
    for(let i = 0; i < emptyCells.length; i++) {
      let x = emptyCells[i][0];
      let y = emptyCells[i][1];
      this.movesPoints[x][y] = this.minmax(this.gameState, x, y);
    }
  };

  this.minmax = function(currentGameState, x, y, points = 0) {
    let gameState = clone(currentGameState);
    let opponentNum = this.player.num === 1 ? 2 : 1;

    gameState.play(this.player.num, x, y);
    points += gameState.getScore(this.player.num);

    // Permet de connaitre le meilleur mouvement de l'ennemi pour pouvoir le bloquer
    gameState.play(opponentNum, x, y);
    points += gameState.getScore(opponentNum);

    return points;
  };
};

module.exports = IA;
