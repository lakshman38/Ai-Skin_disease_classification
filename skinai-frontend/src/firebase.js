import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8FLUz9w3Jc1s4P0Yx15teI0vlRRFdS30",
  authDomain: "skinai-7e2bc.firebaseapp.com",
  projectId: "skinai-7e2bc",
  storageBucket: "skinai-7e2bc.firebasestorage.app",
  messagingSenderId: "593495055290",
  appId: "1:593495055290:web:05a9241efdb5c8e87ddb83",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
