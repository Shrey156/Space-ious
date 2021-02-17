var PLAY = 1;
var END = 0;
var gameState = PLAY;

var rocket,rocketImage;
var rock,rockImage,rockImage1,space,spaceImage;
var rockGroup;

function preload(){
  rockImage = loadImage("rock1.png");
  rockImage1 = loadImage("rock2.png")
  spaceImage = loadImage("space.jpg");
  rocketImage = loadImage("rocket.png");
  
}

function setup() {
  createCanvas(600,600);
  
  //create space
  space = createSprite(300,300,1200,10);
  space.addImage(spaceImage);
  space.y = space.height/2;
  space.velocityY = 3;
  space.scale = 3;
  
  //create rocket
  rocket = createSprite(80,315,20,20);
  rocket.addImage(rocketImage);
  rocket.scale = 0.5;
  //rocket.debug = true;     
  rocket.setCollider("rectangle",0,0,110,170);
  
//   gameOver = createSprite(300,130);
//   gameOver.addImage(gameoverImg);
//   gameOver.scale = 0.5;
  
//   restart = createSprite(300,220);
//   restart.addImage(restartImg);
//   restart.scale = 0.3;
   
   rockGroup = createGroup();
}


function draw() {
  background("white");
  
  if(gameState === PLAY){
    
   //jump when the space key is pressed
    if(keyDown("space")) {
        rocket.velocityY = -18;
    }
    
    //scrolling the space
    if (space.y > 600){
      space.y = space.height/2;
    }
    
    //add gravity
    rocket.velocityY = rocket.velocityY + 1;
    
    rocket.x = mouseX;
    
    rocket.collide(rockGroup);
    
    Rock();
    
    //changing the gameState
    if(rocket.y>600||rocket.y<0||rocket.y<0||rocket.y>600){
      gameState = END;
    }
  }
  
  if(gameState === END){
   
      space.velocityY = 0;
      rocket.velocityY = 0;
      
 //set lifetime of the game objects so that they are never   destroyed
    rockGroup.setLifetimeEach(-1);
     
    //set velocityX zero
     rockGroup.setVelocityYEach(0);
  }
  
  drawSprites();
}

// function reset(){
 
//   gameState = PLAY;
  
//   rockGroup.destroyEach();
//   FoodGroup.destroyEach();
  
// }

function Rock(){
  if(frameCount % 150 === 0){
  rock = createSprite(300,0,10,10);
  rock.velocityY = 3;
  
  var rand = Math.round(random(1,2));
    switch(rand){
        case 1: rock.addImage(rockImage);
        break;
        case 2: rock.addImage(rockImage1);
        break;
        default: break;
    }
  rock.x = Math.round(random(300,200));
  rock.scale = 0.5;
  rock.lifetime = 200;
  //rock.debug = true;
  rock.setCollider("circle",0,0,30);
  
  rockGroup.add(rock);
  }
}
