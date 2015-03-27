'use strict';
var React = require('react');
var Dropzone = require('react-dropzone');

var EventForm = React.createClass({
  displayName: 'EventForm',
  render: function() {
    return (
      <div>
        <form className='form-horizontal' method='post' action='/newEvent' id='EventForm1'>
          <div className='form-group'>
            <label for='inputTopic' className='col-sm-2 control-label'>Topic</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control' id='inputTopic' name='Topic' placeholder='' />
            </div>
          </div>
          <div className='form-group'>
            <label for='inputOrganizer' className='col-sm-2 control-label'>Organizer</label>
            <div className='col-sm-8'>
              <select className='form-control' id='inputOrganizer' name='Group' placeholder=''>
                <option>group1</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            Date
            <div className='col-sm-8'>
              <input type='text' className='form-control' id='inputDate' name='Date' placeholder='' />
            </div>
          </div>
          <div className='form-group'>
            <label for='inputAddress' className='col-sm-2 control-label'>Address</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control' id='inputAddress' name='Address' placeholder='' />
            </div>
          </div>
          <div className='form-group'>
            <label for='inputEvent' className='col-sm-2 control-label'>Event</label>
            <div className='col-sm-8'>
              <textarea className='form-control col-sm-8' rows='10' id='inputEvent' name='Event'></textarea>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button type='submit' className='btn btn-default' form='EventForm1'>Public</button>
            </div>
          </div>
        </form>
        <form className='form-horizontal' method='post' action='/newEvent' id='EventForm1'>
          <div className='form-group'>
            <label for='inputTopic' className='col-sm-2 control-label'>Topic</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control' id='inputTopic' name='Topic' placeholder='' />
            </div>
          </div>
          <div className='form-group'>
            <label for='inputOrganizer' className='col-sm-2 control-label'>Organizer</label>
            <div className='col-sm-8'>
              <select className='form-control' id='inputOrganizer' name='Group' placeholder=''>
                <option>group1</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <label for='inputDate' className='col-sm-2 control-label'>Date</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control' id='inputDate' name='Date' placeholder='' />
            </div>
          </div>
          <div className='form-group'>
            <label for='inputAddress' className='col-sm-2 control-label'>Address</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control' id='inputAddress' name='Address' placeholder='' />
            </div>
          </div>
          <div className='form-group'>
            <label for='inputEvent' className='col-sm-2 control-label'>Event</label>
            <div className='col-sm-8'>
              <textarea className='form-control col-sm-8' rows='10' id='inputEvent' name='Event'></textarea>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button type='submit' className='btn btn-default' form='EventForm1'>Public</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

var DropzoneDemo = React.createClass({
  onDrop: function(files) {
    console.log('Received files: ', files);
    var formData = new FormData();
    formData.append('ics', files[0]);

    // var icsfiles = files.filter(function(file){
    //   return  file.name.indexOf('.ics');
    // });
    console.log('logs', formData);
    $.ajax({
      type: 'POST',
      url: '/event/upload',
      data: formData,
      processData: false,
      contentType: false
    }).done(function(msg) {
      console.log('msg', msg);
    }).fail(function() {
      console.log('logs', arguments);
    });

  },
  render: function() {
    var uploadICS = (
    <div>
      <Dropzone onDrop={this.onDrop} size={150}>
        <div>Try dropping Caldender file(*.ics),
          <br/> or click to select files to upload.</div>
      </Dropzone>
    </div>

    );
    return uploadICS;
  }
});

React.render(<DropzoneDemo />, document.getElementById('createEvent'));
