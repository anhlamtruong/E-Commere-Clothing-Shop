// import SHOP_DATA from "../../shop-data.json";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss";
function Shop() {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products__container">
      {products.map((pro) => {
        return <ProductCard key={pro.id} product={pro}></ProductCard>;
      })}
    </div>
  );
}

export default Shop;
