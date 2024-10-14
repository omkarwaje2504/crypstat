// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase} from "firebase/database";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsKfxD-oIoPCp3v4eTRp2WDJUoWH5OlfI",
  authDomain: "cryp-a8301.firebaseapp.com",
  projectId: "cryp-a8301",
  storageBucket: "cryp-a8301.appspot.com",
  messagingSenderId: "1031565584447",
  appId: "1:1031565584447:web:9da673ead7e84905bd308a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);
export {app,auth,db,storage};