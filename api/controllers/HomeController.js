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
          meetups: ['nokia', 'nodejs', 'python', 'lua', 'Golag']
    });
  },

  calender:function function_name (req,res) {
    return res.view('calender');
  }
};