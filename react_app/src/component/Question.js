import React, { useState } from 'react';
import { EventEmitter } from 'events';
if (!document.eventBridge)document.eventBridge = new EventEmitter();

const Question = () => {
  const [hide, setHide] = useState(true);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  document.eventBridge.on('clickHide', (_hide)=>{
    setHide(!_hide)
  })
  const handleClick = (e) => {
    e.preventDefault();
    document.eventBridge.emit('clickHide', hide)
    alert(`Input 1: ${input1}, Input 2: ${input2}`);
    
  }

  const handleSecondClick = (e) => {
    e.preventDefault();
    alert(`Input 1: ${input1}, Input 2: ${input2}`);
  }

  const component = (isHide)=>{
    if (isHide)return<button onClick={handleClick}>Button 1</button>
    return <div>
    <form>
      <input
        type="text"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
        placeholder="Input 1"
      />
      <input
        type="text"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
        placeholder="Input 2"
      />
      <button onClick={handleClick}>Button 1</button>
      <button onClick={handleSecondClick}>Button 2</button>
    </form>
  </div>
  }

  return component(hide);
};

export default Question;
