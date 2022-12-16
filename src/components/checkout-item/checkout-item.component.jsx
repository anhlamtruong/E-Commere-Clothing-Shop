import "./checkout-item.styles.scss";
import { useContext } from "react";
import { DropdownContext } from "../../contexts/cart.context";

function CheckoutItem({ item }) {
  const { name, price, imageUrl, quantity } = item;
  const { reduceItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(DropdownContext);

  //function remove Product from Cart
  const reduceProductFromCart = () => reduceItemFromCart(item);
  //function add Product to Cart
  const addProductToCart = () => addItemToCart(item);
  //function remove Product from Cart
  const removeProductFromCart = () => removeItemFromCart(item);

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
