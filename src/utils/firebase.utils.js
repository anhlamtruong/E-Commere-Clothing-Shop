import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

//! Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5bZmaxV1LFwWG3pNpk2bOkL_SjbdZpcQ",
  authDomain: "ecom-clothing-ead9e.firebaseapp.com",
  projectId: "ecom-clothing-ead9e",
  storageBucket: "ecom-clothing-ead9e.appspot.com",
  messagingSenderId: "375345053691",
  appId: "1:375345053691:web:1a8efdcdaff8af8f29155e",
};

//! Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//*function LOGIN WITH GOOGLE OR FACEBOOK **//
const provider_google = new GoogleAuthProvider();
const provider_facebook = new FacebookAuthProvider();
provider_google.setCustomParameters({
  //* Alway force user to select an account
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGogglePopup = () =>
  signInWithPopup(auth, provider_google);
export const signInWithFacebookPopup = () =>
  signInWithPopup(auth, provider_facebook);
//* Redirect to google signup
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider_google);

//*function SIGNUP WITH EMAIL AND PASSWORD **//
//*function STORING USER DATA INTO FIRESTORE **//
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  try {
    if (!email || !password) return;
    return createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw err;
  }
};

//*function SIGN IN WITH EMAIL AND PASSWORD **//
//*function STORING USER DATA INTO FIRESTORE **//
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  try {
    if (!email || !password) return;
    return signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw err;
  }
};

//*function SIGN OUT USER**//
export const signOutUser = async () => await signOut(auth);

//function Observer Listener will run a callback function whenever auth got changed
//param  (auth singleton, callback function will run whenever auth change)
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
/*
next: callback
error: errorCallback
complete: completeCallBack
*/

export const db = getFirestore();

//function to add collection and documents data onto firebase
//param (the string of collection, the document objects)
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  try {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log("done");
  } catch (err) {
    console.err(err);
  }
};

//function that will get Categories and Documents
export const getCategoriesAndDocuments = async () => {
  try {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);
    //fetch documents snapshot that we want
    const querySnapShot = await getDocs(q);
    //Loop over the snapshot.docs by using reduce method to create
    //A structure below
    console.log(querySnapShot);
    return querySnapShot.docs.map((docSnapshot) => docSnapshot.data());
    // .reduce((acc, docSnapshot) => {
    //   const { title, items } = docSnapshot.data();
    //   acc[title.toLowerCase()] = items;
    //   return acc;
    // }, {});

    // return categoryMap;
  } catch (err) {
    console.error(err);
  }
};
/*
{
  hats:{
    title:'Hats' ,
    items:[
      {},
      {},
    ] 
  },
  sneakers:{
    title:'Sneakers' ,
    items:[
      {},
      {},
    ] 
  }
}
*/

//*function STORING USER DATA INTO FIRESTORE **//
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  try {
    if (!userAuth) return;
    //param doc (DATABASE,COLLECTION,UNIQUE IDENTIFIER)
    const userDocRef = doc(db, "users", userAuth.uid);
    // console.log(userDocRef);

    //* Get and check data function
    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);

    //* If the data doesn't exist in the database
    //* create / set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (err) {
        console.err("ERROR: CREATING THE USER", err.message);
        throw err;
      }
    }
    //* If the data exists in the database
    //* return userDocRef
    return userDocRef;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
