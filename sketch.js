var Score;
var Level;
var ForFirst=0;
var ForSecond=0;
var ForThird=0;
var ForFourth=0;
var ForFifth=0;
var ForSixth=0;
var ForSeventh=0;
var ForEighth=0;
var state="play";
var Time=0;
var Times=100000;
function preload(){//preloads all images and animations
  BGimage=loadImage("Space.jpg");
  IMimage=loadImage("iron.png");
  Dimage=loadImage("diamond.png");
  OBimage=loadImage("spikes.png");
  KingpinImage=loadAnimation("Kingpin3.png","Kingpin2.png");
  VEimage=loadAnimation("DOOM1.png","DOOM2.png");
  Simage=loadImage("stone.png");
  THimage=loadAnimation("Thanos4.png","Thanos3.png");
  ReImage=loadImage("restart.png")
} 
function setup() {
  createCanvas(1500,700);//create the canvas
  OB=new Group();//create a new group for the obstacles
  Spikes=new Group();//create a new group for da spiks
  DG=new Group();//and for the Diamonds
  ST=new Group();//and for the stones
  BG=createSprite(0,0);//create,scale,andpicture the backgorund image
  BG.scale=3.4;
  BG.addImage(BGimage);
  BG.velocityY=-3;
  IM=createSprite(50,200,90,90);//same for the iron man sprite
  IM.scale=0.13;
  IM.addImage(IMimage);
  ResBut=createSprite(750,350,1,1);
  ResBut.addImage(ReImage);
  ResBut.scale=1;
  ResBut.visible=false;
  Score=0;//score starts as 0
  Level=1;//difficulty starts as 1
}
function draw() {
  if(state==="play"){
    if(frameCount%60==0){
      Time=Time+1;
    }
  ResBut.visible=false;
  if(BG.y<1){//gravity effect
    BG.y=BG.height/4;
  }
  if(keyDown("space")){//keyboard commands
    IM.velocityY=-5;
  }
  if(keyDown("right")){
    IM.x=IM.x+5;
  }
  if(keyDown("left")){
    IM.x=IM.x-5;
  }
  if(!keyDown("space")){
    if(IM.y<670){
      IM.velocityY=5;
    }
  }
  GenStones();//declare function generate stones
  for(var f=0;f<(ST).length;f++){//chack if iron man is touching an obstacle
    temp=ST.get(f);
    if(IM.isTouching(temp)){
      IM.collide(temp);
    }
  }
  GD();//declare function Generate diamonds
  for(var e=0;e<(DG).length;e++){//chack if iron man touches diamonds
    tin=DG.get(e);
    if(IM.isTouching(tin)){
      Score++;//increase score if yes
      tin.destroy();
      tin=null;
    }
  }
  GenSpikes();//declares function generate spikes
  if(IM.y>680){//if iron man touches the borders, it dies.
    Score="You Lose!";
    state="end";
  }
  if(IM.y<20){
    Score="You Lose!";
    state="end";
  }
  if(IM.x>1450){
    Score="You Lose!";
    state="end";
  }
  if(IM.x<10){
    Score="You Lose!";
    state="end";
  }
  if(IM.isTouching(OB)){//if Iron man touches any of the obstacles, it will die/be scaled to 0
    Score="You Lose!";
    state="end";
  }
  if(IM.isTouching(Spikes)){//if Iron man touches any of the obstacles, it will die/be scaled to 0
    Score="You Lose!";
    state="end";
  }
  if(Score>1){//with an increase in score, the level goes up
    Level=1;
    if(ForFirst==0){
      GenObstacle();//so more obstacles are made
      ForFirst++;
    }
  }
  if(Score>2){
    Level=2;
    if(ForSecond==0){
      GenObstacle();
      ForSecond++;
    }
  }
  if(Score>3){
    Level=3;
    if(ForThird==0){
      GenObstacle();
      ForThird++;
    }
  }
  if(Score>4){
    Level=4;
    if(ForFourth==0){
      GenObstacle();
      ForFourth++;
    }
  }
  if(Score>5){
    Level=5;
    if(ForFifth==0){
      GenObstacle();
      ForFifth++;
    }
  }
  if(Score>6){
    Level=6;
    if(ForSixth==0){
      GenObstacle();
      ForSixth++;
    }
  }
  if(Score>7){
    Level=7;
    if(ForSeventh==0){
      GenObstacle();
      ForSeventh++;
    }
  }
  if(Score>8){
    Level=8;
    if(ForEighth==0){
      GenObstacle();
      ForEighth++;
    }
  }
  if(Score>9){
    Level="YOU WIN!";
    if(Time<Times){
      Times=Time;
    }
    state="end";
  }
 /* if(g==0){
    obstacle.scale=0.4;
    g=1;
  }
  else if(g==1){
    obstacle.scale=0.3;
    g=0;
  }*/
  }
  else if(state==="end"){
    rec=0;
    IM.scale=0;
    IM.velocityY=0;
    ResBut.visible=true;
    BG.velocityY=0;
    OB.velocityY=0;
    Spikes.destroyEach();
    DG.destroyEach();
    ST.destroyEach();
    if(mousePressedOver(ResBut)){
    Time=0;
    Score=0;
    Level=0;
    BG.velocityY=-3;
    OB.velocityY=5;
    DG.velocityY=5;
    ST.velocityY=5;
    IM.scale=0.13;
    state="play";
    OB.destroyEach();
    ForFirst=0;
    ForSecond=0;
    ForThird=0;
    ForFourth=0;
    ForFifth=0;
    ForSixth=0;
    ForSeventh=0;
    ForEighth=0;
    }
  }
  drawSprites();
  stroke("red");
  textSize(20);
  text("Your Score:"+Score,1200,100);
  text("Your Level:"+Level,1200,170);
  text("Your Time:"+Time,1200,240);
  text("Your High Score is "+Math.max(Times),1200,310);
}

