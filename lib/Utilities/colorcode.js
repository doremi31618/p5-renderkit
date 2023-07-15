
export function generateUniqueRandomNumbers(count, max_index){
  // let max_index = this.totalCells()-1;
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

export class ColorObject{
  constructor(id, name, colorValue){
    this.id = id;
    this.name = name;
    this.colorValue = colorValue;
  }
}
export class colorset{
  constructor(index, color_object){
    this.index = index;
    this.colorObject = color_object;
    this.colorstring = this.colorObject.name
  }  
  toString(){
    return this.index.toString() +":"+this.colorstring
  }
}

//collection of colorset
export class ColorCode{
  constructor(){
    this._colorsetCollection = [];
  }
  //黑色、藍色、棕色、綠色、橙色、紫色、粉紅色、紅色和黃色
  static get ColorMap(){
    return [
      new ColorObject(0, 'black', [0,0,0]),
      new ColorObject(1, 'blue', [0,0,255]),
      new ColorObject(2, 'brown', [115,67,56]),
      new ColorObject(3, 'green', [0,255,0]),
      new ColorObject(4, 'orange', [247,92,47]),
      new ColorObject(5, 'purple', [193,50,142]),
      new ColorObject(6, 'pink', [245,150,170]),
      new ColorObject(7, 'red', [255,0,0]),
      new ColorObject(8, 'yellow', [0,255,255]),
    ]
  }
  static GenerateColorCode(indexRange, setnumber){

    //error preventing
    if (!indexRange || !setnumber)console.error("cannot generate color code without totalcells and setnumber");
    if (indexRange < setnumber) console.error("setnumber cannot greater then indexRange");

    //generate an array from indexRange and length
    let cell_index_array = generateUniqueRandomNumbers(setnumber, indexRange-1);//return number array
    let color_index_array = generateUniqueRandomNumbers(setnumber, ColorCode.ColorMap.length-1);//return number array
    
    //generate color code set
    let color_code = new ColorCode();
    for (let i=0; i<setnumber; i++){
      let cell_index = cell_index_array[i];
      let color_object = ColorCode.ColorMap[color_index_array[i]];
      console.log('color object', ColorCode.ColorMap.length, color_index_array[i], color_object);
      let _colorset = new colorset(cell_index, color_object);
      color_code.addColorset(_colorset)
    }
    console.log('GenerateColorCode:', color_code);
    return color_code;
  }
  get length(){
    return this._colorsetCollection.length;
  }
  get colorsetCollection(){
    return [...this._colorsetCollection]//dont want to modified the origin data
  }
  addColorset(colorset){
    //inspect colorset type is correct
    if (!typeof colorset.index == 'undefined' || !colorset.colorObject || !colorset.colorstring){
      console.error('this is not colorset',colorset );
      return;
    }
    this._colorsetCollection.push(colorset);
  }

  toString(){
    let color_code = ""
    let i=0;
    for (let colorset of this._colorsetCollection){
      color_code += colorset.toString();
      if (i<this._colorsetCollection.length-1){
        color_code+="_"
      }
      i++;
    }
    return color_code;
  }
}

