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
    
    var eventId = req.param('id');
    
    console.log("eventId is:", eventId);

    var user = req.session.user;

    if (user==null){
      console.log('user is null');
    };

    console.log("user is:", user);

    Event.find({
      id: eventId
    }, function(err, events) {

      if (err) {
        sails.log.error(err);
        return res.negotiate(err);
      }
      sails.log(events);
      if (events.length == 0){
        err = 'no event is found with the event id:' + eventId;
        sails.log.error(err);
        return res.negotiate(err);
      }
      var eve = new Object();
      eve = events[0];
      var groupid = eve.group;

      Group.find({id: groupid}).populate('user').exec(function(err, groups) {
        if (err) {
          sails.log.error(err);
          return res.negotiate(err);
        }
        if (groups.length==0){
          err = 'no group is found for the event'
          sails.log.error(err);
          return res.negotiate(err);
        }

        var gro = new Object();
        gro = groups[0];
        var grousers = gro.user;
        var userNumber = grousers.length;
        console.log('userNumber is:', userNumber);
        console.log('grousers is:', grousers);
        res.view('detail', {
          event: eve,
          group: gro,
          user: user,
          groupusers: grousers,
          userNumber: userNumber,
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

      if (found.length == 0){
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


  newuser: function(req, res) {
    console.log('create new user for event');
    var user= req.session.user;
    console.log(user);
    Group.find({id:4}).populate('user').exec(function (err, groups){
      if(err){
        console.log(err);

      }
      else{
        groups[0].user.add(user);
        groups[0].save(function(err,s){
        console.log("record was saved:", s);
      })

      }
      
    });
    res.redirect('event/show/');
  }

};
