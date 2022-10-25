//TO DO

//back and forth dashing/stepping
//2 players one keyboard
//2 attacks: a slower poke/longer swipe and quick forward down swing
//animations for movement, attacking, and maybe idle
//ending lag for the actions somehow
//make the weapons look better
//make a background maybe
//maybe make it not stick people if i have lots of extra time

let img;

function preload() {
  img = loadImage("assets/stage.jpg");
}

function setup() {
  createCanvas(800, 400);
  angleMode(DEGREES);
  image(img, 0, 0, width, height, 0, 0, img.width, img.height, COVER);
}

function draw() {
  background(200);

  fill(0);
  stroke(0);
  strokeWeight(10);
  //rect(0, 350, 800, 50);

  lDude();
  rDude();

  //A moves left dude to the left
  if (keyIsDown(65) && lDudeX > 0) {
    lDudeX - 5;
  }
  //D moves left dude to the right
  if (keyIsDown(68) && lDudeX > 0) {
    lDudeX + 5;
  }
  //Left arrow key moves right dude to the left
  if (keyIsDown(37) && rDudeX > 0) {
    rDudeX - 5;
  }
  //Right arrow key moves right guy to the right
  if (keyIsDown(39) && rDudeX > 0) {
    rDudeX + 5;
  }
  //W/S and Up/Down arrows are going to be the two attacks
}

function lDude(lDudeX, lDudeY) {
  fill(0);
  stroke(0);
  //head
  circle(105, 160, 50);
  //torso
  line(100, 150, 90, 260);
  //left leg
  line(90, 260, 80, 305);
  line(80, 305, 60, 350);
  //right leg
  line(90, 260, 115, 305);
  line(115, 305, 110, 350);
  //left arm
  line(96, 210, 112, 240);
  line(112, 240, 140, 250);
  //right arm
  line(96, 202, 120, 230);
  line(120, 230, 145, 235);
  
  //sword
  fill(0);
  noStroke();
  quad(135, 260, 143, 262, 153, 225, 145, 223);
  fill(240);
  quad(153, 225, 145, 223, 177, 103, 182, 115);
}

function rDude(rDudeX, rDudeY) {
  fill(0);
  stroke(0);
  //head
  circle(695, 160, 50);
  //torso
  line(700, 150, 710, 260);
  //left leg
  line(710, 260, 720, 305);
  line(720, 305, 740, 350);
  //right leg
  line(710, 260, 685, 305);
  line(685, 305, 690, 350);
  //left arm
  line(704, 210, 688, 240);
  line(688, 240, 660, 250);
  //right arm
  line(704, 202, 680, 230);
  line(680, 230, 655, 235);
  
  //sword
  fill(0);
  noStroke();
  quad(665, 260, 657, 262, 647, 225, 655, 223);
  fill(240);
  quad(647, 225, 655, 223, 623, 103, 618, 115);
}
