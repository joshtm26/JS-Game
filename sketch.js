//NOTICE
//you can press the up and down arrows to speed up and slow down the orbit speeds

let mercSpeed = 0.5;
let venusSpeed = 0.35;
let earthSpeed = 0.3;
let marsSpeed = 0.25;
let mercAngle = 0;
let venusAngle = 0;
let earthAngle = 0;
let marsAngle = 0;
let cometX = 100;
let cometY = 100;
let count = 0;

let stars = [];

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);

  for (let i = 0; i < 800; i++) {
    let star = {
      x: random(width),
      y: random(height),
      r: random(3),
    };
    stars.push(star);
  }
}

function draw() {
  background(5, 0, 43);

  for (let i = 0; i < stars.length; i++) {
    fill(255);
    noStroke();
    circle(stars[i].x, stars[i].y, stars[i].r);
  }

  //comet
  noStroke();
  fill(158, 225, 255, 100);
  quad(cometX + -6, cometY + -4, cometX + 7, cometY, cometX + 15, cometY + -30);
  fill(82, 192, 232);
  circle(cometX, cometY, 15);
  cometX = cometX + -4;
  cometY = cometY + 8;
  count = count + 1;
  if (cometY + -30 > height && count > 200) {
    cometY = -50;
    cometX = random(width);
    count = 0;
  }

  //sun
  fill(255, 189, 22);
  circle(400, 300, 100);

  //mercury
  stroke(255);
  noFill();
  ellipse(400, 300, 215, 70);
  push();
  translate(width / 2, height / 2);
  rotate(mercAngle);
  mercAngle = mercAngle + mercSpeed;
  pop();
  noStroke();
  fill(175);
  circle(400 + cos(mercAngle) * 107.5, 300 + sin(mercAngle) * 35, 22);

  //venus
  stroke(255);
  noFill();
  ellipse(400, 300, 350, 140);
  push();
  translate(width / 2, height / 2);
  rotate(venusAngle);
  venusAngle = venusAngle + venusSpeed;
  pop();
  noStroke();
  fill(255, 223, 145);
  circle(400 + cos(venusAngle) * 175, 300 + sin(venusAngle) * 70, 33);

  //earth
  stroke(255);
  noFill();
  ellipse(400, 300, 500, 214);
  push();
  translate(width / 2, height / 2);
  rotate(earthAngle);
  earthAngle = earthAngle + earthSpeed;
  pop();
  noStroke();
  fill(66, 140, 255);
  circle(400 + cos(earthAngle) * 250, 300 + sin(earthAngle) * 107, 40);
  fill(76, 214, 51);
  circle(403 + cos(earthAngle) * 250, 290 + sin(earthAngle) * 107, 17);
  circle(395 + cos(earthAngle) * 250, 295 + sin(earthAngle) * 107, 15);
  circle(400 + cos(earthAngle) * 250, 303 + sin(earthAngle) * 107, 12);
  circle(405 + cos(earthAngle) * 250, 306 + sin(earthAngle) * 107, 10);
  circle(401 + cos(earthAngle) * 250, 313 + sin(earthAngle) * 107, 12);

  //mars
  stroke(255);
  noFill();
  ellipse(400, 300, 650, 300);
  push();
  translate(width / 2, height / 2);
  rotate(marsAngle);
  marsAngle = marsAngle + marsSpeed;
  pop();
  noStroke();
  fill(232, 84, 74);
  circle(400 + cos(marsAngle) * 325, 300 + sin(marsAngle) * 150, 30);

  //top sun cover
  //stroke(255);
  fill(255, 189, 22);
  arc(400, 300, 100, 100, 180, 0);

  //speed up
  if (keyIsDown(38)) {
    mercSpeed = mercSpeed * 1.1;
    venusSpeed = venusSpeed * 1.1;
    earthSpeed = earthSpeed * 1.1;
    marsSpeed = marsSpeed * 1.1;
  }

  //slow down
  if (keyIsDown(40)) {
    mercSpeed = mercSpeed * 0.9;
    venusSpeed = venusSpeed * 0.9;
    earthSpeed = earthSpeed * 0.9;
    marsSpeed = marsSpeed * 0.9;
  }
}
