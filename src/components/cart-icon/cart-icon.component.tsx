import {
  ShoppingIcon,
  ShoppingIconCount,
  CartIconContainer,
} from "./cart-icon.styles";
// import { useContext } from "react";
// import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
// import { DropdownContext } from "../../contexts/cart.context";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";

function CartIcon() {
  // const { isCartOpen, setIsCartOpen, cartCount } = useContext(DropdownContext);
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

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
