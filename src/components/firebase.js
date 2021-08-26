import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from './config';
firebase.initializeApp(firebaseConfig)
const auth=firebase.auth();
const fs=firebase.firestore();
const storage=firebase.storage();
export {auth,fs,storage}