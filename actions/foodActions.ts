import {
  SET_LOADING,
  ADD_CART_ITEM,
  FOOD_ERROR,
  GET_CART_NUM,
  CALCULATE_CART_TOTAL,
  OPEN_LOCATION,
  CLOSE_LOCATION,
  FETCH_CART_ITEMS,
  REMOVE_CART_ITEM,
} from "./types";
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
      payload: item,
    });
  } catch (err) {
    dispatch({
      type: FOOD_ERROR,
      payload: err,
    });
  }
};

// Function to fetch the cart items from storage when page refreshes
export const fetchCartItems = () => async (dispatch: any) => {
  try {
    const savedItems = await AsyncStorage.getItem("cart-items");
    if (savedItems) {
      dispatch({
        type: FETCH_CART_ITEMS,
        payload: JSON.parse(savedItems),
      });
    } else {
      dispatch({
        type: FETCH_CART_ITEMS,
        payload: [],
      });
    }
  } catch (err) {
    dispatch({
      type: FOOD_ERROR,
      payload: err,
    });
  }
};

// Function to delete a item from cart
export const deleteCartItem = (id: number) => async (dispatch: any) => {
  try {
    const savedItems = await AsyncStorage.getItem("cart-items");

    if (savedItems) {
      const items = JSON.parse(savedItems);
      const filteredItems = items.filter((item: CartItem) => item.id !== id);

      await AsyncStorage.setItem("cart-items", JSON.stringify(filteredItems));
    }

    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: FOOD_ERROR,
      payload: err,
    });
  }
};

// Function to calculate total cart price
export const calculateTotalPrice =
  (newItem: CartItem) => async (dispatch: any) => {
    try {
      dispatch({
        type: CALCULATE_CART_TOTAL,
        payload: newItem,
      });
    } catch (err) {
      console.log(err);
    }
  };

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

// Function to open location modal
export const openLocation = () => {
  return {
    type: OPEN_LOCATION,
  };
};

// Function to close location modal
export const closeLocation = () => {
  return {
    type: CLOSE_LOCATION,
  };
};

// Function to set loading
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
