class Inimigo{
  constructor(img,x,y){
    this.img = img;
    this.x = x;
    this.y = y;
  }
  
  render(){
    image(this.img, this.x, this.y, 45,45);
    this.y += 1;
  }
}