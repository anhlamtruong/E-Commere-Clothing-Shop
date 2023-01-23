// import SHOP_DATA from "../../shop-data.json";
// import { useContext } from "react";
import { useSelector } from "react-redux";
// import { CategoriesContext } from "../../contexts/categories.context";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector";

// import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import CategoryPreview from "../../components/category-preview/category-preview.component";
// import "./categories-preview.styles.scss";
function Categories() {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  // const { categoriesMap } = useContext(CategoriesContext);
  return (
    <div className="categories-preview-container">
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        Object.keys(categoriesMap).map((title) => {
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
        })
      )}
    </div>
  );
}

export default Categories;
