
import eventbridge from "./eventbridge"

//custom part 
const listen_key_list = {
    ArrowLeft: ()=>{
        console.log('press left')
        //沒變色
        eventbridge.emit('onChooseAnswer', {
            chooseAnswer: 'same'
        })
    },
    ArrowRight: ()=>{
        console.log('press right')
        //有變色
        eventbridge.emit('onChooseAnswer', {
            chooseAnswer: 'not_same'
        })
    },
    Enter: ()=>{
        console.log('press enter');
        eventbridge.emit('continueCustomInfo');
    }
}


function handleEvent(event){
    event.preventDefault();
    if (listen_key_list[event.key]){
        console.log('check key list', listen_key_list, event)
        listen_key_list[event.key]();
    }
}


//module part 
export function addEvent(){
    console.log('add key event');
    window.addEventListener('keyup', handleEvent);
}

export function removeEvent(){
    console.log('remove key event');

    window.removeEventListener('keyup', handleEvent);
}