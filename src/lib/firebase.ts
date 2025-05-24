// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtlI_54tKm54QMgQI-3dTA5u01szoqE_8",
  authDomain: "runirlounge.firebaseapp.com",
  databaseURL: "https://runirlounge-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "runirlounge",
  storageBucket: "runirlounge.firebasestorage.app",
  messagingSenderId: "726138488465",
  appId: "1:726138488465:web:4acc475a0ae154f826a130"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);

