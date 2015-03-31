'use strict';
var React = require('react');
var EventForm = React.createClass({
  displayName: 'EventForm',
  render: function() {
    var event = this.props.event || {};
    var groups = this.props.groups || [];
    var groupOptions = groups.map(function(group, i) {
      return (<option key={i}>{group.name}</option>)
    });
    return (
      <div>
        <form className='form-horizontal' id='EventForm1'>
          <div className='form-group'>
            <label htmlFor='inputTopic' className='col-sm-2 control-label'>Topic</label>
            <div className='col-sm-8'>
              <input value={event.topic} type='text' className='form-control' id='inputTopic' name='Topic' placeholder='' />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='inputOrganizer' className='col-sm-2 control-label'>Organizer</label>
            <div className='col-sm-8'>
              <select className='form-control' id='inputOrganizer' name='Group' placeholder=''>
                {groupOptions}
              </select>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='inputDate' className='col-sm-2 control-label'>Date</label>
            <div className='col-sm-8'>
              <input value={event.start} type='text' className='form-control' id='inputDate' name='Date' placeholder='' />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='inputAddress' className='col-sm-2 control-label'>Address</label>
            <div className='col-sm-8'>
              <input value={event.address} type='text' className='form-control' id='inputAddress' name='Address' placeholder='' />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='inputEvent' className='col-sm-2 control-label'>Event</label>
            <div className='col-sm-8'>
              <textarea value={event.desc} className='form-control col-sm-8' rows='10' id='inputEvent' name='Event'></textarea>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button onClick={this.props.onClick} type='submit' className='btn btn-default' form='EventForm1'>Public</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = EventForm;