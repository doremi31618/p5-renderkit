console.log('version 1.0.0')
import {
    addFolder,
    addButton,
    addSlider,
    hideAll,
    displayAll
} from './datgui/simplegui.js';
import { ExperimentRenderKit } from './renderkit/renderkit.js';

let renderkit = new ExperimentRenderKit(500,500);



//render gui 
let folder = addFolder("Main");
let drawCrossBtn = addButton("Main", "draw cross pattern", ()=>renderkit.drawCrossScene());
let drawColorCube = addButton("Main", "draw color cubes", ()=>renderkit.drawRandomColorCubes());
let slider1 = addSlider("Main", "numOfColorcube", renderkit, 1,6);
let slider2 = addSlider("Main", "cellNumberOfBoardWidth", renderkit, 3,10);

displayAll();
document.renderkit = renderkit;
