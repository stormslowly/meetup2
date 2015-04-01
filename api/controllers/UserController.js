/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var add_group_user = function(groupid, user, cb) {

	Group
		.find({
			id: groupid
		}).populate('user')
		.exec(function(err, groups) {
			if (err) {
				err = 'Failed to query database with groupid: ' + groupid;
				sails.log.error(err);
				return cb(Error(err));

			} else {

				if (groups.length != 0) {
					for (var i = 0; i < groups[0].user.length; i++) {
						if (user.id == groups[0].user[i].id) {
							err = 'user existed already';
							return cb(Error(err));
						}
					}
					groups[0].user.add(user);
					groups[0].save(function(err, s) {
						if (err) {
							console.log("user was failed to add to group:", err);
							return cb(Error(err));
						} else {
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


var remove_group_user = function(groupid, user, cb) {

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
					for (var i = 0; i < groups[0].user.length; i++) {
						if (user.id == groups[0].user[i].id) {
							groups[0].user.remove(user.id);
							groups[0].save(function(err, s) {
								if (err) {
									err = 'Failed to remove user and save' + user.id;
									sails.log.err(err);
									return cb(Error(err));
								} else {
									return cb(err);
								}
							});
						}
					}
				} else {
					err = 'The group is not existed';
					return cb(Error(err));
				}
			}
		});

};


module.exports = {

	add_user_to_group: function(req, res) {

		var user = req.session.user;
		var groupid = req.param('id');

		add_group_user(groupid, user, function(err) {
			if (err) {

				if (err == "user existed already") {
					return res.redirect('group/show/' + groupid);
				} else {
					err = 'Failed to add user to group:' + user;
					sails.log.error(err);
					return res.negotiate(err);
				}

			} else {
				return res.redirect('group/show/' + groupid);
			}

		});


	},

	remove_user_from_group: function(req, res) {

		var user = req.session.user;
		var groupid = req.param('id');

		remove_group_user(groupid, user, function(err) {
			if (err) {
				sails.log.error(err);
				return res.negotiate(err);
			} else {
				return res.redirect('group/show/' + groupid);
			}
		});
	},

	add_user_to_event: function(req, res) {
		console.log('create new user for event');
		var user = req.session.user;
		console.log(user);
		var eventid = req.param('id');
		Event.find({
			id: eventid
		}).populate('user').exec(function(err, events) {
			if (err) {
				err = 'Failed to query database with eventid: ' + eventid;
				sails.log.error(err);
				return res.negotiate(err);

			} else {

				if (events.length !== 0) {
					for (var i = 0; i < events[0].user.length; i++) {
						if (user.id === events[0].user[i].id) {
							return res.redirect('event/show/' + eventid);
						}
					}
					events[0].user.add(user);
					events[0].save(function(err, s) {
						if (err) {
							sails.log.error(err);
							return res.negotiate(err);
						} else {

							console.log('user was added to event successfully:',
								s);

							return res.redirect('event/show/' + eventid);
						}

					});
				} else {
					err = 'Failed to find event with eventid:' + eventid;
					sails.log.error(err);
					return res.negotiate(err);
				}
			}

		});
	},

	remove_user_from_event: function(req, res) {

		var user = req.session.user;
		var eventid = req.param('id');
		Event.find({
			id: eventid
		}).populate('user').exec(function(err, events) {
			if (err) {
				err = 'Failed to query database with eventid: ' + eventid;
				sails.log.error(err);
				return res.negotiate(err);

			} else {
				events[0].user.remove(user.id);
				events[0].save(function(err, s) {
					if (err) {
						sails.log.error(err);
						return res.negotiate(err);
					} else {

						console.log('user was removed from event successfully');
						return res.redirect('event/show/' + eventid);
					}
				});
			}
		});
	},


	show_my_event: function(req, res) {

		var user = req.session.user;

		User.find({
			id: user.id
		}).populate('events').exec(function(err, users) {

			if (err) {
				return res.negotiate(err);

			} else {
				var events = users[0].events;
				return res.view('calender', {
					events: events,
					user: user,
				});
			}

		});


	},


	show_my_group: function(req, res) {

		var user = req.session.user;

		console.log(user);

		User.find({
			id: user.id
		}).populate('group').exec(function(err, users) {

			if (err) {
				console.log('faild to find group');
				sails.log.error(err);
				return res.negotiate(err);
			} else {

				var groups = users[0].group;


				res.view('meetups', {
					meetups: groups,
					linkname: 'show',
					user: user,
					layout: 'layoutPromote.ejs'
				});

			}

		});

	},



};