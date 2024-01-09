import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

let db = false;

export const getDb = () => {
    if(!db){
        const firebaseConfig = {
  apiKey: "AIzaSyADwcc1d2EOtkY_VBfRt4yI30ON7WCJfG8",
  authDomain: "adopted-pets-69624.firebaseapp.com",
  projectId: "adopted-pets-69624",
  storageBucket: "adopted-pets-69624.appspot.com",
  messagingSenderId: "375227611790",
  appId: "1:375227611790:web:37d0f075f15f30337267df"
}

        const app = initializeApp(firebaseConfig)

        db = getFirestore(app)
    }

    return db
}