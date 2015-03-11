'use strict';

module.exports.routes = {

  '/': {
    'controller': 'Home',
    'action': 'index'
  },

  'GET /login': {
    'controller': 'Landing',
    'action': 'login'
  },

  'POST /auth/login': {
    'controller': 'Auth',
    'action': 'login'
  },

  '/calender': {
    'controller': 'Home',
    'action': 'calender'
  },

  '/show': {
    'controller': 'Event',
    'action': 'show'
  },

  '/createEvent': {
    'controller': 'Event',
    'action': 'create'

  },

  'POST /mailhook': {
    'controller': 'Mailhook',
    'action': 'hook'
  }

};
