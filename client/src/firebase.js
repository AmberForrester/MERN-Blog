// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-79914.firebaseapp.com",
  projectId: "mern-blog-79914",
  storageBucket: "mern-blog-79914.appspot.com",
  messagingSenderId: "863369002811",
  appId: "1:863369002811:web:465d5ea0524faafa03411e",
  measurementId: "G-65YXENT0WY"
};

// Initialize Firebase + export to use in other parts of our application. 
export const app = initializeApp(firebaseConfig);
