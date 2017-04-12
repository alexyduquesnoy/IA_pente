require('./app/utils')
let gameServer = require('./app/gameServer');
let Game       = require('./app/Game');
let GameState  = require('./app/GameState');
let Player  = require('./app/Player');
let IA  = require('./app/IA');

let gameState = new GameState();
gameState.board[5][5] = 1;

let player = new Player('0003arra');
player.id = 5;
player.num = 1;

let ia = new IA(player, gameState);

console.log(ia.run());
