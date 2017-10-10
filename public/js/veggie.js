function Veggie(x, y, scl, scl) {
  this.x = x;
  this.y = y;
  // this.img = img;
  this.display = function (){
    imageMode(CENTER);
    image(this.img, this.x, this.y);
  }
  this.show = function() {
    fill(100, 130, 191);
    rect(this.x, this.y, scl, scl);
  }
}
