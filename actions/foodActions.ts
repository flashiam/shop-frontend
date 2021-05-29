import { SET_LOADING, ADD_CART_ITEM, FOOD_ERROR, GET_CART_NUM } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CartItem {
  id: number;
  title: string;
  subtitle?: string;
  price: number;
  quantity: number;
  weight: number;
}

// Function to add cart item
export const addCartItem = (item: CartItem) => async (dispatch: any) => {
  let items;
  try {
    // Save to the storage too
    const existingData = await AsyncStorage.getItem("cart-items");

    if (existingData) {
      items = JSON.parse(existingData);
    } else {
      items = [];
    }

    items.push(item);
    await AsyncStorage.setItem("cart-items", JSON.stringify(items));

    dispatch({
      type: ADD_CART_ITEM,
      payload: items,
    });

    console.log("added to cart");
  } catch (err) {
    dispatch({
      type: FOOD_ERROR,
      payload: err,
    });
  }
};

// Function to update the cart item
// export const updateCart = (cartItems: CartItem[]) => async (dispatch: any) => {
//   try {

//   } catch (err) {

//   }
// }

// Function to get the num of items in cart
export const getCartNo = () => async (dispatch: any) => {
  try {
    const savedItems = await AsyncStorage.getItem("cart-items");

    if (savedItems) {
      dispatch({
        type: GET_CART_NUM,
        payload: JSON.parse(savedItems),
      });
    }
  } catch (err) {
    dispatch({
      type: FOOD_ERROR,
      payload: err,
    });
  }
};

// Function to set loading
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
