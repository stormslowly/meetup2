/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    topic: 'string',
    desc: 'string',
    address: 'string',
    date: 'date',
    group: {
      model: 'group'
    },
    user: {
      collection: 'User',
      via: 'events',
      dominant: true
    }
  }
};