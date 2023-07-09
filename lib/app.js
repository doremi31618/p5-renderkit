
import p5 from 'p5';
class RenderKit{
  constructor(){
    this.p5lib = null
    const _app = this
    const sketch = function(p5lib) {
      //need initialize first, because p5 will init setup at very first beginging
      p5lib.setup = function(){_app._setup(p5lib)}
      p5lib.draw = function(){_app._draw(p5lib)}
    }
    this.p5App = new p5(sketch);
  }
  
  _setup(p5lib){
    console.log('renderkit setup')
      p5lib.createCanvas(400, 400) // 创建画布，传入画布尺寸
      p5lib.background(120) // 设置画布背景色}
    
  }
  _draw(p5lib){
    console.log('draw');
    p5lib.background(150);
    p5lib.fill(0);
    p5lib.rect(x++, x, 50,50)
  }
  resize(w,h){
    console.log('p5App', this.p5App)
    this.p5App.resizeCanvas(w,h)
    // this.p5App.canvas.height = h;
  }
}


// let renderkit = new RenderKitVer2((lib)=>{
//   lib.setup = ()=>{
    
// lib.createCanvas(500,500);
//   }
// });
// renderkit.draw = ()=>{
//   renderkit.background(0);
//   renderkit.fill(255);
//   renderkit.rect(x++,x, 50,50)
// }

// //P5 framework scope
// var color_code = [];
// var cell_size = 100;
// let board = new Chessboard(8,6,cell_size,cell_size);
// var boardSize = window.innerWidth > window.innerHeight  ? window.innerHeight :  window.innerWidth;
// let cells = board.generateUniqueRandomCells(48);

// function setup() {

//   setNewBoardSize(window.innerWidth, window.innerHeight);
//   createCanvas(boardSize, boardSize);
//   background(0);
//   stroke(255);

// }

// function draw() {
//   background(255);
//   let i = 0
//   console.log("cells", cells)
//   for (var cell of cells){
//     let _color = i % 2 == 0 ? color(255) : color(0) 
//     drawColorCube(_color,cell.coordinate_x, cell.coordinate_y, cell_size);
//     i++;
//   }
// }

// function setNewBoardSize(width, height){
//   boardSize = width > height ? width : height;
// }

// function windowResized() {
//   setNewBoardSize(window.innerWidth, window.innerHeight);
//   resizeCanvas(boardSize, boardSize);
// }


// /* Pattern Scope*/ 
// function drawCross(x, y, size) {
//   line( x - size, y, x + size, y);
//   line(x , y+ size, x , y - size);
// }

// function drawColorCube(c, x, y, size){
//   if (!c)c = color(255);
//   fill(c)
//   noStroke()
//   rect(x,y, size, size);
//   fill(color(255))
// }

