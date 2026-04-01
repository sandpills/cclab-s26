let c = [];

function setup() {
  createCanvas(400, 400);
  // c = new Cloud(200, 200, 100)
}

function mousePressed() {
  c.push(new Cloud(mouseX, mouseY, 60))
}

function draw() {
  background(150,125,255);
  text(c.length, 50, 50);
  for (let i = 0; i < c.length; i++) {
    c[i].move();
    c[i].display();
  }
}

class Cloud {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
  }
  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  display() {
    push()
    translate(this.x, this.y)
    // rotate(frameCount * 0.05)
    noStroke()
    fill(200,220,150)
    circle(0, 0, this.s)
    
    for(let a = 0; a < 2*PI; a += PI/4 ){
      push();
      rotate(a);
      circle(this.s * 0.4, this.s * 0.1, this.s * 0.5);
      pop();
    }
    
    // blushes
    noStroke()
    fill(255,10,255,100)
    ellipse(0 - this.s/4,0 + this.s/20, this.s/8, this.s/10)
    ellipse(0 + this.s/4,0 + this.s/20, this.s/8, this.s/10)
    
    // eyes
    noStroke();
    fill(0);   
    circle(0 - this.s/5, 0, this.s/10);
    circle(0 + this.s/5, 0, this.s/10);

    stroke(0)
    noFill()
    strokeWeight(this.s/20)
    arc(0, 0 + this.s/10, this.s/5, this.s/10, 0, PI)
    pop()
    }
}

// let cloudX;
// let cloudY;

// function setup() {
//   createCanvas(400, 400);
//   cloudX = width/2;
//   cloudY = height/2;
// }

// function draw() {
//   background(150,125,255);
  
//   drawCloud(cloudX, cloudY, 100)

// }

// function drawCloud(x, y, s) {
//   push()
//   translate(x, y)
//   // rotate(frameCount * 0.05)
//   noStroke()
//   fill(200,220,150)
//   circle(0, 0, s)
  
//   for(let a = 0; a < 2*PI; a += PI/4 ){
//     push();
//     rotate(a);
//     circle(s * 0.4, s * 0.1, s * 0.5);
//     pop();
//   }
  
//   // blushes
//   noStroke()
//   fill(255,10,255,100)
//   ellipse(0 - s/4,0 + s/20,s/8,s/10)
//   ellipse(0 + s/4,0 + s/20,s/8,s/10)
  
//   // eyes
//   noStroke();
//   fill(0);   
//   circle(0 - s/5, 0, s/10);
//   circle(0 + s/5, 0, s/10);

//   stroke(0)
//   noFill()
//   strokeWeight(s/20)
//   arc(0, 0 + s/10, s/5, s/10, 0, PI)
//   pop()
// }