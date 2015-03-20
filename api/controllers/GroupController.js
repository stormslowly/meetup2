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
    newGroup.date = new Date();

    console.log(newGroup.date);

    console.log('To create new group');

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

    var groupid = req.param('id');

    Group.find({id: groupid}).populate('user').exec(function(err, groups) {
      if (err) {
        sails.log.error(err);
        return res.negotiate(err);
      }
      if (groups.length == 0) {
        err = 'no group is found for the event'
        sails.log.error(err);
        return res.negotiate(err);
      }

      var gro = new Object();
      gro = groups[0];
      var grousers = gro.user;
      var userNumber = grousers.length;
      var user = req.session.user;
      console.log('userNumber is:', userNumber);
      console.log('grousers is:', grousers);
      
      Event.find({group: groupid}).exec(function(err, events){
        if (err) {
          err = 'Failed to seach Event with groupid:' + groupid;
          sails.log.error(err);
          return res.negotiate(err);
        }
        res.view('GroupDetail', {
        RecentEvent: events[0],
        events: events,
        group: gro,
        user: user,
        groupusers: grousers,
        userNumber: userNumber,
        layout: null
        });
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
