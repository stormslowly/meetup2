'use strict';

module.exports = {


  create: function(req, res) {

    res.view('EventPublic', {
      title: 'Event Public'
    });
  },

  show: function(req, res) {
    var strPath= req.path;
    var pos1 = strPath.indexOf('/show/') + 6;
    var pos2 = strPath.length;
    var eventId= strPath.slice(pos1, pos2);

    console.log("eventId is:", eventId);

    Event.find({id: eventId}, function(err, events) {
      console.log(events);
      var eve = new Object();
      eve = events[0];
      var groupid = eve.group;
      
      Group.find({id:groupid}, function(err,groups){
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
    newEvent.group = req.param('Group');
    console.log(newEvent.group);

    Event.create(newEvent, function(err) {
      if (err) {
        sails.log.error(err);
        return res.negotiate(err);
      }
      res.redirect(200, '/calender');
    });
  }
};
