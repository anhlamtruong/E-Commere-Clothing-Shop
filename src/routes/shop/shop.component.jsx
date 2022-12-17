import { Routes, Route } from "react-router-dom";
import Category from "../../routes/category/category.component";
import CategoriesPreview from "../../routes/categories-preview/categories-preview.component";
// import SHOP_DATA from "../../shop-data.json";
// import { Fragment, useContext } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";
// import ProductCard from "../../components/product-card/product-card.component";
// import CategoryPreview from "../../components/category-preview/category-preview.component";
import "./shop.styles.scss";

function Shop() {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}

export default Shop;
