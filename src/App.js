import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

// import { setCurrentUser } from "./store/user/user.action";

import "./App.styles.scss";
import Home from "./routes/home/home.component.jsx";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component.jsx";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { checkUserSession } from "./store/user/user.action";
function App() {
  const dispatch = useDispatch();
  //*We want to mount this function 1 times only, to run the onAuthStateChangedListener once
  useEffect(() => {
    //! Using saga instead of synchronous hook function
    dispatch(checkUserSession());
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   // console.log(user);
    //   if (user) {
    //     //* We don't know if the user is a new user or is already in db
    //     createUserDocumentFromAuth(user);
    //   }
    //   dispatch(setCurrentUser(user));
    // });
    // return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="shop/*" element={<Shop />}></Route>
        <Route path="auth" element={<Authentication />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
