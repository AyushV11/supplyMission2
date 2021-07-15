var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
var SERVE
var PLAY
var gameState="SERVE"
var goodJob,goodJobImg
var badJob,badJobImg


const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
	goodJobImg=loadImage("thumbs up.png")
	badJobImg=loadImage("thumbs down.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)

	goodJob=createSprite(400,400,20,20)
goodJob.visible=false

badJob=createSprite(400,400,20,20)
badJob.visible=false

	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , { isStatic:true});
	World.add(world, packageBody);
	
	boxPosition=width/2-100
	boxY=610;



	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

	 boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxleftSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);


	//Engine.run(engine);


	Engine.run(engine);
	
	
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  
  if(gameState==="SERVE"){
	fill("blue")
	textSize(40)
	text("PRESS KEY_DOWN TO DROP PACKAGE",0,400)
  }

  if(packageSprite.isTouching(boxBase)){
	  goodJob.addImage(goodJobImg)
	  goodJob.scale=0.5
	  goodJob.visible=true
  }

  if(packageSprite.isTouching(groundSprite)){
	badJob.addImage(badJobImg)
	badJob.scale=0.5
	badJob.visible=true
}



   
  packageSprite.x= packageBody.position.x 
	packageSprite.y= packageBody.position.y 
	
 
  drawSprites();
 
}



function keyPressed() {
 if (keyCode === DOWN_ARROW)  {
    // Look at the hints in the document and understand how to make the package body fall only on press of the Down arrow key.
	gameState="PLAY"
   Matter.Body.setStatic(packageBody,false)
  }

  if(keyCode===LEFT_ARROW){
	Matter.Body.translate(packageBody,{x:-20,y:0})
	helicopterSprite.x=helicopterSprite.x-20
	
}

if(keyCode===RIGHT_ARROW){
	Matter.Body.translate(packageBody,{x:20,y:0})
	helicopterSprite.x=helicopterSprite.x+20
	
}
}





