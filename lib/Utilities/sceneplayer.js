import { time } from 'console';
import EventEmitter from 'events';
import { ExperimentRenderKit } from '../renderkit/renderkit';

const examplePlayerConfig = new PlayerConfig();
class ExperimentPlayerConfig{
    constructor(){
        this._scenes = []
    }
    get sceneNumber(){
        return this._scenes.length;
    }
    addCrossScene(sceneName, sceneRenderTime){
        const sceneType = 'cross'
        if (!sceneName || !sceneRenderTime){
            console.error('add scene cannot without sceneName, sceneType, sceneRenderTime', sceneName, sceneType, sceneRenderTime);
            return;
        }
        this._scenes.push({
            sceneName, 
            sceneRenderTime,
            sceneType : sceneType, 
        })
    }
    addLateScene(sceneName, sceneRenderTime, cueIndex){
        const sceneType = 'latescene';
        if (!sceneName  || !sceneRenderTime){
            console.error('add scene cannot without sceneName, sceneRenderTime, cueIndex', sceneName, sceneRenderTime, cueIndex);
            return;
        }
        this._scenes.push({
            //write to here 
            sceneName, sceneType, sceneRenderTime,
            cueIndex:cueIndex
        })
    }
    addColorcodeScene(sceneName, sceneRenderTime, colorcode, cueIndex){
        const sceneType = 'colorcode';
        if (!sceneName  || !sceneRenderTime){
            console.error('add scene cannot without sceneName, sceneRenderTime, colorcode, cueIndex', sceneName, sceneRenderTime, colorcode, cueIndex);
            return;
        }
        this._scenes.push({
            //write to here 
            sceneName, sceneType, sceneRenderTime,
            colorcode:colorcode,
            cueIndex:cueIndex
        })
    }
    getScene(sceneIndex){
        if (this._scenes.length >= sceneIndex){
            console.error("scene index cannot greater then scenes length")
            return;
        };
        return this._scenes[sceneIndex];
    }
}

//can only play with experiment render kit
export default class ExperimentScenePlayer extends EventEmitter{
    constructor(playerConfig, renderkit){
        super();
        if (!this.checkPlayerConfigType(config)){
            console.error("wrong player config init Scene Player failed");
            return;}
        this.playerConfig = playerConfig;
        this.isPlay = false;
        this._timer = 0;
        this._lastTimestamp=0;
        this._sceneIndex=0;

        this.renderkit = renderkit
        window.requestAnimationFrame(this._update);
    }
    _switchToNextScene(){
        this._timer = 0;
        if (this._sceneIndex + 1 >= this.playeConfig.sceneNumber){
            console.log('player complete');
            this.isPlay = false;
            return;
        }
        this._sceneIndex += 1;
    }

    _renderScene(currentTime){
        //check scene 
        if (currentTime > this.playerConfig.getScene(this._sceneIndex).sceneRenderTime){
            this._switchToNextScene();
        }
        let currentScene = this.playerConfig.getScene(this._sceneIndex)
        let sceneType = currentScene.sceneRenderTime;
        switch(sceneType){
            case 'cross':
                console.log('render cross scene');
                this.renderkit.drawCorssScene();
                break;
            case 'colorcode':
                console.log('render colorcode scene');
                this.renderkit.drawColorCubes(currentScene.colorcode, currentScene.cueIndex);
                break;
            case 'latescene'://write to here 
                console.log('render latescene scene');
                this.renderkit.drawLateScene(currentScene.cueIndex);
                break;
        }
    }
    _update(timestamp){
        if (!this.isPlay){
            this._renderScene(this._timer);
            return};
        if (this._lastTimestamp == 0)this._lastTimestamp = timestamp;
        else {
            let framerate = timestamp - this._lastTimestamp;
            this._lastTimestamp = timestamp;
            this._timer+=framerate;
            this._renderScene(this._timer);
        }
    }
    play(){
        this.isPlay = true;

    }
    pause(){
        this.isPlay = false;
    }
    stop(){
        this.isPlay = false;
        this._timer = 0;
        this._sceneIndex=0;
    }
    reset(){
        this.isPlay = true;
        this._timer = 0;
        this._sceneIndex=0;
    }
    getCurrentTime(){
        return this._timer;
    }
    resetConfig(config){
        if (!this.checkPlayerConfigType(config))return;
        this.playerConfig = config;
    }
    checkPlayerConfigType(playerConfig){
        return true;
    }


}