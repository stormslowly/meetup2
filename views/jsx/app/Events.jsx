var React = require('react');
var Dropzone = require('react-dropzone');

var DropzoneDemo = React.createClass({
  onDrop: function(files) {
    console.log('Received files: ', files);
    var formData = new FormData();
    formData.append('ics', files[0]);

    var icsfiles = files.filter(function(file){
      return  file.name.indexOf('.ics');
    })

    console.log('logs',formData);
    $.ajax({
      type: 'POST',
      url: '/uploader/event',
      data: formData,
      processData: false,
      contentType: false,
    }).done(function(msg) {
      console.log('msg', msg);
    }).fail(function() {
      console.log('logs', 'failed');
    });

  },

  render: function() {
    return (
      <div>
            <Dropzone onDrop={this.onDrop} size={150} >
              <div>Try dropping Caldender file(*.ics),
              <br/> or click to select files to upload.</div>
            </Dropzone>
      </div>
    );
  }
});


React.render(<DropzoneDemo />,
  document.getElementById('createEvent'));
