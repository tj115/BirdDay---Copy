// CREDIT FOR MICROPHONE CODE
// Travis Holliday
// https://codepen.io/travisholliday/pen/gyaJk
var navigator = window.navigator;
navigator.getUserMedia_ = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;
if (navigator.getUserMedia_) {
  navigator.getUserMedia({
      audio: true
    },
    function(stream) {
      var fire0 = document.getElementById("fire0");
      var fire1 = document.getElementById("fire1");
      var fire2 = document.getElementById("fire2");
      var fire3 = document.getElementById("fire3");
      var fire4 = document.getElementById("fire4");
      
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(stream);
      javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);
    
      var flameTimer = 0;

      javascriptNode.onaudioprocess = function() {
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          var values = 0;

          var length = array.length;
          for (var i = 0; i < length; i++) {
            values += (array[i]);
          }

          var average = values / length;
        
          if (flameTimer <= 50) flameTimer++;
          if ((average < 5) && (flameTimer > 50) && (fire4.style.display != "none")) {
            flameTimer = 0;
            fire0.style.display = "block";
            fire1.style.display = "block";
            fire2.style.display = "block";
            fire3.style.display = "block";
            fire4.style.display = "block";
          }
        
          if (average > 5) fire0.style.display = "none";
          if (average > 10) fire1.style.display = "none";
          if (average > 15) fire2.style.display = "none";
          if (average > 20) fire3.style.display = "none";
          if (average > 30) fire4.style.display = "none";

        } // end fn stream
    },
    function(err) {
      console.log("The following error occured: " + err.name)
    });
} else {
  console.log("getUserMedia not supported");
}