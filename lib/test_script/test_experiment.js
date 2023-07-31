console.log('version 1.1.0')
import { Experiment } from '../experiment/experiment.js';
import eventBridge from '../Utilities/eventbridge.js'
const experiment = new Experiment();
experiment.hide()
eventBridge.on('startExperiment', (experiment_setting)=>{
    console.log('start experiment event trigger', experiment_setting);
    let { session, associateId, subjectId } = experiment_setting;
    experiment.initSetting(session, associateId, subjectId)
    experiment.show();
    experiment.start();
})

