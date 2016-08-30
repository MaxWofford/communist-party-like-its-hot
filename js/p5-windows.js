var windowsSketch = function(p) {
  var windowsImages, windowSpeed;
  var windowsSprites = [];

  p.preload = function() {
    windowSpeed = p.windowWidth / 100;

    windowsImages = [];
    windowsImages.push(p.loadImage('assets/window-1.png'));
    windowsImages.push(p.loadImage('assets/window-2.png'));
  };

  p.setup = function() {
    initializeCanvas();

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
        window.velocity.x = -Math.abs(window.velocity.x);
      }
      if (window.position.x < 0) {
        window.velocity.x = Math.abs(window.velocity.x);
      }
      if (window.position.y + window.img.height > p.height) {
        window.velocity.y = -Math.abs(window.velocity.y);
      }
      if (window.position.y < 0) {
        window.velocity.y = Math.abs(window.velocity.y);
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

  var initializeCanvas = function() {
    document.querySelector('#windows').innerHtml = '';
    var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('windows');
    p.frameRate(10);
    p.background('#008080');
  };

  p.windowResized = function() {
    initializeCanvas();
  };
};

new p5(windowsSketch);
