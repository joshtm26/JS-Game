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
  line(90, 260, 85, 305);
  line(75, 305, 70, 350);
  //right leg
  line(90, 260, 115, 305)
  
  

}

function lDude() {
  
}

function rDude() {
  
}