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
const ground = 110;
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

  const p1attackframes = [
    loadImage(
      "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/attack%20frame%201.png?v=1667970012328"
    ),
    loadImage(
      "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/attack%20frame%202.png?v=1667970022137"
    ),
    loadImage(
      "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/attack%20frame%203.png?v=1667970027482"
    ),
    loadImage(
      "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/attack%20frame%204.png?v=1667970223885"
    ),
  ];
  const p2attackframes = [
    loadImage(
      "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20attack%20frame%201.png?v=1667972603469"
    ),
    loadImage(
      "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20attack%20frame%202.png?v=1667972607799"
    ),
    loadImage(
      "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20attack%20frame%203.png?v=1667972612278"
    ),
    loadImage(
      "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20attack%20frame%204.png?v=1667972617590"
    ),
  ];
  p1attackanim = new P1AttackAnimation(p1attackframes);
  p2attackanim = new P2AttackAnimation(p2attackframes);
}

function setup() {
  createCanvas(1000, 450);
  angleMode(DEGREES);
  bgm.volume(0.3);
  bgm.play();
  p1 = new Player1();
  p2 = new Player2();
}

function draw() {
  background(bg);

  //why is this an infinite loop?

  //   while (p1attackanim.animating == false) {
  //     push();
  //     translate(-145, -22);
  //     image(player1, p1.x, p1.y);
  //     pop();
  //   }

  //   while (p2attackanim.animating == false) {
  //     push();
  //     translate(-90, -58);
  //     image(player2, p2.x, p2.y);
  //     pop();
  //   }

  push();
  translate(-145, -22);
  image(player1, p1.x, p1.y);
  pop();
  push();
  translate(-90, -58);
  image(player2, p2.x, p2.y);
  pop();

  // p1.display();
  // p2.display();
  p1.move();
  p2.move();
  p1.dashCount++;
  p2.dashCount++;
  p1.blockCount++;
  p2.blockCount++;
  p1.attackCount++;
  p2.attackCount++;

  if (p1attackanim.animating) {
    p1attackanim.animate();
    p1attackanim.display();
  }

  if (p2attackanim.animating) {
    p2attackanim.animate();
    p2attackanim.display();
  }

  //scores
  fill(255);
  textSize(30);
  text("P1:", 10, 35);
  text(p1Score, 65, 35);
  text("P2:", 900, 35);
  text(p2Score, 955, 35);
}

function keyPressed() {
  p1.dash();
  p2.dash();
  p1.block();
  p2.block();
  p1.attack();
  p2.attack();
}

class Player1 {
  x = 180;
  y = ground + 100;
  w = 80;
  h = 200;
  hitbox = this.x + 320;
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
    rect(this.hitbox - 320, this.y + 30, 320, 100);
  }

  move() {
    //a
    if (keyIsDown(65) && this.x >= 90) {
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
        this.x += 60;
        this.hitbox += 60;
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
        this.x -= 60;
        this.hitbox -= 60;
      }
    }
  }

  block() {
    if (
      keyCode == 83 &&
      keyIsDown(65) == false &&
      keyIsDown(68) == false &&
      this.blockCount >= 100
    ) {
      this.blockCount = 0;
      print("p1 blocking");
    }
  }

  attack() {
    if (this.attackCount >= 100 && keyCode == 87) {
      this.attackCount = 0;
      p1attackanim.play();
      if (this.hitbox >= p2.x && p2.blockCount > 60) {
        p1Score += 1;
        p2.x = 850;
        this.x = 180;
        p2.hitbox = p2.x - 302;
        this.hitbox = this.x + 320;
      }
      if (this.hitbox >= p2.x && p2.blockCount <= 60) {
        print("blocked");
      }
    }
  }
}

class Player2 {
  x = 850;
  y = ground + 100;
  w = 80;
  h = 200;
  hitbox = this.x - 302;
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
    rect(this.hitbox, this.y + 30, 302, 100);
  }

  move() {
    //left
    if (keyIsDown(LEFT_ARROW) && this.x >= p1.x) {
      this.x -= 3;
      this.hitbox -= 3;
    }
    //right
    if (keyIsDown(RIGHT_ARROW) && this.x <= 940) {
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
        this.x -= 60;
        this.hitbox -= 60;
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
        this.x += 60;
        this.hitbox += 60;
      }
    }
  }

  block() {
    if (
      keyCode == DOWN_ARROW &&
      keyIsDown(LEFT_ARROW) == false &&
      keyIsDown(RIGHT_ARROW) == false &&
      this.blockCount >= 100
    ) {
      this.blockCount = 0;
      print("p2 blocking");
    }
  }

  attack() {
    if (this.attackCount >= 100 && keyCode == UP_ARROW) {
      this.attackCount = 0;
      p2attackanim.play();
      if (this.hitbox <= p1.x && p1.blockCount > 60) {
        p2Score += 1;
        p1.x = 180;
        this.x = 850;
        p1.hitbox = p1.x + 320;
        this.hitbox = this.x - 302;
      }
      if (this.hitbox <= p1.x && p1.blockCount <= 60) {
        print("blocked");
      }
    }
  }
}

class P1AttackAnimation {
  constructor(images) {
    this.p1attackframes = images;
    this.frame = 0;
    this.frameRate = 15;
    this.frameHold = 0;
    this.animating = false;
  }

  animate() {
    this.frameHold++;
    if (this.frameHold >= frameRate() / this.frameRate) {
      this.frame++;
      this.frameHold = 0;
    }
    if (this.frame == this.p1attackframes.length - 1) {
      this.animating = false;
    }
  }

  display() {
    image(this.p1attackframes[this.frame], p1.x - 436, ground - 188);
  }

  play() {
    this.animating = true;
    this.frame = 0;
  }
}

class P2AttackAnimation {
  constructor(images) {
    this.p2attackframes = images;
    this.frame = 0;
    this.frameRate = 15;
    this.frameHold = 0;
    this.animating = false;
  }

  animate() {
    this.frameHold++;
    if (this.frameHold >= frameRate() / this.frameRate) {
      this.frame++;
      this.frameHold = 0;
    }
    if (this.frame == this.p2attackframes.length - 1) {
      this.animating = false;
    }
  }

  display() {
    image(this.p2attackframes[this.frame], p2.x - 370, ground - 212);
  }

  play() {
    this.animating = true;
    this.frame = 0;
  }
}
