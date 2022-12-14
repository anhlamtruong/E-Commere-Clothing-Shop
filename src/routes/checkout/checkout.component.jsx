import "./checkout.styles.scss";
import { useContext } from "react";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { DropdownContext } from "../../contexts/cart.context";

function Checkout() {
  const { cartItems } = useContext(DropdownContext);
  return (
    <div>
      <h1>CHECKING OUT</h1>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} item={cartItem} />
      ))}
    </div>
  );
}

export default Checkout;
