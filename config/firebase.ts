// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-9qWr5h1WsBCjDkVMu1K9TGU4TN0nMCU",
  authDomain: "xontel-task.firebaseapp.com",
  projectId: "xontel-task",
  storageBucket: "xontel-task.firebasestorage.app",
  messagingSenderId: "50606061263",
  appId: "1:50606061263:web:fb2ed26f0fac3bbb6729ba",
  measurementId: "G-G8JML67VPP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
export default app;
