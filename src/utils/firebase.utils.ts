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
  NextOrObserver,
  User,
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
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Category } from "../store/categories/category.types";
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
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    if (!email || !password) return;
    return createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw err;
  }
};

//*function SIGN IN WITH EMAIL AND PASSWORD **//
//*function STORING USER DATA INTO FIRESTORE **//
export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
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
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback as NextOrObserver<User>);
/*
next: callback
error: errorCallback
complete: completeCallBack
*/

export const db = getFirestore();
//* TYPING
export type ObjectToAdd = {
  title: string;
};
//function to add collection and documents data onto firebase
//param (the string of collection, the document objects)
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
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
    console.error(err);
  }
};

//function that will get Categories and Documents
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  try {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);
    //fetch documents snapshot that we want
    const querySnapShot = await getDocs(q);
    //Loop over the snapshot.docs by using reduce method to create
    //A structure below
    console.log(querySnapShot);
    return querySnapShot.docs.map(
      (docSnapshot) => docSnapshot.data() as Category
    );
    // .reduce((acc, docSnapshot) => {
    //   const { title, items } = docSnapshot.data();
    //   acc[title.toLowerCase()] = items;
    //   return acc;
    // }, {});

    // return categoryMap;
  } catch (err) {
    throw err;
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

export type AdditionalInformation = {
  displayName?: string;
};
export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

//*function STORING USER DATA INTO FIRESTORE **//
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation: AdditionalInformation = {}
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
      } catch (error) {
        console.error(`ERROR: CREATING THE USER, ${error}`);
        throw error;
      }
    }
    //* If the data exists in the database
    //* return userDocRef
    return userSnapshot as QueryDocumentSnapshot<UserData>;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
