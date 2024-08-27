class Nave{
  constructor(img){
    this.pos = createVector(width/2,height/2);
    this.heading = 0;
    this.rotation = 0;
    this.img = img;
    this.vel = createVector(0,0);
    this.acc = false;
  }
  
  render(){
    push();    
    translate(this.pos.x,this.pos.y);    
    rotate(this.heading + PI/2);
    imageMode(CENTER);
    image(this.img,0,0,40,40);    
    pop();
  }
  
  setRotation(rot){
    this.rotation = rot;
  }
  
  giro(){
    this.heading +=this.rotation;
  }
  
  boost(){
    let force = p5.Vector.fromAngle(this.heading);
    force.mult(0.3);
    this.vel.add(force);
  }
  
  acelerando(a){
    this.acc = a;
  }
  
  update(){
    if(this.acc){
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.95);
  }
  
  edges(){
    if(this.pos.x > width){
      this.pos.x = 0;
    }else if(this.pos.x < 0){
      this.pos.x = width;
    }else if(this.pos.y > height){
      this.pos.y = 0;      
    }else if(this.pos.y < 0){
      this.pos.y = height;
    }
  }
}