import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC8lXPeoMKlPNrZQ7WdnqjMklFMOei28a0",
    authDomain: "realtime-chatapp-edc0e.firebaseapp.com",
    projectId: "realtime-chatapp-edc0e",
    storageBucket: "realtime-chatapp-edc0e.appspot.com",
    messagingSenderId: "1080164312857",
    appId: "1:1080164312857:web:77e872babc586128408788"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();
