function setup() {
  createCanvas(400, 400);
}

function draw() {
  square(mouseX, mouseY, width / 10);
  circle(pmouseX, pmouseY, width / 10);
}
