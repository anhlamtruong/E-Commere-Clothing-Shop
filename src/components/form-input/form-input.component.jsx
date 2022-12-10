import "./form-input.styles.scss";

function FormInput({ label, ...otherProps }) {
  //! If label exist, return label
  //* In className, we can use a ${} to make advanve SCSS
  return (
    <div className="form">
      <input className="form__input" {...otherProps} />
      {label && (
        <label
          className={`form__label ${otherProps.value.length ? "shrink" : ""}`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
export default FormInput;
