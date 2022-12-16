import { useContext } from "react";
import { DropdownContext } from "../../contexts/cart.context";
import { Link, useNavigate } from "react-router-dom";

import "./cart-dropdown.styles.scss";

import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";

function CartDropdown() {
  const { cartItems, setIsCartOpen } = useContext(DropdownContext);
  const navigate = useNavigate();
  const closeIsCartOpen = () => setIsCartOpen(false);
  return (
    <div className="cart-dropdown">
      <div className="cart-dropdown__items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Link
        to="/checkout"
        onClick={(e) => {
          e.preventDefault();
          closeIsCartOpen();
          navigate("/checkout");
        }}
      >
        <Button>GO TO CHECKOUT</Button>
      </Link>
    </div>
  );
}

export default CartDropdown;
