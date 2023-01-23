import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";
import { RootState } from "../store";
const selectCartReducer = (state: RootState): CartState => state.cart;

//function that using memoization
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

//function that update the cart items using reducer
//* generate newCartCount
export const selectCartCount = createSelector([selectCartItems], (cartItem) =>
  cartItem.reduce((total, cartItem) => total + cartItem.quantity, 0)
);
//* generate newCartTotal
export const selectCartTotal = createSelector([selectCartItems], (cartItem) =>
  cartItem.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
