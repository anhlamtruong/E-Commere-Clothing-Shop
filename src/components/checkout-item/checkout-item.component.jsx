import "./checkout-item.styles.scss";
import { useContext } from "react";
import { DropdownContext } from "../../contexts/cart.context";

function CheckoutItem({ item }) {
  const { name, price, imageUrl, quantity } = item;
  const { removeItemToCart, addItemToCart } = useContext(DropdownContext);
  //function remove Product from Cart
  const removeProductFromCart = () => removeItemToCart(item);
  //function add Product to Cart
  const addProductToCart = () => addItemToCart(item);

  return (
    <div className="checkout-item">
      <img src={imageUrl} alt={name} />
      <span className="checkout-item__name">{name}</span>
      <div className="checkout-item__quantity-container">
        <button onClick={removeProductFromCart}>&#8882;</button>
        <span className="checkout-item__name">{quantity}</span>
        <button onClick={addProductToCart}>&#8883;</button>
      </div>
      <span className="checkout-item__name">{price}</span>
      <button>&#8855;</button>
    </div>
  );
}

export default CheckoutItem;
