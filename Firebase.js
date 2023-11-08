// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";
import { getStorage } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

    apiKey: "AIzaSyAap-dvpToGjjGHBNS4eZQy0K1gcCz0qMs",
    authDomain: "sit313-8bb38.firebaseapp.com",
    projectId: "sit313-8bb38",
    storageBucket: "sit313-8bb38.appspot.com",
    messagingSenderId: "385658034220",
    appId: "1:385658034220:web:78061991a5d50675fe1989",
    measurementId: "G-7L21227HX3"  
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app); 
export const storage = getStorage(app);