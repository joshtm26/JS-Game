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
overlay sprites
add the animations for the actions
add sounds to the actions
make a start screen and 3, 2, 1 countdown
make a pause and display winner text when someone wins
guilty gear counter text in bg lol

*/

let bgm;
let bg;
const ground = 50;
let p1Score = 0;
let p2Score = 0;


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
  bgm.volume(0.3);
  bgm.play();
  p1 = new P1();
  p2 = new P2();
}

function draw() {
  //background(bg);
  background(200);
  fill(0);
  rect(0, 350, 800, 50);

  p1.display();
  p2.display();
  p1.move();
  p2.move();

  //scores
  fill(255);
  textSize(30);
  text("P1:", 10, 35);
  text(p1Score, 65, 35);
  text("P2:", 700, 35);
  text(p2Score, 755, 35);
}

function keyPressed() {
  p1.dash();
  p2.dash();

  p1.block();
  p2.block();

  p1.attack();
  p2.attack();
}

class P1 {
  x = 180;
  y = ground + 100;
  w = 80;
  h = 200;
  hitbox = this.x + 150;
  aPress = 0;
  dPress = 0;
  dashCount = 0;
  blockCount = 0;
  attackCount = 100;

  display() {
    noStroke();
    fill(255, 0, 0, 150);
    rect(this.x - 80, this.y, this.w, this.h);
    fill(0, 255, 0, 150);
    rect(this.hitbox - 150, this.y + 50, 150, 100);
  }

  move() {
    //a
    if (keyIsDown(65) && this.x >= 80) {
      this.x -= 3;
      this.hitbox -= 3;
    }
    //d
    if (keyIsDown(68) && this.x <= p2.x) {
      this.x += 3;
      this.hitbox += 3;
    }
  }

  dash() {
    this.dashCount++;
    //d dash
    if (keyIsDown(65) == false && keyCode == 68) {
      this.dPress += 1;
      if (dashCount >= 12) {
        dashCount = 0;
        this.dPress = 0;
      }
      if (this.dPress == 1) {
        this.x += 80;
        this.hitbox += 80;
      }
    }
    //a dash
    if (keyIsDown(68) == false && keyCode == 65) {
      this.aPress += 1;
      if (dashCount >= 12) {
        dashCount = 0;
        this.aPress = 0;
      }
      if (this.aPress == 1) {
        this.x -= 80;
        this.hitbox -= 80;
      }
    }
  }

  block() {
    this.blockCount++;
    if (keyCode == 83 && blockCount >= 60) {
      blockCount = 0;
      print("p1 blocking");
    }
  }

  attack() {
    this.attackCount++;
    if (attackCount >= 100 && keyCode == 87) {
      attackCount = 0;
      if (this.hitbox >= p2.x && blockCount2 > 60) {
        print("p1 wins");
        p1Score += 1;
        p2.x = 620;
        this.x = 180;
        p2.hitbox = p2.x - 150;
        this.hitbox = this.x + 150;
      }
      if (this.hitbox >= p2.x && blockCount2 <= 60) {
        print("blocked");
      }
    }
  }
}

class P2 {
  x = 620;
  y = ground + 100;
  w = 80;
  h = 200;
  hitbox = this.x - 150;
  lPress = 0;
  rPress = 0;
  dashCount = 0;
  blockCount = 0;
  attackCount = 100;

  display() {
    noStroke();
    fill(0, 0, 255, 150);
    rect(this.x, this.y, this.w, this.h);
    fill(0, 255, 0, 150);
    rect(this.hitbox, this.y + 50, 150, 100);
  }

  move() {
    //left
    if (keyIsDown(LEFT_ARROW) && this.x >= p1.x) {
      this.x -= 3;
      this.hitbox -= 3;
    }
    //right
    if (keyIsDown(RIGHT_ARROW) && this.x <= 720) {
      this.x += 3;
      this.hitbox += 3;
    }
  }

  dash() {
    this.dashCount++;
    //left dash
    if (keyIsDown(RIGHT_ARROW) == false && keyCode == LEFT_ARROW) {
      this.lPress += 1;
      if (dashCount2 >= 12) {
        dashCount2 = 0;
        this.lPress = 0;
      }
      if (this.lPress == 1) {
        this.x -= 80;
        this.hitbox -= 80;
      }
    }
    //right dash
    if (keyIsDown(LEFT_ARROW) == false && keyCode == RIGHT_ARROW) {
      this.rPress += 1;
      if (dashCount2 >= 12) {
        dashCount2 = 0;
        this.rPress = 0;
      }
      if (this.rPress == 1) {
        this.x += 80;
        this.hitbox += 80;
      }
    }
  }

  block() {
    this.blockCount++;
    if (keyCode == DOWN_ARROW && blockCount2 >= 60) {
      blockCount2 = 0;
      print("p2 blocking");
    }
  }

  attack() {
    this.attackCount++;
    if (attackCount2 >= 100 && keyCode == UP_ARROW) {
      attackCount2 = 0;
      if (this.hitbox <= p1.x && blockCount > 60) {
        print("p2 wins");
        p2Score += 1;
        p1.x = 180;
        this.x = 620;
        p1.hitbox = p1.x + 150;
        this.hitbox = this.x - 150;
      }
      if (this.hitbox <= p1.x && blockCount <= 60) {
        print("blocked");
      }
    }
  }
}
