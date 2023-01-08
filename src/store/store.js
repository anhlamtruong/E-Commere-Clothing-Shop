import { compose, configureStore, applyMiddleware } from "@reduxjs/toolkit";
// import logger from "redux-logger";

//root-reducer
import { rootReducer } from "./root-reducer";

//*Our-own logger middleware
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

//* Leagacy of using the middleware
// const middleWares = [logger];
// const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = configureStore({
  reducer: rootReducer,
  middleware: [loggerMiddleware],
});
