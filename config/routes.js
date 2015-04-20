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

  '/event/edit/:id': {
    'controller': 'Event',
    'action': 'edit'
  },

  'POST /event/update/:id': {
    'controller': 'Event',
    'action': 'updateEvent'
  },

  'POST /newEvent': {
    'controller': 'Event',
    'action': 'newEvent'
  },


  '/user/myevent': {
    'controller': 'User',
    'action': 'show_my_event'

  },

  '/user/mygroup': {
    'controller': 'User',
    'action': 'show_my_group'
  },

  '/user/joingroup/:id': {
    'controller': 'User',
    'action': 'add_user_to_group'
  },

  '/user/leftgroup/:id': {
    'controller': 'User',
    'action': 'remove_user_from_group'
  },

  '/user/joinevent/:id': {
    'controller': 'User',
    'action': 'add_user_to_event'
  },

  '/user/leftevent/:id': {
    'controller': 'User',
    'action': 'remove_user_from_event'
  },



  'POST /mailhook': {
    'controller': 'Mailhook',
    'action': 'hook'
  },

  'GET /api/group': {
    'controller': 'Group',
    'action': 'find'
  },

  '/group/show/:id': {
    'controller': 'Group',
    'action': 'show'
  },


  '/group/new': {
    'controller': 'Group',
    'action': 'create'

  },

  '/group/edit': {
    'controller': 'Group',
    'action': 'edit'

  },

  '/group/delete/:id': {
    'controller': 'Group',
    'action': 'delete'

  },

  '/group/members': {
    'controller': 'Group',
    'action': 'ShowMembers'
  },

  'POST /newGroup': {
    'controller': 'Group',
    'action': 'newGroup'
  },

  'POST /editGroup/:id': {
    'controller': 'Group',
    'action': 'updateGroup'
  },


  'POST /event/s': {
    'controller': 'Event',
    'action': 'upload'
  }


};