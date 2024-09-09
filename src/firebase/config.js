import { initializeApp } from "firebase/app";
import { initializeFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// Firebase config aqui embaixo

const firebaseConfig = {
  apiKey: "AIzaSyB59JST9N5wsuGQyb_qv7c70bTEt6ej3sE",
  authDomain: "lucrativo-crm.firebaseapp.com",
  projectId: "lucrativo-crm",
  storageBucket: "lucrativo-crm.appspot.com",
  messagingSenderId: "119255350594",
  appId: "1:119255350594:web:d4d7c567e0414ffdfbdcdb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
const db = initializeFirestore(firebaseApp, {
  ignoreUndefinedProperties: true,
});
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

// Timestamp
const timestamp = serverTimestamp();

export { db, auth, storage, timestamp };
