require('./app/utils')
let gameServer = require('./app/gameServer');
let Game       = require('./app/Game');
let GameState  = require('./app/GameState');
let Player  = require('./app/Player');
let IA  = require('./app/IA');

let game = new Game(gameServer);
game.start();
