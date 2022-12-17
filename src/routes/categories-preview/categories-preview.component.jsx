// import SHOP_DATA from "../../shop-data.json";
import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
// import ProductCard from "../../components/product-card/product-card.component";
import CategoryPreview from "../../components/category-preview/category-preview.component";
// import "./categories-preview.styles.scss";
function Categories() {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <div className="categories-preview-container">
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
          /* <Fragment key={title}>
            <h2>{title}</h2>
            <div className="products__container">
              {categoriesMap[title].map((pro) => {
                return <ProductCard key={pro.id} product={pro}></ProductCard>;
              })}
            </div>
          </Fragment> */
        );
      })}
    </div>
  );
}

export default Categories;
