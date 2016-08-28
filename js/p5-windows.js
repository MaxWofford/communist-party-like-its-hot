var windowsSketch = function(p) {
  var windowsImages, windowSpeed;
  var windowsSprites = [];

  p.preload = function() {
    windowSpeed = p.width;

    windowsImages = [];
    windowsImages.push(p.loadImage('assets/window-1.png'));
  };

  p.setup = function() {
    document.querySelector('#windows').innerHtml = '';
    var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('windows');
    p.frameRate(3);

    for (var i = 0; i < windowsImages.length; i++) {
      var img = windowsImages[i];
      windowsSprites.push({
        img: img,
        position: {
          x: p.width / 2,
          y: p.height / 2
        },
        velocity: {
          x: windowSpeed * p.random(-1, 1),
          y: windowSpeed * p.random(-1, 1)
        }
      });
    };
  };

  p.draw = function() {
    for (var i = 0; i < windowsSprites.length; i++) {
      var window = windowsSprites[i];
      if (window.position.x + window.img.width > p.width) {
        window.velocity.x = -windowSpeed;
      }
      if (window.position.x < 0) {
        window.velocity.x = windowSpeed;
      }
      if (window.position.y + window.img.height > p.height) {
        window.velocity.y = -windowSpeed;
      }
      if (window.position.y < 0) {
        window.velocity.y = windowSpeed;
      }

      window.position.x += window.velocity.x;
      window.position.y += window.velocity.y;

      p.image(window.img,
              window.position.x,
              window.position.y,
              window.width,
              window.height
             );
    }
  };
};

new p5(windowsSketch);
