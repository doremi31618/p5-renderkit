import React, {useState} from 'react';
import eventbridge from '../utils/eventbridge';

const CustomInfo = ()=>{
    const [isDisplay, setDisplay] = useState(false);
    const [isDisplayBtn, setDisplayBtn] = useState(false)
    const [title, setTitle] = useState("break");

    eventbridge.once('displayCustomInfo', (args)=>{
        if (args.title){
            setTitle(args.title)
        }
        console.log("display btn", !args.hideBtn);
        setDisplayBtn(!args.hideBtn);
        setDisplay(true);
    })
    eventbridge.once('continueCustomInfo', ()=>{
        setDisplay(false);
        setDisplayBtn(false);
    })
    const onBtnClick = () => {
        eventbridge.emit('continueCustomInfo');
        // console.log('btn click');
    }
    return <>
        <div>
            {isDisplay && <h2>{title}</h2>}
            {isDisplayBtn && <button onClick={onBtnClick}>繼續</button>}
        </div>
    </>
}

export default CustomInfo;
