import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyC2oD6PbjR4gytysjynqxoHheTIFo-5_hs",
    authDomain: "bv-prueba.firebaseapp.com",
    databaseURL: "https://bv-prueba-default-rtdb.firebaseio.com",
    projectId: "bv-prueba",
    storageBucket: "bv-prueba.firebasestorage.app",
    messagingSenderId: "48104865",
    appId: "1:48104865:web:b137edcf20d6efb915f7e0"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const database = getDatabase(app);
export { firebaseConfig };
