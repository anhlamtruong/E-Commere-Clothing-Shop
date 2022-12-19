import { Form, FormInputLabel, Input } from "./form-input.styles.jsx";

function FormInput({ label, ...otherProps }) {
  //! If label exist, return label
  //* In className, we can use a ${} to make advanve SCSS
  return (
    <Form>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Form>
  );
}
export default FormInput;
