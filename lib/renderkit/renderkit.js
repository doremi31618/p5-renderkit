import p5 from 'p5';
// import Chessboard from './contents/chessboard.js'
import CrossPattern from '../contents/cross.js';
import Colorboard from '../contents/colorboard.js';
import ArrowPattern from '../contents/arrow.js';
import {ColorCode} from '../Utilities/colorcode.js';

//just for testing use
function changeTitle(string) {
  let inputElement = document.getElementById('colorcode');
  if(!inputElement) {
      inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.id = "colorcode";
      inputElement.style.width = "500px"
      document.body.appendChild(inputElement);
  }
  inputElement.value = string;
}
//singleton experiment renderkit 
const defaultWidth = 500;
const defaultHeight = 500;
let _experimentRenderKit;
export function getExperimentRenderKit(){
  if (!_experimentRenderKit){
    _experimentRenderKit = new ExperimentRenderKit(defaultWidth, defaultHeight);
  }
  return _experimentRenderKit;
}
export function createExperimentRenderKit(width, height){
  if (!_experimentRenderKit){
    _experimentRenderKit = new ExperimentRenderKit(width, height);
  }
  return _experimentRenderKit;
}
export class RenderKit{
  constructor(width, height, is_full_screen){
    this.p5lib = null
    
    this.width = width;
    this.height = height;
    this.backgroundColor = 128;
    
    const _app = this;
    const sketch = function(p5lib) {
      // console.log('init sketch')
      p5lib.setup = function(){_app._setup(p5lib)}
      p5lib.draw = function(){_app._draw(p5lib)}
    }
    this.p5App = new p5(sketch);
    // this.canvas = this.p5App.canvas;
    if (is_full_screen){
      this.p5App.windowResized = ()=> {
        this.p5App.resizeCanvas(window.outerWidth,window.outerHeight)
      }
    }else{
      if (!this.customResize)this.customResize = ()=>{}
      this.p5App.windowResized = this.customResize;
    }
  }
  get canvas(){
    return this.p5App.canvas
  }
  setDisplay(isDisplay){
    if (!this.canvas){
      setTimeout(()=>{
        this.canvas.style.display = isDisplay ? "block" : "none"
        // console.log('renderkit display is set to', isDisplay)
  
      }, 100);
    }else{
      this.canvas.style.display = isDisplay ? "block" : "none"
    }
    
    // this.p5App.canvas.style.display = isDisplay;
    // let canvas = document.querySelector("#defaultCanvas0")
  }
  _setup(p5lib){
    p5lib.createCanvas(this.width, this.height) // 创建画布，传入画布尺寸
    p5lib.background(this.backgroundColor) // 设置画布背景色}
    
  }
  _draw(p5lib){
    p5lib.background(this.backgroundColor);
    p5lib.fill(0);
    p5lib.rect(x++, x, 50,50)
  }
  resize(w,h){
    this.p5App.resizeCanvas(w,h);
  }
}

export class ExperimentRenderKit extends RenderKit{
  constructor(width, height){
    super(width, height, false);
    this.numOfColorcube = 3;
    this.cellNumberOfBoardWidth = 3;
    this.contents = [];
  }

  _setup(p5lib){
      p5lib.createCanvas(this.width, this.height) // 创建画布，传入画布尺寸
      p5lib.background(this.backgroundColor) // 设置画布背景色}
      
    }
  _draw(p5lib){
    //draw background
    p5lib.background(this.backgroundColor);
    

    //draw contents
    if (!this.contents || !this.contents.length || this.contents.length==0)return;
    for(var content of this.contents){
      // console.log('draw content', content)
      content.draw();
    }
  }
  drawCrossScene(){
    //clear first
    if ( this.contents.length != 0 ){
      this.clear();
    }
    this.contents.push(new CrossPattern(this.p5App, this.width/2, this.height/2, 50))
    // console.log("contents", this.contents)
  }
  drawLateScene(cueIndex){
    if ( this.contents.length != 0 )this.clear();

    //need add cue function
    if (cueIndex == -1)return;

    let colorBoard = new Colorboard(this.p5App, this.width, this.cellNumberOfBoardWidth, null);
    let cueCell = colorBoard.getCellPosByIndex(cueIndex);
    let cueArrow = new ArrowPattern(this.p5App, cueCell.centerPosX, cueCell.centerPosY);
    // console.log('cueCell', cueCell)

    this.contents.push(cueArrow);

  }
  drawColorCubes(color_code, cueIndex){
    if ( this.contents.length != 0 )this.clear();
    let colorBoard = new Colorboard(this.p5App, this.width, this.cellNumberOfBoardWidth, color_code);
    this.contents.push(colorBoard);

    //need add cue function
    if (cueIndex == -1)return;
    let cueCell = colorBoard.getCellPosByIndex(cueIndex);
    // console.log('cueCell', cueCell)
    let cueArrow = new ArrowPattern(this.p5App, cueCell.centerPosX, cueCell.centerPosY);
    this.contents.push(cueArrow);
  }
  drawRandomColorCubes(){
    //generate random color code
    let color_code = ColorCode.GenerateColorCode(this.cellNumberOfBoardWidth * this.cellNumberOfBoardWidth, this.numOfColorcube)
    changeTitle(color_code.toString());

    //and then call draw color cubes
    this.drawColorCubes(color_code);
  }
  clear(){
    if ( this.contents.length==0 )return
    this.contents.length = 0;
    // console.log('clear');
  }
}