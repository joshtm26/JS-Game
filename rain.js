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
