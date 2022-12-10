import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGogglePopup,
  signInWithFacebookPopup,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils.js";

import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils.js";

import SignUpFrom from "../../components/sign-up/sign-up.component.jsx";

function SignIn() {
  useEffect(
    () => async () => {
      const res = await getRedirectResult(auth);
      if (res) {
        const userDocRef = await createUserDocumentFromAuth(res.user);
      }
    },
    []
  );

  //Google Popup
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGogglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
    } catch (err) {
      console.error(err);
    }
  };
  // Facebook
  const logFacebookUser = async () => {
    try {
      const res = await signInWithFacebookPopup();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sign-in">
      <h1>Sign Up</h1>
      <button onClick={logGoogleUser}>Sign in with Google PopUp</button>
      <br />
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
      <br />
      <SignUpFrom />
      {/* <button onClick={logFacebookUser}>Sign in with Facebook PopUp</button> */}
    </div>
  );
}
export default SignIn;
