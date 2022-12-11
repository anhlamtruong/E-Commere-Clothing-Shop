import SignUpForm from "../../components/sign-up/sign-up.component.jsx";
import SignInForm from "../../components/sign-in/sign-in-form.component.jsx";

import "./authentication.styles.scss";
function Authentication() {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
      {/* <button onClick={logFacebookUser}>Sign in with Facebook PopUp</button> */}
    </div>
  );
}
export default Authentication;
