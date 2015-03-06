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
      linkname: 'show'
    });
  },

  calender:function function_name (req,res) {
    
    Event.find({}, function (err, events) {
      console.log(events);
      res.view('calender', {events:events});
    });
    
  },


  show: function function_name(req, res) {
    console.log('come to showlayner');

    Event.find({}, function(err, events) {
      console.log(events);
      res.view('detail', {
        events: events,
        layout: null
      });
    });

  },

  createEvent: function function_name(req, res) {

    console.log('create some event');

    var newEvent = {
      eventTopic: 'Clean Code Contest 2015',
      eventDesc:' Clean Code Contest', 
      eventOrganizer:'Shu Pengfei',
      eventAddress: "Boston@16F",
      eventDate: 2015-3-4
    };

    Event.create(newEvent, function(err, evt) {
      if (err) {
        console.log(err);
      }
      console.log('Event create successfully' + JSON.stringify(evt));
      res.view('EventCreated', {
        events: evt,
        layout: null
      });

    });
    
  },

  cleanEvent: function function_name(req, res){

    Event.destroy({id:{'>':1}}).exec(function deleteCB(err){
      console.log(' records has been deleted');
    });
  },

};
