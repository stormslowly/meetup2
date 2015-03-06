'use strict';
/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res) {


    return res.view('meetups', {
      meetups: ['nokia', 'nodejs', 'python', 'lua', 'Golag', 'Linux'],
      linkname: 'show'
    });
  },

  calender: function function_name(req, res) {
    return res.view('calender');
  },


  show: function function_name(req, res) {
    console.log('come to showlayner');

    Event.find({}, function(err, events) {
      console.log(events);
      res.view('detail', {
        events: events,
        layout: null
      });
    });

  },

  createEvent: function function_name(req, res) {

    console.log('create some event');

    var newEvent = {
      name: 'Clean Code Contest 2015',
      topic: ' Clean Code Contest',
      coach: 'Shu Pengfei',
      address: 'Boston@16F',
      EventDate: 2015 - 3 - 4
    };

    Event.create(newEvent, function(err, evt) {
      if (err) {
        console.log(err);
      }
      console.log('Event create successfully' + JSON.stringify(evt));
      res.view('EventCreated', {
        events: evt,
        layout: null
      });

    });


  }

};
