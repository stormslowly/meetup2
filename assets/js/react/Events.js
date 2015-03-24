var ICSUploader = React.createClass({
  displayName: 'ICSUploader',
  render: function() {
    return (
      React.createElement("div", {className: "container"}, 
        React.createElement("span", {className: "btn btn-success fileinput-button"}, 
            React.createElement("i", {className: "glyphicon glyphicon-plus"}), 
            React.createElement("span", null, "Just drap and Drop your *.ics file Here"), 
            React.createElement("input", {id: "fileupload", type: "file", name: "calender"})
        ), 
        React.createElement("br", null), 
        React.createElement("div", {id: "progress", className: "progress"}, 
            React.createElement("div", {className: "progress-bar progress-bar-success"})
        ), 
        React.createElement("div", {id: "files", className: "files"})
     )
    );
  }
});


$(function(){
React.render(React.createElement(ICSUploader, null), document.getElementById('newEvent'));

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