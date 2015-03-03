/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  adapter: 'mysql',

  tableName: 'event',

  config: {
      user: 'meetup_root',
      password: 'coach1234',
      database: 'meetup',
      host: '127.0.0.1'

  },

  attributes: {
      name: 'string'

  }
};

