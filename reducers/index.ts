import { combineReducers } from "redux";
import paymentReducer from "./paymentReducer";
import foodReducer from "./foodReducer";
import userReducer from "./userReducer";

export default combineReducers({
  food: foodReducer,
  payment: paymentReducer,
  user: userReducer,
});
