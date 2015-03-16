'use strict';

module.exports.routes = {

  '/': {
    'controller': 'Home',
    'action': 'index'
  },

  'get /chat': {
    controller: 'Chat',
    action: 'get'
  },

  'post /chat': {
    controller: 'Chat',
    action: 'post'
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

  '/show/*': {
    'controller': 'Event',
    'action': 'show'
  },

  '/createEvent': {
    'controller': 'Event',
    'action': 'create'

  },

  'POST /newEvent': {
    'controller': 'Event',
    'action': 'newEvent'
  },

  'POST /mailhook': {
    'controller': 'Mailhook',
    'action': 'hook'
  }

};
