import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAS42FLYzrQdRaXs-AqqZF2Izf2GhWjXcI",
  authDomain: "ups-fronted.firebaseapp.com",
  projectId: "ups-fronted",
  storageBucket: "ups-fronted.firebasestorage.app",
  messagingSenderId: "885551494602",
  appId: "1:885551494602:web:332155db64c5a210178b33",
  measurementId: "G-YZFEWM85H7"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);