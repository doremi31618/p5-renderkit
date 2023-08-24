import { getFirestore, addDoc, setDoc, getDocs, getDoc, doc, query, collection, orderBy, limit } from "firebase/firestore/lite"; // If you are using firestore
import { db } from './firebase.js';


export class ExperimentSetting {
    constructor() {
        this._data = {}
    }
    setField(fieldName, value) {
        console.log('set setting field ', fieldName, value);
        if (fieldName == 'version' || fieldName == 'name'){
            this._data[fieldName] = value;
        }else{
            this._data[fieldName] = parseInt(value);
        }
    }
    static get defaultSetting() {
        return {
            version: "1.0.0",
            name: "default-setting",
            min_level: 2,
            max_level: 6,
            max_tolerate_incorrect_number: 2,

            number_of_each_level: 6,
            stage2_assignment_number: 30,
            stage3_assignment_number: 30,
            stage4_assignment_number: 30
        }
    }
    static insertDefaultSetting() {
        return new Promise(async (resolve, reject) => {

            const docRef = doc(db, 'settings', '1.0.0');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                resolve({
                    data: docSnap.data()
                })
            } else {
                //insert default setting
                try {
                    const defaultSetting = ExperimentSetting.defaultSetting;
                    const settingRef = await setDoc(doc(db, "settings", defaultSetting.version), defaultSetting)
                    console.log('insert setting data success', settingRef)
                    resolve({
                        data: settingRef.data()
                    })
                } catch (error) {
                    console.log('insert setting data failed : ', error)
                    reject({
                        error: error
                    })
                }

            }
        })
    }
    getCurrentSetting() {
        return new Promise(async (resolve, reject)=>{
            const settingRef = collection(db, "settings");
            const q = query(settingRef, orderBy("version", "desc"), limit(3));
            const querySnapShot = await getDocs(q);
            const settings = []
            querySnapShot.forEach((doc)=>{
                console.log("setting", doc.id, doc.data());
                settings.push({...doc.data()})
            })

            //exception
            if (settings.length == 0){
                //auto insert default data to database 
                await ExperimentSetting.insertDefaultSetting()
                instance._data = ExperimentSetting.defaultSetting;
            }else{
                //if find data
                instance._data = settings[0]
                resolve(settings[0]);
            }

            
        })
    }
    saveSetting() {
        return new Promise(async (resolve, reject) => {
            
            try{

                if (!this._data.version){
                    reject('need version', this._data)
                    return;
                }

                const docRef = doc(db, 'settings', this._data.version);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    alert('cannot save duplicate version number')
                    reject('cannot save duplicate version number')
                    return;
                }

                const settingRef = await setDoc(doc(db, "settings", this._data.version), this._data)
                console.log('insert setting data success', settingRef)
                resolve({
                    data: settingRef
                })

            }catch(error){
                reject({
                    error: error
                })
            }

        })

    }
}

export const instance = new ExperimentSetting();
