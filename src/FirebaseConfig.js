import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA_Yui0BC7ZBBcA1-sQS8W-yIFBFb62MPY",
  authDomain: "phonex-967f1.firebaseapp.com",
  projectId: "phonex-967f1",
  storageBucket: "phonex-967f1.appspot.com",
  messagingSenderId: "522249485891",
  appId: "1:522249485891:web:21756719f777fb2d331ef6",
  measurementId: "G-8SQ3GFSV50"
};

 const app = initializeApp(firebaseConfig);
 export default app
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);