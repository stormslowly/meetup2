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
      linkname: 'show',
      layout: 'layoutPromote.ejs'
    });
  },

  calender: function(req, res) {

    Event.find({}, function(err, events) {
      res.view('calender', {
        events: events
      });
    });

  }


};
