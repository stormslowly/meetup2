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
    Event.create({
      name: 'WangGang'
    }, function(err, evt) {
      if (err) console.log(err);
      console.log("database insert OK:" + JSON.stringify(evt));
    });

    Event.find({}, function(err, events) {
      console.log(events);
      res.view('detail', {
        events: events
      });
    });

  }

};
