let IA = function(player, gameState) {
  this.player = player;
  this.gameState = gameState;
  this.move = {
    x: 0,
    y: 0
  };

  // TODO : refactor le nom de la fonction
  this.run = function() {
    if(!this.gameState.board.findRecursive(1) && !this.gameState.board.findRecursive(2)) {
      let boardMiddle = parseInt(his.gameState.board.length / 2);
      this.move.x = boardMiddle;
      this.move.y = boardMiddle;
    } else {
      this.findBestMove();
    }
  };

  // TODO : refactor le nom de la fonction
  this.findBestMove = function() {
    let movesPoint = new Array(19);
    for(let i = 0; i < movesPoint.length; i++) {
      movesPoint[i] = new Array(19).fill(0);
    }
    let emptyCells = this.gameState.getEmptyCells();
    for(let i = 0; i < emptyCells.length; i++) {
      let x = emptyCells[i][0];
      let y = emptyCells[i][1];
      movesPoint[x][y] = this.getGameStateValue(this.gameState, x, y);
    }

    console.log(movesPoint);
  };

  this.getGameStateValue = function(currentGameState, x, y) {
    let points = 0;
    let gameState = currentGameState;
    gameState.addMove(player.num, x, y);
    points += gameState.nbTenaille[this.player.num] * 5 + (gameState.checkFinalState == this.player.num ? 100 : 0);

    let opponentNum = (player.num - 1) * -1 + 1;
    gameState.addMove(opponentNum, x, y);
    points -= gameState.nbTenaille[opponentNum] * 5 + (gameState.checkFinalState == opponentNum ? 100 : 0);

    return points;
  };
};

module.exports = IA;
