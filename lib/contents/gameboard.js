
class Chessboard{
  constructor(xSize, ySize, xCell, yCell){
    // this.size = size;
    this.xSize = xSize || 1;//cells width number
    this.ySize = ySize || 1;//cells height 
    this.xCell = xCell || 1;//cells x size
    this.yCell = yCell || 1;//cells y size

  }
  totalCells(){
    return this.xSize * this.ySize;
  }
  getCellPosByIndex(index){
    if (index < 0 || index > this.totalCells()-1) return null;
    let y_pos = Math.floor(index / this.ySize);
    let x_pos = index % this.ySize;
    return {
      x : x_pos,
      y : y_pos,
      coordinate_x : x_pos * this.xCell,
      coordinate_y : y_pos * this.yCell
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
    console.log(posArray);
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

    return numbers;
  }

}