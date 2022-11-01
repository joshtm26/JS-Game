//TO DO

//back and forth dashing/stepping
//2 attacks: a slower poke or longer swipe and quick forward down swing
//ending lag for the actions
//reset positions and display text for winner when sword hits player
//animations for movement, attacking, and idle
//make the weapons look better (two different weapons?)
//shadows for the characters
//keep track of score in the top left and right corners
//add sounds to the actions

//MAYBE IF I HAVE TIME

//make it not stick people
//make my own background
//zoom in and make camera follow them

let bgm;
let bg;
let ldx = 0;
let ldy = 0;
let rdx = 0;
let rdy = 0;
let count = 0;
let dPress = 0;
let aPress = 0;
let lPress = 0;
let rPress = 0;

function preload() {
  bg = loadImage(
    "https://cdn.glitch.global/628d59df-2d08-48f2-9b4b-ebaaf965e908/alley%20stage.gif?v=1666840125125"
  );
}

function setup() {
  createCanvas(800, 400);
  angleMode(DEGREES);
  image(bg, 0, 0);
  bgm = createAudio(
    "https://cdn.glitch.global/972c0e28-86ae-4368-9296-f573ccb7ae82/Tekken%203%20Jin%20theme%20arcade%20ver.mp3?v=1667269184277"
  );
  bgm.play();
}

function draw() {
  background(bg);
  count = count + 1;

  push();
  scale(0.9);
  translate(45, 60);
  lDude();
  lDudeArms();
  lSword();
  rDude();
  rDudeArms();
  rSword();
  pop();

  //A
  if (keyIsDown(65) && ldx >= -100) {
    ldx = ldx - 3;
  }
  //D
  if (keyIsDown(68) && ldx <= rdx + 470) {
    ldx = ldx + 3;
  }
  //Left arrow
  if (keyIsDown(LEFT_ARROW) && rdx >= ldx - 470) {
    rdx = rdx - 3;
  }
  //Right arrow
  if (keyIsDown(RIGHT_ARROW) && rdx <= 100) {
    rdx = rdx + 3;
  }

  //W/S and Up/Down arrows are going to be the two attacks
  wKeyPressed();
  sKeyPressed();
}

function wKeyPressed() {
  if (keyIsDown(65) == false && keyIsDown(68) == false && keyCode == 87) {
    print("hi");
  }
}

function sKeyPressed() {
  if (keyIsDown(65) == false && keyIsDown(68) == false && keyCode == 83) {
    print("hi");
  }
}

function keyReleased() {
  //d dash
  if (keyCode == 68) {
    dPress += 1;
    if (count >= 12) {
      count = 0;
      dPress = 0;
    }
    if (dPress == 1) {
      ldx += 80;
    }
  }
  //a dash
  if (keyCode == 65) {
    aPress += 1;
    if (count >= 12) {
      count = 0;
      aPress = 0;
    }
    if (aPress == 1) {
      ldx -= 80;
    }
  }
  //left dash
  if (keyCode == LEFT_ARROW) {
    lPress += 1;
    if (count >= 12) {
      count = 0;
      lPress = 0;
    }
    if (lPress == 1) {
      rdx -= 80;
    }
  }
  //right dash
  if (keyCode == RIGHT_ARROW) {
    rPress += 1;
    if (count >= 12) {
      count = 0;
      rPress = 0;
    }
    if (rPress == 1) {
      rdx += 80;
    }
  }
}

function lDude() {
  fill(0);
  stroke(0);
  strokeWeight(10);
  circle(ldx + 105, ldy + 160, 50);
  line(ldx + 100, ldy + 150, ldx + 90, ldy + 260);
  //legs
  line(ldx + 90, ldy + 260, ldx + 80, ldy + 305);
  line(ldx + 80, ldy + 305, ldx + 60, ldy + 350);
  line(ldx + 90, ldy + 260, ldx + 115, ldy + 305);
  line(ldx + 115, ldy + 305, ldx + 110, ldy + 350);
}

function lDudeArms() {
  fill(0);
  stroke(0);
  strokeWeight(10);
  line(ldx + 96, ldy + 210, ldx + 112, ldy + 240);
  line(ldx + 112, ldy + 240, ldx + 140, ldy + 250);
  line(ldx + 96, ldy + 202, ldx + 120, ldy + 230);
  line(ldx + 120, ldy + 230, ldx + 145, ldy + 235);
}

function lSword() {
  fill(0);
  noStroke();
  quad(
    ldx + 135,
    ldy + 260,
    ldx + 143,
    ldy + 262,
    ldx + 153,
    ldy + 225,
    ldx + 145,
    ldy + 223
  );
  fill(240);
  quad(
    ldx + 153,
    ldy + 225,
    ldx + 145,
    ldy + 223,
    ldx + 177,
    ldy + 103,
    ldx + 182,
    ldy + 115
  );
}

function rDude() {
  fill(0);
  stroke(0);
  strokeWeight(10);
  circle(rdx + 695, 160, 50);
  line(rdx + 700, 150, rdx + 710, 260);
  //legs
  line(rdx + 710, 260 + rdy, rdx + 720, 305 + rdy);
  line(rdx + 720, 305 + rdy, rdx + 740, 350 + rdy);
  line(rdx + 710, 260 + rdy, rdx + 685, 305 + rdy);
  line(rdx + 685, 305 + rdy, rdx + 690, 350 + rdy);
}

function rDudeArms() {
  fill(0);
  stroke(0);
  strokeWeight(10);
  line(rdx + 704, 210, rdx + 688, 240);
  line(rdx + 688, 240, rdx + 660, 250);
  line(rdx + 704, 202, rdx + 680, 230);
  line(rdx + 680, 230, rdx + 655, 235);
}

function rSword() {
  fill(0);
  noStroke();
  quad(
    rdx + 665,
    260 + rdy,
    rdx + 657,
    262 + rdy,
    rdx + 647,
    225 + rdy,
    rdx + 655,
    223 + rdy
  );
  fill(240);
  quad(
    rdx + 647,
    225 + rdy,
    rdx + 655,
    223 + rdy,
    rdx + 623,
    103 + rdy,
    rdx + 618,
    115 + rdy
  );
}
