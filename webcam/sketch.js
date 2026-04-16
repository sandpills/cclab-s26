let cam;
let s = 20;
let chars = [" ", "。", "一", "二", "三", "木", "水", "林", "森", "爱"];

function setup() {
  createCanvas(640, 480); // default dimensions of webcam
  cam = createCapture(VIDEO);
  cam.hide()
}
function draw() {
  background(255);
  push();
  scale(-1, 1);
  translate(-width, 0);
  // image(cam, 0, 0);
  cam.loadPixels();

  for (let y = 0; y <= height; y += s) {
    for (let x = 0; x <= width; x += s) {

      let index = (x + y * cam.width) * 4
      let r = cam.pixels[index];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      let avg = (r + g + b) / 3
      let charIndex = floor(map(avg, 0, 255, 0, chars.length))
      fill(0, 0, 255)
      textSize(16);
      push();
      text(chars[charIndex], x, y)
      pop();


      // let size = map (avg, 0, 255, 0, s)

      // fill(255, 0, b);
      // circle(x, y, size)
    }
  }
  pop();
}
