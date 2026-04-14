let c = [];
let b = [];
let yay;

function preload() {
  yay = loadSound("yay.wav")
}

function setup() {
  createCanvas(400, 400);
  // c = new Cloud(200, 200, 100)
}

function mousePressed() {
  c.push(new Cloud(mouseX, mouseY, random(40, 80)))
  // b.push(new Firework(mouseX, mouseY))
}

function draw() {
  background(150, 125, 255);
  text(b.length, 50, 50);

  // if (mouseIsPressed) {
  //   b.push(new Firework(mouseX, mouseY));
  // }

  for (let i = 0; i < b.length; i++) {
    b[i].update();
    b[i].display();
  }

  for (let i = 0; i < c.length; i++) {
    for (let j = 0; j < c.length; j++) {
      if (j != i) {
        c[i].checkCollision(c[j]);
      }
    }
    if (c[i].isRaining) {
      b.push(new Firework(c[i].x, c[i].y));
    }
    c[i].move();
    c[i].display();
  }

  for (let i = c.length - 1; i >= 0; i--) {
    if (c[i].isDone) {
      c.splice(i, 1)
    }
  }

  for (let i = b.length - 1; i >= 0; i--) {
    if (b[i].isDone) {
      b.splice(i, 1);
    }
  }
}
