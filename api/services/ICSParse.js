'use strict';
var icsParser = require('vdata-parser');
var fs = require('fs');

var pureKeys = function(vData) {
  for (var key in vData) {
    if (vData.hasOwnProperty(key)) {
      var index = key.indexOf(';');
      if (index !== -1) {
        var value = vData[key];

        vData[key.slice(0, index)] = value;
        delete vData[key];
      }
    }
  }
};

var textify = function(string) {
  return string.replace(/\\n/g, '\n')
    .replace(/\\,/g, ',');
};

var reg = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})\w*$/;
var timeOffsetInMinutes = new Date().getTimezoneOffset();

var DT2Date = function(str) {


  var matchs = reg.exec(str);
  matchs = matchs.slice(1);
  var year = parseInt(matchs[0]);
  var month = parseInt(matchs[1]);
  var date = parseInt(matchs[2]);
  var hour = parseInt(matchs[3]);
  var minute = parseInt(matchs[4]);
  var second = parseInt(matchs[5]);

  return new Date(year, month - 1, date, hour, minute -
    timeOffsetInMinutes,
    second);
};


module.exports = {

  icsFiletoEvent: function(fileName, callback) {
    var self = this;
    fs.readFile(fileName, 'utf-8', function(err, content) {
      if (err) {
        return callback(err);
      }

      try {
        var event = self.icsStringtoEvent(content);
        callback(null, event);
      } catch (err) {
        callback(err);
      }

    });

  },


  icsStringtoEvent: function(string) {
    var vEvent = icsParser.fromString(string).VCALENDAR.VEVENT;
    pureKeys(vEvent);

    return {
      topic: vEvent.SUMMARY,
      desc: textify(vEvent.DESCRIPTION),
      start: DT2Date(vEvent.DTSTART),
      end: DT2Date(vEvent.DTEND),
      address: textify(vEvent.LOCATION)
    };

  }
};