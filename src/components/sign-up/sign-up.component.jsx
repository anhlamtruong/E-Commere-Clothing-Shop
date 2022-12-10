import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { auth } from "../../utils/firebase/firebase.utils.js";
import Button from "../button/button.component";
import "./sign-up.styles.scss";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpFrom() {
  //*setState
  const [formFields, setFromFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  //*function reset the form after filling
  const restFromFields = () => {
    setFromFields(defaultFormFields);
  };

  //*function log user in firebase db using email and password
  const logUserWithEmail = async (event) => {
    event.preventDefault();
    //*Confirm password and email
    if (password !== confirmPassword) {
      alert("Password do not match!");
      return;
    }
    try {
      //*See that if it's already authenticated
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      //*create the user document
      await createUserDocumentFromAuth(user, { displayName });
      restFromFields();
      //*Saying to user that we are success
    } catch (err) {
      //*If user already email in used
      if (err.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.error("USER CREATED ENCOUNTERED AN ERROR: ", err);
        throw err;
      }
    }
  };

  //*function Event handler to set the state dynamicailly
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFromFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2>Don't have an account ?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={logUserWithEmail}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}
export default SignUpFrom;
