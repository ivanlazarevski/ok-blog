// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg0aAL1dULeQPPTTvFiri-Ezq1y4C1F7Y",
  authDomain: "notokkid-blog.firebaseapp.com",
  projectId: "notokkid-blog",
  storageBucket: "notokkid-blog.firebasestorage.app",
  messagingSenderId: "934534124468",
  appId: "1:934534124468:web:40b05ae2032e9a7a30d8e1",
  measurementId: "G-GF10RF4ED8"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
