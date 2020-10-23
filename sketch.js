var PLAY = 1;
var END = 0;
var gameState = 1;


var sword, swordImage
var fruits, fruitGroup, fruit1, fruit2, fruit3, fruit4, fruit1Image, fruit2Image, fruit3Image, fruit4Image
var alien, alienGroup, alienImage
var gameOverImage

var score
var gameOverSound, knifeSwooshSound


function preload(){
  swordImage = loadImage("sword.png")
  fruit1Image = loadImage("fruit1.png")
  fruit2Image = loadImage("fruit2.png")
  fruit3Image = loadImage("fruit3.png")
  fruit4Image = loadImage("fruit4.png")
  alienImage = loadImage("alien1.png")
  gameOverImage = loadImage("gameover.png") 
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3")

}


function setup() {
  createCanvas(windowWidth,windowHeight);
  
  sword = createSprite(300,250,10,10)
    sword.addImage(swordImage);
      sword.scale = 0.5
  
  
  fruitGroup = createGroup()
  alienGroup = createGroup()
  
  score = 0;
  

  
}

function draw() {
  background("cyan")
  
  text("Score: "+ score, 500,50);
  
   if(gameState === PLAY){
     
     sword.y=World.mouseY
     sword.x=World.mouseX
     
     fruits();
           enemy();
     
     if(fruitGroup.isTouching(sword)){
       fruitGroup.destroyEach();
       knifeSwooshSound.play();
     score = score+2;
     }
      
     if(alienGroup.isTouching(sword)){
       alienGroup.destroyEach();
       gameOverSound.play();
       gameState = END
       
     }
     
     
   }
    else if (gameState === END){
      
      if(alienGroup.isTouching(sword)){
        alienGroup.destroyEach();
        gameOverSound.play();
        gameState = END
      }
      
      sword.addImage(gameOverImage)
      text("Press Game Over To Restart",250,250);
      text.scale = 1
      
      if(mousePressedOver(sword)){
        restart();
        
      }
      
    }
  
  
  
 drawSprites();

  
}

function fruits(){
  if(World.frameCount%80===0){
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2
    
    r=Math.round(random(1,4));
    if(r == 1){
      fruit.addImage(fruit1Image)
    }else if (r == 2) {
      fruit.addImage(fruit2Image)
    }else if (r == 3){
      fruit.addImage(fruit3Image)
  }else if (r == 4){
      fruit.addImage(fruit4Image)
  }
    
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX=-(7+(score/1));
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  
  }
}

function enemy(){
    if(World.frameCount%200===0){
      alien=createSprite(400,200,20,20)
      alien.addImage(alienImage)
      alien.y=Math.round(random(100,300))
      alien.velocityX = -(8+(score/1));
      alien.setLifetime=50;
      
      alienGroup.add(alien)
      
      
    }
}
  
  function restart(){
    gameState = PLAY
    sword.addImage(swordImage)
    score = 0
    
  }
  
  
  
  


