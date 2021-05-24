import { GET_ORDER_ID, PAYMENT_ERROR } from "./types";
import axios from "axios";

// Function to fetch order id
export const fetchOrderId = () => async (dispatch: any) => {
  const url = "http://192.168.1.6:3000/orderCreate";

  //   Dummy data for the order id
  const orderData = {
    token: 82815,
    data: {
      gross: 34.3,
      net: 30000,
      taxes: 33.3,
      discount: 0.1,
      promo: "Some promo",
      items: [
        {
          id: 1,
          name: "chicken",
          quantity: 3,
        },
        {
          id: 2,
          name: "Fish",
          quantity: 2,
        },
        {
          id: 3,
          name: "mutton",
          quantity: 3,
        },
      ],
    },
  };

  try {
    const res = await axios.post(url, orderData);

    // Dispatch the response to the reducer
    dispatch({
      type: GET_ORDER_ID,
      payload: res.data.data.orderId,
    });
  } catch (err) {
    // Dispatch the error to the reducer
    dispatch({
      type: PAYMENT_ERROR,
      payload: err,
    });
  }
};
