/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    fullname: {
      type: 'string',
      defaultsTo: 'Anonymous'
    },

    uid: {
      type: 'string',
    },

    dn: {
      type: 'string'
    },

    email: {
      type: 'email'
    }
  }
};
