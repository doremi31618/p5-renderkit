import {addData} from '../Utilities/firebase.js';

//save test data
function saveToFirebase(){
    return new Promise(async (resolve, reject)=>{
        try{
            let result_data = {name:"test_data"};
            let response = await addData("records",result_data);
            console.log('result experiment data',result_data)
            resolve(response)
        }
        catch(error){
            console.log('upload failed', error)
            reject(error)
        }
    })
}

saveToFirebase();