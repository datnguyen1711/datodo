import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-5Zj4B08u1NJwv20LVKWMgGJ-669fhIM",
  authDomain: "datodo-94431.firebaseapp.com",
  projectId: "datodo-94431",
  storageBucket: "datodo-94431.appspot.com",
  messagingSenderId: "966660196470",
  appId: "1:966660196470:web:2d6b5da12298359f613757",
  measurementId: "G-XY7C7ZR9MQ",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
