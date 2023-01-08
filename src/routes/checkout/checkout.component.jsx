import "./checkout.styles.scss";
// import { useContext } from "react";
import { useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
// import { DropdownContext } from "../../contexts/cart.context";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";

function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotal);
  return (
    <div className="checkout">
      <div className="checkout-header">
        <div className="checkout-header__block">
          <span>Product</span>
        </div>
        <div className="checkout-header__block">
          <span>Description</span>
        </div>
        <div className="checkout-header__block">
          <span>Quantity</span>
        </div>
        <div className="checkout-header__block">
          <span>Price</span>
        </div>
        <div className="checkout-header__block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} item={cartItem} />
      ))}
      <div className="checkout-footer">
        <span className="checkout-footer__info">TOTAL: </span>
        <span className="checkout-footer__price">{`$${totalPrice}`}</span>
      </div>
    </div>
  );
}

export default Checkout;
