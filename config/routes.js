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

  '/auth/logout': {
    'controller': 'Auth',
    'action': 'logout'
  },


  '/calender': {
    'controller': 'Home',
    'action': 'calender'
  },

  '/event/show/:id': {
    'controller': 'Event',
    'action': 'show'
  },

  '/event/new': {
    'controller': 'Event',
    'action': 'create'

  },

  '/event/userjoin/:id': {
    'controller': 'Event',
    'action': 'AddUser'
  },


  'POST /newEvent': {
    'controller': 'Event',
    'action': 'newEvent'
  },

  'POST /mailhook': {
    'controller': 'Mailhook',
    'action': 'hook'
  },

  '/group': {
    'controller': 'Group',
    'action': 'search'
  },

  '/group/show/:id': {
    'controller': 'Group',
    'action': 'show'
  },


  '/group/new': {
    'controller': 'Group',
    'action': 'create'

  },

  'POST /newGroup': {
    'controller': 'Group',
    'action': 'newGroup'
  },

  '/group/userjoin/:id': {
    'controller': 'Group',
    'action': 'AddUser'
  },

};
