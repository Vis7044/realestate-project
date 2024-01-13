
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_BASE_API_KEY,
  authDomain: "mern-estate-3284a.firebaseapp.com",
  projectId: "mern-estate-3284a",
  storageBucket: "mern-estate-3284a.appspot.com",
  messagingSenderId: "788297806538",
  appId: "1:788297806538:web:9f861f269eba84cb4dba33"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)