'use strict';
/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res) {


    Group.find({},function(err, groups){

      return res.view('meetups', {
      meetups:groups,
      linkname: 'show',
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
