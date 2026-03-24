let scanned = [];
let currentFrame = 0;

function preload() {
  for (let i = 1; i <= 2; i++) {
    scanned.push(loadImage("assets/20260320150300-" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(800, 500);
  eraseBg(scanned, 10); // erase background
  doodles = crop(scanned, 1700, 1100, 800, 520); // crop scanned file
}

function draw() {
  background(255);
  push()
  translate(400, 200) // position on canvas
  rotate(PI) // make it not upside down, skip if it's correct facing
  image(
    doodles[currentFrame],
    0, // start X
    0, // start Y
    doodles[0].width * 0.3, // size w
    doodles[0].height * 0.3 // size h
  );
  pop()

  currentFrame = floor(frameCount / 20 % 2) // animate 2 frames
}

// You shouldn't need to modify these helper functions:

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned
}
