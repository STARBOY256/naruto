var landImg;
var land,land2;
var axisx=15;
var axisx2 =15;
var xe = 0, xey;
var gamestate = 'serve';
var buttonImg;
var playbutton;
var score = 0;
var music2;
var player,playerImg;
var rand, obs1,obs2,obs3,obs4;
var obstaclesGroup;
var ninjas;
var star = 0; 
var achievementsound;
var gameover, realgmover; 
var deadplayer;
var backup;
var pubg;
var cluesgroup;
var jk1,jk2,jk3,jk4;

function preload(){

landImg2 = loadImage('landed.jpg');
buttonImg = loadImage('button.png');
music2 = loadSound('ninja.aac');
playerImg = loadImage('ninja-3-unscreen.gif');
obs1 = loadImage("snake 1.webp");
obs2 =  loadImage("rocks .png");
obs3 = loadImage('output-onlinegiftools.gif');
obs4 = loadImage('ZOMBIE-unscreen.gif');
ninjas = loadImage("ninja-2-unscreen.gif");
achievementsound = loadSound('achievement.mp3');
gameover = loadImage('R (1).png');
deadplayer = loadImage('R (2).png');
voice = loadSound('TunePocket-Game-Over-Sound-1-Preview.mp3');
pubg = loadSound('PUBGTheme Song (2Scratch Trap Remix)(audioextractor.org).aac');
jk1 = loadImage('Screenshot 2022-01-13 090303.png');
jk2 = loadImage('Screenshot 2022-01-13 090928.png');
jk3 = loadImage('Screenshot 2022-01-13 091354.png');
jk4 = loadImage('Screenshot 2022-01-13 091842.png');

  
}

function setup() {
if(gamestate === 'serve'){
player = createSprite((windowWidth/3)/2,(windowHeight/3)*2.1);
}  
xey = windowWidth;
createCanvas(windowWidth,windowHeight);
obstaclesGroup = new Group();
cluesgroup = new Group();
    
}

function draw() {
          
background(220);
backup = image(landImg2,0,0,windowWidth,windowHeight);
land = image(landImg2,xe,0,windowWidth,windowHeight);
land2 = image(landImg2,xey,0,windowWidth,windowHeight);
drawSprites();
rand = Math.round(random(1,4)); 
if(gamestate == 'serve')  {
  clue();
  //fill("black");
  //textSize(10);
  //text(story,20,50);
  gravity();
  invis();
  player.addImage(playerImg);
  player.scale = 0.5;          
  playbutton = new button();
  playbutton.show();
  
}
if(touches.length>0&&gamestate === 'serve'||mouseIsPressed&&gamestate === 'serve'){
             
gamestate = 'play';
             
}
          
if(gamestate === 'play'){
pubg.stop();
cluesgroup.destroyEach();
score += Math.round(frameCount%2);
fill("black");
textSize(30);
text(score,20,50);
         
//axisx = axisx; 
//axisx2 = axisx2;
//if(score%121 === 0 ){
// axisx +=1;
//  axisx2+=1;
//}
xey -= axisx2;
xe -= axisx;
if(score%500 === 0 && score>0){
  star +=1/2;
  achievementsound.play();
}
    
fill("black");
textSize(30);
text(Math.round(star),20,90)
  
obstacles();
jump();
gravity();
invis();
changedd();
gameend();

if(!music2.isPlaying()){
            
music2.play();
            
}
if(xe < -(windowWidth*600/624)){
    xe = windowWidth;
     
     }else if(xey <= -(windowWidth*600/624)){
           xey = windowWidth;

}
  
  
  //console.log(xe);
  //console.log(windowWidth);
}
  if(gamestate === 'end'){
    gravity();
    invis();
    axisx =0;
    axisx2 =0;
    fill("black");
    textSize(50);
    text(score,windowWidth/2,windowHeight/3);
    music2.stop();
    textSize(25);
    text('PRESS SPACE',windowWidth/2.3,(windowHeight/3)*1.7);
    player.addImage(deadplayer);
    player.scale = 0.3;
    realgmover = createSprite(windowWidth /2, windowHeight/2);
    realgmover.addImage(gameover);
    realgmover.scale = 0.8;
    realgmover.lifetime  = 5;
    obstaclesGroup.destroyEach();
    if(!pubg.isPlaying()){
      pubg.play();
      pubg.setVolume(0.1);
}
    
}
  if(gamestate === 'end'&&keyDown('space')|| gamestate === 'end'&&touches.length>0){
     gamestate ='serve';
     axisx = 15;
     axisx2 = 15;
     xe = 0 ;
     xey = windowWidth;
     score =0;
     star = 0; 
     obstaclesGroup.destroyEach();
     
     }
} 

function obstacles(){
  
if(frameCount%40 === 0){
            
var obstacle = createSprite(windowWidth +100, (windowHeight/3)*2.1);
obstacle.velocityX = -20 - (Math.round(score/50));
obstacle.scale = 0.5;
obstaclesGroup.add(obstacle);
obstacle.lifetime = 150;
obstacle.setCollider('circle',0,0,110);
switch(rand){
case 1: obstacle.addImage(obs1);
break;
case 2: obstacle.addImage(obs2);
break;
case 3: obstacle.addImage(obs3);
break;
case 4: obstacle.addImage(obs4);
break;
default:break;

}
}
}

function jump(){
           
if(touches.length>0||keyDown('space')&&player.y>=windowHeight/1.6){
player.velocityY = -20;
player.addImage(ninjas);
}

}
 
function gravity(){
          
if(player.y<windowHeight/3.2) {
player.velocityY = +10; 
}
          
}

function invis(){
          
var invis1 = createSprite(windowWidth/2,(windowHeight/3)*2.65,windowWidth,100);
player.collide(invis1);
invis1.visible = false;
}

function changedd(){

if(player.y<windowHeight/3){

player.addImage(playerImg);

}

}

function gameend(){
  if(player.isTouching(obstaclesGroup)){
    gamestate = 'end';
}
}

function clue(){
if(frameCount%100 === 0 ){
var clues = createSprite(windowWidth+50,windowHeight/3.5);
clues.scale = 0.5;
clues.lifetime = 300;
cluesgroup.add(clues);
clues.lifetime = 250;
clues.velocityX = -4; 
switch(rand){
case 1: clues.addImage(jk1);
break;
case 2: clues.addImage(jk2);
break;
case 3: clues.addImage(jk3);
break;
case 4: clues.addImage(jk4);
break;
default:break;
}
}
}