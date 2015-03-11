'use strict';

module.exports = {

    create: function(req, res) {

        res.view('EventPublic', {title:'Event Public'});
    },

    show: function(req, res) {
        console.log('come to showlayner');

        Event.find({}, function(err, events) {
            console.log(events);
            res.view('detail', {
                events: events,
                layout: null
            });
        });

    },

    createEvent: function(req, res) {

        console.log('create some event');

        var newEvent = {
            eventTopic: 'Clean Code Contest 2015',
            eventDesc: ' Clean Code Contest',
            eventOrganizer: 'Shu Pengfei',
            eventAddress: 'Boston@16F',
            eventDate: 2015 - 3 - 4
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

    }

};
