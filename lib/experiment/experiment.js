import { Assignment } from "./assignment.js";
import eventBridge from '../Utilities/eventbridge.js'
import { getExperimentRenderKit } from "../renderkit/renderkit.js";
import {addData} from '../Utilities/firebase.js';



export class Experiment{
    constructor(session, associtate_id, subject_id){
        this.subject_id = subject_id || "example_subject_id";
        this.session = session || "example_session";
        this.associtate_id = associtate_id || "example_associate_id";
        this.initialize();
    }
    initSetting(session, associtate_id, subject_id){
        this.subject_id = subject_id || "example_subject_id";
        this.session = session || "example_session";
        this.associtate_id = associtate_id || "example_associate_id";
    }
    hide(){
        console.log('hide experiment');
        this.renderkit.setDisplay(false);
    }
    show(){
        console.log('show experiment');
        this.renderkit.setDisplay(true);
    }
    initialize(){
        //find event bridge
        // if (!document.eventBridge) document.eventBridge = new EventEmitter(); 
        //stage1 setting
        this._stage1_min_level = 2;
        this._stage1_max_level = 6;
        this._stage1_assignment_of_each_level = 6
        let totalLevel = this._stage1_max_level-this._stage1_min_level+1;
        this._stage1_assignment_number = totalLevel * this._stage1_assignment_of_each_level;
        this.stage1_wrong_answer = 0;
        this._stage1_assignment_answer = []
        for (let i=0; i<totalLevel;i++ ){
            let assignment_answer = Experiment.generateUniqueRandoms(
                i*this._stage1_assignment_of_each_level,
                (i+1)*this._stage1_assignment_of_each_level-1,
                this._stage1_assignment_of_each_level/2);
            this._stage1_assignment_answer.push(...assignment_answer);
        }
        this._stage1_assignment_answer.sort((a,b)=>{
            return a-b
        })
        console.log('stage1 assignment answer', this._stage1_assignment_answer)


        //stage2 setting
        this._stage2_assignment_number = 30;
        this._stage2_assignment_answer = Experiment.generateUniqueRandoms(0,this._stage2_assignment_number-1, this._stage2_assignment_number/2);
        this._stage2_assignment_answer.sort((a,b)=>{
            return a-b
        })
        console.log('stage2 assignment answer', this._stage2_assignment_answer)


        //stage3 setting
        this._stage3_assignment_number = 30;
        this._stage3_assignment_answer = Experiment.generateUniqueRandoms(0,this._stage3_assignment_number-1, this._stage3_assignment_number/2);
        this._stage3_assignment_answer.sort((a,b)=>{
            return a-b
        })
        console.log('stage3 assignment answer', this._stage3_assignment_answer)
 

        //stage4 setting
        this._stage4_assignment_number = 30;
        this._stage4_assignment_answer = Experiment.generateUniqueRandoms(0,this._stage4_assignment_number-1, this._stage4_assignment_number/2);
        this._stage4_assignment_answer.sort((a,b)=>{
            return a-b
        })
        console.log('stage4 assignment answer', this._stage4_assignment_answer)

        //experiment state initialize 
        this.current_level = this._stage1_min_level;
        this.current_stage = Experiment.Stage1;
        this._trial = 0;
        this.records = [];
        
        //init assignment
        let isAltColorCode = (this._stage1_assignment_answer.indexOf(0) === -1)//indexof(0) != -1 => 0 in the array => not_same
        let assignmentConfig = this.generate_stage1_scene_config(isAltColorCode)
        this.assignment = new Assignment(assignmentConfig);
        this.renderkit = getExperimentRenderKit()
        this.assignment.onLastSceneFinish(async (args)=> await this._on_scene_end(args))
        this.start = ()=>this.assignment.start();
        this.stop = ()=>this.assignment.stop();
    }
    static get Stage1(){return 1;}
    static get Stage2(){return 2;}
    static get Stage3(){return 3;}
    static get Stage4(){return 4;}
    static get colorboardSize(){return 500;}
    static get colorboardEdgeNumber(){return 3;}
    static generateUniqueRandoms(min, max, count) {
        // 檢查可用的獨特數值是否足夠
        if (max - min + 1 < count) {
            return 'Error: Range too small for specified count!';
        }
    
        let nums = [];
        while(nums.length < count){
            let randomNum = Math.floor(Math.random() * (max - min + 1) + min);
            if(nums.indexOf(randomNum) === -1){
                nums.push(randomNum);
            }
        }
        return nums;
    }
    //generate new assignment scene config base on different stage
    generate_stage1_scene_config(isAltColorCode){
        return {
            //colorboard config ----------------
            colorboardSize: Experiment.colorboardSize,//width, height of colorboard
            colorboardEdgeNumber: Experiment.colorboardEdgeNumber,//cell number of horizontal and vertical edge
            colorboardLevel: this.current_level,//number of color cube
        
            //process config--------------------
            //whether fake the colorcode of last scene 
            isAltColorCode:isAltColorCode,
        
            //scene config----------------------
            sceneConfig:{
                scene_1: {
                    use_cue : false,
                    duration : 1000
                },
                scene_2:{
                    use_cue : false,
                    duration : 2000
                },
                scene_3:{
                    use_cue : false,
                    duration : 1000
                },
                scene_4:{
                    use_cue : false,
                    duration : 2000,
                }
            }
        }
    }
    generate_stage2_scene_config(isAltColorCode){
        return {
            //colorboard config ----------------
            colorboardSize: Experiment.colorboardSize,//width, height of colorboard
            colorboardEdgeNumber: Experiment.colorboardEdgeNumber,//cell number of horizontal and vertical edge
            colorboardLevel: this.current_level,//number of color cube
        
            //process config--------------------
            //whether fake the colorcode of last scene 
            isAltColorCode:isAltColorCode,
        
            //scene config----------------------
            sceneConfig:{
                scene_1: {
                    use_cue : false,
                    duration : 1000
                },
                scene_2:{
                    use_cue : true,
                    duration : 2000
                },
                scene_3:{
                    use_cue : false,
                    duration : 1000
                },
                scene_4:{
                    use_cue : false,
                    duration : 2000,
                }
            }
        }
    }
    generate_stage3_scene_config(isAltColorCode){
        return {
            //colorboard config ----------------
            colorboardSize: Experiment.colorboardSize,//width, height of colorboard
            colorboardEdgeNumber: Experiment.colorboardEdgeNumber,//cell number of horizontal and vertical edge
            colorboardLevel: this.current_level,//number of color cube
        
            //process config--------------------
            //whether fake the colorcode of last scene 
            isAltColorCode:isAltColorCode,
        
            //scene config----------------------
            sceneConfig:{
                scene_1: {
                    use_cue : false,
                    duration : 1000
                },
                scene_2:{
                    use_cue : false,
                    duration : 2000
                },
                scene_3:{
                    use_cue : true,
                    duration : 1000
                },
                scene_4:{
                    use_cue : false,
                    duration : 2000,
                }
            }
        }
    }
    generate_stage4_scene_config(isAltColorCode){
        return {
            //colorboard config ----------------
            colorboardSize: Experiment.colorboardSize,//width, height of colorboard
            colorboardEdgeNumber: Experiment.colorboardEdgeNumber,//cell number of horizontal and vertical edge
            colorboardLevel: this.current_level,//number of color cube
        
            //process config--------------------
            //whether fake the colorcode of last scene 
            isAltColorCode:isAltColorCode,
        
            //scene config----------------------
            sceneConfig:{
                scene_1: {
                    use_cue : false,
                    duration : 1000
                },
                scene_2:{
                    use_cue : false,
                    duration : 2000
                },
                scene_3:{
                    use_cue : false,
                    duration : 1000
                },
                scene_4:{
                    use_cue : true,
                    duration : 2000,
                }
            }
        }
    }
    

