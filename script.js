//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let backgroundImg, catcherImg, fallingObjectImg;
let a1Button;
let a2Button;

/* PRELOAD LOADS FILES */
function preload(){
  backgroundImg = loadImage("assets/Water_Bucket.webp");
  catcherImg = loadImage("assets/bucket.png");
  fallingObjectImg = loadImage("assets/waterdrop.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  background(224,224,224);

  backgroundImg.resize(40,0);

  a2Button = new Sprite (-50, -50);
  b1Button = new Sprite (-100, -100);
  
  //Create catcher 
  catcher = new Sprite(catcherImg, 200,380,40,20, "k");
  catcher.color = color(95,158,160);
  catcherImg.resize(60,0);
  
  //Create falling object
  fallingObject = new Sprite(fallingObjectImg, 100,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.vel.y = 2;
  fallingObject.rotationLock = true;
  fallingObjectImg.resize(50,0);

  //frame counter
  frameRate(30);
  textSize(30);
  textAlign(screenTop);
}

/* DRAW LOOP REPEATS */
function draw() {
    background(224,224,224);
  

  text("Timer:", 10, 50);
  background(200);
  text("Score:",10, 50);
  text(frameCount, 80, 50);

  //Draw background Img
    image(backgroundImg, 350, 90)

  // Draw directions to screen
  fill(0);
  textSize(12);
  text("Move the bucket\nwith the left and \nright arrow keys to\ncollect the waterdroplets \nand help conserve \nwater during \nCalifornia's \ndrought!", width-130, 20);

  //If falling object reaches bottom, move back to random pos at top
  if (fallingObject.y >= height){
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1,5);
  }
   
  //move catcher 
  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  } else if (kb.pressing("right")) {
      catcher.vel.x = 3;
  }  else {
      catcher.vel.x = 0;
  }

  //stop catcher at the end of the screen
  if (catcher.x < 20){
    catcher.x = 20;
  }  else if (catcher.x > 380){
    catcher.x = 380;
  }

  //If fallingObject collides with catcher, move back to random pos at top
  if (fallingObject.collides(catcher)){
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1,5)
    fallingObject.direction = "down";
    score += 1
  
  }
  
    //score counter
    fill(0, 128, 128);
    textSize(20);
  text("Drops: " + score, 10, 30);
  if (score == 10) {
    youWin();
    frameCount();

  if (mouseIsPressed){
        restart();
      }
  }


}

/*functions*/
function youWin() {
  background(224,224,224);
  
  //Draw sprites off of screen
  catcher.pos = { x: 600, y: -300 };
  fallingObject.pos = { x: -100, y: 0 };

  //Draw end of game text
  textSize(20);
  fill(0);
  text("You win!", width/2 - 50, height/2 - 30); 
  textSize(12);
  text("Click the mouse anywhere to play again.", width/2 - 120, height/2);
  text("Your Score: " + frameCount, width/2 - 50, height/2 + 30);
}


function restart() {
  //Reset score
  score = 0;
  frameCount = 0;
  //Reset sprites
  catcher.pos = { x: 200, y: 380 };
  fallingObject.y = 0;
  fallingObject.x = random(width);
  fallingObject.velocity.y = random(1,5);
  fallingObject.direction = "down";
}