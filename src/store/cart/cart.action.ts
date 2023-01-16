import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";

const removeCartItem = (
  items: CartItem[],
  productRemove: CategoryItem
): CartItem[] => {
  return items.filter((cartItem) => cartItem.id !== productRemove.id);
};

const reduceCartItem = (
  items: CartItem[],
  productReduce: CategoryItem
): CartItem[] => {
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
  return items;
};

const addCartItem = (
  items: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
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

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;
export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

//function setIsCartOpen
export const setIsCartOpen = withMatcher(
  (boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);

//* Using the withMatcher
export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

//function add Item to the cartItem array
export const addItemToCart = (
  cartItems: CartItem[],
  product: CategoryItem
): SetCartItems => {
  console.log(product);
  const newCartItems = addCartItem(cartItems, product);
  return setCartItems(newCartItems);
};

//function reduce Item to the cartItem array
export const reduceItemFromCart = (
  cartItems: CartItem[],
  product: CategoryItem
): SetCartItems => {
  const newCartItems = reduceCartItem(cartItems, product);
  return setCartItems(newCartItems);
};

//function remove Item to the cartItem array
export const removeItemFromCart = (
  cartItems: CartItem[],
  product: CategoryItem
): SetCartItems => {
  const newCartItems = removeCartItem(cartItems, product);
  return setCartItems(newCartItems);
};
