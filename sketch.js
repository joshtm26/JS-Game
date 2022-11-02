/*

CONTROLS

Player 1:
A: move left
D: move right
W: attack
S: block
double tap A or D to perform a dash

Player 2:
Left Arrow; move left
Right Arrow: move right
Up Arrow: attack
Down Arrow: block
double tap left or right to perform a dash

TO DO

reset positions and display text "PLAYER 1/2 WINS" when hit
keep track of score in the top left and right corners for both players
add sprites
add animations
shadows for the characters
add sounds to the actions

*/

let bgm;
let bg;

//positions
let p1x = 180;
let p2x = 620;
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

  //Basic Movement
  //a
  if (keyIsDown(65) && p1x >= 80) {
    p1x -= 3;
    hitbox -= 3;
  }
  //d
  if (keyIsDown(68) && p1x <= p2x) {
    p1x += 3;
    hitbox += 3;
  }
  //left arrow
  if (keyIsDown(LEFT_ARROW) && p2x >= p1x) {
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

  //ATTACKS
  
  //p1 attack (w
  if (attackCount >= 120 && keyCode == 87) {
    if(hitbox >= p2x && keyIsDown(DOWN_ARROW) == false) {
      attackCount = 0;
    }
    if ()
    attackCount = 0;
  }
  if (attackCount >= 120 && keyCode == 87 && hitbox >= p2x && keyIsDown(DOWN_ARROW) == false) {
    attackCount = 0;
    print("p1 hit");
  }
  //p2 attack (down)
  if (attackCount2 >= 120 && keyCode == UP_ARROW && hitbox2 <= p1x && keyIsDown(83) == false) {
    attackCount2 = 0;
    print("p2 hit");
  }
}

function p1() {
  noStroke();
  fill(255, 0, 0, 150);
  rect(p1x - 80, 170, 80, 200);
}

function p2() {
  noStroke();
  fill(0, 0, 255, 150);
  rect(p2x, 170, 80, 200);
}

