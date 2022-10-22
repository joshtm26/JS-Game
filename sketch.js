//TO INCLUDE
//animations for movement, attacking, and maybe idle
//back and forth dashing/stepping
//2 players one keyboard
//2 attacks: a slower poke/longer swipe and quick forward down swing
//ending lag for the actions


function setup() {
  createCanvas(800, 400);
  angleMode(DEGREES);

}

function draw() {
  background(230);
  fill(0);
  stroke(0);
  strokeWeight(10);
  rect(0, 350, 800, 50);
  //head
  circle(100, 150, 50);
  //torso
  line(100, 150, 90, 260);
  //left leg
  line(90, 260, 80, 305);
  line(80, 305, 60, 350);
  //right leg
  line(90, 260, 115, 305);
  line(115, 305, 110, 350);
  //left arm
  line(96, 202, 112, 240);
  line(112, 240, );
  
  

}

function lDude() {
  
}

function rDude() {
  
}