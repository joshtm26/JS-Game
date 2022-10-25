//TO DO

//back and forth dashing/stepping
//reset positions and display text for winner when sword hits player
//2 attacks: a slower poke or longer swipe and quick forward down swing
//animations for movement, attacking, and maybe idle
//ending lag for the actions somehow
//make the weapons look better (two different weapons?)
//add sounds to the actions
//make a background maybe
//maybe make it not stick people

let bg;
let ldx = 0;
let ldy = 0;
let rdx = 0;
let rdy = 0;

// function preload() {
//   bg = loadImage("assets/stage.jpg");
// }

function setup() {
  createCanvas(800, 400);
  angleMode(DEGREES);
  //image(bg, 0, 0, width, height, 0, 0, bg.width, bg.height, COVER);
}

function draw() {
  background(200);

  fill(0);
  stroke(0);
  strokeWeight(10);

  lDude();
  lSword();
  rDude();
  rSword();

  //A
  if (keyIsDown(65) && ldx >= -60) {
    ldx = ldx - 5;
  }
  //D 68
  if (keyIsDown(68) && ldx >= -70) {
    ldx = ldx + 5;
  }
  //Left arrow
  if (keyIsDown(LEFT_ARROW) && rdx <= 70) {
    rdx = rdx - 5;
  }
  //Right arrow
  if (keyIsDown(RIGHT_ARROW) && rdx <= 60) {
    rdx = rdx + 5;
  }
  //W/S and Up/Down arrows are going to be the two attacks
}

function lDude() {
  fill(0);
  stroke(0);
  circle(ldx + 105, ldy + 160, 50);
  line(ldx + 100, ldy + 150, ldx + 90, ldy + 260);
  //legs
  line(ldx + 90, ldy + 260, ldx + 80, ldy + 305);
  line(ldx + 80, ldy + 305, ldx + 60, ldy + 350);
  line(ldx + 90, ldy + 260, ldx + 115, ldy + 305);
  line(ldx + 115, ldy + 305, ldx + 110, ldy + 350);
  //arms
  line(ldx + 96, ldy + 210, ldx + 112, ldy + 240);
  line(ldx + 112, ldy + 240, ldx + 140, ldy + 250);
  line(ldx + 96, ldy + 202, ldx + 120, ldy + 230);
  line(ldx + 120, ldy + 230, ldx + 145, ldy + 235);
}

function lSword() {
  fill(0);
  noStroke();
  quad(ldx + 135, ldy + 260, ldx + 143, ldy + 262, ldx + 153, ldy + 225, ldx + 145, ldy + 223);
  fill(240);
  quad(ldx + 153, ldy + 225, ldx + 145, ldy + 223, ldx + 177, ldy + 103, ldx + 182, ldy + 115);
}

function rDude() {
  fill(0);
  stroke(0);
  circle(rdx + 695, 160, 50);
  line(rdx + 700, 150, rdx + 710, 260);
  //legs
  line(rdx + 710, 260, rdx + 720, 305);
  line(rdx + 720, 305, rdx + 740, 350);
  line(rdx + 710, 260, rdx + 685, 305);
  line(rdx + 685, 305, rdx + 690, 350);
  //arms
  line(rdx + 704, 210, rdx + 688, 240);
  line(rdx + 688, 240, rdx + 660, 250);
  line(rdx + 704, 202, rdx + 680, 230);
  line(rdx + 680, 230, rdx + 655, 235);
}

function rSword() {
  fill(0);
  noStroke();
  quad(rdx + 665, 260, rdx + 657, 262, rdx + 647, 225, rdx + 655, 223);
  fill(240);
  quad(rdx + 647, 225, rdx + 655, 223, rdx + 623, 103, rdx + 618, 115);
}