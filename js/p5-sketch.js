var starSpeed, maxDepth, stars, starCount, maxIterations;

function preload() {
  hackClubOutline = loadImage('assets/hack-club-outline.png');

  // starscapeMusic = loadSound('assets/starscapeMusic.mp3'));
  // beachMusic = loadSound('assets/beachMusic.mp3'));
}

var transitionSound = function(oldSong, newSong) {
  for (var i = 0; i < 11; i++) {
    let x = i;
    setTimeout(function() {
      oldSong.setVolume(1 - x / 10);
      newSong.setVolume(x / 10);
    }, x * 100);
  }
};

function setup() {
  // starscapeMusic.loop();
  // starscapeMusic.setVolume(1);
  // beachMusic.loop();
  // beachMusic.setVolume(0);

  maxDepth = 2000;
  starCount = 1000;
  maxRadius = 12;
  maxIterations = 25;
  noStroke();
  initializeStarfield();
}

function initializeStarfield() {
  document.querySelector('#starfield').innerHtml = '';
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('starfield');
  translate(width / 2, height / 2);
  stars = new Array(starCount);
  for (var i = 0; i < starCount; i++) {
    stars[i] = new Star();
  }
}

function windowResized() {
  initializeStarfield();
}

function draw() {
  background(0);
  starSpeed = (window.scrollY / height * 30) + 15;

  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].draw();
  }

  // Logo iterations should be the maxIterations when the mouse is at the center of the screen, and decrease when the mouse gets further away;
  var logoIterations = Math.max(Math.ceil((height - 2 * Math.abs((height / 2) - mouseY)) / (height / maxIterations)), 1);
  for (var x = 0; x < logoIterations; x++) {
    var scale = (0.5 + 0.05 * x * (x * 0.5));
    var imgWidth = hackClubOutline.width * scale;
    var imgHeight = hackClubOutline.height * scale;
    image(hackClubOutline, // p5 image object
          -(imgWidth/2),   // x-offset
          -(imgHeight/2),  // y-offset
          imgWidth,        // image width
          imgHeight        // image height
         );
  }
}

function Star() {
  this.reset = function() {
    this.x = random(-width/2, width/2);
    this.y = random(-height/2, height/2);
    this.r = random(maxRadius);
  };

  this.update = function() {
    this.z -= starSpeed;
    if(this.z < 1) {
      this.z = maxDepth;
      this.reset();
    }
  };

  this.draw = function() {
    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);
    var r = map(this.z, 0, maxDepth, this.r, 0);
    fill((this.z / maxDepth * 155) + 100);
    ellipse(sx, sy, r, r);
  };

  this.r = random(maxRadius);
  this.z = random(maxDepth);
  this.reset();
}
