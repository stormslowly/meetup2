'use strict';

var expect = require('chai').expect;
var request = require('supertest');
var path = require('path');
describe('Event uploader', function() {
  var app = null;

  before(function() {
    app = sails.hooks.http.app;
  });


  it('should parse the ics ', function(done) {

    request(app)
      .post('/event/upload')
      .attach('ics', path.join(__dirname, './services/invitation.ics'))
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.contain.keys(
          ['topic', 'desc', 'start', 'end']);
        done(err);
      });
  });

});