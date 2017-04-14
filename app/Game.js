var GameState = require('./GameState');
var Player = require('./Player');
var IA = require('./IA');

var Game = function(gameServer) {
  this.player = new Player("0003arra");
  this.gameServer = gameServer;
  this.gameState = new GameState();

  this.start = function() {
    var callback = this.connect.bind(null, this);
    gameServer.webservices.connect({groupName: this.player.name}, callback);
  };

  this.connect = function(game, data) {
    data = JSON.parse(data);
    if(data.idJoueur) {
      game.player.id = data.idJoueur;
      game.player.num = data.numJoueur;
      var callback = game.turn.bind(null, game);
      gameServer.webservices.turn({idJoueur: game.player.id}, callback);
    } else {
      setTimeout(() => game.start, 500);
    }
  };

  this.play = function(data) {
    var ia = new IA(this.player, this.gameState);
    ia.run();
    //console.log(` X : ${ia.move.x}, Y : ${ia.move.y}`);
    var callback = this.playCallback.bind(null, this);
    gameServer.webservices.play({x: ia.move.x, y: ia.move.y, idJoueur: this.player.id}, callback);
  };

  this.playCallback = function(game, data) {
    setTimeout(function() {
      var callback = game.turn.bind(null, game);
      gameServer.webservices.turn({idJoueur: game.player.id}, callback);
    }, 3000);
  }

  this.turn = function(game, data) {
    try {
      data = JSON.parse(data);
      game.update(data);
    } catch (e) {
      console.log(e);
      data = {};
    }
    if(parseInt(data.status) == 1) {
      game.play();
    } else {
      setTimeout(function() {
        console.log('test');
        var callback = game.turn.bind(null, game);
        gameServer.webservices.turn({idJoueur: game.player.id}, callback);
      }, 3000);
    }
  };

  this.update = function(data) {
    this.gameState.board = data.tableau;
    this.gameState.turn = data.status == 1 ? this.player.num : 1 + !(this.player.num - 1);
    this.gameState.nbTenaille[0] = parseInt(data.nbTenaillesJ1);
    this.gameState.nbTenaille[1] = parseInt(data.nbTenaillesJ2);
    this.gameState.lastMoveX = data.dernierCoupX? parseInt(data.dernierCoupX) : null;
    this.gameState.lastMoveY = data.dernierCoupY? parseInt(data.dernierCoupY) : null;
    this.gameState.numRound = parseInt(data.numTour);
  };
};

module.exports = Game;
