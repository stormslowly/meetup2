'use strict';
var mailin = require('mailin');

/* Start the Mailin server. The available options are:
 *  options = {
 *     port: 25,
 *     webhook: 'http://mydomain.com/mailin/incoming,
 *     disableWebhook: false,
 *     logFile: '/some/local/path',
 *     logLevel: 'warn', // One of silly, info, debug, warn, error
 *     smtpOptions: { // Set of options directly passed to simplesmtp.createServer(smtpOptions)
 *        SMTPBanner: 'Hi from a custom Mailin instance'
 *     }
 *  };
 * Here disable the webhook posting so that you can do what you want with the
 * parsed message. */

/* Access simplesmtp server instance. */
mailin.on('validateRecipient', function(connection, toEmail, done) {
  done(null, true);
});

mailin.on('validateSender', function(connection, fromEmail, done) {
  done(null, true);
});

/* Event emitted when a connection with the Mailin smtp server is initiated. */
mailin.on('startMessage', function(connection) {
  /* connection = {
      from: 'sender@somedomain.com',
      to: 'someaddress@yourdomain.com',
      id: 't84h5ugf',
      authentication: { username: null, authenticated: false, status: 'NORMAL' }
  }
  }; */
  console.log(connection);
});

/* Event emitted after a message was received and parsed. */
mailin.on('message', function(connection, data) {
  console.log(data);
});

mailin.on('dataReady', function(connection) {
  console.log('end data');

});

mailin.start({
  port: 25,
  disableWebhook: true, // Disable the webhook posting.
  // logLevel: 'debug',
  // debug: 'true',
  smtpOptions: {
    disableDNSValidation: true
  }
});
