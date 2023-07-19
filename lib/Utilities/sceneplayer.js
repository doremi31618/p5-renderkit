import { time } from 'console';
import EventEmitter from 'events';
const examplePlayerConfig = new PlayerConfig();
class PlayerConfig{
    constructor(){
        this._scenes = []
    }
    addScene(sceneName, sceneType, sceneRenderTime, colorcode=null, cueIndex=null){
        this._scenes.push({
            //write to here 
        })
    }
}

export default class ScenePlayer extends EventEmitter{
    constructor(playerConfig){
        super();
        if (!this.checkPlayerConfigType(config)){
            console.error("wrong player config init Scene Player failed");
            return;}
        this.playerConfig = playerConfig;
        this.isPlay = false;
        this._timer = 0;
        this._lastTimestamp=0;
        window.requestAnimationFrame(this._update);
    }
    _renderScene(currentTime){

    }
    _update(timestamp){
        if (!this.isPlay)return;
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
    }
    reset(){
        this.isPlay = true;
        this._timer = 0;
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