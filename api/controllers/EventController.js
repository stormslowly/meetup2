'use strict';

module.exports = {


  create: function(req, res) {

    res.view('EventPublic', {
      title: 'Event Public'
    });
  },

  show: function(req, res) {

    Event.find({}, function(err, events) {
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
