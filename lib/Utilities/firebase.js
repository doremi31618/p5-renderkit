// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getFirestore, query, and, where, addDoc,getDocs, collection, doc, updateDoc} from "firebase/firestore/lite"; // If you are using firestore

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
export function addRecord(collection_name, document){
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
export function getRecord(subject_id, session){
    return new Promise(async (resolve, reject)=>{
        const collectionRef = collection(db, "records")
        const q = query(collectionRef, 
            and(
                where("subject_id", "==", subject_id)),
                where("session", "==", session)
            );


        const querySnapshot = await getDocs(q);
        const results = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
            if (!doc)reject({error:"not find document"});
            results.push({...doc.data(), id:doc.id})
        });

        if (results.length > 1){
            reject({
                error:"find more then one"
            })
        }

        resolve({...results[0]})

    })

}


export function setRecord(collection_name="records", document){
    return new Promise(async (resolve, reject)=>{
        const collectionRef = collection(db, collection_name)
        const q = 
            query(collectionRef, 
                and(
                    where("subject_id", "==", document.subject_id),
                    where("session", "==", document.session)
                ));

        //get record by subject_id and session
        const querySnapshot = await getDocs(q);
        const results = []
        querySnapshot.forEach((doc) => {
            results.push({...doc.data(), id:doc.id})
        });

    
        if (results.length > 1){
            //dont do anything when get mutiple data
            reject({
                error:"find more then one"
            })
        }else if (results.length == 0){
            //should auto add one
            await addRecord('records', document)
            resolve({
                info: "done"
            })
            return;
        }else{
            //get id and set data to current experiment record
            const docRef = doc(db, "records", results[0].id);
            await updateDoc(docRef, document);
            resolve({
                info:"done"
            });
        }


        
    })
}