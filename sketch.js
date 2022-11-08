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
add the animations for the actions
add sounds to the actions
make a start screen and 3, 2, 1 countdown
make a pause and display winner text when someone wins
guilty gear counter text in bg lol

*/

let bgm;
let bg;
let player1;
let player2;
const ground = 60;
let p1Score = 0;
let p2Score = 0;
let anim = [];

function preload() {
  player1 = loadImage(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p1.png?v=1667937390640"
  );
  player2 = loadImage(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2.png?v=1667937831521"
  );
  bg = loadImage(
    "https://cdn.glitch.global/628d59df-2d08-48f2-9b4b-ebaaf965e908/alley%20stage.gif?v=1666840125125"
  );
  bgm = createAudio(
    "https://cdn.glitch.global/972c0e28-86ae-4368-9296-f573ccb7ae82/Tekken%203%20Jin%20theme%20arcade%20ver.mp3?v=1667269184277"
  );
  const frames = [
    loadImage(
      "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/attack%20frame%201.png?v=1667941448127"
    ),
    loadImage(
      "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/attack%20frame%202.png?v=1667941452785"
    ),
    loadImage(
      "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/attack%20frame%203.png?v=1667941456650"
    ),
    loadImage(
      "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/attack%20frame%204.png?v=1667941462478"
    ),
  ];
  anim = new Animation(frames);
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
  background(bg);

  push();
  translate(-145, -22);
  image(player1, p1.x, p1.y);
  pop();
  push();
  translate(-90, -58);
  image(player2, p2.x, p2.y);
  pop();

  //p1.display();
  //p2.display();
  p1.move();
  p2.move();
  p1.dashCount++;
  p2.dashCount++;
  p1.blockCount++;
  p2.blockCount++;
  p1.attackCount++;
  p2.attackCount++;

  if (anim.animating) {
    anim.animate(); {
      anim.display();
    }
  }

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
    fill(255, 0, 0, 100);
    rect(this.x - 80, this.y, this.w, this.h);
    fill(0, 255, 0, 100);
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
    //d dash
    if (keyIsDown(65) == false && keyCode == 68) {
      this.dPress += 1;
      if (this.dashCount >= 12) {
        this.dashCount = 0;
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
      if (this.dashCount >= 12) {
        this.dashCount = 0;
        this.aPress = 0;
      }
      if (this.aPress == 1) {
        this.x -= 80;
        this.hitbox -= 80;
      }
    }
  }

  block() {
    if (keyCode == 83 && this.blockCount >= 60) {
      this.blockCount = 0;
      print("p1 blocking");
    }
  }

  attack() {
    if (this.attackCount >= 100 && keyCode == 87) {
      this.attackCount = 0;

      anim.play();

      if (this.hitbox >= p2.x && p2.blockCount > 60) {
        print("p1 wins");
        p1Score += 1;
        p2.x = 620;
        this.x = 180;
        p2.hitbox = p2.x - 150;
        this.hitbox = this.x + 150;
      }
      if (this.hitbox >= p2.x && p2.blockCount <= 60) {
        print("blocked");
      }
    }
  }
}

class Animation {
  constructor(images) {
    this.frames = images;
    this.frame = 0;
    this.frameRate = 5;
    this.frameHold = 0;
    this.animating = false;
  }
  animate() {
    this.frameHold++;
    if (this.frameHold >= frameRate() / this.frameRate) {
      this.frame++;
      this.frameHold = 0;
    }
    if (this.frame == this.frames.length - 1) {
      this.animating = false;
    }
  }

  display() {
    image(this.frames[this.frame], p1.x, ground);
  }

  play() {
    this.animating = true;
    this.frame = 0;
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
    fill(0, 0, 255, 100);
    rect(this.x, this.y, this.w, this.h);
    fill(0, 255, 0, 100);
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
    //left dash
    if (keyIsDown(RIGHT_ARROW) == false && keyCode == LEFT_ARROW) {
      this.lPress += 1;
      if (this.dashCount >= 12) {
        this.dashCount = 0;
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
      if (this.dashCount >= 12) {
        this.dashCount = 0;
        this.rPress = 0;
      }
      if (this.rPress == 1) {
        this.x += 80;
        this.hitbox += 80;
      }
    }
  }

  block() {
    if (keyCode == DOWN_ARROW && this.blockCount >= 60) {
      this.blockCount = 0;
      print("p2 blocking");
    }
  }

  attack() {
    if (this.attackCount >= 100 && keyCode == UP_ARROW) {
      this.attackCount = 0;
      if (this.hitbox <= p1.x && p1.blockCount > 60) {
        print("p2 wins");
        p2Score += 1;
        p1.x = 180;
        this.x = 620;
        p1.hitbox = p1.x + 150;
        this.hitbox = this.x - 150;
      }
      if (this.hitbox <= p1.x && p1.blockCount <= 60) {
        print("blocked");
      }
    }
  }
}
