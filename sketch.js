//TO DO

//back and forth dashing/stepping
//attack for both players
//block for both players
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

//positions
let p1x = 180;
let p2x = 620;
let p1y = 0;
let p2y = 0;
let hitbox = p1x + 150;
let hitbox2 = p2x - 150;

//timers
let dashCount = 0;
let dashCount2 = 0;
let attackCount = 100;
let attackCount2 = 100;

//actions
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
  background(0);
  fill(100);
  rect(0, 350, 800, 50);

  dashCount++;
  dashCount2++;
  attackCount++;
  attackCount2++;
  
  p1();
  p2();
  p1Sword();
  p2Sword();
  
  //Basic Movement
  //a
  if (keyIsDown(65) && p1x >= 80) {
    p1x -= 3;
    hitbox -= 3;
  }
  //d
  if (keyIsDown(68) && p1x <= p2x - 20) {
    p1x += 3;
    hitbox += 3;
  }
  //left arrow
  if (keyIsDown(LEFT_ARROW) && p2x >= p1x + 20) {
    p2x -= 3;
    hitbox2 -= 3;
  }
  //right arrow
  if (keyIsDown(RIGHT_ARROW) && p2x <= 720) {
    p2x += 3;
    hitbox2 += 3;
  }
  
}

function keyPressed() {
  
  //If the key is pressed twice within 12 frames you perform a dash
  
  //d dash
  if (keyIsDown(65) == false && keyCode == 68) {
    dPress += 1;
    if (dashCount >= 12) {
      dashCount = 0;
      dPress = 0;
    }
    if (dPress == 1) {
      p1x += 80;
    }
  }
  //a dash
  if (keyIsDown(68) == false && keyCode == 65) {
    aPress += 1;
    if (dashCount >= 12) {
      dashCount = 0;
      aPress = 0;
    }
    if (aPress == 1) {
      p1x -= 80;
    }
  }
  //left dash
  if (keyIsDown(RIGHT_ARROW) == false && keyCode == LEFT_ARROW) {
    lPress += 1;
    if (dashCount2 >= 12) {
      dashCount2 = 0;
      lPress = 0;
    }
    if (lPress == 1) {
      p2x -= 80;
    }
  }
  //right dash
  if (keyIsDown(LEFT_ARROW) == false && keyCode == RIGHT_ARROW) {
    rPress += 1;
    if (dashCount2 >= 12) {
      dashCount2 = 0;
      rPress = 0;
    }
    if (rPress == 1) {
      p2x += 80;
    }
  }
  
  //If attack key is pressed and isn't within 100 frames of last attack then perform an attack (add blocking condition later)
  
  //p1 attack (w)
  if (attackCount >= 100 && keyCode == 87 && hitbox >= p2x) {
    rect(p1x, 100, 150, 200);
    attackCount = 0;
    print('p1 hit')
  }
  //p2 attack (s)
  if (attackCount2 >= 100 && keyCode == UP_ARROW) {
    rect(p2x - 150, 100, 150, 200);
    attackCount2 = 0;
    print('p2 hit')
  }
}

function p1() {
  noStroke();
  fill(255, 0, 0, 150);
  rect(p1x - 80, 170 + p1y, 80, 200);
}

function p1Sword() {
  noStroke();
  fill(0, 255, 0, 150);
  rect(p1x - 10, 150 + p1y, 30, 150);
}

function p2() {
  noStroke();
  fill(0, 0, 255, 150);
  rect(p2x, 170 + p2y, 80, 200);
}

function p2Sword() {
  noStroke();
  fill(0, 255, 0, 150);
  rect(p2x - 20, 150 + p1y, 30, 150);
}
