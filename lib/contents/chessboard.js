import Content from './content.js';
import {generateUniqueRandomNumbers} from "../Utilities/colorcode.js"
export class cell{
  constructor(x,y,coordinate_x, coordinate_y, color=[0,0,0]){
    this.x = x;
    this.y = y;
    this.coordinate_x = coordinate_x;
    this.coordinate_y = coordinate_y;
    this.color = color;
  }
  setColor(color){
    this.color = color;
  }
}
export  class Chessboard extends Content{
  
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
    let coordinate_x = x_pos * this.xSize;
    let coordinate_y = y_pos * this.ySize;
    // console.log("index", index, x_pos, y_pos)
    return new cell(x_pos, y_pos, coordinate_x, coordinate_y)
    
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
    return posArray;
  }
  generateUniqueRandomNumbers(count){
    let max_index = this.totalCells()-1;
    return generateUniqueRandomNumbers(count, max_index);
  }

}
