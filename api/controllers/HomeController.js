'use strict';
/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res) {

    var user = req.session.user;

    Group.find({}).populate('user').exec(function(err, groups) {

      return res.view('meetups', {
        meetups: groups,
        linkname: 'show',
        user: user,
        layout: 'layoutPromote.ejs'
      });
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