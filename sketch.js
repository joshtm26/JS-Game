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

//loading all the assets for animation, sound, and background
function preload() {
  bg = loadImage(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/alley%20stage.gif?v=1668651530562"
  );
  bgm = createAudio(
    "https://cdn.glitch.global/972c0e28-86ae-4368-9296-f573ccb7ae82/Tekken%203%20Jin%20theme%20arcade%20ver.mp3?v=1667269184277"
  );
  pixelFont = loadFont(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/Retro%20Gaming.ttf?v=1668667876787"
  );
  wasd = loadImage(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/wasd.png?v=1668661321884"
  );
  arrows = loadImage(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/arrow%20keys.png?v=1668661319006"
  );
  sword = loadSound(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/sword.mp3?v=1668666101572"
  );
  block = loadSound(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/block.mp3?v=1668666224105"
  );
  hit = loadSound(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/hit.mp3?v=1668666226180"
  );
  p1IdleAni = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p1%20idle%20sprite%20sheet.png?v=1668547022515",
    { size: [800, 800], frames: 8 }
  );
  p1AttackAni = loadAni(
    "https://cdn.glitch.global/e5ca06d8-cdb6-4524-b0c9-ca1ee4ec9d3e/attack%20sprite%20sheet.png?v=1668540932519",
    { size: [800, 800], frames: 4 }
  );
  p1RunAni = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p1%20run%20sprite%20sheet.png?v=1668546986144",
    { size: [800, 800], frames: 8 }
  );
  p1DeathAni = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p1%20death%20sprite%20sheet.png?v=1668548217039",
    { size: [800, 800], frames: 6 }
  );
  p1Block = loadImage(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p1%20block.png?v=1668650892631"
  );
  p1Blocked = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p1%20blocked.png?v=1668651941540"
  );

  p2IdleAni = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20idle%20sprite%20sheet.png?v=1668644255411",
    { size: [800, 800], frames: 8 }
  );
  p2AttackAni = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20attack%20frame%201.png?v=1667972603469",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20attack%20frame%202.png?v=1667972607799",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20attack%20frame%203.png?v=1667972612278",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20attack%20frame%204.png?v=1667972617590"
  );
  p2RunAni = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20run%20frame%201.png?v=1668643356409",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20run%20frame%202.png?v=1668643361357",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20run%20frame%203.png?v=1668643373611",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20run%20frame%204.png?v=1668643380335",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20run%20frame%205.png?v=1668643385471",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20run%20frame%206.png?v=1668643389574",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20run%20frame%207.png?v=1668643395993",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20run%20frame%208.png?v=1668643400508"
  );
  p2DeathAni = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20death%20frame%201.png?v=1668642722862",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20death%20frame%202.png?v=1668642728663",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20death%20frame%203.png?v=1668642739228",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20death%20frame%204.png?v=1668642744617",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20death%20frame%205.png?v=1668642749988",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20death%20frame%206.png?v=1668642754869",
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20death%20frame%207.png?v=1668642759618"
  );
  p2Block = loadImage(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20block.png?v=1668653396658"
  );
  p2Blocked = loadAni(
    "https://cdn.glitch.global/57fcf127-26f2-43da-8f93-dbd92c19c84b/p2%20blocked.png?v=1668653401233"
  );
}

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
    text("Player 1 Wins", 300, 155);
    fill(255);
    text("Player 1 Wins", 295, 150);
    textSize(25);
    fill(0);
    text("space to reset", 385, 185);
    fill(255);
    text("space to reset", 380, 180);
  }
  if (p2.win == true) {
    p1ani.death();
    textSize(65);
    fill(0);
    text("Player 2 Wins", 230, 155);
    fill(255);
    text("Player 2 Wins", 225, 150);
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

class Player1 {
  x = 180;
  y = ground + 100;
  w = 80;
  h = 200;
  hitbox = this.x + 320;
  aPress = 0;
  dPress = 0;
  speed = 0;
  dDash = false;
  aDash = false;
  startingX = 0;
  dashCount = 0;
  blocking = false;
  blocked = false;
  lag = 100;
  win = false;

  //player 1 hitboxes visualized
  hitboxes() {
    noStroke();
    fill(255, 0, 0, 100);
    rect(this.x - 80, this.y, this.w, this.h);
    fill(0, 255, 0, 100);
    rect(this.hitbox - 320, this.y + 30, 320, 100);
  }

  move() {
    //if A key is down move left 3 pixels per frame
    if (keyIsDown(65) && this.x >= 90 && p1ani.attacking == false) {
      this.x -= 3;
      this.hitbox -= 3;
    }
    //if D key is down move right 3 pixels per frame
    if (keyIsDown(68) && this.x <= p2.x && p1ani.attacking == false) {
      this.x += 3;
      this.hitbox += 3;
    }
  }

  dash() {
    //if D key is pressed twice within 12 frames and A key is not down then perform a dash
    if (keyIsDown(65) == false && keyCode == 68) {
      this.dPress += 1;
      if (this.dashCount >= 12) {
        this.dashCount = 0;
        this.dPress = 0;
      }
      if (this.dPress == 1) {
        this.startingX = this.x;
        this.dDash = true;
      }
    }
    //if A key is pressed twice within 12 frames and D key is not down then perform a dash
    if (keyIsDown(68) == false && keyCode == 65) {
      this.aPress += 1;
      if (this.dashCount >= 12) {
        this.dashCount = 0;
        this.aPress = 0;
      }
      if (this.aPress == 1) {
        this.startingX = this.x;
        this.aDash = true;
      }
    }
  }

  //if dash is inputted then increase speed until player has moved 70 pixels, run into other player, or run into edge of canvas
  dashing() {
    if (this.dDash == true) {
      this.speed = this.speed + dashSpeed;
      this.x = this.x + this.speed;
      this.hitbox = this.hitbox + this.speed;
      if (this.x >= this.startingX + 70 || this.x >= p2.x) {
        this.speed = 0;
        this.dDash = false;
      }
    }

    if (this.aDash == true) {
      this.speed = this.speed - dashSpeed;
      this.x = this.x + this.speed;
      this.hitbox = this.hitbox + this.speed;
      if (this.x <= this.startingX - 70 || this.x <= 100) {
        this.speed = 0;
        this.aDash = false;
      }
    }
  }

  block() {
    //if S key is down, player is not moving, and you havent attacked in the last 80 frames then perform a block
    if (
      keyIsDown(83) &&
      keyIsDown(65) == false &&
      keyIsDown(68) == false &&
      this.speed == 0 &&
      this.lag >= 80
    ) {
      this.blocking = true;
      image(p1Block, this.x - 458, -102);
    } else {
      this.blocking = false;
    }
  }

  attack() {
    //if W key is pressed and you havent attacked in the last 80 frames then perform an attack
    if (this.lag >= 80 && keyCode == 87) {
      this.lag = 0;
      p1ani.attacking = true;
      sword.play();
      //if the attack hitbox is over player 2's hitbox when the attack is performed and they are not blocking, then player 1 wins
      if (this.hitbox >= p2.x && p2.blocking == false) {
        hit.play();
        p1Score += 1;
        this.win = true;
        p1ani.running = false;
        p2ani.running = false;
        p1ani.attacking == false;
        p2ani.attacking == false;
        p1.blocking = false;
        paused = true;
      }
      //if player 2 was blocking then the attack was blocked
      if (this.hitbox >= p2.x && p2.blocking == true) {
        p2.blocked = true;
        block.play();
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
  speed = 0;
  lDash = false;
  rDash = false;
  startingX = 0;
  dashCount = 0;
  blocking = false;
  blocked = false;
  lag = 100;
  win = false;

  //player 2 hitboxes visualized
  hitboxes() {
    noStroke();
    fill(0, 0, 255, 100);
    rect(this.x, this.y, this.w, this.h);
    fill(0, 255, 0, 100);
    rect(this.hitbox, this.y + 30, 302, 100);
  }

  move() {
    //if left arrow key is down move left 3 pixels per frame
    if (keyIsDown(LEFT_ARROW) && this.x >= p1.x && p2ani.attacking == false) {
      this.x -= 3;
      this.hitbox -= 3;
    }
    //if right arrow key is down move right 3 pixels per frame
    if (keyIsDown(RIGHT_ARROW) && this.x <= 940 && p2ani.attacking == false) {
      this.x += 3;
      this.hitbox += 3;
    }
  }

  dash() {
    //if right arrow key is pressed twice within 12 frames and left arrow key is not down then perform a dash
    if (keyIsDown(RIGHT_ARROW) == false && keyCode == LEFT_ARROW) {
      this.lPress += 1;
      if (this.dashCount >= 12) {
        this.dashCount = 0;
        this.lPress = 0;
      }
      if (this.lPress == 1) {
        this.startingX = this.x;
        this.lDash = true;
      }
    }
    //if left arrow key is pressed twice within 12 frames and right arrow key is not down then perform a dash
    if (keyIsDown(LEFT_ARROW) == false && keyCode == RIGHT_ARROW) {
      this.rPress += 1;
      if (this.dashCount >= 12) {
        this.dashCount = 0;
        this.rPress = 0;
      }
      if (this.rPress == 1) {
        this.startingX = this.x;
        this.rDash = true;
      }
    }
  }

  //if dash is inputted then increase speed until player has moved 70 pixels, run into other player, or run into edge of canvas
  dashing() {
    if (this.rDash == true) {
      this.speed = this.speed + dashSpeed;
      this.x = this.x + this.speed;
      this.hitbox = this.hitbox + this.speed;
      if (this.x >= this.startingX + 70 || this.x >= 940) {
        this.speed = 0;
        this.rDash = false;
      }
    }
    if (this.lDash == true) {
      this.speed = this.speed - dashSpeed;
      this.x = this.x + this.speed;
      this.hitbox = this.hitbox + this.speed;
      if (this.x <= this.startingX - 70 || this.x <= p1.x) {
        this.speed = 0;
        this.lDash = false;
      }
    }
  }

  block() {
    //if down arrow key is down, player is not moving, and you havent attacked in the last 80 frames then perform a block
    if (
      keyIsDown(DOWN_ARROW) &&
      keyIsDown(LEFT_ARROW) == false &&
      keyIsDown(RIGHT_ARROW) == false &&
      this.speed == 0 &&
      this.lag >= 80
    ) {
      this.blocking = true;
      image(p2Block, this.x - 369, -102);
    } else {
      this.blocking = false;
    }
  }

  attack() {
    //if up arrow key is pressed and you havent attacked in the last 80 frames then perform an attack
    if (this.lag >= 80 && keyCode == UP_ARROW) {
      this.lag = 0;
      p2ani.attacking = true;
      sword.play();
      //if the attack hitbox is over player 1's hitbox when the attack is performed and they are not blocking, then player 2 wins
      if (this.hitbox <= p1.x && p1.blocking == false) {
        hit.play();
        p2Score += 1;
        this.win = true;
        p1ani.running = false;
        p2ani.running = false;
        p1ani.attacking == false;
        p2ani.attacking == false;
        p2.blocking = false;
        paused = true;
      }
      //if player 1 was blocking then the attack was blocked
      if (this.hitbox <= p1.x && p1.blocking == true) {
        p1.blocked = true;
        block.play();
      }
    }
  }
}

class P1Animations {
  running = false;
  attacking = false;
  dying = false;
  blockedCount = 31;

  idle() {
    //if no other animation is playing then play the idle animation
    if (
      this.running == false &&
      p1.blocking == false &&
      this.dying == false &&
      this.attacking == false
    ) {
      animation(p1IdleAni, p1.x - 37, 322);
    }
  }

  run() {
    //if A or D key is down and player is not attacking then play running animation
    if (keyIsDown(68) == true || keyIsDown(65) == true) {
      this.running = true;
    } else {
      this.running = false;
    }
    if (this.running == true && this.attacking == false) {
      animation(p1RunAni, p1.x - 37, 322);
    }
  }

  attack() {
    //if player 1 attacks, play the attack animation then stop it and reset it when it's done
    this.attacking = true;
    animation(p1AttackAni, p1.x - 37, 322);
    if (p1AttackAni.frame == 3) {
      p1AttackAni.stop();
      this.attacking = false;
      p1AttackAni.play(0);
    }
  }

  death() {
    //if player 2 wins then play death animation
    this.dying = true;
    animation(p1DeathAni, p1.x - 37, 322);
    if (p1DeathAni.frame == 5) {
      p1DeathAni.stop();
    }
  }

  blocked() {
    //if player 1 blocks an attack from player 2 then play block animation
    if (
      this.blockedCount <= 30 &&
      this.running == false &&
      p1.blocking == true &&
      this.attacking == false
    ) {
      animation(p1Blocked, p1.x - 58, 298);
    }
    if (p1.blocked == true) {
      this.blockedCount = 0;
      p1.blocked = false;
    }
  }
}


class FrontRain {
  x = random(1000);
  y = random(-50, -1000);
  speed = random(4, 10);

  fall() {
    //constant speed and acceleration
    this.y = this.y + this.speed;
    this.speed = this.speed + 0.1;
    //reset rain drop when it hits the ground
    if (this.y > random(415, 430)) {
      this.y = random(-50, -1000);
      this.speed = random(4, 10);
    }
  }

  display() {
    stroke(83, 120, 158);
    line(this.x, this.y, this.x, this.y + 30);
  }
}

class BackRain {
  x = random(1000);
  y = random(-50, -1000);
  speed = random(4, 10);

  fall() {
    //constant speed and acceleration
    this.y = this.y + this.speed;
    this.speed = this.speed + 0.1;
    //reset rain drop when it hits the ground
    if (this.y > random(375, 400)) {
      this.y = random(-50, -1000);
      this.speed = random(4, 10);
    }
  }

  display() {
    stroke(83, 120, 158);
    line(this.x, this.y, this.x, this.y + 20);
  }
}
