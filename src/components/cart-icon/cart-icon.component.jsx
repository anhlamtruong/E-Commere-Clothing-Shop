import {
  ShoppingIcon,
  ShoppingIconCount,
  CartIconContainer,
} from "./cart-icon.styles.jsx";
import { useContext } from "react";
// import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { DropdownContext } from "../../contexts/cart.context";

function CartIcon() {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(DropdownContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  //function calculate number of quantity in cartItem
  // const calQuantity = (cart) => {
  //   return cart.reduce((acc, curItem) => acc + curItem.quantity, 0);
  // };
  // Another methods

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ShoppingIconCount>{cartCount}</ShoppingIconCount>
    </CartIconContainer>
  );
}

export default CartIcon;
