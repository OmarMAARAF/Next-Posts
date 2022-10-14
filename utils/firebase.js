// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBHrm96TM1M3RzIB1a5saCPUxqraUwjPmc",
    authDomain: "react-auth-2efc8.firebaseapp.com",
    projectId: "react-auth-2efc8",
    storageBucket: "react-auth-2efc8.appspot.com",
    messagingSenderId: "294776399609",
    appId: "1:294776399609:web:307a9001d0e4761bf22428",
    measurementId: "G-NZLYD8B2ET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);