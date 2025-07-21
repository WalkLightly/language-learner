// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlz67p2JVwoHqQ3yCgsw_ivlWo1d0j6jI",
  authDomain: "language-learner-e9247.firebaseapp.com",
  projectId: "language-learner-e9247",
  storageBucket: "language-learner-e9247.appspot.com",
  messagingSenderId: "450440955068",
  appId: "1:450440955068:web:76a22da88df66f87dcfcb9",
  measurementId: "G-3T60E4ZJD6",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const db = getFirestore(firebase);

export default db;
