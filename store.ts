import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { composeWithDevTools } from "remote-redux-devtools";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState: any = {};

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
