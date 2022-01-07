import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAzEmeS4twhUM3MBeAms50TiZBCcUQoVL4",
    authDomain: "muso-ninjas-403de.firebaseapp.com",
    projectId: "muso-ninjas-403de",
    storageBucket: "muso-ninjas-403de.appspot.com",
    messagingSenderId: "194086868715",
    appId: "1:194086868715:web:a3078d97ec42ac467890ae"
  };


  firebase.initializeApp(firebaseConfig);

  const projectFirestore = firebase.firestore();
  const projectAuth = firebase.auth();
  const projectStorage = firebase.storage();

  const timestamp = firebase.firestore.FieldValue.serverTimestamp;


  export { projectFirestore, projectAuth, projectStorage, timestamp };
