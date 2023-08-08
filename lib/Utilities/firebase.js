// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getFirestore, addDoc, collection} from "firebase/firestore/lite"; // If you are using firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCftAIc6qPVRjDdLQKFlfnU9thS9V2o42g",
    authDomain: "colorexperiment-44231.firebaseapp.com",
    projectId: "colorexperiment-44231",
    storageBucket: "colorexperiment-44231.appspot.com",
    messagingSenderId: "518837280253",
    appId: "1:518837280253:web:6b08899bb852a224a40d94"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export function addData(collection_name, document){
    return new Promise(async (resolve, reject)=>{
        try{
            const docRef = await addDoc(collection(db, collection_name), document);
            resolve({
                info:"add data success doc id is : "+docRef.id,
            })
        }catch(exception){
            let error_message = 'error occur in add data';
            console.error(error_message, exception,document )
            reject({
                error: error_message
            })
        }
    })
}