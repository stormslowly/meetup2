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
      res.view('detail', {
        events: events,
        layout: null
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

    Event.create(newEvent, function(err) {
      if (err) {
        sails.log.error(err);
        return res.negotiate(err);
      }
      res.redirect(200, '/calender');
    });
  }
};
