var victory_points=0;
var button;
var snake;
var hamster;
var scl = 20;
var veggies=[];
var imgs = [];
// function preload (){
//   imgs[0] = loadImage('frontend/public/styles/pics/bokchoy.png');
//   imgs[1] = loadImage('../frontend/public/styles/pics/beet.png');
//   imgs[2] = loadImage('../frontend/public/styles/pics/cabbage.png');
//   imgs[3] = loadImage('../frontend/public/styles/pics/carrot.png');
// }
function setup() {
  createCanvas(600, 600);
  for (var i =0; i < 4; i++){
    var x = floor(random(0, width));
    var y = floor(random(0, height));
    veggies[i] = new Veggie (x, y, scl, scl);
    console.log(veggies[i]);
  }

  hamster = new Hamster();
  snake = new Snake(width/2, height/2, 20);
  frameRate(10);
}
function draw() {
  background(51);
  hamster.update();
  hamster.show();
  snake.update();
  snake.show();
  for (var i =0; i < veggies.length; i++){
    veggies[i].show();
    d = dist(hamster.x, hamster.y, veggies[i].x, veggies[i].y);
    console.log(d);
    if (d < 10){
      veggies.splice(veggies[i], 1);
      victory_points++;
    }
  }
  if(snake.eat(hamster)){
    prompt("The snake has caught up to the hamster and is hungry!******Game Over*******");
    prompt("Play again? Y/N", y, n);
  }
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    hamster.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    hamster.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    hamster.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    hamster.dir(-1, 0);
  }
}
