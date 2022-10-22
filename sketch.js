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
  background(200);
  fill(0);
  stroke(0);
  strokeWeight(10);
  //ground
  rect(0, 350, 800, 50);
  
  //left guy
  //head
  circle(105, 160, 50);
  //torso
  line(100, 150, 90, 260);
  //left leg
  line(90, 260, 80, 305);
  line(80, 305, 60, 350);
  //right leg
  line(90, 260, 115, 305);
  line(115, 305, 110, 350);
  //left arm
  line(96, 210, 112, 240);
  line(112, 240, 140, 250);
  //right arm
  line(96, 202, 120, 230);
  line(120, 230, 145, 235);
  
  //left guy's sword
  noStroke();
  //handle
  quad(135, 260, 143, 262, 153, 225, 145, 223);
  //blade
  fill(240);
  quad(153, 225, 145, 223, 100, 100, 110, 110);
  
  

}

function lDude() {
  
}

function rDude() {
  
}