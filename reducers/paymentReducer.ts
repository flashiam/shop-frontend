import {
  SET_ORDER_LOADING,
  GET_ORDER_ID,
  PAYMENT_ERROR,
} from "../actions/types";

const initialState = {
  orderId: null,
  orderLoading: true,
  paymenError: null,
};

const paymentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ORDER_ID:
      return {
        ...state,
        orderId: action.payload,
        orderLoading: false,
      };
    case PAYMENT_ERROR:
      return {
        ...state,
        paymentError: action.payload,
        orderLoading: false,
      };
    default:
      return state;
  }
};

export default paymentReducer;
