console.log('version 1.0.0')
import {
    addFolder,
    addButton,
    addSlider,
    hideAll,
    displayAll
} from './datgui/simplegui.js';
import { ColorCode } from './Utilities/colorcode.js';
import { ExperimentRenderKit } from './renderkit/renderkit.js';
import {ExperimentScenePlayer, ExperimentPlayerConfig} from './Utilities/sceneplayer.js';

//init renderkit
let renderkit = new ExperimentRenderKit(500,500);
let altColorCode = true;
let altIndex = 0;


//init color code
let cellNumberOfBoardWidth = 3;
let numOfColorcube = 3;
let color_code_1 = ColorCode.GenerateColorCode(cellNumberOfBoardWidth * cellNumberOfBoardWidth, numOfColorcube)
let color_code_2 = ColorCode.RegeneateColorCode(color_code_1.toString());
if (altColorCode){
    color_code_2.SetRndColorObject(altIndex);
}

//init player config
let cueIndex = color_code_1.getColorSet(altIndex).index;
const examplePlayerConfig = new ExperimentPlayerConfig();
examplePlayerConfig.addCrossScene('crossscene', 1000);
examplePlayerConfig.addColorcodeScene('colorcodescene', 2000, color_code_1,cueIndex)
examplePlayerConfig.addLateScene('latescene', 1000, cueIndex);
examplePlayerConfig.addColorcodeScene('colorcodescene', 2000, color_code_2,cueIndex)

//init player
let player = new ExperimentScenePlayer(examplePlayerConfig, renderkit);


//render gui 
let folder = addFolder("Main");
let playBtn = addButton("Main", "play", ()=>{player.play()})
let pauseBtn = addButton("Main", "pause", ()=>{player.pause()})
let stopBtm = addButton("Main", "stop", ()=>{player.stop()})
// let drawCrossBtn = addButton("Main", "draw cross pattern", ()=>renderkit.drawCrossScene());
// let drawColorCube = addButton("Main", "draw color cubes", ()=>renderkit.drawRandomColorCubes());
// let slider1 = addSlider("Main", "numOfColorcube", renderkit, 1,6);
// let slider2 = addSlider("Main", "cellNumberOfBoardWidth", renderkit, 3,10);

displayAll();
document.renderkit = renderkit;
