import { useEffect, useState } from "react";
import { getRedirectResult } from "firebase/auth";
import { ReactComponent as GOOGLE } from "../../assets/google-icon.svg";
import {
  auth,
  signInWithGogglePopup,
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";

import FormInput from "../form-input/form-input.component.jsx";
import Button from "../button/button.component.jsx";

// import { UserContext } from "../../contexts/user.context";

import "./sign-in-form.styles.scss";
//! default  Form Fields
const defaultFormFields = {
  email: "",
  password: "",
};

function SignInForm() {
  //*setState
  const [formFields, setFromFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  //*initailize the user context with an empty object using UserContext from React
  // const { setCurrentUser } = useContext(UserContext);

  //*function reset the form after filling
  const restFromFields = () => {
    setFromFields(defaultFormFields);
  };

  //*function log user in firebase db using email and password
  const logUserWithEmail = async (event) => {
    event.preventDefault();
    try {
      //*See that if it's already authenticated
      await signInAuthUserWithEmailAndPassword(email, password);
      // setCurrentUser(user);

      //*create the user document

      restFromFields();
      //*Saying to user that we are success
    } catch (err) {
      //*Finding the right error for the user
      switch (err.code) {
        case "auth/user-not-found":
          alert("User not found");
          break;
        case "auth/invalid-password":
          alert("Wrong password");
          break;
        default:
          alert(
            `Something went wrong: Code-${err.code}\nMessage-${err.message}`
          );
          console.log(err);
          restFromFields();
      }

      // if (err.code === "auth/user-not-found") {
      //   alert("User not found");
      // } else if (err.code === "auth/invalid-password") {
      //   alert("Wrong password");
      // }
      // console.log(err);
    }
  };

  //*function Event handler to set the state dynamicailly
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFromFields({ ...formFields, [name]: value });
  };

  //*function Hooks using for redirecting login
  useEffect(
    () => async () => {
      const res = await getRedirectResult(auth);
      if (res) {
        await createUserDocumentFromAuth(res.user);
      }
    },
    []
  );

  //*function Google Popup Login
  const logGoogleUser = async () => {
    try {
      await signInWithGogglePopup();
      // setCurrentUser(user);
      // await createUserDocumentFromAuth(user);
    } catch (err) {
      console.error(err);
    }
  };
  //*function Facebook PopUp
  // const logFacebookUser = async () => {
  //   try {
  //     await signInWithFacebookPopup();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className="sign-in">
      <h1>I already have an account</h1>
      <span>Sign in with your email and password</span>
      <form onSubmit={logUserWithEmail}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="btn-con">
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType="google" onClick={logGoogleUser}>
            <GOOGLE className="google-logo" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
