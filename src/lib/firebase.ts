import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChKxuISWieAxRlIBGMESoerRLGcUfTWBo",
  authDomain: "used-car-marketplace-9b3a4.firebaseapp.com",
  projectId: "used-car-marketplace-9b3a4",
  storageBucket: "used-car-marketplace-9b3a4.firebasestorage.app",
  messagingSenderId: "422898935713",
  appId: "1:422898935713:web:43441285d5b3c8645a0de0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
