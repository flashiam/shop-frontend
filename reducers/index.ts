import { combineReducers } from "redux";
import paymentReducer from "./paymentReducer";
import foodReducer from "./foodReducer";

export default combineReducers({
  food: foodReducer,
  payment: paymentReducer,
});
