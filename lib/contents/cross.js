

class Content{
  constructor(p5){
    this.p5 = p5
  }
  init(){}
  draw(){}
}
export class CrossPattern extends Content{
  constructor(p5, x, y, size){
    super(p5)
    this.x = x;
    this.y = y;
    this.size = size;
  }
  
  draw(){
    this.p5.line( x - size, y, x + size, y);
    this.p5.line(x , y+ size, x , y - size);
  }
}