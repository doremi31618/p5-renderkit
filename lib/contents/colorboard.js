import {Chessboard, cell} from './chessboard.js';

export default class Colorboard extends Chessboard {
  constructor(p5, canvasWidth, cellNumber, color_code=null) {
    // var color_code = [];
    super(p5, canvasWidth / cellNumber, canvasWidth / cellNumber, cellNumber, cellNumber);
    this.cell_size = canvasWidth / cellNumber;
    this.borderWidth = 10;
    if (!color_code) this.cells = this.generateUniqueRandomCells(3);
    else this.setColorCode(color_code)
    console.log('colorboard')
  }
  draw() {
    // console.log('draw colorboard cells', this.cells);
    //super.draw();
    for (var cell of this.cells) {
      this.drawColorCube(cell.color, cell.coordinate_x, cell.coordinate_y, this.cell_size);
    }
  }
  drawColorCube(c, x, y, size) {
    if (!c) c = this.p5.color(255);
    this.p5.fill(c)
    this.p5.rect(x+this.borderWidth, y+this.borderWidth, size-this.borderWidth*2, size-this.borderWidth*2);
    this.p5.fill(this.p5.color(255))
  }
  //to know color_code format please visit /utilities/colorcode.js
  setColorCode(color_code){
    let colorsetCollection = color_code.colorsetCollection;
    this.cells = [];
    for (let i=0; i<color_code.length; i++){
      let colorset = colorsetCollection[i];
      let newCell = this.getCellPosByIndex(colorset.index);
      newCell.setColor(colorset.colorObject.colorValue);
      this.cells.push(newCell);
    }
  }
}