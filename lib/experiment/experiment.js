import { Assignment } from "./assignment.js";


class AssignmentData{
    constructor(){
        this.session;
        this.stage;
        this.trial;
        this.subject_id;
        this.associate_id;
        this.color_code_1;
        this.color_code_2;
        this.cue_index;
        this.subject_response;
        this.assignment_answer;
        this.edit_time;
    }
}


export class Experiment{
    constructor(){
        this.subject_id = "example_subject_id";
        this.session = "example_session";
        this.associtate_id = "example_associate_id";
        this.initialize();
    }

    initialize(){
        //stage1 setting
        this._stage1_min_level = 2;
        this._stage1_max_level = 6;
        this._stage1_assignment_of_each_level = 6
        this._stage1_correct_rate = 5/6;

        //generate stage1 assignment answer
        this._stage1_assignment_answer = []
        for (let i=0; i<this._stage1_max_level-this._stage1_min_level+1;i++ ){
            let assignment_answer = Experiment.generateUniqueRandoms(
                i*this._stage1_assignment_of_each_level,
                (i+1)*this._stage1_assignment_of_each_level-1,
                this._stage1_assignment_of_each_level);
            this._stage1_assignment_answer.concat(assignment_answer);
        }
        this._stage1_assignment_answer.sort((a,b)=>{
            return a-b
        })

        //stage2 setting
        this._stage2_assignment_number = 30;
        this._stage2_assignment_answer = Experiment.generateUniqueRandoms(0,29, 15);

        //stage3 setting
        this._stage3_assignment_number = 30;
        this._stage3_assignment_answer = Experiment.generateUniqueRandoms(0,29, 15);

        //stage4 setting
        this._stage4_assignment_number = 30;
        this._stage4_assignment_answer = Experiment.generateUniqueRandoms(0,29, 15);

        //experiment state initialize 
        this.current_level = this._stage1_min_level;
        this.current_stage = Experiment.Stage1;
        this._trial = 0;
        this.records = [];
        
        //init assignment
        let isAltColorCode = (this._stage1_assignment_answer.indexOf(0) === -1)
        let assignmentConfig = this.generate_stage1_scene_config(isAltColorCode)
        this.assignment = new Assignment(assignmentConfig);
        this.assignment.onLastSceneFinish((args)=>this._on_scene_end(args))
    }
    static get Stage1(){return 0;}
    static get Stage2(){return 1;}
    static get Stage3(){return 2;}
    static get Stage4(){return 3;}
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
    start(){
        this.assignment.start();
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
    generate_stage3_scene_config(){
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
    generate_stage4_scene_config(){
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
    _on_stage1_scene_end(){
        //step1 pause scene player 
        //step2 detect record assignment record
        //step3 detect stage state
        //

        this._trial += 1;
        if (this.cuurent_level < this._stage1_max_level) this.current_level += 1;

        let isAltColorCode = (this._stage1_assignment_answer.indexOf(0) === -1)
        let assignmentConfig = this.generate_stage1_scene_config(isAltColorCode)
        this.assignment.InitializeScene(isAltColorCode, this.current_level,assignmentConfig.sceneConfig)
        this.assignment.start()
        //write to here
        //finish stage1 life cycle
        
        console.log('stage1_end');
    }
    _on_stage2_scene_end(){
        console.log('stage2_end');

    }
    _on_stage3_scene_end(){
        console.log('stage3_end');

    }
    _on_stage4_scene_end(){
        console.log('stage4_end');

    }
}