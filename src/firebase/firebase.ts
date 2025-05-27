import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'dotenv/config';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: 'devapp-ada00.firebaseapp.com',
    projectId: 'devapp-ada00',
    storageBucket: 'devapp-ada00.appspot.com',
    messagingSenderId: '520977720339',
    appId: '1:520977720339:web:6c0265f0095a85d22e8be6',
    measurementId: 'G-E65QRPJ4DK'
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
