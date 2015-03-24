'use strict';

module.exports = {


  create: function(req, res) {

    if (req.session.user != null) {
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
    } else {
      req.flash('error', 'User need login first');
      return res.redirect('/login');
    }


  },

  show: function(req, res) {


    var eventId = req.param('id');
    console.log("eventId is:", eventId);

    var user = req.session.user;

    if (user == null) {
      console.log('session user is null');
    };

    console.log("user is:", user);

    Event.find({
      id: eventId
    }).populate('user').populate('group').exec(function(err, events) {

      if (err) {
        sails.log.error(err);
        return res.negotiate(err);
      }
      sails.log(events);
      if (events.length == 0) {
        err = 'no event is found with the event id:' + eventId;
        sails.log.error(err);
        return res.negotiate(err);
      }

      var eve = new Object();
      eve = events[0];

      Group.find({
        id: eve.group.id
      }).populate('owner').populate('user').exec(function(err, groups) {
        if (err) {
          sails.log.error(err);
          return res.negotiate(err);
        } else {
          console.log('group is', groups[0]);

          res.view('detail', {
            event: eve,
            group: groups[0],
            user: user,
            layout: null
          });
        }
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

      if (found.length == 0) {
        err = 'no group is found with the group name:' + groupname;
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
        var linkid = 'event/show/' + created.id;
        res.redirect(linkid);
      });

    });


  },


  AddUser: function(req, res) {
    console.log('create new user for event');
    var user = req.session.user;
    console.log(user);
    var eventid = req.param('id');
    Event.find({
      id: eventid
    }).populate('user').exec(function(err, events) {
      if (err) {
        err = 'Failed to query database with eventid: ' + eventid;
        sails.log.error(err);
        return res.negotiate(err);

      } else {
        if (events.length!=0){
          events[0].user.add(user);
          events[0].save(function(err, s) {
          console.log("user was added to event successfully:", s);
          return res.redirect('event/show/' + eventid);
          });
        }
        else{
          err = 'Failed to find event with eventid:' + eventid;
          sails.log.error(err);
          return res.negotiate(err);
        }
      }
        
        });
      },
};
