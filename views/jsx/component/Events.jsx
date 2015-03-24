var ICSUploader = React.createClass({
  displayName: 'ICSUploader',
  render: function() {
    return (
      <div className="container">
        <span className="btn btn-success fileinput-button">
            <i className="glyphicon glyphicon-plus"></i>
            <span>Just drap and Drop your *.ics file Here</span>
            <input id="fileupload" type="file" name="calender"  />
        </span>
        <br/>
        <div id="progress" className="progress">
            <div className="progress-bar progress-bar-success"></div>
        </div>
        <div id="files" className="files"></div>
     </div>
    );
  }
});


$(function(){
React.render(<ICSUploader />, document.getElementById('newEvent'));

$('#fileupload').fileupload({
        url: '/calender/upload',
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo('#files');
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');

});