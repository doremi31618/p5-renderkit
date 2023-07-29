
import React, { useState } from 'react';
import { EventEmitter } from 'events';
console.log('question component version 1.0.1')
if (!document.eventBridge)document.eventBridge = new EventEmitter();

const Question = () => {
  //todo :
  //1. add cover canvas
  //2. add taildwind to style and arrange position
  const [isDisplay, setDisplay] = useState(false);
  document.eventBridge.once('displayQuestion', ()=>{
    setDisplay(true)
    console.log('display question')
  })

  const handleClick = (e) => {
    console.log('btn1 <same> click');
    document.eventBridge.emit('onChooseAnswer', {
      chooseAnswer : "same"
    })
    setDisplay(false)
    
  }

  const handleSecondClick = (e) => {
    console.log('btn <not same> click');
    document.eventBridge.emit('onChooseAnswer', {
      chooseAnswer : "not_same"
    })
    setDisplay(false)
  }

  return <div>
    {isDisplay && <div>
    
      <button onClick={handleClick}>same</button>
      <button onClick={handleSecondClick}>not same</button>
    
  </div>}
  </div>
};

export default Question;
