//write to here
import EventEmitter from 'events';
import { ColorCode } from '../Utilities/colorcode.js';
import { ExperimentRenderKit } from '../renderkit/renderkit.js';
import {ExperimentScenePlayer, ExperimentPlayerConfig} from '../Utilities/sceneplayer.js';

export const test_config = {
    //colorboard config ----------------
    colorboardSize: 500,//width, height of colorboard
    colorboardEdgeNumber: 3,//cell number of horizontal and vertical edge
    colorboardLevel: 3,//number of color cube

    //process config--------------------
    //whether fake the colorcode of last scene 
    isAltColorCode:true,

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

//steps of start a new Assignment
//step1 Instance a Assignment
//step2 import Assignment Config
//step3 Initialize Assignment 
//step4 Activate Scene Player 
//step5 listen event emission which last scene finished
//step6 output assignment info and record it
export class Assignment extends EventEmitter{
    constructor(config=null){
        super();
        if (!config){ config = test_config;}
        this.config = config;
        this.InitializeAssignment();
    }
    
    start(){
        if (!this.player)return;
        this.player.play();
    }
    stop(){
        if (!this.player)return;
        this.player.stop();

    }
    pause(){
        if (!this.player)return;
        this.player.pause();

    }
    reset(){
        if (!this.player)return;
        this.player.reset();
    }
    InitializeAssignment(){
        //intialize assignment colorboard configure
        this._colorboardSize = this.config.colorboardSize||500;
        this._colorboardEdgeNumber = this.config.colorboardEdgeNumber||3;
        

        //initialize renderkit
        if (!this.renderkit)this.renderkit = new ExperimentRenderKit(this._colorboardSize, this._colorboardSize);

        //initialize scenes
        this.InitializeScene(this.config.isAltColorCode, this.config.colorboardLevel, this.config.sceneConfig);

    }
    InitializeScene(isAltColorCode, level, sceneConfig){
        //initialize assignment process
        // this.player.stop();
        this._colorboardLevel = level||2;
        this._isAltColorCode = isAltColorCode;
        this._altIndex = !this._isAltColorCode ? -1 : Math.floor(Math.random() * (this._colorboardLevel))
        console.log("isAltColorCode", isAltColorCode, 'altIndex',this._altIndex)
        //initialize color code
        // console.log('check_color_code args', this._colorboardEdgeNumber * this._colorboardEdgeNumber, this._colorboardLevel)
        this.color_code_1 = ColorCode.GenerateColorCode(this._colorboardEdgeNumber * this._colorboardEdgeNumber-1, this._colorboardLevel)
        // console.log('color_code_1', this.color_code_1, this.color_code_1.toString())
        this.color_code_2 = ColorCode.RegeneateColorCode(this.color_code_1.toString());
        
        if (this._isAltColorCode){
            this.color_code_2.setRndColorObject(this._altIndex);
        }

        
        // Intialize cue setting
        this._cue_index = !this._isAltColorCode ? -1 : this.color_code_1.getColorSet(this._altIndex).index;
        
        // Initialize scene player config
        this._playerConfig = new ExperimentPlayerConfig();
        this._playerConfig.addCrossScene('crossscene', sceneConfig.scene_1.duration);
        this._playerConfig.addColorcodeScene('colorcodescene', 
            sceneConfig.scene_2.duration, //duration
            this.color_code_1, //colorcode
            sceneConfig.scene_2.use_cue?this._cue_index:-1)//cueIndex
        this._playerConfig.addLateScene('latescene', 
            sceneConfig.scene_3.duration, //duration
            sceneConfig.scene_3.use_cue?this._cue_index:-1);//cueIndex
        this._playerConfig.addColorcodeScene('colorcodescene', 
            sceneConfig.scene_4.duration, //duration
            this.color_code_2, //colorcode
            sceneConfig.scene_4.use_cue?this._cue_index:-1);//cueIndex
        this._sceneConfig = sceneConfig;

        //generate scene player
        if (!this.player) this.player = new ExperimentScenePlayer(this._playerConfig, this.renderkit);
        else this.player.resetConfig(this._playerConfig);
        
    }
    onLastSceneFinish(callback){
        this.player.on('lastSceneFinish', (args)=>{callback(args)});
    }
    outputAssignmentInfo(){
        return{
            color_code_1 : this.color_code_1,
            color_code_2 : this.color_code_2,
            alt_index : this._altIndex
        }
    }
}