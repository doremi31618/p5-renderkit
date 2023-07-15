import Chessboard from './chessboard.js';
// function drawColorCube(c, x, y, size){
// if (!c)c = color(255);
// fill(c)
// noStroke()
// rect(x,y, size, size);
// fill(color(255))
// }

export default class Colorboard extends Chessboard {
  constructor(p5, canvasWidth, cellNumber, color_code=null) {
    // var color_code = [];
    super(p5, canvasWidth / cellNumber, canvasWidth / cellNumber, cellNumber, cellNumber);
    this.cell_size = canvasWidth / cellNumber;
    if (!color_code) this.cells = this.generateUniqueRandomCells(3);
    else this.setColorCode(color_code)
    console.log('colorboard')
  }
  draw() {
    // console.log('draw colorboard cells', this.cells);
    super.draw();
    let i = 0;
    for (var cell of this.cells) {
      let _color = i % 2 == 0 ? this.p5.color(255) : this.p5.color(0)
      // console.log('draw cells', _color, cell.coordinate_x, cell.coordinate_y, this.cell_size)
      this.drawColorCube(_color, cell.coordinate_x, cell.coordinate_y, this.cell_size);
      i++;
    }
  }
  drawColorCube(c, x, y, size) {
    if (!c) c = this.p5.color(255);
    this.p5.fill(c)
    this.p5.rect(x, y, size, size);
    this.p5.fill(this.p5.color(255))
  }
  //to know color_code format please visit /utilities/colorcode.js
  setColorCode(color_code){
    
  }
}