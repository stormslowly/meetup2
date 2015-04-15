'use strict';
/*global Group*/
/**
 * GroupController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */



module.exports = {



  /**
   * `GroupController.create()`
   */
  create: function(req, res) {

    var action = 'new';

    res.view('NewGroup', {
      title: 'New Group',
      user: req.session.user,
      action: action,
    });
  },

  /**
   * `GroupController.create()`
   */
  edit: function(req, res) {

    var action = 'edit';
    var groupid = req.param('id');
    var groupname, groupdesc;


    Group.find({
      id: groupid
    }).populate('owner').exec(function(err, groups) {
      if (err) {
        sails.log.error(err);
        return res.negotiate(err);

      } else {
        groupname = groups[0].name;
        groupdesc = groups[0].desc;
        res.view('NewGroup', {
          title: 'Edit Group',
          user: req.session.user,
          action: action,
          groupid: groupid,
          groupname: groupname,
          groupdesc: groupdesc,
        });
      }
    });

  },

  /**
   * `GroupController.create()`
   */
  delete: function(req, res) {

    var groupid = req.param('id');

    Group.destroy({
      id: groupid
    }).exec(function(err, deleted) {
      if (err) {
        sails.log.error(err);
        return res.negotiate(err);

      } else {
        return res.redirect('/');
      }
    });


  },

  /**
   * `GroupController.newGroup()`
   */
  newGroup: function(req, res) {

    var newGroup = {};

    newGroup.name = req.param('Name');
    newGroup.desc = req.param('Desc');
    newGroup.date = new Date();

    if (req.session.user !== null) {
      newGroup.owner = req.session.user;
    } else {
      req.flash('error', 'User need login first');
      return res.redirect('/login');
    }


    Group.create(newGroup, function(err, created) {

      if (err) {
        sails.log.error(err);
        return res.negotiate(err);
      } else {

        var fs = require('fs');
        var postData = req.param('Pic');
        var dataBuffer = new Buffer(postData, 'base64');
        var filename = require('path').join(sails.config.appPath, '/assets/images/') + created.id + '.jpg';

        fs.writeFile(filename, dataBuffer, function(err) {
          if (err) {
            console.log('err');
          } else {

            Group.update(created.id, {
              groupfd: '/images/' + created.id + '.jpg',
            }).exec(function(err, updated) {
              if (err) {
                return res.negotiate(err);
              } else {
                var redirectstr = '/user/joingroup/' + updated[0].id;
                return res.json(200, {
                  redirect: redirectstr
                });
              }
            });
          }
        });

      }
    });
  },


  /**
   * `GroupController.updateGroup()`
   */
  updateGroup: function(req, res) {

    var groupid = req.param('id');

    var fs = require('fs');
    var postData = req.param('Pic');
    var dataBuffer = new Buffer(postData, 'base64');
    var filename = require('path').join(sails.config.appPath, '/assets/images/') + groupid + '.jpg';

    fs.writeFile(filename, dataBuffer, function(err) {
      if (err) {
        console.log('err');
      } else {
        console.log('file saved successfully');

        Group.update(groupid, {
          name: req.param('Name'),
          desc: req.param('Desc'),
          owner: req.session.user,
          groupfd: '/images/' + groupid + '.jpg',
        }).exec(function(err, updated) {
          if (err) {
            return res.negotiate(err);
          } else {
            var redirectstr = '/group/show/' + updated[0].id;
            return res.json(200, {
              redirect: redirectstr
            });
          }
        });


      }
    });
  },


  show: function(req, res) {

    var groupid = req.param('id');
    var user = req.session.user;

    Group.find({
      id: groupid
    }).populate('user').populate('owner').exec(function(err, groups) {
      if (err) {
        sails.log.error(err);
        return res.negotiate(err);
      }
      if (groups.length === 0) {
        err = 'No group is found';
        sails.log.error(err);
        return res.negotiate(err);
      }

      var ingroup = false;

      if ((user !== undefined) && (user !== null)) {
        for (var i = 0; i < groups[0].user.length; i++) {
          if (user.id === groups[0].user[i].id) {
            ingroup = true;
          }
        }
      }

      var gro = {};
      gro = groups[0];

      Event.find({
        group: groupid
      }).populate('user').exec(function(err, events) {
        if (err) {
          err = 'Failed to seach Event with groupid:' + groupid;
          sails.log.error(err);
          return res.negotiate(err);
        }
        if (events.length === 0) {
          return res.view('GroupDetail', {
            RecentEvent: null,
            events: null,
            group: gro,
            user: user,
            ingroup: ingroup,
          });
        }

        var inevent = false;

        if ((user !== undefined) && (user !== null)) {
          for (var i = 0; i < events[0].user.length; i++) {

            if (user.id === events[0].user[i].id) {
              inevent = true;
            }
          }

        }


        res.view('GroupDetail', {
          RecentEvent: events[0],
          events: events,
          group: gro,
          user: user,
          ingroup: ingroup,
          inevent: inevent,
        });
      });
    });


  },


  find: function(req, res) {
    var limit = 100 || req.param('limit');
    Group.find({})
      .limit(limit)
      .exec(function(err, groups) {
        if (err) {
          sails.log.error('GroupController.search:', err);
          return res.negotiate(err);
        }
        return res.json(groups);
      });

  },



  ShowMembers: function(req, res) {

  },


};