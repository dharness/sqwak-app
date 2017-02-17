if (navigator.mediaDevices) {
  console.log('getUserMedia supported.');

  var constraints = { audio: true };
  var chunks = [];

  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {

    var mediaRecorder = new window.MediaRecorder(stream);

    // record.onclick = function() {
    //   mediaRecorder.start();
    //   console.log(mediaRecorder.state);
    //   console.log("recorder started");
    //   record.style.background = "red";
    //   record.style.color = "black";
    // }

    // stop.onclick = function() {
    //   mediaRecorder.stop();
    //   console.log(mediaRecorder.state);
    //   console.log("recorder stopped");
    //   record.style.background = "";
    //   record.style.color = "";
    // }

    mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

      var clipName = prompt('Enter a name for your sound clip');

      var clipContainer = document.createElement('article');
      var clipLabel = document.createElement('p');
      var audio = document.createElement('audio');
      var deleteButton = document.createElement('button');
     
      clipContainer.classList.add('clip');
      audio.setAttribute('controls', '');
      deleteButton.innerHTML = "Delete";
      clipLabel.innerHTML = clipName;

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);
      // soundClips.appendChild(clipContainer);

      audio.controls = true;
      var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
      chunks = [];
      var audioURL = URL.createObjectURL(blob);
      audio.src = audioURL;
      console.log("recorder stopped");

      // deleteButton.onclick = function(e) {
      //   evtTgt = e.target;
      //   evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
      // }
    }

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    }
  })
  .catch(function(err) {
    console.log('The following error occured: ' + err);
  })
}


const recorder = {
  borwserIsSupported() {
    return navigator.mediaDevices !== undefined;
  },
  init() {
    const constraints = { audio: true };
    return navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        const mediaRecorder = new window.MediaRecorder(stream);
        return mediaRecorder;
      });
  }
};
export default recorder