/**
 * GroupController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */



var add_group_user = function(groupid, user,cb) {

  Group
  .find({
      id: groupid
    }).populate('user')
  .exec(function(err, groups) {
      if (err) {
        err = 'Failed to query database with groupid: ' + groupid;
        sails.log.error(err);
        return cb(err);

      } else {

        if (groups.length != 0) {
          for (i=0; i<groups[0].user.length; i++){
            if (user.id == groups[0].user[i].id){
              err = "user existed already";
              console.log(err);
              return cb(err);
            }
          }
          groups[0].user.add(user);
          groups[0].save(function(err, s) {
            if (err){
              console.log("user was failed to add to group:", err);
              return cb(err);
            }
            else{
              console.log("user was added to group:", s);
              return cb(err);
            }
            
          })

        } else {
          err = 'Failed to find group with groupid:' + groupid;
          sails.log.error(err);
          return cb(Error(err));

        }

      }

    });



};

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

    if (req.session.user != null) {
      newGroup.owner = req.session.user;
    } else {
      req.flash('error', 'User need login first');
      return res.redirect('/login');
    };

    console.log(newGroup.date);

    console.log('To create new group');

    Group.create(newGroup, function(err, created) {

      if (err) {
        sails.log.error(err);
        return res.negotiate(err);
      }
      else{
        add_group_user(created.id, req.session.user, function(err){
          if (err) {
            if(err=="user existed already"){
              return res.redirect('group/show/' + created.id);
            }
            else{
              err = 'Failed to add user to group:' + req.session.user;
              sails.log.error(err);
              return res.negotiate(err);
            }
            
          }
          else{
            return res.redirect('group/show/' + created.id);
          }

        })
        
      }
      
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
    var user = req.session.user;

    Group.find({
      id: groupid
    }).populate('user').populate('owner').exec(function(err, groups) {
      if (err) {
        sails.log.error(err);
        return res.negotiate(err);
      }
      if (groups.length == 0) {
        err = 'No group is found'
        sails.log.error(err);
        return res.negotiate(err);
      }

      var gro = new Object();
      gro = groups[0];

      Event.find({
        group: groupid
      }).populate('user').exec(function(err, events) {
        if (err) {
          err = 'Failed to seach Event with groupid:' + groupid;
          sails.log.error(err);
          return res.negotiate(err);
        }
        if (events.length == 0) {
          return res.view('GroupDetail', {
            RecentEvent: null,
            events: null,
            group: gro,
            user: user,
            layout: null
          });
        }
        res.view('GroupDetail', {
          RecentEvent: events[0],
          events: events,
          group: gro,
          user: user,
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

  },



  addUser: function(req, res) {
    console.log('create new user for group');
    var user = req.session.user;
    console.log(user);
    var groupid = req.param('id');

    add_group_user(groupid, user,function(err){
        if (err) {

          if(err=="user existed already"){
              return res.redirect('group/show/' + groupid);
          }
          else{
            err = 'Failed to add user to group:' + user;
            sails.log.error(err);
            return res.negotiate(err);
          }

        }
        else{  
          return res.redirect('group/show/' + groupid);
        }

    });

  
  },


};
