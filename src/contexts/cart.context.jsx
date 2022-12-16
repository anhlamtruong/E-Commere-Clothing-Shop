import { createContext, useState, useEffect } from "react";

const removeCartItem = (items, productRemove) => {
  return items.filter((cartItem) => cartItem.id !== productRemove.id);
};

const reduceCartItem = (items, productReduce) => {
  //*find if cart items contains productsa to remove
  const existingCartItem = items.find(
    (cartItem) => cartItem.id === productReduce.id
  );
  //* Checking the quantity to make sure to delete the item
  //* when the quantity is 1
  const checkQuantity = items.find(
    (cartItem) => cartItem.id === productReduce.id && cartItem.quantity > 1
  );
  if (existingCartItem) {
    if (checkQuantity) {
      return items.map((cartItem) =>
        cartItem.id === productReduce.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    } else {
      return items.filter((cartItem) => cartItem.id !== productReduce.id);
    }
  }
  //*when not found and item too remove
  return;
};

const addCartItem = (items, productAdd) => {
  //*find if cart items contains productsa to add
  const existingCartItem = items.find(
    (cartItem) => cartItem.id === productAdd.id
  );

  //*if found ++ quantity
  //function go through each existed cartitem and check if the id is equal
  //function to add the quantity by 1 if the item is already existed
  if (existingCartItem) {
    return items.map((cartItem) =>
      cartItem.id === productAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //*return new array with modified cart items/ new Cart Items
  //! syntax of adding new item into array with modified children
  return [...items, { ...productAdd, quantity: 1 }];
};

//* Seeing this as products value you want to access, not function
export const DropdownContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  totalPrice: 0,
});
/*
product{
  id,
  name,
  price,
  imageURL,
  quantity
}
*/

//*function The provider is a function return UserContext,
//*function wrap around the other components to provide access to UserContext
export const DropdownProvider = ({ children }) => {
  //*use a hooks to keep track on the currentuser
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  //*A useEffect for dynamicially calculate the total price whenever cartItems change
  useEffect(() => {
    const newTotalPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  //function add Item to the cartItem array
  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };
  //function reduce Item to the cartItem array
  const reduceItemFromCart = (product) => {
    setCartItems(reduceCartItem(cartItems, product));
  };
  //function remove Item to the cartItem array
  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    reduceItemFromCart,
    cartItems,
    cartCount,
    totalPrice,
  };

  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
};
