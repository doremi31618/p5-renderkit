import EventEmitter from 'events';


export class ExperimentPlayerConfig{
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
    addLateScene(sceneName, sceneRenderTime, cueIndex=-1){
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
    addColorcodeScene(sceneName, sceneRenderTime, colorcode, cueIndex=-1){
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
        if (this._scenes.length <= sceneIndex){
            console.error("scene index cannot greater then scenes length",
                "this._scenes.length", this._scenes.length,
                "sceneIndex", sceneIndex)
            return;
        };
        return this._scenes[sceneIndex];
    }
}

//can only play with experiment render kit
export class ExperimentScenePlayer extends EventEmitter{
    constructor(playerConfig, renderkit){
        super();
        if (!this.checkPlayerConfigType(playerConfig)){
            console.error("wrong player config init Scene Player failed");
            return;}
        this.playerConfig = playerConfig;
        this.isPlay = false;
        this._timer = 0;
        // this._lastTimestamp=0;
        this._sceneIndex=0;

        this.renderkit = renderkit
        setInterval(()=>{
            let timestamp = 25;
            this._update(timestamp)
        },25);
    }
    _switchToNextScene(){
        this._timer = 0;
        // console.log("_switchToNextScene, ",this.playerConfig.sceneNumber, this.playerConfig, this._sceneIndex)
        if (this._sceneIndex + 1 >= this.playerConfig.sceneNumber){
            // console.log('player complete');
            this.renderkit.clear();
            this.isPlay = false;
            this.emit('lastSceneFinish', )
            return;
        }
        this._sceneIndex += 1;
    }

    _renderScene(currentTime){
        //check scene 
        if (currentTime > this.playerConfig.getScene(this._sceneIndex).sceneRenderTime){
            this._switchToNextScene();
        }
        if ( this._timer == 0){
            let currentScene = this.playerConfig.getScene(this._sceneIndex)
            let sceneType = currentScene.sceneType;
            switch(sceneType){
                case 'cross':
                    // console.log('render cross scene', this.renderkit);
                    this.renderkit.drawCrossScene();
                    break;
                case 'colorcode':
                    // console.log('render colorcode scene');
                    this.renderkit.drawColorCubes(currentScene.colorcode, currentScene.cueIndex);
                    break;
                case 'latescene'://write to here 
                    // console.log('render latescene scene');
                    this.renderkit.drawLateScene(currentScene.cueIndex);
                    break;
            }
        }
        
        // console.log('render scene', currentTime);
    }
    _update(timestamp){
        // console.log('_update', timestamp, this.isPlay)
        if (!this.isPlay){
            this.renderkit.clear()
            // this._renderScene(this._timer);
            // console.log("render pause scene")
            return;
        }
        this._renderScene(this._timer);
        this._timer+=timestamp;
        // console.log('render play scene', this._timer, this._lastTimestamp, framerate)
        
    }
    play(){
        this.isPlay = true;
        // console.log('play', this.isPlay)
    }
    pause(){
        this.isPlay = false;
    }
    stop(){
        this.isPlay = false;
        this._timer = 0;
        this._sceneIndex=0;
        // console.log('stop', this.isPlay, this._timer, this._sceneIndex)
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
        this.reset();
    }
    checkPlayerConfigType(playerConfig){
        return true;
    }


}