    //trigger event base on different stage scene
    _getResponse(stage){
        return new Promise((resolve, reject)=>{
            this.hide();
            eventBridge.once('onChooseAnswer', ({chooseAnswer})=>{
                this.show();
                resolve({
                    subject_response: chooseAnswer
                })
            })

            // console.log('send event', stage)
            eventBridge.emit('displayQuestion', {stage:stage});

        })
       
    }
    _getBreak(title="Break", hideBtn=false){
        return new Promise((resolve, reject)=>{
            this.hide();
            eventBridge.once('continueCustomInfo', ()=>{
                this.show();
                resolve();
            })
            let msg = {title, hideBtn}
            console.log('displayCustomInfo msg', msg)
            eventBridge.emit('displayCustomInfo',msg)
        })
    }
    _on_scene_end(){
        switch(this.current_stage){
            case Experiment.Stage1:
                this._on_stage1_scene_end();
                break;
            case Experiment.Stage2:
                this._on_stage2_scene_end();
                break;
            case Experiment.Stage3:
                this._on_stage3_scene_end();
                break;
            case Experiment.Stage4:
                this._on_stage4_scene_end();
                break;
                    
        }
    }
    async saveRecord(_stage, stage_trial, response, answer){
        const record = {
            stage: _stage,
            stage_trial_index: stage_trial,
            totoal_trial: this._trial+1,
            level: this.current_level,
            color_code_1: this.assignment.color_code_1.toString(),
            color_code_2: this.assignment.color_code_2.toString(),
            cue_index: this.assignment._cue_index,
            subject_response: response,
            assignment_answer: answer,
            edit_time: this.getCurrentTimeString()
        }
        console.log('assignment record', record)
        this.records.push(record)
    }
    getCurrentTimeString(){
        var timestamp = Date.now();
        var date = new Date(timestamp);
        var options = { timeZone: 'Asia/Taipei' };
        var taiwanTime = date.toLocaleString('zh-TW', options);
        return taiwanTime
    }
    async saveToFirebase(){
        let result_data = {
            session: this.session,
            subject_id: this.subject_id,
            associate_id: this.associtate_id,
            finish_time: this.getCurrentTimeString(),
            records: {...this.records},
        }
        let response = await addData("records",result_data);
        console.log('result experiment data',result_data)
        return response

    }
    //need to refactor this unclean code
    async _on_stage1_scene_end(){
        //step1 show ui or open keyboard detector
        let reponse = await this._getResponse(Experiment.Stage1);
        let stage1_trial = this._trial;
        let traial_answer = this._stage1_assignment_answer.indexOf(stage1_trial) === -1  ? "not_same" : "same";

        //step2 detect record assignment record
        const isResponseCorrect = traial_answer == reponse.subject_response
        if (!isResponseCorrect){
            this.stage1_wrong_answer += 1;
            console.log('the answer is',traial_answer,"your response is ",reponse, );
        }
        const stage1_failed = this.stage1_wrong_answer >= 2;

        //step3 save trial record
        this.saveRecord(Experiment.Stage1, stage1_trial, reponse.subject_response, traial_answer);


        
        

        //Inspect if need to change stage or level
        let isAltColorCode,assignmentConfig;
        if (this._trial+1 >= this._stage1_assignment_number || stage1_failed){
            this.stage2_start_trial = this._trial+1;
            this.current_stage = Experiment.Stage2;
            isAltColorCode = (this._stage2_assignment_answer.indexOf(0) === -1)
            
            assignmentConfig = this.generate_stage2_scene_config(isAltColorCode)
            console.log("stage1 end, stage2 start")
            await this._getBreak();

        }else{
            //general stage1 start
            isAltColorCode = (this._stage1_assignment_answer.indexOf(this._trial+1) === -1)
            assignmentConfig = this.generate_stage1_scene_config(isAltColorCode)

            //reach max_level assignment number
            if (Number(this._trial+1) % Number(this._stage1_assignment_of_each_level) == 0){
                //reset wrong answer record
                this.stage1_wrong_answer = 0

                //change level
                this.current_level = 
                    this.current_level+1 > this._stage1_max_level ?
                        this._stage1_max_level : this.current_level+1
                
            }
        }

        this._trial += 1;
        


        this.assignment.InitializeScene(isAltColorCode, this.current_level,assignmentConfig.sceneConfig)
        this.assignment.start()

    }
    async _on_stage2_scene_end(){
        //step1 show ui or open keyboard detector
        let reponse = await this._getResponse(Experiment.Stage2);
        // console.log('you choose answer', answer);
       

        let stage2_trial = this._trial - this.stage2_start_trial;

        //step2 detect record assignment record
        // let stage1_trial = this._trial;
        let traial_answer = this._stage2_assignment_answer.indexOf(stage2_trial) === -1  ? "not_same" : "same";
        
        //step3 save trial record
        this.saveRecord(Experiment.Stage2, stage2_trial,reponse.subject_response, traial_answer);

        this._trial += 1;
        //over stage1 max trial, switch to stage2
        let isAltColorCode,assignmentConfig;
        if (stage2_trial+1 >= this._stage2_assignment_number){
            this.stage3_start_trial = this._trial;
            this.current_stage = Experiment.Stage3;
            isAltColorCode = (this._stage3_assignment_answer.indexOf(0) === -1)
            assignmentConfig = this.generate_stage3_scene_config(isAltColorCode)
            console.log("stage2 end, stage3 start");
            await this._getBreak();
        }else{
            //general stage1 start
            isAltColorCode = (this._stage2_assignment_answer.indexOf(stage2_trial+1) === -1)
            assignmentConfig = this.generate_stage2_scene_config(isAltColorCode)
        }

        
        this.assignment.InitializeScene(isAltColorCode, this.current_level,assignmentConfig.sceneConfig)
        this.assignment.start()

    }
    async _on_stage3_scene_end(){
        //step1 show ui or open keyboard detector
        let reponse = await this._getResponse(Experiment.Stage3);
        console.log('you choose answer', reponse);
        //step2 detect record assignment record


       
        let stage3_trial = this._trial - this.stage3_start_trial;
        
        //step2 detect record assignment record
        // let stage1_trial = this._trial;
        let traial_answer = this._stage3_assignment_answer.indexOf(stage3_trial) === -1  ? "not_same" : "same";
        
        //step3 save trial record
        this.saveRecord(Experiment.Stage3, stage3_trial,reponse.subject_response, traial_answer);
        this._trial += 1;
        //over stage1 max trial, switch to stage2
        let isAltColorCode,assignmentConfig;
        if (stage3_trial+1 >= this._stage3_assignment_number){
            this.stage4_start_trial = this._trial;
            this.current_stage = Experiment.Stage4;
            isAltColorCode = (this._stage4_assignment_answer.indexOf(0) === -1)
            assignmentConfig = this.generate_stage4_scene_config(isAltColorCode)
            console.log("stage3 end, stage4 start")
            await this._getBreak();
        }else{
            //general stage1 start
            isAltColorCode = (this._stage3_assignment_answer.indexOf(stage3_trial+1) === -1)
            assignmentConfig = this.generate_stage3_scene_config(isAltColorCode)
        }

        
        this.assignment.InitializeScene(isAltColorCode, this.current_level,assignmentConfig.sceneConfig)
        this.assignment.start()
        console.log('stage3_end');

    }
    async _on_stage4_scene_end(){
        //step1 show ui or open keyboard detector
        let reponse = await this._getResponse(Experiment.Stage4);
        console.log('you choose answer', reponse);
        //step2 detect record assignment record

        //step3 detect stage state

        
        let stage4_trial = this._trial - this.stage4_start_trial;
        
        //step2 detect record assignment record
        // let stage1_trial = this._trial;
        let traial_answer = this._stage4_assignment_answer.indexOf(stage4_trial) === -1  ? "not_same" : "same";
        
        //step3 save trial record
        this.saveRecord(Experiment.Stage4, stage4_trial, reponse.subject_response, traial_answer);
        this._trial += 1;
        //over stage1 max trial, switch to stage2
        let isAltColorCode,assignmentConfig;
        if (stage4_trial+1 >= this._stage3_assignment_number){
            console.log("stage4 end")
            let response = await this.saveToFirebase();
            console.log("firebase response", response);
            await this._getBreak("thank you for participating experimentt", true);
            
            //todo : 
            //1. sending experiment record
            //2. download experiment record
            //3. restart experiment
            return;
        }else{
            //general stage1 start
            isAltColorCode = (this._stage4_assignment_answer.indexOf(stage4_trial+1) === -1)
            assignmentConfig = this.generate_stage4_scene_config(isAltColorCode)
        }

        
        this.assignment.InitializeScene(isAltColorCode, this.current_level,assignmentConfig.sceneConfig)
        this.assignment.start();

    }
}