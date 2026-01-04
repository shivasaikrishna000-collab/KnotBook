import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBJ3tTHxJy3ks2weqaeyx4v0KUx31IRIO4",
    authDomain: "knotbook-20aaa.firebaseapp.com",
    projectId: "knotbook-20aaa",
    storageBucket: "knotbook-20aaa.firebasestorage.app",
    messagingSenderId: "99773083144",
    appId: "1:99773083144:web:c70d99e418547a6f262bbd",
    measurementId: "G-3BLFMGN513"
};

// Initialize Firebase (Singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
