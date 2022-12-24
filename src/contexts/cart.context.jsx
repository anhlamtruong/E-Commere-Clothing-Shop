import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils.js";
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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

//*Initial state using for the reducer
const INTIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalPrice: 0,
};
const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type of ${type} in cart reducer`);
  }
};

//*function The provider is a function return UserContext,
//*function wrap around the other components to provide access to UserContext
export const DropdownProvider = ({ children }) => {
  //*use a hooks to keep track on the currentuser
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);
  //? Use reducer
  const [{ cartCount, totalPrice, isCartOpen, cartItems }, dispatch] =
    useReducer(cartReducer, INTIAL_STATE);

  //*A useEffect for dynamicially calculate the total price whenever cartItems change
  // useEffect(() => {
  //   const newTotalPrice = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity * cartItem.price,
  //     0
  //   );
  //   setTotalPrice(newTotalPrice);
  // }, [cartItems]);

  //*A useEffect for dynamicially calculate the quantity whenever cartItems change
  // useEffect(() => {
  //   const newCartCount = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity,
  //     0
  //   );
  //   setCartCount(newCartCount);
  // }, [cartItems]);

  //function that update the cart items using reducer
  const updateCartItemsReducer = (newCartItems) => {
    //* generate newCartTotal
    const newTotalPrice = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    //* generate newCartCount
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    /* 
      dispatch new action with payload ={
        newCartItems,
        newCartTotal,
        newCartCount,
      }
    */
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        totalPrice: newTotalPrice,
        cartCount: newCartCount,
      })
      // type: CART_ACTION_TYPES.SET_CART_ITEMS,
      // payload: {
      //   cartItems: newCartItems,
      //   totalPrice: newTotalPrice,
      //   cartCount: newCartCount,
      // },
    );
  };

  //function add Item to the cartItem array
  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };
  //function reduce Item to the cartItem array
  const reduceItemFromCart = (product) => {
    const newCartItems = reduceCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };
  //function remove Item to the cartItem array
  const removeItemFromCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };
  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
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
