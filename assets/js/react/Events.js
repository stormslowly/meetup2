var ICSUploader = React.createClass({
  displayName: 'ICSUploader',

  getInitialState: function () {
      return {

      };
  },

  ondragover: function() {
    console.log('logs','dragover');
    this.className = 'hover';
    return false;
  },
  ondragend: function() {
    this.className = '';
    return false;
  },
  ondrop: function(e) {
    this.className = '';
    e.preventDefault();
    readfiles(e.dataTransfer.files);
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("div", {id: "holder", onDragOver: this.ondragover}), 
        React.createElement("p", {id: "upload", className: "hidden"}, 
          React.createElement("label", null, "Drag&drop not supported, but you can still upload via this input field:", React.createElement("br", null), 
            React.createElement("input", {type: "file"})
          )
        ), 
        React.createElement("p", {id: "filereader"}, " File API & FileReader API not supported "), 
        React.createElement("p", {id: "formdata"}, " XHR2s FormData is not supported "), 
        React.createElement("p", {id: "progress"}, " XHR2s upload progress isnt supported "), 
        React.createElement("p", null, " Upload progress:", 
          React.createElement("progress", {id: "uploadprogress", min: "0", max: "100", value: "0"}, "0")
        ), 
        React.createElement("p", null, " Drag an image from your desktop on to the drop zone above to see the browser both render the preview, but also upload automatically to this server."
        )
      )
    );
  }
});


$(function() {

  React.render(React.createElement(ICSUploader, null), document.getElementById('newEvent'));

  var holder = document.getElementById('holder'),
    tests = {
      filereader: typeof FileReader != 'undefined',
      dnd: 'draggable' in document.createElement('span'),
      formdata: !!window.FormData,
      progress: "upload" in new XMLHttpRequest
    },
    support = {
      filereader: document.getElementById('filereader'),
      formdata: document.getElementById('formdata'),
      progress: document.getElementById('progress')
    },
    acceptedTypes = {
      'image/png': true,
      'image/jpeg': true,
      'image/gif': true
    },
    progress = document.getElementById('uploadprogress'),
    fileupload = document.getElementById('upload');

  "filereader formdata progress".split(' ').forEach(function(api) {
    if (tests[api] === false) {
      support[api].className = 'fail';
    } else {
      // FFS. I could have done el.hidden = true, but IE doesn't support
      // hidden, so I tried to create a polyfill that would extend the
      // Element.prototype, but then IE10 doesn't even give me access
      // to the Element object. Brilliant.
      support[api].className = 'hidden';
    }
  });

  function previewfile(file) {
    if (tests.filereader === true && acceptedTypes[file.type] === true) {
      var reader = new FileReader();
      reader.onload = function(event) {
        var image = new Image();
        image.src = event.target.result;
        image.width = 250; // a fake resize
        holder.appendChild(image);
      };

      reader.readAsDataURL(file);
    } else {
      holder.innerHTML += '<p>Uploaded ' + file.name + ' ' + (file.size ? (file.size / 1024 | 0) + 'K' : '');
      console.log(file);
    }
  }

  function readfiles(files) {
    var formData = tests.formdata ? new FormData() : null;
    for (var i = 0; i < files.length; i++) {
      if (tests.formdata) formData.append('file', files[i]);
      previewfile(files[i]);
    }

    // now post a new XHR request
    if (tests.formdata) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/devnull.php');
      xhr.onload = function() {
        progress.value = progress.innerHTML = 100;
      };

      if (tests.progress) {
        xhr.upload.onprogress = function(event) {
          if (event.lengthComputable) {
            var complete = (event.loaded / event.total * 100 | 0);
            progress.value = progress.innerHTML = complete;
          }
        }
      }

      xhr.send(formData);
    }
  }

  if (tests.dnd) {

    holder.ondragend = function() {
      this.className = '';
      return false;
    };
    holder.ondrop = function(e) {
      this.className = '';
      e.preventDefault();
      readfiles(e.dataTransfer.files);
    }
  } else {
    fileupload.className = 'hidden';
    fileupload.querySelector('input').onchange = function() {
      readfiles(this.files);
    };
  }



});
