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

let p1x = 0;
let p1y = 0;
let p2x = 0;
let p2y = 0;

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
  
  p1();
  p2();
  
  push();
  translate(200, 150)
  rotate(15);
  p1Sword();
  pop();
  
  push();
  translate(570, 150);
  rotate(-15);
  p2Sword();
  pop();
  
  //A
  if (keyIsDown(65) && p1x >= -100) {
    p1x -= 3;
  }
  //D
  if (keyIsDown(68) && p1x <= p2x + 470) {
    p1x += 3;
  }
  //Left arrow
  if (keyIsDown(LEFT_ARROW) && p2x >= p1x - 470) {
    p2x -= 3;
  }
  //Right arrow
  if (keyIsDown(RIGHT_ARROW) && p2x <= 100) {
    p2x += 3;
  }

  //W and Up arrow are going to be the two attacks
  wKeyPressed();
  upKeyPressed();


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
      p1x += 60;
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
      p1x -= 60;
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
      p2x -= 60;
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
      p2x += 60;
    }
  }
}

function p1() {
  noStroke();
  fill(255, 0, 0, 150);
  rect(100 + p1x, 170 + p1y, 80, 200);
}

function p1Sword() {
  noStroke();
  fill(0, 255, 0, 150);
  rect(p1x, p1y, 30, 150);
}

function p2() {
  noStroke();
  fill(0, 0, 255, 150);
  rect(620 + p2x, 170 + p2y, 80, 200);
}

function p2Sword() {
  noStroke();
  fill(0, 255, 0, 150);
  rect(p2x, p2y, 30, 150);
}
