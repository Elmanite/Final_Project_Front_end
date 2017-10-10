function Snake() {
  this.x = 0;
  this.y = 0;
  this.pos = createVector(width/2,height/2);
  this.vel = createVector(0,0);
  this.eat = function (hamster) {
    var d = dist(this.x, this.y, hamster.x, hamster.y);
    if(d < 1){
      return true;
    } else {
      return false;
    }
  }
  this.update = function() {
    var dir = createVector(hamster.x, hamster.y);
    dir.sub(this.pos);
    dir.setMag(8);
    this.pos.add(dir);
  }
  this.show = function() {
    fill(35, 136, 194);
    rect(this.pos.x, this.pos.y, scl, scl);
  }
}
