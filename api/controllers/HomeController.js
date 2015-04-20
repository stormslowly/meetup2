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

    Group.find({}).populate('owner').populate('user').exec(function(err, groups) {
      if (err) {
        sails.log.error(err);
        return res.negotiate(err);

      } else {
        return res.view('meetups', {
          meetups: groups,
          linkname: 'show',
          user: user,
          layout: 'layoutPromote.ejs'
        });

      }


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