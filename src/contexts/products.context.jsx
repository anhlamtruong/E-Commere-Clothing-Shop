import { createContext, useState, useEffect } from "react";
import PRODUCTS from "../shop-data.json";
//* Seeing this as products value you want to access, not function

export const ProductsContext = createContext({
  products: [],
});

//*function The provider is a function return UserContext,
//*function wrap around the other components to provide access to UserContext
export const ProductProvider = ({ children }) => {
  //*use a hooks to keep track on the currentuser
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
