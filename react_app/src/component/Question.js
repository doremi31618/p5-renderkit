
import React, { useState } from 'react';
import eventbridge from '../utils/eventbridge';
console.log('question component version 1.0.2')
const Question = () => {
  //todo :
  //1. add cover canvas
  //2. add taildwind to style and arrange position
  const [isDisplay, setDisplay] = useState(false);
  eventbridge.once('displayQuestion', ()=>{
    setDisplay(true)
    console.log('display question')
  })

  const handleClick = (e) => {
    console.log('btn1 <same> click');
    eventbridge.emit('onChooseAnswer', {
      chooseAnswer : "same"
    })
    setDisplay(false)
    
  }

  const handleSecondClick = (e) => {
    console.log('btn <not same> click');
    eventbridge.emit('onChooseAnswer', {
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
