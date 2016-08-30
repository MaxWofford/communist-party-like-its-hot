var musicSketch = function(p) {
  p.preload = function() {
    // starscapeMusic = loadSound('assets/starscapeMusic.mp3');
    // beachMusic = loadSound('assets/beachMusic.mp3');
    p.noCanvas();
  };

  p.setup = function() {
    // starscapeMusic.loop();
    // starscapeMusic.setVolume(0);
    // beachMusic.loop();
    // beachMusic.setVolume(0);
  };

  var fadeOut = function(song) {
    for (var i = 0; i < 11; i++) {
      let x = i;
      setTimeout(function() {
        song.setVolume(1 - x / 10);
      }, x * 100);
    }
  };

  var fadeIn = function(song) {
    for (var i = 0; i < 11; i++) {
      let x = i;
      setTimeout(function() {
        song.setVolume(x / 10);
      }, x * 100);
    }
  };

};

new p5(musicSketch);
