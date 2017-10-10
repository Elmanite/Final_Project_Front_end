function Bubble(x, y, img){
  this.x=x;
  this.y=y;
  // this.r=24;
  this.img = img;
  // this.col = color(225);
  // this.lifespan = 255;
  // this.changeColor = function(){
  //   this.col = color(random(255), random(255), random(255));
  // }
  // this.intersects = function (other){
  //   var d = dist(this.x, this.y, other.x, other.y);
  //   if (d< this.r + other.r){
  //     return true;
  //   }else {
  //     return false;
  //   }
  // }
  this.display = function (){
    stroke(255);
    // noStroke();
    // fill(255,this.lifespan);
    // fill(this.col);
    fill(255,100);
    // ellipse(this.x, this.y, this.r * 2, this.r * 2);
    // ellipse(this.x, this.y, this.r * 2, this.r * 2);
    imageMode(CENTER);
    image(this.img, this.x, this.y);
  }
  this.update = function(){
    this.x = this.x+random(-1,1);
    this.y = this.y+random(-1,1);
    // this.lifespan = this.lifespan -1;
  }
  // this.isFinished = function(){
  //   if(this.lifespan < 0){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }
}
