var dog, happyDog, database, foodS, foodStock
var dogImg, happyDogImg;
var milkImg;
var eatTime, lastFed, milk;
function preload()
{
happyDogImg = loadImage("../images/dogImg1.png");
dogImg = loadImage("../images/Dog.png");
milkImg = loadImage("../images/Milk.png");
}

function setup() {
  createCanvas(1000, 1000);
  database = firebase.database();
  milk = new Food();
  feed = createButton("FEED");
  feed.position(230 , 150);
  add = createButton("ADD FOOD");
  add.position(290, 150)
  dog = createSprite(250, 250, 50, 50);
  dog.addImage("Dog Image", dogImg)
  dog.scale = 0.5;
  foodStock = database.ref("Food");
  foodStock.on('value', readStock);
}


function draw() {  
  background(46, 139, 87)
  eatTime = database.ref('feedTime');
  eatTime.on('value', function (data){
  lastFed = data.val();
  });
add.mousePressed(()=>{
foodStock += 1;
milk= new Food();
  });
  fill("blue");
  textSize(30);
  if(lastFed >= 12){
  text("Last Feed Time: " + lastFed % 12 + "pm", 400 , 450);
}
else if(lastFed === 0){
text("Last Feed : 12am", 400, 450);
} 
else {
  text("Last Feed Time: " + lastFed + "am", 400 , 450);
}
 if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("Dog Image",happyDogImg);
  }
 
  drawSprites();
  fill(0)
  text("Food Left: " + foodS, 250, 50);
  fill(0)
  text("PRESS UP ARROW TO FEED HEDWIG", 250, 100);
}
 function readStock(data){
   foodS = data.val();
   milk.updateFood(foodS);
 }
 
 function writeStock(x){
   if(x <= 0){
     x = 0
   }
   else{
     x = x-1;
   }
   database.ref('/').update({
     Food : x
})
  }

