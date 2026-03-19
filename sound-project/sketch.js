let beat;
let song;
let amplitude;
let mic;

function preload() {
  beat = loadSound("assets/beat.mp3")
  song = loadSound("assets/song.mp3")
}

function setup() {
  createCanvas(400, 400);
  amplitude = new p5.Amplitude();
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(220);
  let level = mic.getLevel();

  console.log(level);

  fill(0)
  let dia = map(level, 0.0, 0.5, 40, 200)

  circle(200, 200, dia)

  // let pan = map(mouseX, 0, width, -1.0, 1.0);
  // song.pan(pan);

  // let rate = map(mouseY, 0, height, 0.5, 2.0)
  // beat.rate(rate)
}

// function mousePressed() {
//   if (!song.isPlaying()) {
//     song.loop();
//   }
// }
