// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1aL-1baPx6agEpkinVe-9KiNF-9JzB34",
  authDomain: "miniproject-photofolio.firebaseapp.com",
  projectId: "miniproject-photofolio",
  storageBucket: "miniproject-photofolio.appspot.com",
  messagingSenderId: "318892461492",
  appId: "1:318892461492:web:0d78a47f158906ad4176e1",
  measurementId: "G-5B7WBEBR36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);