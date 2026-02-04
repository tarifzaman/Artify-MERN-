// firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDABF_iDrdTInPIgXVgrQgqMBzrjR-D36k",
    authDomain: "artify-project-5939e.firebaseapp.com",
    projectId: "artify-project-5939e",
    storageBucket: "artify-project-5939e.firebasestorage.app",
    messagingSenderId: "296670280768",
    appId: "1:296670280768:web:4126fedaef2843217673a5"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);