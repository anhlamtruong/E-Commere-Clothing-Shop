import "./checkout-item.styles.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";

import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";
// import { useContext } from "react";
// import { DropdownContext } from "../../contexts/cart.context";

function CheckoutItem({ item }) {
  const { name, price, imageUrl, quantity } = item;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  // const { reduceItemFromCart, addItemToCart, removeItemFromCart } =
  //   useContext(DropdownContext);

  //function remove Product from Cart
  const reduceProductFromCart = () =>
    dispatch(reduceItemFromCart(cartItems, item));
  //function add Product to Cart
  const addProductToCart = () => dispatch(addItemToCart(cartItems, item));
  //function remove Product from Cart
  const removeProductFromCart = () =>
    dispatch(removeItemFromCart(cartItems, item));

  return (
    <div className="checkout-item">
      <div className="checkout-item__image-container">
        <img className="checkout-item__image" src={imageUrl} alt={name} />
      </div>
      <span className="checkout-item__name">{name}</span>
      <div className="checkout-item__quantity">
        <button
          className="checkout-item__quantity-arrow"
          onClick={reduceProductFromCart}
        >
          &#10094;
        </button>
        <span className="checkout-item__quantity-value">{quantity}</span>
        <button
          className="checkout-item__quantity-arrow"
          onClick={addProductToCart}
        >
          &#10095;
        </button>
      </div>
      <span className="checkout-item__price">{`$${price}`}</span>
      <div
        className="checkout-item__remove-btn"
        onClick={removeProductFromCart}
      >
        &#10005;
      </div>
    </div>
  );
}

export default CheckoutItem;
