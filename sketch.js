var dog,HappyDog,foodS,foodStock;
var database;
var dog_image1 , dog_image2;
var score;

function preload()
{
  dog_image1 = loadImage("images/dogImg.png");
  HappyDog = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(600,600);
  database = firebase.database()
  dog = createSprite(350,300,30,30);
  dog.addImage(dog_image1);
  dog.scale = 0.4;
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  score = 0;
}


function draw() {  
 background(46,139,87);


  drawSprites();
  textSize(25);
  fill ("white");
  text("Food remaining :"+score,50,250);
  
  if(keyWentDown("UP_ARROW")){
    score = score + 1;
    writeStock(foodS);
    dog.addImage(HappyDog);
  }

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
    if(x <= 0){
      x=0;
    }else{
      x = x-1;
    }
  database.ref('/').update({
    Food:x
  })
}



