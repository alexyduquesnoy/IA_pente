require('./app/utils')
var gameServer = require('./app/gameServer');
var Game       = require('./app/Game');
var GameState  = require('./app/GameState');
var Player  = require('./app/Player');
var IA  = require('./app/IA');


var game = new Game(gameServer);
game.start();
