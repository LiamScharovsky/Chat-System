import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDGGdsYyEkIfIEz8seo0_HzW-H7t0Uc6Hw",
    authDomain: "pupmail-cb57e.firebaseapp.com",
    projectId: "pupmail-cb57e",
    storageBucket: "pupmail-cb57e.appspot.com",
    messagingSenderId: "688525875129",
    appId: "1:688525875129:web:c2ad2743fd6412fec88868",
    measurementId: "G-HKPPLPYBQQ"
};

export const firebase = initializeApp( firebaseConfig );
export const auth = getAuth( firebase )
export const db = getFirestore( firebase )