import {setRecord} from '../Utilities/firebase.js'

function test_setRecord_function(){
    return new Promise(async (resolve, reject)=>{
        const test_expirment_config = {
            subject_id: 'test_subjectid',
            session: 'test_session'
        }
        
        setInterval(async ()=>{

            if (!test_expirment_config.level)test_expirment_config.level=4;
            else test_expirment_config.level += 1;

            await setRecord('records', test_expirment_config);
        }, 1000)
       
    })
}

test_setRecord_function().then((result)=>{
    console.log('finish', result);
})