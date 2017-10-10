function Hamster() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.eat = function (veggie) {
    if(this.x == veggie.x && this.y == veggie.y){
      return true;
    }else{
      return false;
    }
    var d = dist(this.x, this.y, pos.x, pos.y);
    if(d < 1){
      this.total++;
      return true;
    } else {
      return false;
    }
  }
  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }
  this.death = function() {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      console.log('starting over');
      this.total = 0;
    }
  }
  this.update = function() {
    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;
    this.x = constrain(this.x, 0, width-scl);
    this.y = constrain(this.y, 0, height-scl);
  }
  this.show = function() {
    fill(255);
    rect(this.x, this.y, scl, scl);
  }
  // this.intersects = function (other){
  //   var d = dist(this.x, this.y, other.x, other.y);
  //   if (d< this.r + other.r){
  //     return true;
  //   }else {
  //     return false;
  //   }
  // }
}
