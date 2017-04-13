let GameState = require('./GameState');
let Player = require('./Player');
let IA = require('./IA');

let Game = function(gameServer) {
  this.player = new Player("0003arra");
  this.gameServer = gameServer;
  this.gameState = new GameState();

  this.start = function() {
    gameServer.webservices.connect({groupName: this.player.name}, game.connect);
  };

  this.connect = function(data) {
    this.player.id = data.idJoueur;
    this.player.num = data.numJoueur;

    gameServer.webservices.turn({idJoueur: this.player.id}, game.turn);
  };

  this.play = function(data) {
    let ia = new IA(this.gameState);
    ia.getBestMove();
    ia.move.x;
  };

  this.turn = function(data) {
    this.update(data);

    if(data.status == "1") {
      this.play();
    } else {
      setTimeout(function() {
        gameServer.webservices.turn({idJoueur: this.player.id}, game.turn);
      }, 500);
    }
  };

  this.update = function(data) {
    this.gameState.nbTenaille[0] = parseInt(data.nbTenaillesJ1);
    this.gameState.nbTenaille[1] = parseInt(data.nbTenaillesJ2);
    this.gameState.lastMoveX = parseInt(data.dernierCoupX);
    this.gameState.lastMoveY = parseInt(data.dernierCoupY);
    this.gameState.numRound = parseInt(data.numTour);
  };
};

module.exports = Game;
