'use strict';
/* global Group,ICSParse*/
module.exports = {

  create: function(req, res) {

    var groupid = req.param('id');
    var action = 'new';

    var topic = '';
    var desc = '';
    var address = '';
    var begindate = '';
    var enddate = '';



    Group.find({
      id: groupid
    }, function(err, found) {
      if (err) {
        console.log('Something is wrong:', err);
        return res.negotiate(err);
      } else {
        res.view('EventManager', {
          title: 'Edit Event',
          user: req.session.user,
          action: action,
          topic: topic,
          desc: desc,
          address: address,
          begindate: begindate,
          enddate: enddate,
          group: found,
        });
      }
    });

  },

  edit: function(req, res) {

    var action = 'edit';
    var eventid = req.param('id');
    var topic, desc, address, begindate, enddate, owngroup;


    Event.find({
      id: eventid
    }).populate('group').exec(function(err, events) {
      if (err) {
        sails.log.error(err);
        return res.negotiate(err);
      } else {

        topic = events[0].topic;
        desc = events[0].desc;
        address = events[0].address;
        begindate = events[0].begindate;
        enddate = events[0].enddate;
        owngroup = events[0].group;

        var group = [];
        group.push(owngroup);

        res.view('EventManager', {
          title: 'Edit Event',
          user: req.session.user,
          action: action,
          topic: topic,
          desc: desc,
          address: address,
          begindate: begindate,
          enddate: enddate,
          group: group,
          eventid: eventid,
        });

      }
    });

  },

  show: function(req, res) {

    var eventId = req.param('id');
    var user = req.session.user;


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

      if ((user !== undefined) && (user !== null)) {

        for (var i = 0; i < events[0].user.length; i++) {
          if (user.id === events[0].user[i].id) {
            inevent = true;
          }
        }
      }

      Group.find({
        id: groupid
      }).populate('owner').populate('user').exec(function(err, groups) {

        if (err) {
          sails.log.error(err);
          return res.negotiate(err);
        } else {

          if ((user !== undefined) && (user !== null)) {
            for (var i = 0; i < groups[0].user.length; i++) {
              if (user.id === groups[0].user[i].id) {
                ingroup = true;
              }
            }
          }

          res.view('EventDetail', {
            event: events[0],
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


  updateEvent: function(req, res) {


    var strDate1 = req.param('beginDate');
    var kk1 = strDate1.split('-');
    var strTime1 = req.param('BeginTime');
    var tt1 = strTime1.split(':');
    var strDate2 = req.param('endDate');
    var kk2 = strDate2.split('-');
    var strTime2 = req.param('EndTime');
    var tt2 = strTime2.split(':');
    var begindate = new Date(kk1[0], kk1[1] - 1, kk1[2], tt1[0], tt1[1]);
    var enddate = new Date(kk2[0], kk2[1] - 1, kk2[2], tt2[0], tt2[1]);
    var groupname = req.param('Group');
    var eventid = req.param('id');


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

      Event.update({
        id: eventid
      }, {
        topic: req.param('Topic'),
        desc: req.param('Event'),
        address: req.param('Address'),
        begindate: begindate,
        enddate: enddate,
        group: groupid,

      }).exec(function(err, updated) {
        if (err) {
          sails.log.error(err);
          return res.negotiate(err);
        }
        var linkid = 'event/show/' + updated[0].id;
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

        var groupId = req.param('group');

        Event.create({
            topic: event.topic,
            desc: event.desc,
            begindate: event.start,
            enddate: event.end,
            address: event.address,
            calenderFile: file,
            group: {
              id: groupId
            }
          })
          .then(function(obj) {
            res.json(obj);
          }).catch(function(e) {
            res.negotiate(e);
          });

      });
    });

  },



};