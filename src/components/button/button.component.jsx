import "./button.styles.scss";

//* Three type of button
/*
default button

invert button

google sign in
*/
const BUTTON_TYPE_CLASSES = {
  goolge: "google-sign-in",
  inverted: "inverted",
};

function Button({ children, buttonType, ...otherProps }) {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}
export default Button;
