// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mern-postapp.firebaseapp.com",
  projectId: "mern-postapp",
  storageBucket: "mern-postapp.appspot.com",
  messagingSenderId: "1077727001510",
  appId: "1:1077727001510:web:a1a6ab87d296bb60672d67",
  measurementId: "G-QR1EF3CPF7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);