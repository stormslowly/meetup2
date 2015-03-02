'use strict';
/* global User, LDAPUtils*/
/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


module.exports = {

  validateData: function(req, res, next) {
    var uid = req.body.uid;
    var password = req.body.password;
    if (uid && password && password.length > 0) {
      next();
    } else {
      req.flash('error', 'bad login data');
      res.redirect('/login');
    }
  },

  login: function(req, res) {

    req.validate({
      uid: 'string',
      password: 'string'
    });

    User.findOne({
      uid: req.body.uid
    }, function(err, user) {

      if (user) {

        LDAPUtils.auth(user.dn, req.body.password, function(error) {

          if (error) {

            return res.negoation(error);
          }

          return res.json(user);

        });

      } else {

        LDAPUtils.searchByUID(req.body.uid, function(err, entry) {

          if (err) {
            return res.redirect('/');
          }

          User.create({
            uid: entry.uid,
            dn: entry.dn,
            fullname: entry.gecos,
            email: entry.mail
          }, function(err, user) {

            if (err) {
              res.redirect('/');
            }
            res.ok(user);
          });
        });
      }
    });
  }

};
