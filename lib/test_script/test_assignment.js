console.log('version 1.0.0')
import {
    addFolder,
    addButton,
    addSlider,
    hideAll,
    displayAll
} from './datgui/simplegui.js';
import { Assignment } from './experiment/assignment.js';

const assignment = new Assignment();
assignment.onLastSceneFinish(()=>{
    console.log('scene finish');
})

//render gui 
let folder = addFolder("Main");
let playBtn = addButton("Main", "play", ()=>{assignment.start()})
let pauseBtn = addButton("Main", "pause", ()=>{assignment.pause()})
let stopBtn = addButton("Main", "stop", ()=>{assignment.stop()})
// let drawCrossBtn = addButton("Main", "draw cross pattern", ()=>renderkit.drawCrossScene());
// let drawColorCube = addButton("Main", "draw color cubes", ()=>renderkit.drawRandomColorCubes());
// let slider1 = addSlider("Main", "numOfColorcube", renderkit, 1,6);
// let slider2 = addSlider("Main", "cellNumberOfBoardWidth", renderkit, 3,10);

displayAll();
// document.renderkit = renderkit;
