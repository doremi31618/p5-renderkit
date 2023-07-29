import React, { useState } from 'react';
// import eventbridge from '../../../lib/Utilities/eventbridge';
import eventbridge from '../utils/eventbridge.js';
function Setting() {
  const [isDisplay, setDisplay] = useState(true); 
    const [session, setSession] = useState('');
    const [associateId, setAssociateId] = useState('');
    const [subjectId, setSubjectId] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setDisplay(false);
        const submitSetting = { session, associateId, subjectId }
        eventbridge.emit('startExperiment', submitSetting);

        // console.log('Submitted:', );
        // handle your form submission logic here
    };

    return (
      <>{
        isDisplay && <form className='setting' onSubmit={handleSubmit}>
            <label>
                Color Experiment
            </label>
            <label>
                Experiment Session:
                <input
                    type="text"
                    value={session}
                    onChange={e => setSession(e.target.value)}
                />
            </label>
            <label>
                Associate ID:
                <input
                    type="text"
                    value={associateId}
                    onChange={e => setAssociateId(e.target.value)}
                />
            </label>
            <label>
                Subject ID:
                <input
                    type="text"
                    value={subjectId}
                    onChange={e => setSubjectId(e.target.value)}
                />
            </label>
            <input type="submit" value="start experiment"/>
        </form>
      }</>
    );
}

export default Setting;
