import Content from './content.js';

export default class Chessboard extends Content{
  constructor(p5, xSize, ySize, xCell, yCell){
    super(p5);
    // this.size = size;
    this.xSize = xSize || 1;//number of horizontal cells 
    this.ySize = ySize || 1;//number of vertical cells 
    this.xCell = xCell || 1;//cells x size
    this.yCell = yCell || 1;//cells y size
    console.log('chessboard', this.xSize, this.ySize, this.xCell, this.yCell)
  }

  draw(){
    for (let x_index=0; x_index<=this.xCell; x_index ++){
      let x_pos = x_index * this.xSize;
      this.p5.line( x_pos, 0, x_pos, this.ySize*this.yCell);
    }
    for (let y_index=0; y_index<=this.yCell; y_index ++){
      let y_pos = y_index * this.ySize;
      this.p5.line(0, y_pos, this.xSize*this.xCell, y_pos);
    }
  }
  
  totalCells(){
    return this.xCell * this.yCell;
  }
  
  getCellPosByIndex(index){
    if (index < 0 || index > this.totalCells()-1) return null;
    let y_pos = Math.floor(index / this.yCell);
    let x_pos = index % this.yCell;
    
    console.log("index", index, x_pos, y_pos)
    return {
      x : x_pos,
      y : y_pos,
      coordinate_x : x_pos * this.xSize,
      coordinate_y : y_pos * this.ySize
    }
  }
  getCellIndex(x,y){
    if (x > xSize-1 || x < 0)return null;
    if (y > ySize-1 || y < 0)return null;
    return y*this.xSize + x;
  }
  generateUniqueRandomCells(count){
    let randomSeedsArray = this.generateUniqueRandomNumbers(count);
    let posArray = randomSeedsArray.map(index => {
      console.log(index)
      return this.getCellPosByIndex(index) })
    console.log("generateUniqueRandomNumbers pos Array", posArray);
    return posArray;
  }
  generateUniqueRandomNumbers(count){
    let max_index = this.totalCells()-1;
    let min_index = 0;
    if(max_index - min_index + 1 < count) {
        throw new Error('The range is too small for the specified count.');
    }

    let numbers = [];
    let numPool = Array.from({ length: max_index - min_index + 1 }, (_, i) => i + min_index); 

    for(let i = 0; i < count; i++) {
        let index = Math.floor(Math.random() * numPool.length);
        let num = numPool.splice(index, 1)[0]; 
        numbers.push(num);
    }
  console.log("generateUniqueRandomNumbers pos Array", numbers, max_index, min_index);
    return numbers;
  }

}
