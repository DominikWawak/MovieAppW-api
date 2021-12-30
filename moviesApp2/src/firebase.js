
import firebase from "firebase/compat/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,sendPasswordResetEmail} from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { useState ,useEffect} from "react";


const firebaseConfig = {
  apiKey: "AIzaSyC4qufPEMs-6TCMb8a2TVz7qung8UOXyPg",
  authDomain: "movieapp-7e68e.firebaseapp.com",
  projectId: "movieapp-7e68e",
  storageBucket: "movieapp-7e68e.appspot.com",
  messagingSenderId: "872624417536",
  appId: "1:872624417536:web:5869f80686b4944f9621e5"
};


export const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth()

