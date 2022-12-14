import { useContext } from "react";
import { DropdownContext } from "../../contexts/cart.context";

import "./cart-dropdown.styles.scss";

import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";

function CartDropdown() {
  const { cartItems } = useContext(DropdownContext);

  return (
    <div className="cart-dropdown">
      <div className="cart-dropdown__items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
}

export default CartDropdown;
