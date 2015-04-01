'use strict';
/* global Group,ICSParse*/
module.exports = {

  create: function(req, res) {

    var groupid = req.param('id');

    Group.find({
      id: groupid
    }, function(err, found) {
      if (err) {
        console.log('Something is wrong:', err);
        return res.negotiate(err);
      }

      res.view('EventPublic', {
        title: 'Event Public',
        groups: found,
        user: req.session.user,
      });

    });

  },

  show: function(req, res) {

    var eventId = req.param('id');
    console.log('eventId is:', eventId);

    var user = req.session.user;

    if (user === null) {
      console.log('session user is null');
    }

    console.log('user is:', user);

    Event.find({
      id: eventId
    }).populate('user').populate('group').exec(function(err, events) {

      if (err) {
        sails.log.error(err);
        return res.negotiate(err);
      }
      sails.log(events);
      if (events.length === 0) {
        err = 'no event is found with the event id:' + eventId;
        sails.log.error(err);
        return res.negotiate(err);
      }

      var inevent = false;
      var ingroup = false;
      var groupid = events[0].group.id;

      Group.find({
        id: groupid
      }).populate('user').exec(function(err, groups) {
        if (user != null) {
          for (var i = 0; i < groups[0].user.length; i++) {

            if (user.id == groups[0].user[i].id) {
              ingroup = true;
            }
          }

        }


      });

      if (user != null) {

        for (var i = 0; i < events[0].user.length; i++) {

          if (user.id == events[0].user[i].id) {
            inevent = true;
          }
        }
      }

      var eve = events[0];

      Group.find({
          id: eve.group.id
        })
        .populate('owner')
        .populate('user')
        .exec(function(err, groups) {
          if (err) {
            sails.log.error(err);
            return res.negotiate(err);
          } else {
            console.log('group is', groups[0]);

            res.view('EventDetail', {
              event: eve,
              group: groups[0],
              user: user,
              ingroup: ingroup,
              inevent: inevent,
            });
          }
        });
    });
  },

  newEvent: function(req, res) {

    var newEvent = {};


    newEvent.topic = req.param('Topic');
    newEvent.desc = req.param('Event');
    var strDate1 = req.param('beginDate');
    var kk1 = strDate1.split('-');
    var strTime1 = req.param('BeginTime');
    var tt1 = strTime1.split(':');
    var strDate2 = req.param('endDate');
    var kk2 = strDate2.split('-');
    var strTime2 = req.param('EndTime');
    var tt2 = strTime2.split(':');
    newEvent.begindate = new Date(kk1[0], kk1[1] - 1, kk1[2], tt1[0], tt1[1]);
    newEvent.enddate = new Date(kk2[0], kk2[1] - 1, kk2[2], tt2[0], tt2[1]);
    newEvent.address = req.param('Address');
    var groupname = req.param('Group');

    Group.find({
      name: groupname
    }, function(err, found) {
      if (err) {
        sails.log.error(err);
        return res.negotiate(err);
      }

      if (found.length === 0) {
        err = 'no group is found with the group name:' + groupname;
        sails.log.error(err);
        return res.negotiate(err);
      }

      var groupid = found[0].id;
      newEvent.group = groupid;

      Event.create(newEvent, function(err, created) {
        if (err) {
          sails.log.error(err);
          return res.negotiate(err);
        }
        var linkid = 'event/show/' + created.id;
        res.redirect(linkid);
      });

    });


  },


  upload: function(req, res) {
    var icsFile = req.file('ics');

    icsFile.upload({
      dirname: sails.config.upload.calender
    }, function(err, files) {
      if (err) {
        return res.negotiate(err);
      }
      var file = files[0].fd;
      ICSParse.icsFiletoEvent(file, function(err, event) {
        if (err) {
          return res.negotiate(err);
        }
        res.json(event);
      });
    });

  },



};