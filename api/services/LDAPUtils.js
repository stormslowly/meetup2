'use strict';

var ldap = require('ldapjs');

var noop = function() {};

module.exports = {

  auth: function(dn, password, callback) {
    callback = callback || noop;

    var client = ldap.createClient({
      url: sails.config.ldap.server
    });

    client.bind(dn, password, function(err) {
      return callback(err);
    });

  },

  searchByUID: function(uid, callback) {
    var client = ldap.createClient({
      url: sails.config.ldap.server
    });
    var opt = {
      filter: 'uid=' + uid,
      scope: 'sub'
    };
    callback = callback || noop;

    client.bind('', '', function(err) {
      if (err) {
        return callback(err);
      }

      client.search('', opt, function(err, response) {
        var entrys = [];
        if (err) {
          return callback(err);
        }

        response.on('searchEntry', function(entry) {
          entrys.push(entry.object);
        });

        response.on('end', function() {
          if (entrys.length === 0) {
            return callback(Error('NO SUCH uid'), null);
          }
          var entry = entrys[0];
          return callback(null, entry);
        });

        response.on('error', function(error) {
          return callback(error);
        });
      });
    });

  }
};
