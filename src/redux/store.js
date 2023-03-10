import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

const Store = createStore(
  combineReducers({
    reducer,
  }),
  applyMiddleware(thunk)
);

export default Store;