function GenSpikes(){
  if(frameCount%50==0){//every 50 frames
    SP=createSprite(0,0,55,55);//create a sprite
    SP.x=Math.round(random(120,1400));//at a randomized place
    SP.scale=0.7;//scale it
    SP.addImage(OBimage);//picture it
    SP.velocityY=5;//give it a downward speed
    SP.lifetime=1000;//give it a lifetime to not overload the OB group
    Spikes.add(SP);//add it to the group
  }
}
function GenObstacle(){
  obstacle=createSprite(random(100,1400),random(50,650),80,80);//create a sprite
  var rand=Math.round(random(1,3));//choose a random int
  switch(rand){//check the rand int
    case 2://if the random int is 1
      obstacle.addAnimation("running",KingpinImage);//add an animation
      obstacle.scale=0.3;
      OB.add(obstacle);
      break;
    case 1://if the random int is 2
      obstacle.addAnimation("running",VEimage);//add an animation
      obstacle.scale=0.3;
      OB.add(obstacle);
      break;
    case 3://if the random int is 3
      obstacle.addAnimation("running",THimage);//add an animation
      obstacle.scale=0.17;
      OB.add(obstacle);
      break;
    default:
      break;
  }
}
function GD(){
  if(frameCount%70==0){
    D=createSprite(0,0,55,55);
    D.x=Math.round(random(120,1400));
    D.scale=0.2;
    D.addImage(Dimage);
    D.velocityY=5;
    D.lifetime=1000;
    DG.add(D);
  }
}
function GenStones(){
  if(frameCount%90==0){
    Stone=createSprite(0,0,55,55);
    Stone.x=Math.round(random(120,1400));
    Stone.scale=0.3;
    Stone.addImage(Simage);
    Stone.velocityY=5;
    Stone.lifetime=1000;
    ST.add(Stone);
  }
}