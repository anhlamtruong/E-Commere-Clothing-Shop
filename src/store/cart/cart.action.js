import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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

const addCartItem = (items, productToAdd) => {
  //*find if cart items contains productsa to add
  const existingCartItem = items.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  //*if found ++ quantity
  //function go through each existed cartitem and check if the id is equal
  //function to add the quantity by 1 if the item is already existed
  if (existingCartItem) {
    return items.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...items, { ...productToAdd, quantity: 1 }];
};

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

//function add Item to the cartItem array
export const addItemToCart = (cartItems, product) => {
  console.log(product);
  const newCartItems = addCartItem(cartItems, product);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
//function reduce Item to the cartItem array
export const reduceItemFromCart = (cartItems, product) => {
  const newCartItems = reduceCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
//function remove Item to the cartItem array
export const removeItemFromCart = (cartItems, product) => {
  const newCartItems = removeCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
