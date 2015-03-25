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

  logout: function(req, res) {
    var fullname = req.session.user.fullname;
    req.session.user = null;

    res.view('logout', {
      who: fullname
    });
  },

  login: function(req, res) {
    var loginFailed = function() {
      req.flash('error', 'bad user name or password');
      req.flash('error', 'server just dont like you');
      return res.redirect('/login');
    };

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
            return loginFailed();
          }
          req.session.user = user;
          return res.redirect('/');
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
          }, function(err) {

            if (err) {
              req.flash('error', 'Server got sick');
              return res.redirect(500, '/login');
            }

            LDAPUtils.auth(entry.dn, req.body.password,
              function(err) {
                if (err) {
                  sails.log.error('LDAP auth', err.message);
                  return loginFailed();
                }

                return res.redirect('/');

              });
          });
        });
      }
    });
  }
};