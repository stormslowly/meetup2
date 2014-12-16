'use strict';

var Sails = require('sails');

before(function(done) {
  Sails.lift({
    log: {
      noShip: true
    },
    hooks: {
      grunt: false
    },
    connections: {
      memory: {
        adapter: 'sails-memory'
      }
    },
    models: {
      connection: 'memory'
    }

  }, done);
});


after(function(done) {
  Sails.lower(done);
});