

import Content from './content.js';

export default class CrossPattern extends Content{
  constructor(p5, x, y, size){
    super(p5)
    this.x = x;
    this.y = y;
    this.size = size;
  }
  
  draw(){
    // console.log('draw cross')
    this.p5.line( this.x - this.size, this.y, this.x + this.size, this.y);
    this.p5.line(this.x , this.y+ this.size, this.x , this.y - this.size);
  }
}