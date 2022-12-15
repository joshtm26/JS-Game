class P1Animations {
  running = false;
  attacking = false;
  dying = false;
  blockedCount = 31;
  specialCount = 0;

  special() {
    if (special == true) {
      this.specialCount++;
      if (this.specialCount >= 1 && this.specialCount < 100) {
        image(unsheathed, p2.x - 200, -77);
        //stop rain somehow
      }
      if (this.specialCount >= 100) {
        image(sheathed, p2.x - 200, -77)
        p1.win = true;
        //play rain
      }
    }
  }
  
  idle() {
    //if no other animation is playing then play the idle animation
    if (
      special == false &&
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
