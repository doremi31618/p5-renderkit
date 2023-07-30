// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getFirestore, addDoc, collection} from "firebase/firestore/lite"; // If you are using firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AtIzaSyAQGDj5n6RB6z4J0ELw1BjnsqFK_WUzbZQ",
  authDomain: "colorexperiment-d74cf.firebaseapp.com",
  projectId: "colorexperiment-d74cf",
  storageBucket: "colorexperiment-d74cf.appspot.com",
  messagingSenderId: "364463670210",
  appId: "1:364463670210:web:a3e6d89375128493b40c5b"
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