//TO DO

//back and forth dashing/stepping
//attack for both players
//
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

let lpx = 0;
let lpy = 0;
let rpx = 0;
let rpy = 0;

let count = 0;
let dPress = 0;
let aPress = 0;
let lPress = 0;
let rPress = 0;

function preload() {
  bg = loadImage(
    "https://cdn.glitch.global/628d59df-2d08-48f2-9b4b-ebaaf965e908/alley%20stage.gif?v=1666840125125"
  );
  bgm = createAudio(
    "https://cdn.glitch.global/972c0e28-86ae-4368-9296-f573ccb7ae82/Tekken%203%20Jin%20theme%20arcade%20ver.mp3?v=1667269184277"
  );
}

function setup() {
  createCanvas(800, 400);
  angleMode(DEGREES);
  bgm.play();
}

function draw() {
  //background(bg);
  background(200);
  fill(255);
  rect(0, 350, 800, 50);

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
  if (keyIsDown(65) && lpx >= -100) {
    lpx -= 3;
  }
  //D
  if (keyIsDown(68) && lpx <= rpx + 470) {
    lpx += 3;
  }
  //Left arrow
  if (keyIsDown(LEFT_ARROW) && rpx >= lpx - 470) {
    rpx = rpx - 3;
  }
  //Right arrow
  if (keyIsDown(RIGHT_ARROW) && rpx <= 100) {
    rpx = rpx + 3;
  }

  //W and Up arrow are going to be the two attacks
  wKeyPressed();
  upKeyPressed();

  print(dPress);
}

function wKeyPressed() {
  if (keyIsDown(65) == false && keyIsDown(68) == false && keyCode == 87) {
    print("hi");
  }
}

function upKeyPressed() {
  if (keyIsDown(65) == false && keyIsDown(68) == false && keyCode == UP_ARROW) {
    print("hi");
  }
}

function keyReleased() {
  //If the key is pressed twice within 12 frames you perform a dash
  //d dash
  if (keyCode == 68) {
    dPress += 1;
    if (count >= 12) {
      count = 0;
      dPress = 0;
    }
    if (dPress == 1) {
      lpx += 60;
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
      lpx -= 60;
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
      rpx -= 60;
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
      rpx += 60;
    }
  }
}

function lDude() {
  fill(0);
  stroke(0);
  strokeWeight(10);
  circle(lpx + 105, lpy + 160, 50);
  line(lpx + 100, lpy + 150, lpx + 90, lpy + 260);
  //legs
  line(lpx + 90, lpy + 260, lpx + 80, lpy + 305);
  line(lpx + 80, lpy + 305, lpx + 60, lpy + 350);
  line(lpx + 90, lpy + 260, lpx + 115, lpy + 305);
  line(lpx + 115, lpy + 305, lpx + 110, lpy + 350);
}

function lDudeArms() {
  fill(0);
  stroke(0);
  strokeWeight(10);
  line(lpx + 96, lpy + 210, lpx + 112, lpy + 240);
  line(lpx + 112, lpy + 240, lpx + 140, lpy + 250);
  line(lpx + 96, lpy + 202, lpx + 120, lpy + 230);
  line(lpx + 120, lpy + 230, lpx + 145, lpy + 235);
}

function lSword() {
  fill(0);
  noStroke();
  quad(
    lpx + 135,
    lpy + 260,
    lpx + 143,
    lpy + 262,
    lpx + 153,
    lpy + 225,
    lpx + 145,
    lpy + 223
  );
  fill(240);
  quad(
    lpx + 153,
    lpy + 225,
    lpx + 145,
    lpy + 223,
    lpx + 177,
    lpy + 103,
    lpx + 182,
    lpy + 115
  );
}

function rDude() {
  fill(0);
  stroke(0);
  strokeWeight(10);
  circle(rpx + 695, 160, 50);
  line(rpx + 700, 150, rpx + 710, 260);
  //legs
  line(rpx + 710, 260 + rpy, rpx + 720, 305 + rpy);
  line(rpx + 720, 305 + rpy, rpx + 740, 350 + rpy);
  line(rpx + 710, 260 + rpy, rpx + 685, 305 + rpy);
  line(rpx + 685, 305 + rpy, rpx + 690, 350 + rpy);
}

function rDudeArms() {
  fill(0);
  stroke(0);
  strokeWeight(10);
  line(rpx + 704, 210, rpx + 688, 240);
  line(rpx + 688, 240, rpx + 660, 250);
  line(rpx + 704, 202, rpx + 680, 230);
  line(rpx + 680, 230, rpx + 655, 235);
}

function rSword() {
  fill(0);
  noStroke();
  quad(
    rpx + 665,
    260 + rpy,
    rpx + 657,
    262 + rpy,
    rpx + 647,
    225 + rpy,
    rpx + 655,
    223 + rpy
  );
  fill(240);
  quad(
    rpx + 647,
    225 + rpy,
    rpx + 655,
    223 + rpy,
    rpx + 623,
    103 + rpy,
    rpx + 618,
    115 + rpy
  );
}
