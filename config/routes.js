'use strict';

module.exports.routes = {

  '/': {
    'controller': 'Home',
    'action': 'index'
  },

  '/sview': {
    view: 'sEvent'
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

  '/event/myevent': {
    'controller': 'Event',
    'action': 'ShowMyEvent'

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

  '/group/mygroup': {
    'controller': 'Group',
    'action': 'ShowMyGroup'
  },

  '/group/members': {
    'controller': 'Group',
    'action': 'ShowMembers'
  },

  'POST /newGroup': {
    'controller': 'Group',
    'action': 'newGroup'
  },

  '/group/userjoin/:id': {
    'controller': 'Group',
    'action': 'addUser'
  },

  '/group/userleft/:id': {
    'controller': 'Group',
    'action': 'removeUser'
  }

};