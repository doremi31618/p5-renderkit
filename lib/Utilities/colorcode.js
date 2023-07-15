//黑色、藍色、棕色、綠色、橙色、紫色、粉紅色、紅色和黃色
export const ColorMap = [
  {
    name:"black",
    colorValue: [0,0,0]
  },
  {
    name:"blue",
    colorValue: [0,0,255]
  },
  {
    name:"brown",
    colorValue: [115,67,56]
  },
  {
    name:"green",
    colorValue: [0,255,0]
  },
  {
    name:"orange",
    colorValue: [247,92,47]
  },
  {
    name:"purple",
    colorValue: [193,50,142]
  },
  {
    name:"pink",
    colorValue: [245,150,170]
  },
  {
    name:"red",
    colorValue: [255,0,0]
  },
  {
    name:"yellow",
    colorValue: [0,255,255]
  },
]

class colorset{
  constructor(index, colorstring){
    this.index = index;
    this.colorstring = colorstring
  }  
  toString(){
    return this.index.toString() +":"+this.colorstring
  }
}
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
/*
  -- Describe -- 
  generate a color code compose with mutiple colorset 
  each set has unique colorstring and unique index
  color string will be the range color map
  index will be range of [0, totalCells -1]
  -- end --
  totalCells : how many cells of your colorboard
  setnumber : how many set you want to generate
*/
export function GenerateColorCode(totalCells, setnumber){
  //generate an array from totalCells and length
  let cell_index_array = generateUniqueRandomNumbers(setnumber, totalCells);
  let color_index_array = generateUniqueRandomNumbers(setnumber, ColorMap.length);
  
  //generate color code set
  let color_code = ""
  for (let i=0; i<setnumber; i++){
    let cell_index = cell_index_array[i];
    let color_string = ColorMap[color_index_array[i]];
    let _colorset = new colorset(cell_index, color_string);
    color_code += _colorset.toString();
    if (i<setnumber-1){
      color_code+="_"
    }
  }
  console.log('GenerateColorCode:', color_code);
  return color_code;
}

export function AnalysisColorCode(color_code){
  let colorset_array = color_code;
}