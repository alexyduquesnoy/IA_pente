var http = require('https');
var clone = require('clone');

var gameServer = {
  options : {
    hostname : 'workshop.wisak.eu',
    port: 443,
    path: '',
    method: 'GET'
  },
  webservices : {
    connect: function(args, callback) {
      var options  = clone(gameServer.options);
      options.path += `/connect/${args.groupName}`;
      this.consume(options, callback);
    },
    play: function(args, callback) {
      var options  = clone(gameServer.options);
      options.path += `/play/${args.x}/${args.y}/${args.idJoueur}`;
      this.consume(options, callback);
    },
    turn: function(args, callback) {
      var options  = clone(gameServer.options);
      options.path += `/turn/${args.idJoueur}`;
      this.consume(options, callback);
    },
    consume: function(options, callback) {
      console.log(`Try connection to the game server on : ${options.hostname+options.path}.`);
      var buffer = '';
      var request  = http.request(options, (response) => {
        console.log(`Connection to the game server on : ${options.hostname+options.path}, done.`);
        response.setEncoding('utf8');
        response.on('data', (data) => {
          buffer += data;
        });
        response.on('end', () => { callback(buffer); });
      });
      request.on('error', this.events.error);
      request.end();
    },
    events : {
      error : function(error) {
        console.log(`problem with request: ${error.message}`);
      }
    }
  }
};

module.exports = gameServer;
