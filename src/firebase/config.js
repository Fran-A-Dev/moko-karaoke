import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvu8yTxwg5EIxqABc08GNBMEKxjW2DBFg",
  authDomain: "moko-karaoke.firebaseapp.com",
  projectId: "moko-karaoke",
  storageBucket: "moko-karaoke.appspot.com",
  messagingSenderId: "788502449165",
  appId: "1:788502449165:web:d7bb574b104d2c45b29944",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp, projectStorage };
