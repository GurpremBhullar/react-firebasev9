import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBv-7CGwrmekXcS63j6L6t1NixqdFYELa8",
  authDomain: "crwn-clothing-db-3029a.firebaseapp.com",
  projectId: "crwn-clothing-db-3029a",
  storageBucket: "crwn-clothing-db-3029a.appspot.com",
  messagingSenderId: "928303065032",
  appId: "1:928303065032:web:c828bc9b520369afac82fd",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if(!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

   try {
       await setDoc(userDocRef, {
           displayName,
           email,
           createdAt,
           ...additionalInformation
       });
    } catch (error) {
        console.log('error creating the user', error.message);
    }
  }


  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback );


/**
 * {
 * next: callback,
 * }
 * 
 */