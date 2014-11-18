/**
 * MeetController
 *
 * @description :: Server-side logic for managing meets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  find: function(req, res) {
    return res.view('meetups', {
      meetups: ['nokia', 'nodejs', 'python', 'lua', 'Golag']
    });
  }

};