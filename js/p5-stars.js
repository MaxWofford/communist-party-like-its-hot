var starSketch = function(p) {
  var starSpeed, maxDepth, stars, starCount, maxIterations, hackClubOutline;
  var actualIter = 0;

  p.preload = function() {
    hackClubOutline = p.loadImage('assets/hack-club-outline.png');
  };

  p.setup = function() {
    maxDepth = 2000;
    starCount = 1000;
    maxRadius = 12;
    maxIterations = 25;
    p.noStroke();
    initializeStarfield();
  };

  var initializeStarfield = function() {
    document.querySelector('#starfield').innerHtml = '';
    var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('starfield');
    p.translate(p.width / 2, p.height / 2);
    stars = new Array(starCount);
    for (var i = 0; i < starCount; i++) {
      stars[i] = new Star();
    }
  };

  p.windowResized = function() {
    initializeStarfield();
  };

  p.draw = function() {
    p.background(0);
    starSpeed = (window.scrollY / p.height * 30) + 15;

    for (var i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].draw();
    }

    // Logo iterations should max out when the mouseY is at the center of the sketch, and decrease when the mouse gets further away;
    var targetIter = Math.max(Math.ceil((p.height - 2 * Math.abs((p.height / 2) - p.mouseY)) / (p.height / maxIterations)), 1);

    if (targetIter != actualIter) {
      if (targetIter - actualIter > 0) {
        actualIter++;
      } else {
        actualIter--;
      }
    }

    for (var x = 0; x < actualIter; x++) {
      var scale = (0.5 + 0.05 * x * (x * 0.5));
      var imgWidth = hackClubOutline.width * scale;
      var imgHeight = hackClubOutline.height * scale;
      p.image(hackClubOutline, // p5 image object
              -(imgWidth/2),   // x-offset
              -(imgHeight/2),  // y-offset
              imgWidth,        // image width
              imgHeight        // image height
             );
    }
  };

  var Star = function() {
    this.reset = function() {
      this.x = p.random(-p.width/2, p.width/2);
      this.y = p.random(-p.height/2, p.height/2);
      this.r = p.random(maxRadius);
    };

    this.update = function() {
      this.z -= starSpeed;
      if(this.z < 1) {
        this.z = maxDepth;
        this.reset();
      }
    };

    this.draw = function() {
      var sx = p.map(this.x / this.z, 0, 1, 0, p.width);
      var sy = p.map(this.y / this.z, 0, 1, 0, p.height);
      var r = p.map(this.z, 0, maxDepth, this.r, 0);
      p.fill((this.z / maxDepth * 155) + 100);
      p.ellipse(sx, sy, r, r);
    };

    this.r = p.random(maxRadius);
    this.z = p.random(maxDepth);
    this.reset();
  };

};

new p5(starSketch);
