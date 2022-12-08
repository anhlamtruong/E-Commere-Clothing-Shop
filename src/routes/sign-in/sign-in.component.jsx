import { async } from "@firebase/util";
import { Link } from "react-router-dom";
import {
  signInWithGogglePopup,
  signInWithFacebookPopup,
} from "../../utils/firebase/firebase.utils.js";

import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils.js";

function SignIn() {
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGogglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
      console.log("USER:", userDocRef);
    } catch (err) {
      console.error(err);
    }
  };
  const logFacebookUser = async () => {
    try {
      const res = await signInWithFacebookPopup();
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="sign-in">
      <h1>Sign Up</h1>
      <button onClick={logGoogleUser}>Sign in with Google PopUp</button>
      <br />
      {/* <button onClick={logFacebookUser}>Sign in with Facebook PopUp</button> */}
    </div>
  );
}
export default SignIn;
