class P2Animations {
  running = false;
  attacking = false;
  dying = false;
  blockedCount = 30;

  idle() {
    //if no other animation is playing then play the idle animation
    if (
      this.running == false &&
      p2.blocking == false &&
      this.dying == false &&
      this.attacking == false
    ) {
      animation(p2IdleAni, p2.x + 30, 298);
    }
  }

  run() {
    //if left arrow or right arrow key is down and player is not attacking then play running animation
    if (keyIsDown(LEFT_ARROW) == true || keyIsDown(RIGHT_ARROW) == true) {
      this.running = true;
    } else {
      this.running = false;
    }
    if (this.running == true && this.attacking == false) {
      animation(p2RunAni, p2.x + 30, 298);
    }
  }

  attack() {
    //if player 2 attacks, play the attack animation then stop it and reset it when it's done
    this.attacking = true;
    animation(p2AttackAni, p2.x + 30, 298);
    if (p2AttackAni.frame == 3) {
      p2AttackAni.stop();
      this.attacking = false;
      p2AttackAni.play(0);
    }
  }

  death() {
    //if player 1 wins then play death animation
    this.dying = true;
    animation(p2DeathAni, p2.x + 30, 298);
    if (p2DeathAni.frame == 6) {
      p2DeathAni.stop();
    }
  }

  blocked() {
    //if player 2 blocks an attack from player 1 then play block animation
    if (p2.blocked == true) {
      this.blockedCount = 0;
      p2.blocked = false;
    }
    if (
      this.blockedCount <= 30 &&
      this.running == false &&
      p2.blocking == true &&
      this.attacking == false
    ) {
      animation(p2Blocked, p2.x + 31, 298);
    }
  }
}