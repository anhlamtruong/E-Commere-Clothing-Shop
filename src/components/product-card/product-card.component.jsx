import { useContext } from "react";
import { DropdownContext } from "../../contexts/cart.context";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import "./product-card.styles.scss";

function ProductCard({ product }) {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(DropdownContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card">
      <img className="product-card__img" src={imageUrl} alt={`${name}`} />
      <div className="product-card__info">
        <span className="product-card__name">{name}</span>
        <span className="product-card__price">{price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add To Card
      </Button>
    </div>
  );
}

export default ProductCard;
