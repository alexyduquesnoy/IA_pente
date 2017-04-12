var http = require('http');

var gameServer = {
  options : {
    hostname : 'demo2604760.mockable.io',
    port: 80,
    path: '',
    method: 'GET'
  },
  webservices : {
    connect: function(args, callback) {
      var options  = gameServer.options;
      options.path += `/connect/${args.groupName}`;
      this.consume(options, callback);
    },
    play: function(args, callback) {
      var options  = gameServer.options;
      options.path += `/play/${x}/${y}/${idJoueur}`;
      this.consume(options, callback);
    },
    turn: function(args, callback) {
      var options  = gameServer.options;
      options.path += `/turn/${idJoueur}`;
      this.consume(options, callback);
    },
    consume: function(options, callback) {
      console.log(`Try connection to the game server on : ${options.hostname+options.path}.`);
      var request  = http.request(options, function(response) {
        console.log(`Connection to the game server on : ${options.hostname+options.path}, done.`);
        response.setEncoding('utf8');
        response.on('data', callback);
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
