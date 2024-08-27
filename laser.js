class Laser{
  constructor(navePos, naveAngle){
    this.pos = createVector(navePos.x, navePos.y);
    this.vel = p5.Vector.fromAngle(naveAngle);
    this.vel.mult(10);
  }
  
  update(){
    this.pos.add(this.vel);
  }
  
  render(){
    push();
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  }
}