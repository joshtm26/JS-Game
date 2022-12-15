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
