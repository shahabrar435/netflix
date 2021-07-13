import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// 1) when seeding the database you'll have to uncomment this!
//import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyCZmwtE-LdBA_n65XaqbzrBo8AGA6Yngko",
    authDomain: "netflix-e3c26.firebaseapp.com",
    databaseURL: 'https://netflix-e3c26.firebaseio.com',
    projectId: "netflix-e3c26",
    storageBucket: "netflix-e3c26.appspot.com",
    messagingSenderId: "398546438488",
    appId: "1:398546438488:web:3dfce55407cd7a7144bd2d"
};

const firebase = Firebase.initializeApp(config);
// 2) when seeding the database you'll have to uncomment this!
//seedDatabase(firebase);
// 3) once you have populated the database (only run once!), re-comment this so you don't get duplicate data

export { firebase };