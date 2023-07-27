import React, { useState } from 'react';

const Setting = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    alert(`Input 1: ${input1}, Input 2: ${input2}`);
  }

  return (
    <div>
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
      </form>
    </div>
  );
};

export default Setting;
