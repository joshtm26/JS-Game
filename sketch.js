/*

For my playful prototype project I have made a two player fighting game that uses wasd and arrow keys
as the control scheme, specific controls listed below. It is inspired by an indie game called One Strike. 
In this game it only takes a single attack to kill your opponent, making it so that you have to be careful 
about how you place your attack becuase it could cause fatal. After attacking there is a brief period of 
time in which you are unable to block or attack again, giving the opponent a crucial opening if they are
able to dodge or block the attack. I do not own the assets used but all of them are under CC0 aside from 
the Tekken background music. All of the code in this project was written by me.

Click to start game
Press space to start next round
Press R to toggle rain on/off

Player 1 (left):
A: move left
D: move right
W: attack
S: block
double tap A or D to perform a dash

Player 2 (right):
Left Arrow; move left
Right Arrow: move right
Up Arrow: attack
Down Arrow: block
double tap left or right to perform a dash

Have fun!!

*/

let anim = [];
var frontRain = [];
var backRain = [];
let raining = true;
let rainToggle = 0;
const ground = 110;
const dashSpeed = 2;
let p1Score = 0;
let p2Score = 0;
let paused = false;

function setup() {
  createCanvas(1000, 450);
  angleMode(DEGREES);
  bgm.volume(0.2);
  p1 = new Player1();
  p2 = new Player2();
  p1ani = new P1Animations();
  p2ani = new P2Animations();
  //speed that the animation plays
  p1IdleAni.frameDelay = 6;
  p2IdleAni.frameDelay = 9;
  p1DeathAni.frameDelay = 6;
  p2DeathAni.frameDelay = 8;
  p1AttackAni.frameDelay = 4;
  p2AttackAni.frameDelay = 4;
  //rain arrays
  for (var i = 0; i < 300; i++) {
    frontRain[i] = new FrontRain();
  }
  for (var i = 0; i < 200; i++) {
    backRain[i] = new BackRain();
  }
  noLoop();
}

function draw() {
  background(bg);
  textFont(pixelFont);

  //start screen
  if (isLooping() == false) {
    textSize(20);
    fill(0);
    text("press 'R' to toggle rain", 360, 30);
    fill(255);
    text("press 'R' to toggle rain", 357, 27);
    textSize(50);
    fill(0);
    text("Click to Begin", 300, 205);
    fill(255);
    text("Click to Begin", 295, 200);
    textSize(25);
    fill(0);
    text("volume warning", 385, 250);
    fill(255);
    text("volume warning", 380, 245);
    push();
    scale(0.25);
    image(wasd, 200, 250);
    image(arrows, 3150, 230);
    pop();
  }

  //rain behind characters to create depth
  if (raining == true) {
    for (var i = 0; i < 200; i++) {
      backRain[i].fall();
      backRain[i].display();
    }
  }

  //pauses these when a player wins
  if (paused == false) {
    //uncomment to see hitboxes
    // p1.hitboxes();
    // p2.hitboxes();
    p1.move();
    p2.move();
    p1.dashing();
    p2.dashing();
    p1ani.run();
    p2ani.run();
    p1.block();
    p2.block();
    p1ani.blocked();
    p2ani.blocked();
  }

  if (p1ani.attacking == true) {
    p1ani.attack();
  }
  if (p2ani.attacking == true) {
    p2ani.attack();
  }

  //staying playing while paused
  p1ani.idle();
  p2ani.idle();
  p1ani.blockedCount++;
  p2ani.blockedCount++;
  p1.dashCount++;
  p2.dashCount++;
  p1.lag++;
  p2.lag++;

  //rain in front of characters
  if (raining == true) {
    for (var i = 0; i < 300; i++) {
      frontRain[i].fall();
      frontRain[i].display();
    }
  }

  //score text
  noStroke();
  fill(255);
  textSize(30);
  text("P1:", 15, 35);
  text(p1Score, 70, 35);
  text("P2:", 890, 35);
  text(p2Score, 955, 35);

  //play death animation and display winner text
  if (p1.win == true) {
    p2ani.death();
    textSize(50);
    fill(0);
    text("Player 1 Wins", 300, 125);
    fill(255);
    text("Player 1 Wins", 295, 120);
    textSize(25);
    fill(0);
    text("space to reset", 380, 175);
    fill(255);
    text("space to reset", 375, 170);
  }
  if (p2.win == true) {
    p1ani.death();
    textSize(50);
    fill(0);
    text("Player 2 Wins", 300, 125);
    fill(255);
    text("Player 2 Wins", 295, 120);
    textSize(25);
    fill(0);
    text("space to reset", 380, 175);
    fill(255);
    text("space to reset", 375, 170);
  }

  //checking for rain toggle with an even or odd number
  if (rainToggle % 2 == 0) {
    raining = true;
  } else {
    raining = false;
  }
}

//start the sketch and music
function mousePressed() {
  bgm.play();
  loop();
}

function keyPressed() {
  //same as paused in draw
  if (paused == false) {
    p1.dash();
    p2.dash();
    p1.attack();
    p2.attack();
  }

  //press space to reset everything
  if (keyCode == 32 && paused == true) {
    p1.x = 180;
    p1.startingX = 0;
    p1.hitbox = p1.x + 320;
    p1.lag = 100;
    p1.win = false;
    p1ani.dying = false;
    p1DeathAni.play(0);
    p2.x = 850;
    p2.startingX = 940;
    p2.hitbox = p2.x - 302;
    p2.lag = 100;
    p2.win = false;
    p2ani.dying = false;
    p2DeathAni.play(0);
    paused = false;
  }

  //R adds 1 to rain toggle
  if (keyCode == 82) {
    rainToggle += 1;
  }
}