'use strict';
/* global User, LDAPUtils*/

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
            req.flash('error', 'bad user name or password');
            req.flash('error', 'server just dont like you');
            return res.redirect('/login');
          }

          return res.json(user);

        });

      } else {

        LDAPUtils.searchByUID(req.body.uid, function(err, entry) {

          if (err) {
            req.flash('error', 'bad uid');
            return res.redirect('/login');
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
