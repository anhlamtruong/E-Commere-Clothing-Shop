import "./category.styles.scss";
import { useSelector } from "react-redux";

import { useContext, useState, useEffect, Fragment } from "react";

import { useParams } from "react-router-dom";

// import { CategoriesContext } from "../../contexts/categories.context";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector";

import Spinner from "../../components/spinner/spinner.component";
import ProductCard from "../../components/product-card/product-card.component";
type CategoryRouteParams = {
  category: string;
};

function Category() {
  //* This useParam copied ahe recent URL and pass it as a variable
  //* EX:http://localhost:3000/shop
  //* Using the `<Route path=":category" element={<Category/>} />`
  //* If we type http://localhost:3000/shop/hats
  //* The {category} will become a variable(hats),
  //* and we can use it in the element={<Category/>}
  const { category } = useParams<
    keyof CategoryRouteParams
  >() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  //hooks using to load the the products from the useContext to products useState
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    //important Safeguard because categoriesMap is async function
    //important it will need to fetch the data, but when the application
    //important mount again, this return will just run synchronous before
    //important the data is fetched.
    <Fragment>
      <h1 className="products__title">{category}</h1>
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        <div className="products__container">
          {products &&
            products.map((pro) => {
              return <ProductCard key={pro.id} product={pro}></ProductCard>;
            })}
        </div>
      )}
    </Fragment>
  );
}
export default Category;
