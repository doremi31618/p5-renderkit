console.log('version 1.0.0')
// import {
//     addFolder,
//     addButton,
//     addSlider,
//     hideAll,
//     displayAll
// } from './datgui/simplegui.js';
import { Experiment } from './experiment/experiment.js';
import eventBridge from './Utilities/eventbridge.js'
const experiment = new Experiment();
experiment.hide()
eventBridge.on('startExperiment', (experiment_setting)=>{
    console.log('start experiment event trigger', experiment_setting);
    let { session, associateId, subjectId } = experiment_setting;
    experiment.initSetting(session, associateId, subjectId)
    experiment.show();
    experiment.start();
})



//render gui 
// let folder = addFolder("Main");
// let playBtn = addButton("Main", "start", ()=>{experiment.start()})
// let stopBtn = addButton("Main", "stop", ()=>{experiment.stop()})
// let pauseBtn = addButton("Main", "pause", ()=>{assignment.pause()})
// let stopBtn = addButton("Main", "stop", ()=>{assignment.stop()})
// let drawCrossBtn = addButton("Main", "draw cross pattern", ()=>renderkit.drawCrossScene());
// let drawColorCube = addButton("Main", "draw color cubes", ()=>renderkit.drawRandomColorCubes());
// let slider1 = addSlider("Main", "numOfColorcube", renderkit, 1,6);
// let slider2 = addSlider("Main", "cellNumberOfBoardWidth", renderkit, 3,10);

// displayAll();
// document.renderkit = renderkit;
