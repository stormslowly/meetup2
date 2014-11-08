'use strict';

var Sails = require('sails');

before(function(done) {
  Sails.lift({
    log: {
      noShip: true
    }
  }, done);
});


after(function(done) {

  Sails.lower(done);
});