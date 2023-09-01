console.log('version 1.1.0')
import { Experiment } from './experiment/experiment.js';
import { instance } from './Utilities/setting.js'
import eventBridge from './Utilities/eventbridge.js';


function initApp(){
    return new Promise(async (resolve, reject)=>{

        const settingData = await instance.getCurrentSetting();
         
        const experiment = new Experiment(null,null,null,settingData);
        experiment.hide();
        eventBridge.on('startExperiment', async (experiment_session)=>{
        
            console.log('start experiment event trigger', experiment_session);
            let { session, associateId, subjectId } = experiment_session;
            experiment.initSession(session, associateId, subjectId)
            experiment.show();
            experiment.start();
        })

        resolve("initiation stage complete");
    })
}


initApp();

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
