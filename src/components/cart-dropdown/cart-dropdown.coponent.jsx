// import { useContext } from "react";
// import { DropdownContext } from "../../contexts/cart.context";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles.jsx";

import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";
import { selectCartItems } from "../../store/cart/cart.selector.js";
import { setIsCartOpen } from "../../store/cart/cart.action.js";
function CartDropdown() {
  const dispatch = useDispatch();
  // const { cartItems, setIsCartOpen } = useContext(DropdownContext);
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const closeIsCartOpen = () => dispatch(setIsCartOpen(false));
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage> Your cart is empty !</EmptyMessage>
        )}
      </CartItems>
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
    </CartDropdownContainer>
  );
}

export default CartDropdown;
