// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAqF5MOmgFICyWKaBgj2DKN7B7He5VFwKc",
    authDomain: "plannet-ae327.firebaseapp.com",
    projectId: "plannet-ae327",
    storageBucket: "plannet-ae327.firebasestorage.app",
    messagingSenderId: "794674013856",
    appId: "1:794674013856:web:2eb1fe687df4eded6acbc5",
    measurementId: "G-J2Y1QJ6GVS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };