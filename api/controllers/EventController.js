'use strict';

module.exports = {


  create: function(req, res) {

    res.view('EventPublic', {
      title: 'Event Public'
    });
  },

  show: function(req, res) {
    console.log('come to showlayner');

    Event.find({}, function(err, events) {
      console.log(events);
      res.view('detail', {
        events: events,
        layout: null
      });
    });

  },

  newEvent: function(req, res) {

    console.log('create some event');

    var newEvent = require('../models/Event');

    newEvent.topic = req.param('Topic');
    newEvent.desc = req.param('Event');
    newEvent.date = req.param('Date');
    newEvent.address = req.param('Address');
    newEvent.group = req.param('Group');


    Event.create(newEvent, function(err, evt) {
      if (err) {
        console.log(err);
      };


      if (evt.length) {
        console.log('evt[0].topic:' + evt[0].topic);
        res.view('calender', {
          events: evt
        });
      } else {
        var events = new Array(evt);
        res.view('calender', {
          events: events
        });
      };


    });

  }


};