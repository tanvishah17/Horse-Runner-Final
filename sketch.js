var PLAY = 1;
var END = 0;
var gameState = PLAY;

var horse, horse_running;
var background, invisibleGround, backgroundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;

var score;
var scoreBoard, scoreBoardImg;

var cheerleader, cheerleader2, /*cheerleader3,*/ cheerleaderImage;
var cheerleader_dance;

var restart, retartImage;
var gameOver, gameOverImage;

var text1;

//var backgroundSound;


function preload(){
  horse_running = loadImage("horseRunning.png");
  
  backgroundImage = loadImage("background.jpg");
  
  obstacle1 = loadImage("huddle.png");
  obstacle2 = loadImage("rocks.png");
  obstacle3 = loadImage("trafficCones.png");
  obstacle4 = loadImage("rocks2.png");

  scoreBoardImg = loadImage("scoreBoard.png");
  cheerleaderImage = loadImage("cheerleader.png");
  
  cheerleader_dance = loadAnimation("cheerleader.png","cheerleader3.png","cheerleader2.png","cheerleader4.png");
  
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");

  //backgroundSound = loadSound("backgroundSound.mp3");
}

function setup() {
  createCanvas(600, 200);
  
  horse = createSprite(75,120,20,50);
  horse.addImage(horse_running);
  horse.scale = 0.2;
  
  background = createSprite(200,100);
  background.addImage(backgroundImage);
  background.x = background.width /2;

  scoreBoard = createSprite(400,80,10,10);
  scoreBoard.addImage(scoreBoardImg);
  scoreBoard.scale = 0.3;

  //cheerleader = createSprite(495,90);
  //cheerleader.addImage(cheerleaderImage);
  //cheerleader.scale = 0.06;
  //cheerleader.debug=true

  cheerleader = createSprite(495,90);
  cheerleader.addAnimation("running", cheerleader_dance);
  cheerleader.scale = 0.06;

 /* cheerleader2 = createSprite(560,90);
  cheerleader2.addImage(cheerleaderImage);
  cheerleader2.scale = 0.06;*/

  cheerleader2 = createSprite(560,90);
  cheerleader2.addAnimation("running" ,cheerleader_dance);
  cheerleader2.scale = 0.06;

  /*cheerleader3 = createSprite(425,90);
  cheerleader3.addImage(cheerleaderImage);
  cheerleader3.scale = 0.06;*/

  //cheerleader3 = createSprite(425,90);
  //cheerleader3.addAnimation("running", cheerleader_dance);
  //cheerleader3.scale = 0.06;
  
  gameOver = createSprite(300,90);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;

  restart = createSprite(300,130);
  restart.addImage(restartImage);
  restart.scale = 0.03;
  
  
  invisibleGround = createSprite(50,230,1500);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();

  horse.setCollider("rectangle", 0,0,500,horse.height)
  //horse.debug = true;
  
  score = 0
}

function draw() {
  
  // text1 = text("Score- "+ score, 500,45);
  // text1.depth = background.depth;
  // text1.depth += 1;

  if(gameState === PLAY){

    //backgroundSound.play();
    
    background.velocityX = -4;
    score = score + Math.round(frameCount/300);

    if (background.x < 0){
      background.x = background.width/2;
    }
    
    if(keyDown("UP_ARROW")&& horse.y >=100) {
        horse.velocityY = -10;
    }
    
    gameOver.visible = false;
    restart.visible = false;
   
    horse.velocityY = horse.velocityY + 0.5

    horse.depth = background.depth
    horse.depth += 1

    scoreBoard.depth = background.depth
    scoreBoard.depth += 1;
  
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(horse))
    {
      gameState = END;
    }
  }
   else if (gameState === END) 
  {
    background.velocityX = 0;
    horse.velocityY = 0;

    //backgroundSound.stop();

    obstaclesGroup.setLifetimeEach(-10);
    
    obstaclesGroup.setVelocityXEach(0);

    cheerleader.remove();
    cheerleader2.remove();
    //cheerleader3.remove();

    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)){
      reset();
    }
  }
  
 
  
  horse.collide(invisibleGround);
  
  
  
  drawSprites();
  fill("black")
  textSize(25);
  text("SCORE: "+ score, 320,70);
}

function reset(){
  gameState = PLAY;

  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();

  cheerleader = createSprite(495,90);
  cheerleader.addAnimation("running", cheerleader_dance);
  cheerleader.scale = 0.06;

  cheerleader2 = createSprite(560,90);
  cheerleader2.addAnimation("running" ,cheerleader_dance);
  cheerleader2.scale = 0.06;

  /*cheerleader3 = createSprite(425,90);
  cheerleader3.addAnimation("running", cheerleader_dance);
  cheerleader3.scale = 0.06;*/

  
  
  score = 0;
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }           
    obstacle.scale = 0.12;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
 }
}



