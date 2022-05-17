import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { connectRouter, routerMiddleware } from 'connected-react-router'

import rootSaga from "store/saga";
import boardSlice from "./reducer/boardReducer";
import columnSlice from "./reducer/columnReducer";
import backgroundSlice from "./reducer/backgroundReducer";
import cardSlice  from "./reducer/cardReducer";

import { history } from "./history";

const saga = createSagaMiddleware()


const rootReducer = combineReducers({
  router: connectRouter(history),
  background: backgroundSlice,
  board: boardSlice,
  column: columnSlice,
  card: cardSlice
})
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga, routerMiddleware(history))
})

saga.run(rootSaga);



export default store;

