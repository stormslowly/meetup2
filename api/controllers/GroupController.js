/**
 * GroupController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `GroupController.create()`
   */
  create: function(req, res) {
    res.view('NewGroup', {
      title: 'New Group'
    });
  },


  /**
   * `GroupController.newGroup()`
   */
  newGroup: function(req, res) {

    var newGroup = {};

    newGroup.name = req.param('Name');
    newGroup.desc = req.param('Desc');

    Group.create(newGroup, function(err, created) {
      if (err) {
        sails.log.error(err);
        return res.negotiate(err);
      }
      var linkid = 'group/show/' + created.id;
      res.redirect(linkid);

    });
  },


  /**
   * `GroupController.update()`
   */
  update: function(req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },

  show: function(req, res) {
    Event.find({
      group: req.param('id')
    }, function(err, events) {
      res.view('calender', {
        events: events
      });
    });
  },


  /**
   * `GroupController.search()`
   */
  search: function(req, res) {

    Group.find({}, function(err, found) {
      if (err) {
        console.log('Something is wrong:', err);
        return res.negotiate(err);
      }

      return res.view('meetups', {
        meetups: ['nokia', 'nodejs', 'python', 'lua', 'Golag', 'Linux'],
        linkname: 'show',
        layout: 'layoutPromote.ejs'
      });

    });

  }


};
