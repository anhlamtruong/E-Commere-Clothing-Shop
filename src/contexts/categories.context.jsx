import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase.utils.js";

// import SHOP_DATA from "../shop-data.js";
//* Seeing this as products value you want to access, not function

export const CategoriesContext = createContext({
  categoriesMap: {},
});

//*function The provider is a function return UserContext,
//*function wrap around the other components to provide access to UserContext
export const CategoriesProvider = ({ children }) => {
  //*use a hooks to keep track on the currentuser
  const [categoriesMap, setCategoriesMap] = useState({});

  //*Use the use effect here to fire the batch event only once to the database
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  //*
  useEffect(() => {
    const getCategoriesMap = async () => {
      try {
        const categoryMap = await getCategoriesAndDocuments();
        // console.log(categoryMap);
        setCategoriesMap(categoryMap);
      } catch (err) {
        console.error(err);
      }
    };
    getCategoriesMap();
  }, []);
  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
