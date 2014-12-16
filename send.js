var SMTPConnection = require('smtp-connection');


var con = new SMTPConnection({
  secure: false,
  ignoreTLS: true
});


con.connect(function(cn) {
  console.log(con);
  console.log('connected');


  con.send({
    from: 'super@helo.com',
    to: 'test@CGQP1N1'
  }, 'this is a long mail ', function(err, info) {
    console.log('send?:', err, info);
    con.close();
  });
});