import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJH_e-RX5JX_nNkxcabdfxxrAqFHAB8-w",
  authDomain: "salloum-7335a.firebaseapp.com",
  projectId: "salloum-7335a",
  storageBucket: "salloum-7335a.appspot.com",
  messagingSenderId: "16565870390",
  appId: "1:16565870390:web:6dcf44db6f64d23e47dd97",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const DB = getFirestore(app);
