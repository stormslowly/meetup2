'use strict';
/* global Group */
var add_group_user = function(groupid, user, cb) {

  Group
    .find({
      id: groupid
    }).populate('user')
    .exec(function(err, groups) {
      if (err) {
        err = 'Failed to query database with groupid: ' + groupid;
        sails.log.error(err);
        return cb(err);

      } else {

        if (groups.length !== 0) {
          for (var i = 0; i < groups[0].user.length; i++) {
            if (user.id === groups[0].user[i].id) {
              return cb(err);
            }
          }
          groups[0].user.add(user);
          groups[0].save(function(err, s) {
            if (err) {
              console.log('user was failed to add to group:', err);
              return cb(err);
            } else {
              console.log('user was added to group:', s);
              return cb(err);
            }

          })

        } else {
          err = 'Failed to find group with groupid:' + groupid;
          sails.log.error(err);
          return cb(Error(err));

        }

      }

    });



};

module.exports = {



  /**
   * `GroupController.create()`
   */
  create: function(req, res) {
    res.view('NewGroup', {
      title: 'New Group',
      user: req.session.user,
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
    };

    console.log('To create new group');

    Group.create(newGroup, function(err, created) {

      if (err) {
        sails.log.error(err);
        return res.negotiate(err);
      } else {

        res.setTimeout(0);

        req.file('groupflag').upload({
          dirname: require('path').join(sails.config.appPath,
            '/assets/images'),
        }, function(err, uploadedFiles) {
          if (err) {
            return res.negotiate(err);
          }
          if (uploadedFiles.length === 0) {
            return res.badRequest('No file was uploaded');
          }
          var newFilefd = uploadedFiles[0].fd;
          if (!newFilefd.match(/^\//)) {
            newFilefd = require('path').basename(newFilefd);
          }
          Group.update(created.id, {
            groupfd: newFilefd,
          }).exec(function(err) {
            if (err) {
              return res.negotiate(err);
            } else {
              return res.redirect('user/joingroup/' + created.id);
            }
          });

        });
      }
    });
  },


  /**
   * `GroupController.update()`
   */
  update: function(req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
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

      if (user != null) {
        for (var i = 0; i < groups[0].user.length; i++) {
          if (user.id == groups[0].user[i].id) {
            ingroup = true;
          }
        }
      }

      var gro = new Object();
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

        if (user != null) {
          for (var i = 0; i < events[0].user.length; i++) {

            if (user.id == events[0].user[i].id) {
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



  addUser: function(req, res) {

    var user = req.session.user;
    var groupid = req.param('id');

    add_group_user(groupid, user, function(err) {
      if (err) {

        if (err == 'user existed already') {
          return res.redirect('group/show/' + groupid);
        } else {
          err = 'Failed to add user to group:' + user;
          sails.log.error(err);
          return res.negotiate(err);
        }

      } else {
        return res.redirect('group/show/' + groupid);
      }

    });


  },

  ShowMyGroup: function(req, res) {

    var user = req.session.user;

    console.log(user);

    User.find({
      id: user.id
    }).populate('group').exec(function(err, users) {

      if (err) {
        console.log('faild to find group');
        sails.log.error(err);
        return res.negotiate(err);
      } else {

        var groups = users[0].group;


        res.view('meetups', {
          meetups: groups,
          linkname: 'show',
          user: user,
          layout: 'layoutPromote.ejs'
        });

      }

    });

  },

  ShowMembers: function(req, res) {

  },


};