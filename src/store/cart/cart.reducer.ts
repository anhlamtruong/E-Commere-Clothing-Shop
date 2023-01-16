import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { AnyAction } from "@reduxjs/toolkit";
import { setCartItems, setIsCartOpen } from "./cart.action";
// import { CART_ACTION_TYPES, CartItem } from "./cart.types";
export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
};

//*Initial state using for the reducer
export const CART_INTIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  // cartCount: 0,
  // totalPrice: 0,
};

export const cartReducer = (
  state = CART_INTIAL_STATE,
  action: AnyAction
): CartState => {
  // const { type, payload } = action;
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }
  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }
  return state;
  // switch (type) {
  //   case CART_ACTION_TYPES.SET_CART_ITEMS:
  //     return {
  //       ...state,
  //       cartItems: payload,
  //     };
  //   case CART_ACTION_TYPES.SET_IS_CART_OPEN:
  //     return {
  //       ...state,
  //       isCartOpen: payload,
  //     };
  //   default:
  //     return state;
  // }
};
