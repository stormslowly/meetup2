'use strict';

module.exports = {


  create: function(req, res) {

    Group.find({}, function(err, found) {
      if (err) {
        console.log('Something is wrong:', err);
        return res.negotiate(err);
      }

      res.view('EventPublic', {
        title: 'Event Public',
        groups: found
      });

    });


  },

  show: function(req, res) {
    var strPath = req.path;
    var pos1 = strPath.indexOf('/show/') + 6;
    var pos2 = strPath.length;
    var eventId = strPath.slice(pos1, pos2);

    console.log("eventId is:", eventId);

    Event.find({
      id: eventId
    }, function(err, events) {
      console.log(events);
      var eve = new Object();
      eve = events[0];
      var groupid = eve.group;

      Group.find({
        id: groupid
      }, function(err, groups) {
        var gro = new Object();
        gro = groups[0];
        res.view('detail', {
          eventobj: eve,
          groupobj: gro,
          layout: null
        });
      });

    });

  },

  newEvent: function(req, res) {

    var newEvent = {};

    newEvent.topic = req.param('Topic');
    newEvent.desc = req.param('Event');
    newEvent.date = req.param('Date');
    newEvent.address = req.param('Address');
    var groupname = req.param('Group');
    console.log('group name:', groupname);

    Group.find({
      name: groupname
    }, function(err, found) {
      if (err) {
        sails.log.error(err);
        return res.negotiate(err);
      }

      var groupid = found[0].id;
      console.log('groupis is: ', groupid);
      newEvent.group = groupid;

      Event.create(newEvent, function(err, created) {
        if (err) {
          sails.log.error(err);
          return res.negotiate(err);
        }
        var linkid = '/show/' + created.id;
        res.redirect(linkid);
      });

    });


  }
  
};
