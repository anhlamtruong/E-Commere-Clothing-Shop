import { compose, configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { loggerMiddleware } from "./middleware/logger.js";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";

//root-reducer
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

//* config the sagaMiddleWare
const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

//* Leagacy of using the middleware
// const middleWares = [logger];
// const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = configureStore({
  reducer: persistedReducer,
  //* [2 === 3 && {a:'string'}].filter(Boolean) -----> [] casue false got filtered out
  //* [3 === 3 && {a:'string'}].filter(Boolean) -----> [{...}]
  middleware: [
    process.env.NODE_ENV !== "production" && logger,
    sagaMiddleware,
  ].filter(Boolean),
});

const composedEnhancers =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

//function run the saga from the root Saga
sagaMiddleware.run(rootSaga);

//function run the persist of the store
export const persistor = persistStore(store);
