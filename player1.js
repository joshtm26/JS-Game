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
  commandInput = 0;
  commandCount = 12;
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
    if (keyCode == 87 && this.lag >= 80 && this.commandInput < 4) {
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
  
   special() {
    if (keyCode == 65 && this.commandCount > 12) {
      this.commandInput = 1;
      this.commandCount = 0;
    }
    if (keyCode == 68 && this.commandCount <= 12 && this.commandInput == 1) {
      this.commandInput += 1;
      this.commandCount = 0;
    } else if (keyCode == 68 && this.commandCount > 12) {
      this.commandInput = 0;
    }
    if (keyCode == 65 && this.commandCount <= 12 && this.commandInput == 2) {
      this.commandInput += 1;
      this.commandCount = 0;
    } else if (keyCode == 65 && this.commandCount > 12) {
      this.commandInput = 0;
    }
    if (keyCode == 68 && this.commandCount <= 12 && this.commandInput == 3) {
      this.commandInput += 1;
      this.commandCount = 0;
    } else if (keyCode == 68 && this.commandCount > 12) {
      this.commandInput = 0;
    }
    if (keyCode == 87 && this.commandInput == 4) {
      paused = true;
      special = true;
      teleport.play();
    }
  }
}
