'use strict';

var supertest = require('supertest');

describe.only('LDAP auth', function() {
  it('should log faile with empty uid either password', function(done) {

    supertest(sails.hooks.http.app)
      .post('/auth/login')
      .expect(400)
      .end(function(err) {
        done(err);
      });
  });

  it('should log failed with only uid ', function(done) {
    supertest(sails.hooks.http.app)
      .post('/auth/login')
      .send({
        uid: 'pshu'
      })
      .expect(400)
      .end(function(err) {
        done(err);
      });
  });

  it('should log failed with wrong password ', function(done) {
    supertest(sails.hooks.http.app)
      .post('/auth/login')
      .send({
        uid: 'pshu',
        password: 'Dongguan99'
      })
      .expect(200)
      .end(function(err) {
        if (err) {
          return done(err);
        }

        supertest(sails.hooks.http.app)
          .post('/auth/login')
          .send({
            uid: 'pshu',
            password: 'XDongguan99'
          })
          .expect(200)
          .end(function(err) {
            done(err);
          });
      });
  });
});
