// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: 'devapp-ada00.firebaseapp.com',
    projectId: 'devapp-ada00',
    storageBucket: 'devapp-ada00.firebasestorage.app',
    messagingSenderId: '520977720339',
    appId: '1:520977720339:web:6c0265f0095a85d22e8be6',
    measurementId: 'G-E65QRPJ4DK'
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
