import "./category-preview.styles.scss";
import ProductCard from "../product-card/product-card.component";
import { Outlet, Link } from "react-router-dom";

function CategoryPreview({ title, products }) {
  return (
    <div className="category-preview">
      <h2>
        <Link to={title}>
          <span className="category-preview__title">{title.toUpperCase()}</span>
        </Link>
      </h2>
      <div className="category-preview__product">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => {
            return (
              <ProductCard key={product.id} product={product}></ProductCard>
            );
          })}
      </div>
    </div>
  );
}

export default CategoryPreview;
